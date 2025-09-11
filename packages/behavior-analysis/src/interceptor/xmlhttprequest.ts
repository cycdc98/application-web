import dayjs from "dayjs";
import { originalXMLHttpRequest } from "../native";
import { reportApiRequestErr } from "../tasks";

const requestMap = new WeakMap<
  XMLHttpRequestInterceptor,
  {
    startTime: string | null;
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
    requestMap.set(this, { startTime: null });

    this.addEventListener("error", (ev) => {
      const data = requestMap.get(this);
      reportApiRequestErr({
        createTime: data!.startTime!,
        input: url.toString(),
        errType: ev.type,
      });
    });

    super.open(method, url, async ?? true, username, password);
  }

  send(body?: Document | XMLHttpRequestBodyInit | null): void;
  send(body?: Document | XMLHttpRequestBodyInit | null) {
    const data = requestMap.get(this);
    data!.startTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    super.send(body);
  }
}

window.XMLHttpRequest = XMLHttpRequestInterceptor;
