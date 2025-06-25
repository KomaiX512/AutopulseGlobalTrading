import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import "react";
import { Carousel } from "antd";
import ReactPlayer from "react-player";
function VideoPlayer({ url }) {
  return /* @__PURE__ */ jsx("div", { className: "player-wrapper", children: /* @__PURE__ */ jsx(
    ReactPlayer,
    {
      className: "react-player",
      controls: true,
      url,
      width: "100%",
      height: "100%"
    }
  ) });
}
const contentStyle = {
  color: "#fff",
  textAlign: "center",
  height: "100%",
  width: "100%"
};
const videoContainerStyle = {
  position: "relative",
  paddingBottom: "56.25%",
  // 16:9 aspect ratio (can adjust based on your needs)
  height: 0,
  overflow: "hidden"
};
const Slider = ({ slides, videos = [], link = true }) => {
  return /* @__PURE__ */ jsxs(Carousel, { autoplay: true, dots: false, id: "slider-component", children: [
    videos.map((slide, index) => /* @__PURE__ */ jsx("div", { className: "video-container", style: videoContainerStyle, children: /* @__PURE__ */ jsx(VideoPlayer, { url: slide.src }) }, index)),
    slides.map((slide, index) => {
      var _a;
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: link ? slide == null ? void 0 : slide.url : "#", children: /* @__PURE__ */ jsx("h3", { style: contentStyle, children: /* @__PURE__ */ jsx(
        "img",
        {
          style: { height: "auto", objectFit: "cover", width: "100%" },
          src: typeof (slide == null ? void 0 : slide.image) === "string" ? (_a = slide == null ? void 0 : slide.image) == null ? void 0 : _a.replace("public", "/storage") : "",
          alt: ""
        }
      ) }) }) }, index);
    })
  ] });
};
export {
  Slider as S
};
