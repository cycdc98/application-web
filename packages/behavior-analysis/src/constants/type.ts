export enum ReportType {
  /**
   * 用户环境信息
   */
  USER_ENVIRONMENT,
  /**
   * 首屏渲染时间
   */
  HOME_RENDER_TIME,
  /**
   * 页面访问
   */
  PAGE_VIEW,
  /**
   * 页面加载时间
   */
  PAGE_LOAD_TIME,
  /**
   * 资源加载错误
   */
  PAGE_SOURCE_LOAD_ERR,
  /**
   * 页面错误
   */
  PAGE_ERR,
  /**
   * 接口响应时间
   */
  API_RESPONSE_TIME,
  /**
   * 接口请求错误
   */
  API_REQUEST_ERR,
}
