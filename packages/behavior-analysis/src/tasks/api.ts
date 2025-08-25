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
  errType,
}: {
  input: RequestInfo | URL;
  errType: number | string;
}) => {
  report({
    reportType: ReportType.API_REQUEST_ERR,
    eventInfo: {
      apiName: input.toString(),
      errType,
    },
  });
};
