import { ReportType } from "../constants";
import { report } from "../utils";

export const reportPageSourceLoadErr = ({
  tagName,
  src,
}: {
  tagName: string;
  src: string;
}) => {
  report({
    reportType: ReportType.PAGE_SOURCE_LOAD_ERR,
    eventInfo: {
      tagName,
      src,
    },
  });
};

export const reportPageErr = ({ message }: { message: string }) => {
  report({
    reportType: ReportType.PAGE_ERR,
    eventInfo: {
      message,
    },
  });
};

export const reportPageView = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  report({
    reportType: ReportType.PAGE_VIEW,
    eventInfo: {
      from,
      to,
    },
  });
};

export const reportPageLoadTime = ({
  time,
  url,
}: {
  time: number;
  url: string;
}) => {
  report({
    reportType: ReportType.PAGE_LOAD_TIME,
    eventInfo: {
      time,
      url,
    },
  });
};

export const reportHomeRenderTime = ({ time }: { time: number }) => {
  report({
    reportType: ReportType.HOME_RENDER_TIME,
    eventInfo: {
      time,
    },
  });
};
