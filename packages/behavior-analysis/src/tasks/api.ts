import { report } from "../utils";
import { ReportType } from "../constants";

export const reportApiResponseTime = ({
  input,
  startTime,
  endTime,
}: {
  input: RequestInfo | URL;
  startTime: number;
  endTime: number;
}) => {
  report({
    reportType: ReportType.API_RESPONSE_TIME,
    eventInfo: {
      apiName: input.toString(),
      responseTime: endTime - startTime,
    },
  });
};

export const reportApiRequestErr = ({
  input,
  err,
}: {
  input: RequestInfo | URL;
  err: unknown;
}) => {
  report({
    reportType: ReportType.API_REQUEST_ERR,
    eventInfo: {
      apiName: input.toString(),
      errMsg: typeof err === "string" ? err : JSON.stringify(err),
    },
  });
};
