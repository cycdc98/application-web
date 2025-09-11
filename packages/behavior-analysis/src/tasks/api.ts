import reporter from "../reporter";
import { ReportType } from "../constants";

export const reportApiResponseTime = ({
  input,
  duration,
  createTime,
}: {
  input: RequestInfo | URL;
  duration: number;
  createTime: string;
}) => {
  reporter.report({
    reportType: ReportType.API_RESPONSE_TIME,
    eventInfo: {
      createTime,
      apiName: input.toString(),
      responseTime: duration,
    },
  });
};

export const reportApiRequestErr = ({
  input,
  errType,
  createTime,
}: {
  input: RequestInfo | URL;
  errType: number | string;
  createTime: string;
}) => {
  reporter.report({
    reportType: ReportType.API_REQUEST_ERR,
    eventInfo: {
      createTime,
      apiName: input.toString(),
      errType,
    },
  });
};
