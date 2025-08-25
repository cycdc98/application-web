import { ReportType } from "../constants";
import { originalXMLHttpRequest } from "../native";
import { reportApiRequestErr, reportApiResponseTime } from "../tasks";

const requestMap = new WeakMap<
  XMLHttpRequestInterceptor,
  {
    url: string | URL;
    method: string;
    startTime: number | null;
    endTime: number | null;
  }
>();

class XMLHttpRequestInterceptor extends originalXMLHttpRequest {
  open(method: string, url: string | URL): void;
  open(
    method: string,
    url: string | URL,
    async: boolean,
    username?: string | null,
    password?: string | null
  ): void;
  open(
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null
  ) {
    requestMap.set(this, { method, url, startTime: null, endTime: null });

    this.addEventListener("load", (ev) => {
      const data = requestMap.get(this);
      data!.endTime = performance.now();
      reportApiResponseTime({
        input: url,
        startTime: data!.startTime!,
        endTime: data!.endTime!,
      });
      if (this.status >= 400) {
        reportApiRequestErr({
          input: url.toString(),
          errType: this.status,
        });
      }
    });

    this.addEventListener("error", (ev) => {
      reportApiRequestErr({
        input: url.toString(),
        errType: ev.type,
      });
    });

    super.open(method, url, async ?? true, username, password);
  }

  send(body?: Document | XMLHttpRequestBodyInit | null): void;
  send(body?: Document | XMLHttpRequestBodyInit | null) {
    const data = requestMap.get(this);
    data!.startTime = performance.now();

    super.send(body);
  }
}

window.XMLHttpRequest = XMLHttpRequestInterceptor;
