import { originalFetch } from "../native";
import { reportURL } from "../constants";
import { type ReportType } from "../constants";
import behaviorAnalysisInstance from "../index";

export function report(data: {
  reportType: ReportType;
  eventInfo: { [key: string]: string | number | undefined };
}) {
  behaviorAnalysisInstance.config.apId &&
    originalFetch(reportURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
}
