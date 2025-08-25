import { originalFetch } from "../native";
import { reportApiResponseTime, reportApiRequestErr } from "../tasks";

const fetchInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const startTime = performance.now();
  try {
    const response = await Reflect.apply(originalFetch, window, [input, init]);
    const endTime = performance.now();
    reportApiResponseTime({ input, startTime, endTime });
    if (response.status >= 400) {
      reportApiRequestErr({ input, errType: response.status });
    }
    return response;
  } catch (error) {
    reportApiRequestErr({ input, errType: (error as Error).name });
    throw error;
  }
};

window.fetch = fetchInterceptor;
