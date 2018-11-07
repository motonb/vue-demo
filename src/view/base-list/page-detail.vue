<template>
  <div>
    <Card>
      <p slot='title'>
        终端基本信息
      </p>

      <Button slot='extra' type="primary" @click="goBack">返回</Button>

      <Form ref='trmlForm' :model='trmlDetail' :rules='ruleValidate' label-position='right' :label-width='100'>
        <Row>
          <Col span='8'>
            <Form-item label='终端名称' prop="trmlName">
              <Input v-model.trim='trmlDetail.trmlName' placeholder='请输入终端名称' style='width: 200px'
                     v-if="showEditElement"/>
              <p v-else>{{trmlDetail.trmlName}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='终端类型' prop='trmlTypeId'>
              <Select v-model='trmlDetail.trmlTypeId' placeholder='请选择终端类型' clearable style='width:200px'
                      v-if="showEditElement">
                <Option v-for='item in trmlTypeList' :value='item.id' :key='item.id'>{{ item.name }}</Option>
              </Select>
              <p v-else>{{trmlDetail.trmlTypeName}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='所属单位' prop='placeCoCode'>
              <Select v-model='trmlDetail.placeCoCode' placeholder='请选择所属单位名称' clearable style='width:200px'
                      v-if="showEditElement">
                <Option v-for='item in enterpriseList' :value='item.code' :key='item.code'>{{ item.name }}</Option>
              </Select>
              <p v-else>{{trmlDetail.placeCoName}}</p>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span='8'>
            <Form-item label='安装时间' prop='installDate'>
              <DatePicker type='date' v-model='trmlDetail.installDate' placeholder='请选择安装时间' style='width: 200px'
                          v-if="showEditElement" formate="yyyy-MM-dd" :options="optionDisable"
                          :editable="false"></DatePicker>
              <p v-else>{{trmlDetail.installDate}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='联系人' prop='contactPerson'>
              <Input v-model.trim='trmlDetail.contactPerson' placeholder='请输入联系人名称' style='width: 200px'
                     v-if="showEditElement"/>
              <p v-else>{{trmlDetail.contactPerson}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='联系电话' prop='contactPhone'>
              <Input v-model.number='trmlDetail.contactPhone' placeholder='请输入联系人电话' style='width: 200px'
                     v-if="showEditElement"/>
              <p v-else>{{trmlDetail.contactPhone}}</p>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span='8'>
            <Form-item label='所在单位' prop='belongCoCode'>
              <Select v-model='trmlDetail.belongCoCode' placeholder='请选择所在单位名称' clearable style='width:200px'
                      v-if="showEditElement">
                <Option v-for='item in enterpriseList' :value='item.code' :key='item.code'>{{ item.name }}</Option>
              </Select>
              <p v-else>{{trmlDetail.belongCoName}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='所在省市区' prop='province'>
              <al-cascader v-model='pcd' data-type='name' level='2' style='width: 200px'
                           v-if="showEditElement"/>
              <p v-else>{{trmlDetail.province}}{{trmlDetail.city}}{{trmlDetail.area}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='安装位置' prop="installPosition">
              <Input v-model.trim='trmlDetail.installPosition' placeholder='请输入安装位置' style='width: 200px'
                     v-if="showEditElement"/>
              <p v-else>{{trmlDetail.installPosition}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='所属项目' prop='projectId'>
              <Select v-model='trmlDetail.projectId' placeholder='请选择所属项目' clearable style='width:200px'
                      v-if="showEditElement">
                <Option v-for='item in alarmClassesList' :value='item.uuid' :key='item.uuid'>{{ item.projectName }}
                </Option>
              </Select>
              <p v-else>{{trmlDetail.projectName}}</p>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span='16'>
            <Form-item label='终端简介' prop="abstract">
              <Input v-model.trim='trmlDetail.trmlAbstract' type='textarea' :autosize='{minRows: 2,maxRows: 5}'
                     placeholder='请输入终端简介' v-if="showEditElement"></Input>
              <p v-else>{{trmlDetail.trmlAbstract}}</p>
            </Form-item>
          </Col>
          <Col span='8'>
            <Form-item label='站点照片'>
              <Upload ref="upload" :action="uploadUrl" with-credentials
                      :headers="uploadHeader"
                      :show-upload-list="false" v-if="showEditElement"
                      :on-success="uploadSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="10240"
                      :on-format-error="uploadFormatError"
                      :on-exceeded-size="uploadExceededSize"
              >
                <Button>
                  <Icon type='ios-cloud-upload-outline'/>
                  请选择图片
                </Button>
              </Upload>
              <img v-if="trmlDetail.photoPath" :src="$config.host + trmlDetail.photoPath" alt="" width="40px"
                   @click="showImg">
            </Form-item>
          </Col>
        </Row>

        <div class='text-center' v-if="showEditElement">
          <Button type='primary' @click="submit()" size='large'>保存</Button>
        </div>
      </Form>
    </Card>

    <Modal v-model="showImgModal" width="800px">
      <p><img v-if="trmlDetail.photoPath" :src="$config.host + trmlDetail.photoPath" alt="" width="700px"></p>
    </Modal>
  </div>
</template>
<script>
  import {changeDateForm, assign} from '@/libs/tools'
  import config from '@/config'
  import {validatePhone} from '@/libs/validate'

  export default {
    name: 'page-detail',
    data () {
      return {
        id: 0, // Id值
        pageTypeEnum: config.pageTypeEnum,  // 页面类型枚举
        pageType: null,  // 页面类型
        showImgModal: false, // 页面类型
        trmlDetail: {
          trmlName: null,
          trmlTypeId: null,
          trmlTypeName: null,
          trmlStatus: null,
          projectId: null,
          projectName: null,
          belongCoCode: null,
          belongCoName: null,
          installDate: null,
          contactPerson: null,
          contactPhone: null,
          placeCoCode: null,
          placeCoName: null,
          province: null,
          city: null,
          area: null,
          installPosition: null,
          longitude: null,
          latitude: null,
          trmlAbstract: null,
          photoPath: null,
          trmlAccessConfigId: null
        }, // 页面类型
        pcd: [], // 页面类型
        ruleValidate: {
          trmlName: [
            {required: true, message: '终端名称不能为空', trigger: 'blur'},
            {max:200, message: '不能超过200', trigger: 'change'}
          ],
          trmlTypeId: [
            {required: true, type: 'string', message: '终端类型不能为空！', trigger: 'change'}
          ],
          placeCoCode: [
            {required: true, message: '所属单位不能为空', trigger: 'change'}
          ],
          installDate: [
            {required: true, type: 'date', message: '安装日期不能为空！', trigger: 'change'}
          ],
          contactPhone: [
            {validator: validatePhone, trigger: 'change'}
          ],
          belongCoCode: [
            {required: true, message: '所在单位不能为空！', trigger: 'change'}
          ],
          province: [
            {required: true, type: 'string', message: '所在地点不能为空！', trigger: 'change'}
          ],
          projectId: [
            {required: true, message: '所属项目不能为空！', trigger: 'change'}
          ],
          contactPerson: [
            {max:8, message: '不能超过8', trigger: 'change'}
          ],
          installPosition: [
            {max:200, message: '不能超过200', trigger: 'change'}
          ],
          abstract: [
            {max:200, message: '不能超过200', trigger: 'change'}
          ]
        }, // 表单验证规则
        trmlTypeList: [], // 终端类型列表
        enterpriseList: [], // 所在单位列表
        alarmClassesList: [], // 所属项目列表

        uploadUrl: null, // 上传的地址
        uploadHeader: config.uploadHeader, // 上传的头部

        optionDisable: {
          disabledDate (date) {
            return date.valueOf() > Date.now() // 过滤大于当前日期
          }
        } // 日期不可选
      }
    },
    created () {
      this.uploadUrl = this.$path.upload
    },
    computed:{
      showEditElement(){
        return this.pageType !== this.pageTypeEnum.detail
      }
    },
    watch: { // 监听pcd变化 来赋值
      pcd (val) {
        if (val.length) {
          this.trmlDetail.province = val[0]
          this.trmlDetail.city = val[1]
          this.trmlDetail.area = val[2]
        } else {
          this.trmlDetail.province = null
          this.trmlDetail.city = null
          this.trmlDetail.area = null
        }
      }
    },
    methods: {
      /**
       *@Description 控制点击图片放大的modal
       */
      showImg () {
        this.showImgModal = true
      },
      /**
       *@Description 文件格式验证失败时的钩子，返回字段为 file, fileList
       */
      uploadFormatError () {
        this.$Message.error('图片格式错误！')
      },
      /**
       *@Description 查询所有终端类型
       */
      uploadExceededSize () {
        this.$Message.error('图片大小超过10M！')
      },
      /**
       *@Description 文件上传成功时的钩子，返回字段为 response, file, fileList
       */
      uploadSuccess (data) {
        this.trmlDetail.photoPath = data.data
      },
      /**
       *@Description 保存按钮触发事件
       */
      submit () {
        this.$refs.trmlForm.validate((valid) => { // 判断验证是否成功
          if (valid) {  // 成功后才能执行函数
            this.trmlDetail.installDate = changeDateForm(this.trmlDetail.installDate)
            // 判断页面类型来选择执行函数
            if (this.pageType === this.pageTypeEnum.add) {
              this.addTrmlBase()
            } else if (this.pageType === this.pageTypeEnum.update) {
              this.updateTrmlBase()
            }
          } else {
            this.$Message.error('表单校验失败!')
          }
        })
      },
      /**
       *@Description 查询所有终端类型
       */
      getTrmlTypeList () {
        this.$http.fetchGet(this.$path.getTrmlAllType).then((data) => {
          if (data) {
            this.trmlTypeList = data.data
          }
        })
      },
      /**
       *@Description 查询企业信息
       */
      getEnterpriseList () {
        this.$http.fetchGet(this.$path.getEnterpriseList).then((data) => {
          if (data) {
            this.enterpriseList = data.data.list
          }
        })
      },
      /**
       *@Description 查询终端详情
       */
      getTrmlBaseDetail () {
        this.$http.fetchGet(`${this.$path.getTrmlBaseDetail}/${this.id}`).then((data) => {
          if (data) {
            this.trmlDetail = data.data

            let pcd = []  // 组成省市区名称数组 赋给area选择插件
            pcd.push(this.trmlDetail.province)
            pcd.push(this.trmlDetail.city)
            pcd.push(this.trmlDetail.area)
            this.pcd = pcd
          }
        })
      },
      /**
       *@Description  查询所有项目
       */
      getAlarmClassesList () {
        this.$http.fetchGet(this.$path.getAlarmClassesList).then((data) => {
          if (data) {
            this.alarmClassesList = data.data
          }
        })
      },
      /**
       *@Description  添加终端信息
       */
      addTrmlBase () {
        this.$http.fetchPostObj(this.$path.addTrmlBase, this.trmlDetail).then((data) => {
          if (data) {
            this.$Message.success('新增成功')
            this.$router.push({name: 'trml-list'}) // 成功后跳转回列表页
          } else {
            this.$Message.warning('新增失败')
          }
        })
      },
      /**
       *@Description  更新终端信息
       */
      updateTrmlBase () {
        this.$http.fetchPostObj(this.$path.updateTrmlBase, this.trmlDetail).then((data) => {
          if (data) {
            this.$Message.success('修改成功')
            this.$router.push({name: 'trml-list'}) // 成功后跳转回列表页
          } else {
            this.$Message.error('修改失败')
          }
        })
      },
      /**
       *@Description 返回上一页
       */
      goBack () {
        this.$router.back()
      }
    },
    beforeMount () {
      this.pageType = this.$route.query.pageType ? this.$route.query.pageType : this.pageTypeEnum.add // 获取页面类型
      this.id = this.$route.query.id ? this.$route.query.id : 0  // 获取id
    },
    mounted () {
      if (this.id) { // 有id的时候才获取详情
        this.getTrmlBaseDetail()
      }
      this.getTrmlTypeList()
      this.getEnterpriseList()
      this.getAlarmClassesList()
    }
  }
</script>

<style scoped>

</style>
