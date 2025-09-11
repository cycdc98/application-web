/**
 * 埋点类型
 */
export enum ReportType {
  /**
   * 用户环境信息
   */
  USER_ENVIRONMENT = "user_environment",
  /**
   * 首屏渲染时间
   */
  HOME_RENDER_TIME = "home_render_time",
  /**
   * 页面访问
   */
  PAGE_VIEW = "page_view",
  /**
   * 页面加载时间
   */
  PAGE_LOAD_TIME = "page_load_time",
  /**
   * 资源加载错误
   */
  PAGE_SOURCE_LOAD_ERR = "page_source_load_err",
  /**
   * 页面错误
   */
  PAGE_ERR = "page_err",
  /**
   * 接口响应时间
   */
  API_RESPONSE_TIME = "api_response_time",
  /**
   * 接口请求错误
   */
  API_REQUEST_ERR = "api_request_err",
}

/**
 * 埋点数据
 */
export interface ReportData {
  /**
   * 埋点类型
   */
  reportType: ReportType;
  /**
   * 埋点信息
   */
  eventInfo: {
    /**
     * 创建时间 YYYY-MM-DD HH:mm:ss
     */
    createTime?: string;
    [key: string]: string | number | undefined;
  };
}

/**
 * 埋点上报地址
 */
export const REPORT_URL = "/api/report";
