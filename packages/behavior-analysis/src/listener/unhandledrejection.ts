import { reportPageErr } from "../tasks";

window.addEventListener("unhandledrejection", (ev) => {
  reportPageErr({
    message: ev.reason,
  });
});
