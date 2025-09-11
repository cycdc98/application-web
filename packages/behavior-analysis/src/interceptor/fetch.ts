import dayjs from "dayjs";
import { originalFetch } from "../native";
import { reportApiResponseTime, reportApiRequestErr } from "../tasks";

const fetchInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const startTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  try {
    const response = await Reflect.apply(originalFetch, window, [input, init]);
    return response;
  } catch (error) {
    reportApiRequestErr({
      createTime: startTime,
      input,
      errType: (error as Error).name,
    });
    throw error;
  }
};

window.fetch = fetchInterceptor;
