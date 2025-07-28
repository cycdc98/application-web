import platform from "platform";
import { report } from "../utils";
import { ReportType } from "../constants";

export const reportClientInfo = () => {
  report({
    reportType: ReportType.USER_PLATFORM,
    eventInfo: {
      osFamily: String(platform.os?.family),
      osVersion: String(platform.os?.version),
      osArchitecture: String(platform.os?.architecture),
      browserName: String(platform.name),
      browserVersion: String(platform.version),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    },
  });
};
