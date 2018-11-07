
export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    pro: 'https://produce.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  /**
   * @description 操作类型枚举
   */
  actionType: {
    add: 'add', // add新增
    detail: 'detail', // detail详情
    update: 'update', // update更新修改
    set: 'set', // set设置
    deal: 'deal'// deal处理
  },
  /**
   * @description 列表页的默认每页条数和初始页
   */
  pageSize: 10,
  pageIndex: 1,
  /**
   * @description 上传组件的请求头和请求地址
   */
  uploadHeader: {
    'asoco-token': localStorage.getItem('asoco-token')
  },
  /**
   * @description 百度地图秘钥
   */
  BAI_DU_AK: 'zxaE2esdhpAdLNU8KLyTqitkPutG75bY'
}
