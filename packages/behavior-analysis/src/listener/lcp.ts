import { onLCP } from "web-vitals";
import { reportHomeRenderTime } from "../tasks/page";

onLCP((metric) => {
  reportHomeRenderTime({ time: metric.value });
});
