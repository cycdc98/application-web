import { originalFetch } from "../native";
import { reportURL } from "../constants";

export function report(data: any) {
  originalFetch(reportURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
