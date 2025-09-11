import {
  originalHistoryPushState,
  originalHistoryReplaceState,
} from "../native";
import { reportPageView } from "../tasks";
import { startMutationOb } from "../listener";
const historyPushStateInterceptor = (
  data: any,
  unused: string,
  url?: string | URL | null
) => {
  if (url) {
    reportPageView({ to: url.toString() });
    startMutationOb({ url: url.toString()  })
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
    reportPageView({ to: url.toString() });
    startMutationOb({ url: url.toString()  })
  }
  return Reflect.apply(originalHistoryReplaceState, window.history, [
    data,
    unused,
    url,
  ]);
};

window.history.pushState = historyPushStateInterceptor;
window.history.replaceState = historyReplaceStateInterceptor;
