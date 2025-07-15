import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import React, { useContext, useEffect } from "react";
import { a as HomeContext, A as AttachmentComponent } from "./AttachmentComponent-BnWqiux2.js";
import { Flex, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
function RelatedAttachments({ header = true }) {
  var _a;
  const context = useContext(HomeContext);
  const { state, dispatch, methods } = context;
  const sliderRef = React.useRef(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  useEffect(() => {
    var _a2;
    if ((_a2 = state == null ? void 0 : state.selectedAttachment) == null ? void 0 : _a2.slug) {
      methods.loadRelatedAttachments(state.selectedAttachment.slug);
    }
  }, [state == null ? void 0 : state.selectedAttachment]);
  return /* @__PURE__ */ jsxs("div", { className: "latest-products container p-3 bg-white mt-3", style: { padding: "30px 12px" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 py-2 pb-4 flex align-center justify-between px-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-secondary text-lg font-semibold", children: "Related Attachments" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary btn-home-primary", children: "View All" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-0", style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs(Flex, { align: "center", style: { position: "absolute", right: "0", top: "-40px" }, justify: "end", gap: 10, className: "flex  justify-between mb-2 mr-auto", children: [
        /* @__PURE__ */ jsx(Button, { onClick: () => sliderRef.current.slickPrev(), icon: /* @__PURE__ */ jsx(LeftOutlined, {}) }),
        /* @__PURE__ */ jsx(Button, { onClick: () => sliderRef.current.slickNext(), icon: /* @__PURE__ */ jsx(RightOutlined, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " pr-0", style: { paddingRight: "0px !important" }, children: /* @__PURE__ */ jsx(Slider, { ref: sliderRef, ...settings, children: (_a = state == null ? void 0 : state.relatedAttachments) == null ? void 0 : _a.map((attachment, index) => /* @__PURE__ */ jsx(AttachmentComponent, { attachment, index }, attachment.id)) }) })
    ] })
  ] });
}
export {
  RelatedAttachments as R
};
