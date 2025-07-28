import { report } from "../utils";
import { ReportType } from "../constants";

export const reportHistoryPush = () => {
  report({
    reportType: ReportType.HISTORY_PUSH,
    eventInfo: {},
  });
};
