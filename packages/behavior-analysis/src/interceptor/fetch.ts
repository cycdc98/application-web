import { originalFetch } from "../native";
import { reportApiResponseTime } from "../tasks";

const fetchInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const startTime = performance.now();
  try {
    const response = await Reflect.apply(originalFetch, window, [input, init]);
    const endTime = performance.now();
    reportApiResponseTime({ input, startTime, endTime });
    return response;
  } catch (error) {
    throw error;
  }
};

window.fetch = fetchInterceptor;
