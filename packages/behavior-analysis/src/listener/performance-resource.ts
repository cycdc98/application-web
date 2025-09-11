import dayjs from "dayjs";
import { reportApiRequestErr, reportApiResponseTime } from "../tasks";

const resourceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const resourceEntry = entry as PerformanceResourceTiming;
    if (resourceEntry.initiatorType === "beacon") {
      return;
    }
    if (
      resourceEntry.initiatorType === "xmlhttprequest" ||
      resourceEntry.initiatorType === "fetch"
    ) {
      reportApiResponseTime({
        input: resourceEntry.name,
        duration: resourceEntry.duration,
        createTime: dayjs(
          performance.timeOrigin + resourceEntry.startTime
        ).format("YYYY-MM-DD HH:mm:ss"),
      });
      if (resourceEntry.responseStatus >= 400) {
        reportApiRequestErr({
          input: resourceEntry.name,
          errType: resourceEntry.responseStatus,
          createTime: dayjs(
            performance.timeOrigin + resourceEntry.startTime
          ).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      return;
    }
  });
});

window.addEventListener("load", () => {
  resourceObserver.observe({ entryTypes: ["resource"] });
});
