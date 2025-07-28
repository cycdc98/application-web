import { originalHistoryPushState } from "../native";
import { reportHistoryPush } from "../tasks";

const historyPushStateInterceptor = (
  data: any,
  unused: string,
  url: string | URL | null
) => {
  reportHistoryPush();
  return Reflect.apply(originalHistoryPushState, window.history, [
    data,
    unused,
    url,
  ]);
};

window.history.pushState = historyPushStateInterceptor;
