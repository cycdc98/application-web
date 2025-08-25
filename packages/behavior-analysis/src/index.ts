import "./interceptor";
import "./listener";
import { reportClientInfo } from "./tasks";

interface BehaviorAnalysisConfig {
  apId?: string;
}
class BehaviorAnalysis {
  config: BehaviorAnalysisConfig;
  constructor() {
    this.config = {};
  }
  init(config: BehaviorAnalysisConfig) {
    Object.assign(this.config, config);
    reportClientInfo();
  }
}

export default new BehaviorAnalysis();
