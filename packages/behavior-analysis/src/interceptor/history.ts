import {
  originalHistoryPushState,
  originalHistoryReplaceState,
} from "../native";
import { reportPageView } from "../tasks";

const historyPushStateInterceptor = (
  data: any,
  unused: string,
  url?: string | URL | null
) => {
  reportPageView({ from: location.toString(), to: url?.toString() });
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
  reportPageView({ from: location.toString(), to: url?.toString() });
  return Reflect.apply(originalHistoryReplaceState, window.history, [
    data,
    unused,
    url,
  ]);
};

window.history.pushState = historyPushStateInterceptor;
window.history.replaceState = historyReplaceStateInterceptor;
