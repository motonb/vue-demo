// 接口地址
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const path = {
  // 登录
  logout: '/api/system/logout', // 退出登录
  login: '/login/password', // 登录

  // 用户管理
  getUserManagement: '/api/system/qry-user-list', // 获取用户管理列表数据

  // 告警项目管理
  getAlarmClassesList: '/api/system/qry-alarm-all', // 查询所有项目

  // 终端管理-终端列表
  getTrmlBaseList: '/api/trml/trml-base/qry-list', // 用于搜索查询终端列表
  getTrmlBaseDetail: '/api/trml/trml-base/qry-detail', // 查询终端详情
  getEnterpriseList: '/api/trml/enterprise/qry-list', // 查询企业信息-临时数据表
  addTrmlBase: '/api/trml/trml-base/add', // 添加终端信息
  deleteTrmlBase: '/api/trml/trml-base/delete', // 批量删除终端信息
  updateTrmlBase: '/api/trml/trml-base/update', // 修改终端信息
  upload: baseUrl + '/api/trml/trml-base/upload', // 文件上传

  //终端管理-监测要素
  addTrmlParam: '/api/trml/trml-param/add',//新增监测要素
  deleteTrmlParam: '/api/trml/trml-param/delete',//新增监测要素
  updateTrmlParam: '/api/trml/trml-param/update',//修改监测要素
  getTrmlParamList: '/api/trml/trml-param/qry-list',//查询监测要素列表

  // 系统管理-接入配置
  addAccessConfig: '/api/system/trml-access/add', // 新增接入配置
  deleteAccessConfig: '/api/system/trml-access/delete', // 删除接入配置
  updateAccessConfig: '/api/system/trml-access/update', // 修改接入配置
  getAccessConfigDetail: '/api/system/trml-access/qry-detail', // 获取某个接入配置详细信息
  getAccessConfigList: '/api/system/trml-access/qry-list', // 获取接入配置列表
  getAccessConfigExist: '/api/system/trml-access/qry-using', // 查询接入配置是否正在被使用
  getAccessConfigField: '/api/system/trml-access/qry-field',//查询接入配置字段

  // 系统管理-数据字典
  getTrmlTypeDetail: '/api/system/trml-type/qry-detail', // 查询终端类型详情
  getTrmlTypeList: '/api/system/trml-type/qry-list', // 获取终端类型列表
  addTrmlType: '/api/system/trml-type/add', // 添加终端类型
  deleteTrmlTypes: '/api/system/trml-type/delete', // 删除终端类型
  updateTrmlType: '/api/system/trml-type/update', // 更新终端类型
  validateTrmlType: '/api/system/trml-type/qry-using', // 校验终端类型
  getTrmlAllType: '/api/system/trml-type/qry-all',//查询所有终端类型

  //系统管理-数据字典-监测要素配置
  addTrmlParamConfig: '/api/trml-param-Config/add',//新增监测要素配置
  deleteTrmlParamConfig: '/api/trml-param-Config/delete',//删除监测要素配置
  getTrmlParamConfigAll: '/api/trml-param-Config/qry-all',//查询所有监测要素配置信息
  getTrmlParamConfigDetail: '/api/trml-param-Config/qry-detail',//监测要素配置详情查询
  getTrmlParamConfigField: '/api/trml-param-Config/qry-field',//监测要素配置字段查询
  updateTrmlConfigParam: '/api/trml-param-Config/update',//修改监测要素配置

  //系统管理-运维管理
  getMaintenanceStaffDetail: '/api/system/t-maintenance-staff/qry-detail', // 运维人员详情查询
  addMaintenanceStaff: '/api/system/t-maintenance-staff/add', // 运维人员新增
  deleteMaintenanceStaff: '/api/system/t-maintenance-staff/delete', // 运维人员删除
  updateMaintenanceStaff: '/api/system/t-maintenance-staff/update', // 运维人员修改
}
export default path
