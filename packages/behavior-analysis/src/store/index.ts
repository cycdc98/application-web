import { REPORT_URL } from "../constants";
/**
 * 项目信息
 */
export interface ProjectInfo {
  /**
   * 项目ID
   */
  apId?: string;
  /**
   * 用户ID
   */
  userId?: string;
}

export const projectInfoStore: ProjectInfo = {
  apId: undefined,
  userId: undefined,
};

/**
 * 配置信息
 */
export interface ProjectConfig {
  /**
   * 埋点上送地址
   */
  reportUrl: string;
}

export const projectConfigStore: ProjectConfig = { reportUrl: REPORT_URL };
