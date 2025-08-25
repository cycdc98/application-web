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
  from?: string;
  to?: string;
}) => {
  report({
    reportType: ReportType.PAGE_VIEW,
    eventInfo: {
      from,
      to,
    },
  });
};
