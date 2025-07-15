import { j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import "react";
import ReactPlayer from "react-player";
function VideoPlayer({ url }) {
  return /* @__PURE__ */ jsx("div", { className: "player-wrapper", children: /* @__PURE__ */ jsx(
    ReactPlayer,
    {
      className: "react-player",
      controls: true,
      playing: true,
      muted: true,
      url,
      width: "100%",
      height: "100%"
    }
  ) });
}
export {
  VideoPlayer as V
};
