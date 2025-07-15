import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import "react";
import { Carousel } from "antd";
import { V as VideoPlayer } from "./VideoPlayer-uOeot7yT.js";
import { motion } from "framer-motion";
const contentStyle = {
  color: "#fff",
  textAlign: "center",
  height: "100%",
  width: "100%",
  position: "relative"
};
const videoContainerStyle = {
  position: "relative",
  paddingBottom: "56.25%",
  // 16:9 aspect ratio
  height: 0,
  overflow: "hidden"
};
const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
  padding: "2rem",
  color: "#fff",
  textAlign: "center"
};
const Slider = ({ slides, videos = [], link = true }) => {
  const settings = {
    autoplay: true,
    dots: true,
    effect: "fade",
    autoplaySpeed: 5e3,
    pauseOnHover: true,
    arrows: false,
    // Hide arrows on mobile
    beforeChange: (current, next) => {
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "hero-slider-container", children: [
    /* @__PURE__ */ jsxs(Carousel, { ...settings, id: "slider-component", children: [
      videos.map((slide, index) => /* @__PURE__ */ jsx("div", { className: "video-container", style: videoContainerStyle, children: /* @__PURE__ */ jsx(VideoPlayer, { url: slide.src }) }, index)),
      slides.map((slide, index) => {
        var _a;
        return /* @__PURE__ */ jsx("div", { style: contentStyle, children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 1 },
            animate: { scale: 1.1 },
            transition: { duration: 10, repeat: Infinity, repeatType: "reverse" },
            style: { height: "100%", overflow: "hidden" },
            children: /* @__PURE__ */ jsxs("a", { href: link ? slide == null ? void 0 : slide.url : "#", style: { display: "block", height: "100%" }, children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  style: { height: "100%", objectFit: "cover", width: "100%" },
                  src: typeof (slide == null ? void 0 : slide.image) === "string" ? (_a = slide == null ? void 0 : slide.image) == null ? void 0 : _a.replace("public", "/storage") : "",
                  alt: (slide == null ? void 0 : slide.title) || ""
                }
              ),
              /* @__PURE__ */ jsxs("div", { style: overlayStyle, children: [
                /* @__PURE__ */ jsx(
                  motion.h2,
                  {
                    initial: { y: 50, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    transition: { duration: 0.8, delay: 0.2 },
                    className: "text-2xl md:text-4xl font-bold mb-4",
                    children: slide == null ? void 0 : slide.title
                  }
                ),
                (slide == null ? void 0 : slide.subtitle) && /* @__PURE__ */ jsx(
                  motion.h3,
                  {
                    initial: { y: 50, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    transition: { duration: 0.8, delay: 0.4 },
                    className: "text-lg md:text-2xl mb-4",
                    children: slide == null ? void 0 : slide.subtitle
                  }
                ),
                (slide == null ? void 0 : slide.description) && /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    initial: { y: 50, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    transition: { duration: 0.8, delay: 0.6 },
                    className: "text-sm md:text-lg max-w-2xl px-4",
                    children: slide == null ? void 0 : slide.description
                  }
                )
              ] })
            ] })
          }
        ) }, index);
      })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .hero-slider-container .ant-carousel .ant-carousel-dots {
          bottom: 20px;
        }
        
        .hero-slider-container .ant-carousel .ant-carousel-dots li {
          margin: 0 4px;
        }
        
        .hero-slider-container .ant-carousel .ant-carousel-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .hero-slider-container .ant-carousel .ant-carousel-dots li.ant-carousel-dots-active button {
          background: #fff;
        }
        
        @media (max-width: 768px) {
          .hero-slider-container .ant-carousel .ant-carousel-dots {
            bottom: 15px;
          }
          
          .hero-slider-container .ant-carousel .ant-carousel-dots li button {
            width: 8px;
            height: 8px;
          }
        }
      ` })
  ] });
};
export {
  Slider as S
};
