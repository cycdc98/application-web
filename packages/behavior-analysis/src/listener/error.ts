import { reportPageErr, reportPageSourceLoadErr } from "../tasks";

window.addEventListener("error", (ev) => {
  if (ev.target instanceof Element) {
    reportPageSourceLoadErr({
      tagName: ev.target.tagName,
      src:
        ev.target instanceof HTMLImageElement ||
        ev.target instanceof HTMLScriptElement ||
        ev.target instanceof HTMLIFrameElement ||
        ev.target instanceof HTMLAudioElement ||
        ev.target instanceof HTMLVideoElement ||
        ev.target instanceof HTMLTrackElement ||
        ev.target instanceof HTMLSourceElement
          ? ev.target.src
          : ev.target instanceof HTMLLinkElement ||
            ev.target instanceof HTMLAnchorElement
          ? ev.target.href
          : ev.target instanceof HTMLObjectElement
          ? ev.target.data
          : "unknow",
    });
  } else {
    reportPageErr({
      message: ev.message,
    });
  }
});
