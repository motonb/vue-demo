<template>
  <div>
    <Card>
      <div class="page-header-bar">
        <Select v-model="trmlTypeId" placeholder="请选择终端类型" clearable style="width:140px">
          <Option v-for="item in trmlTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <al-selector auto class="area-selector" data-type="name" v-model="pcd" level="2" style="width:450px"
                     ref="alCascader"/>
        <Input v-model.trim="searchWord" :maxlength="20" clearable placeholder="请输入关键字" style="width: 150px"/>
        <Button type="primary" @click="getTrmlBaseList">搜索</Button>
        <Button type="primary" @click="resetQueryCondition" html-type="reset">重置</Button>
        <Button type="primary" @click="goToAdd">新增</Button>
        <Button type="warning" @click="deleteTrmlBase">删除</Button>
      </div>

      <Table border stripe :columns="columns" :data="tableData" :loading="tableLoading"
             @on-selection-change="changeSelection"></Table>

      <div class="flex">
        <div></div>
        <Page :total="count" :current="pageIndex" show-elevator show-sizer @on-change="changePage"
              @on-page-size-change="changeSize" show-total></Page>
      </div>
    </Card>
  </div>
</template>
<script>
  import config from '@/config'
  import {assign} from '@/libs/tools'
  import {mapMutations} from 'vuex'

  export default {
    name: 'page-list',
    data () {
      return {
        count: 0, // 数据总条数
        pageIndex: config.pageIndex, // 当前页码
        pageSize: config.pageSize, // 分页数量
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '终端编号',
            key: 'trmlCode'
          },
          {
            title: '终端名称',
            key: 'trmlName'
          },
          {
            title: '终端类别',
            key: 'trmlTypeName'
          },
          {
            title: '所属公司',
            key: 'placeCoName'
          },
          {
            title: '联系人',
            key: 'contactPerson'
          },
          {
            title: '联系方式',
            key: 'contactPhone'
          },
          {
            title: '安装时间',
            key: 'installDate'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    color: '#f5723f',
                    type: 'ios-paper',
                    size: '24'
                  },
                  class: {
                    'link-text': true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  nativeOn: {
                    click: () => {
                      this.goToDetail(params)
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    color: '#008deb',
                    type: 'md-create',
                    size: '24'
                  },
                  class: {
                    'link-text': true
                  },
                  nativeOn: {
                    click: () => {
                      this.goToUpdate(params)
                    }
                  }
                })
              ])
            }
          }
        ], // 表头
        tableData: [], // 表格数据
        tableLoading: false, // 表格加载状态
        selection: [], // 选择项
        pageTypeEnum: config.pageTypeEnum, // 页面类型枚举
        trmlTypeId: null, // 终端类型id
        trmlTypeList: [], // 终端列表
        pcd: [], // 省市区
        searchWord: '' // 关键字
      }
    },
    methods: {
      ...mapMutations([
        'addTag'
      ]),
      /**
       *@Description 获取终端类型列表
       */
      getTrmlTypeList () {
        this.$http.fetchGet(this.$path.getTrmlAllType).then((data) => {
          if (data) {
            this.trmlTypeList = data.data.list
          }
        })
      },
      /**
       *@Description 获取终端信息列表
       */
      getTrmlBaseList () {
        let params = assign({}, {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          trmlTypeId: this.trmlTypeId,
          searchWord: this.searchWord,
          province: this.pcd && this.pcd[0] ? this.pcd[0] : null,
          city: this.pcd && this.pcd[1] ? this.pcd[1] : null,
          area: this.pcd && this.pcd[2] ? this.pcd[2] : null
        }) // 组合需要的参数 如果vue对象中的值不为空则赋值给params传给后台
        this.tableLoading = true  // 表格加载
        this.$http.fetchGet(this.$path.getTrmlBaseList, params).then((data) => {
          this.tableLoading = false  // 表格加载完成
          if (data) {
            this.tableData = data.data.list
            this.count = data.data.count
          }
        })
      },
      /**
       *@Description 跳转页面。根据不同需求跳转到同一页面
       * @Param 详情和修改页面需要传入id
       */
      goToAdd () {
        const route = {
          name: 'page-detail',
          query: {pageType: this.pageTypeEnum.add},
          meta: {
            title: `复杂信息详情`,
            notCache: true
          }
        }
        // 跳转页面带query的需调用addTag方法
        this.addTag({
          route: route, type: 'push'
        })
        this.$router.push(route)
      },
      /**
       *@Description 跳转页面。根据不同需求跳转到同一页面
       * @Param 详情和修改页面需要传入id
       */
      goToDetail (params) {
        const route = {
          name: 'page-detail',
          query: {id: params.row.id, pageType: this.pageTypeEnum.detail},
          meta: {
            title: `复杂信息详情`,
            notCache: true
          }
        }
        this.addTag({
          route: route, type: 'push'
        })
        this.$router.push(route)
      },
      /**
       *@Description 跳转页面。根据不同需求跳转到同一页面
       * @Param 详情和修改页面需要传入id
       */
      goToUpdate (params) {
        const route = {
          name: 'page-detail',
          query: {id: params.row.id, pageType: this.pageTypeEnum.update},
          meta: {
            title: `复杂信息详情`,
            notCache: true
          }
        }
        this.addTag({
          route: route, type: 'push'
        })
        this.$router.push(route)
      },
      /**
       *@Description 删除
       */
      deleteTrmlBase: function () {
        // 判断是否有选择项
        let ids = []
        if (this.selection.length) {
          this.selection.forEach((e) => { // 循环获取id
            ids.push(e.id) // 数组采用push而非put
          })
        } else {
          this.$Message.warning('没有选择项')
          return false
        }
        // 确认删除操作
        this.$Modal.confirm({
          title: '操作警告',
          content: '<p>是否确认删除</p>',
          onOk: () => {

            // 调用删除接口
            this.$http.fetchPostObj(this.$path.deleteTrmlBase, ids).then((data) => {
              if (data) {
                this.$Message.success('删除成功')
                this.selection = [] // 删除之后需要手动将selection置空
                this.getTrmlBaseList() // 重新请求数据
              }
            })
          },
          onCancel: () => {
            this.$Message.info('取消删除');
          }
        });

      },
      /**
       * @Description 清空列表搜索的条件，地区略微区别。
       */
      resetQueryCondition () {
        this.trmlTypeId = null
        this.searchWord = null
        // 消除默认值
        this.pcd = []
        this.$nextTick(function () {
          this.$refs.alCascader.currPro = null
          this.$refs.alCascader.currCit = null
          this.$refs.alCascader.currCou = null
        })
        this.getTrmlBaseList()
      },
      /**
       *@Description 根据页码搜索站点列表
       *@method    changePage
       *@param  {Number} num 搜索页码
       */
      changePage (num) {
        this.pageIndex = num
        this.getTrmlBaseList()
      },
      /**
       *@Description 根据每页条数搜索站点列表
       *@method   changeSize
       *@param  {Number} size 每页条数
       */
      changeSize (size) {
        this.pageSize = size
        this.getTrmlBaseList()
      },
      /**
       *@Description 列表多选
       *@method    changeSelection
       *@param  {Array} selection 已选项数据
       */
      changeSelection (selection) {
        this.selection = selection
      }
    },
    mounted () {
      this.getTrmlTypeList()
      this.getTrmlBaseList()
    }
  }
</script>

<style scoped>

</style>
