import { debounce } from "lodash-es";
import { reportPageLoadTime } from "../tasks";

const lcpOb: { url?: string; startTime: number } = {
  url: undefined,
  startTime: 0,
};

const reportLcp = debounce((endTime: number) => {
  if (lcpOb.url) {
    reportPageLoadTime({
      time: endTime - lcpOb.startTime,
      url: lcpOb.url,
    });
    lcpOb.url = undefined;
  }
}, 200);

const lcpObserver = new MutationObserver(() => {
  reportLcp(performance.now());
});

window.addEventListener("load", () => {
  lcpObserver.observe(window.document.body, { subtree: true, childList: true });
});

export const startMutationOb = ({ url }: { url: string }) => {
  lcpOb.url = url;
  lcpOb.startTime = performance.now();
};
