import "./interceptor";
import "./listener";
import {
  type ProjectInfo,
  projectInfoStore,
  type ProjectConfig,
  projectConfigStore,
} from "./store";

interface BehaviorAnalysisConfig {
  /**
   * 项目信息
   */
  info?: ProjectInfo;
  config?: ProjectConfig;
}

class BehaviorAnalysis {
  config(configInfo: BehaviorAnalysisConfig) {
    Object.assign(projectInfoStore, configInfo.info);
    Object.assign(projectConfigStore, configInfo.config);
  }

  get configurationStatus() {
    return (
      typeof projectInfoStore.apId !== "undefined" &&
      typeof projectInfoStore.userId !== "undefined"
    );
  }
}

export default new BehaviorAnalysis();
