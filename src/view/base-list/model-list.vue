<template>
  <div>
    <Card>
      <div class="page-header-bar">
        <Button type="primary" @click="goToAdding">增加</Button>
        <Button type="warning" @click="goToDelete">删除</Button>
      </div>

      <Table border stripe :columns="columns" :data="tableData" :loading="tableLoading"
             @on-selection-change="changeSelection"></Table>

      <div class="flex">
        <div></div>
        <Page :total="count" :current="pageIndex" show-elevator show-sizer @on-change="changePage"
              @on-page-size-change="changeSize" show-total></Page>
      </div>
    </Card>

    <Modal v-model="showServiceModal" :title="serviceModalTitle" @on-cancel="hideServiceModal">
      <Form ref='accessForm' :model='accessDetail' :rules='ruleValidate' label-position='right' :label-width='100'>
        <Row>
          <Col span="12">
            <FormItem label="服务名称:" prop="serverName">
              <Input v-model="accessDetail.serverName" v-if="showEditElement"></Input>
              <p v-else>{{accessDetail.serverName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="IP地址:" prop="ip">
              <Input v-model="accessDetail.ip" v-if="showEditElement"></Input>
              <p v-else>{{accessDetail.ip}}</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="端口:" prop="port">
              <Input v-model="accessDetail.port" v-if="showEditElement"></Input>
              <p v-else>{{accessDetail.port}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="协议:" prop="protocol">
              <Input v-model="accessDetail.protocol" v-if="showEditElement"></Input>
              <p v-else>{{accessDetail.protocol}}</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="备注:" prop="remark">
              <Input v-model="accessDetail.remark" v-if="showEditElement"></Input>
              <p v-else>{{accessDetail.remark}}</p>
            </FormItem>
          </Col>
          <Col span="12"></Col>
        </Row>
      </Form>

      <div slot="footer">
        <Button @click="hideServiceModal">取消</Button>
        <Button type="primary" @click="addAccessConfig" v-if="modalType === modalTypeEnum.add">新增</Button>
        <Button type="primary" @click="updateAccessConfig" v-if="modalType === modalTypeEnum.update">修改</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import config from '@/config'
  import {emptyObjData} from '@/libs/tools'
  import {
    validateIP
  } from '@/libs/validate'

  export default {
    name: 'model-list',
    data () {
      return {
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            type: 'index',
            title: '序号',
            width: 75,
            align: 'center'
          },
          {
            title: '服务名称',
            key: 'serverName',
            align: 'center'
          },
          {
            title: '账户名',
            key: 'account',
            align: 'center'
          },
          {
            title: 'IP号',
            key: 'ip',
            align: 'center'
          },
          {
            title: '端口',
            key: 'port',
            align: 'center'
          },
          {
            title: '协议',
            key: 'protocol',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
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
                      this.goToUpdating(params)
                    }
                  }
                })
              ])
            }
          }
        ], // 表格表头
        tableData: [], // 表格数据
        selection: [], // 表格选择项
        tableLoading: false, // 表格加载状态
        count: 0, // 表格数据总页数
        pageIndex: config.pageIndex, // 表格当前页数
        pageSize: config.pageSize, // 每页的条数
        showServiceModal: false, // 是否显示接入信息对话框
        serviceModalTitle: null, // 接入信息对话框标题
        modalType: null,  // 对话框类型
        modalTypeEnum: config.modalTypeEnum, // 表格当前页数
        accessDetail: {
          serverName: null, // 服务名称
          ip: null, // IP号
          port: null, // 端口
          protocol: null, // 协议
          account: null, // 账户名
          remark: null, // 备注
          id: null,
          statusCd:null
        }, // 模态框数据实体
        ruleValidate: {
          serverName: [
            {required: true, message: '服务名称不能为空', trigger: 'change'},
            {min:1, max:5,message: '服务名称为1到15', trigger: 'change'}
          ],
          account: [
            {required: true, message: '账户名不能为空', trigger: 'change'}
          ],
          ip: [
            {required: true, message: 'ip不能为空', trigger: 'blur'},
            { validator: validateIP, trigger: 'change'}
          ],
          port: [
            {required: true, message: '端口不能为空', trigger: 'change'},
            {min:1, max:12,message: '端口为1到12', trigger: 'change'}
          ],
          protocol: [
            {required: true, message: '协议不能为空', trigger: 'change'},
            {min:1, max:12,message: '协议为1到12', trigger: 'change'}
          ]
        } // 表单验证方法
      }
    },
    computed:{
      showEditElement(){
        return this.modalType !== this.modalTypeEnum.detail
      }
    },
    methods: {
      /**
       * @Description：获取接入配置信息列表
       * @method：getAccessConfigList
       */
      getAccessConfigList () {
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        this.$http.fetchGet(this.$path.getAccessConfigList, params).then((data) => {
          this.tableLoading = false
          if (data) {
            this.tableData = data.data.list
            this.count = data.data.count
          }
        })
      },
      /**
       * @Description：隐藏信息窗口
       * @method：hideServiceModal
       */
      hideServiceModal () {
        this.showServiceModal = false
        this.$refs.accessForm.resetFields()
      },
      /**
       * @Description：弹出增加信息窗口
       * @method：goToAdding
       */
      goToAdding () {
        this.modalType = this.modalTypeEnum.add
        this.serviceModalTitle = '新增服务'
        emptyObjData(this.accessDetail)
        this.showServiceModal = true
      },
      /**
       * @Description：新增接入配置信息
       * @method：addAccessConfig
       */
      goToDetail(params){
        this.modalType = this.modalTypeEnum.detail
        this.serviceModalTitle = '服务详情'
        this.accessDetail = Object.assign({}, params.row);
        // 或者调用获取详情接口
        // this.getAccessConfigDetail()
        this.showServiceModal = true
      },
      addAccessConfig () {
        this.$refs.accessForm.validate((valid) => {
          if (valid) {
            this.$http.fetchPostObj(this.$path.addAccessConfig, this.accessDetail).then((data) => {
              if (data) {
                this.$Message.success('新增成功')
                this.getAccessConfigList()
                this.showServiceModal = false
              } else {
                this.$Message.warning('新增失败')
                this.showServiceModal = false
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },

      /**
       * @Description：获取接入配置详细信息
       * @method：getAccessConfigDetail
       */
      getAccessConfigDetail () {
        this.$http.fetchGet(`${this.$path.getAccessConfigDetail}/${this.accessDetail.id}`).then((data) => {
          if (data) {
            this.accessDetail = data.data
          }
        })
      },
      /**
       * @Description：弹出修改信息窗口
       * @method：goToUpdating
       */
      goToUpdating (params) {
        this.serviceModalTitle = '修改服务';
        this.accessDetail = Object.assign({}, params.row);
        this.modalType = this.modalTypeEnum.update;
        this.showServiceModal = true;
      },
      /**
       * @Description：修改接入配置信息
       * @method：updateAccessConfig
       */
      updateAccessConfig () {
        this.$refs.accessForm.validate((valid) => {
          if (valid) {
            this.$http.fetchPostObj(this.$path.updateAccessConfig, this.accessDetail).then((data) => {
              if (data) {
                this.$Message.success('修改成功')
                this.getAccessConfigList()
                this.showServiceModal = false
              } else {
                this.$Message.warning('修改失败')
                this.showServiceModal = false
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },

      /**
       * @Description：删除接入配置信息
       * @method：goToDelete
       */
      goToDelete () {
        // 判断是否有选择项
        let ids = []
        if (this.selection.length) {
          this.selection.forEach((e) => {
            ids.push(e.id)
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
            this.$http.fetchPostObj(this.$path.deleteAccessConfig, ids).then((data) => {
              if (data) {
                this.$Message.success('删除成功')
                this.selection = [] // 清空选择项
                this.getAccessConfigList() // 重新请求列表
              }
            })
          },
          onCancel: () => {
            this.$Message.info('取消删除');
          }
        });
      },
      /**
       * @Description 根据页码搜索站点列表
       * @method  changePage
       * @param  {Number} num 搜索页码
       */
      changePage (num) {
        this.pageIndex = num
        this.getAccessConfigList()
      },
      /**
       * @Description：根据每页条数搜索站点列表
       * @method：changeSize
       * @param：{Number} size 每页条数
       */
      changeSize (size) {
        this.pageSize = size
        this.getAccessConfigList()
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
      this.getAccessConfigList()
    }
  }
</script>

<style scoped>
</style>
