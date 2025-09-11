import { reportPageErr } from "../tasks";

window.addEventListener("error", (ev) => {
  reportPageErr({
    message: ev.message,
  });
});
