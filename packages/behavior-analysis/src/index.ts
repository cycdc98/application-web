import { ReportType } from "./constants";
import "./interceptor";
import { reportClientInfo } from "./tasks";
import { report } from "./utils";

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
  track(eventInfo: { [key: string]: string | number }) {
    report({
      reportType: ReportType.CUSTOME,
      eventInfo,
    });
  }
}

export default new BehaviorAnalysis();
