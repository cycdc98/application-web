import {
  originalHistoryPushState,
  originalHistoryReplaceState,
} from "../native";
import { reportPageView } from "../tasks";
import { startOb } from "../listener";
const historyPushStateInterceptor = (
  data: any,
  unused: string,
  url?: string | URL | null
) => {
  if (url) {
    reportPageView({ from: location.toString(), to: url.toString() });
    startOb({ url: url.toString()  })
  }
  return Reflect.apply(originalHistoryPushState, window.history, [
    data,
    unused,
    url,
  ]);
};

const historyReplaceStateInterceptor = (
  data: any,
  unused: string,
  url?: string | URL | null
) => {
  if (url) {
    reportPageView({ from: location.toString(), to: url.toString() });
    startOb({ url: url.toString()  })
  }
  return Reflect.apply(originalHistoryReplaceState, window.history, [
    data,
    unused,
    url,
  ]);
};

window.history.pushState = historyPushStateInterceptor;
window.history.replaceState = historyReplaceStateInterceptor;
