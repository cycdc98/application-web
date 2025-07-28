import { originalFetch } from "../native";
import { reportApiResponseTime, reportApiRequestErr } from "../tasks";

const fetchInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const startTime = performance.now();
  try {
    const response = await Reflect.apply(originalFetch, window, [input, init]);
    if (!response.ok) {
      reportApiRequestErr({ input, err: new Error(response.statusText) });
    } else {
      const endTime = performance.now();
      reportApiResponseTime({ input, startTime, endTime });
    }
    return response;
  } catch (error) {
    reportApiRequestErr({ input, err: error });
    throw error;
  }
};

window.fetch = fetchInterceptor;
