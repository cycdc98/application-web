import platform from "platform";
import reporter from "../reporter";
import { ReportType } from "../constants";

const reportClientInfo = () => {
  reporter.report({
    reportType: ReportType.USER_ENVIRONMENT,
    eventInfo: {
      osFamily: String(platform.os?.family),
      osVersion: String(platform.os?.version),
      osArchitecture: String(platform.os?.architecture),
      browserName: String(platform.name),
      browserVersion: String(platform.version),
    },
  });
};

reportClientInfo();
