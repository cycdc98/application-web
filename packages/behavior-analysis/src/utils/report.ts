import { originalFetch } from "../native";
import { reportURL } from "../constants";
import { type ReportType } from "../constants";

export function report(data: { reportType: ReportType; [key: string]: any }) {
  originalFetch(reportURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
