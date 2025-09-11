import { ReportType } from "../constants";
import reporter from "../reporter";

export const reportPageSourceLoadErr = ({
  tagName,
  src,
}: {
  tagName: string;
  src: string;
}) => {
  reporter.report({
    reportType: ReportType.PAGE_SOURCE_LOAD_ERR,
    eventInfo: {
      tagName,
      src,
    },
  });
};

export const reportPageErr = ({ message }: { message: string }) => {
  reporter.report({
    reportType: ReportType.PAGE_ERR,
    eventInfo: {
      message,
    },
  });
};

export const reportPageView = ({ to }: { to: string }) => {
  reporter.report({
    reportType: ReportType.PAGE_VIEW,
    eventInfo: {
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
  reporter.report({
    reportType: ReportType.PAGE_LOAD_TIME,
    eventInfo: {
      time,
      url,
    },
  });
};

export const reportHomeRenderTime = ({ time }: { time: number }) => {
  reporter.report({
    reportType: ReportType.HOME_RENDER_TIME,
    eventInfo: {
      time,
    },
  });
};
