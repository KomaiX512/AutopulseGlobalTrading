import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useContext, useEffect } from "react";
import { H as HomeContextProvider, a as HomeContext } from "./AttachmentComponent-CRE5apCQ.js";
import { Parser } from "html-to-react";
import { R as RelatedAttachments } from "./RelatedAttachments-DNayKOjA.js";
import { MdWhatsapp } from "react-icons/md";
import { Row, Col, Divider, Card } from "antd";
import { P as ProductImageGallery, a as ProductSpecificationTable } from "./ProductImageGallery-9KhtC2iJ.js";
import "react/jsx-runtime";
import "react-icons/gr";
import "react-icons/ri";
import "./helpers-isL4n3oi.js";
import "axios";
import "react-hot-toast";
import "react-icons/fa";
import "@ant-design/icons";
import "react-slick";
const AttachmentProductContent = ({ auth }) => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(HomeContext);
  const { state, methods } = context;
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const slug = location.pathname.split("/").pop();
        await methods.getAttachmentDetails(slug);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);
  async function fetchReviews() {
    var _a;
    if ((_a = state == null ? void 0 : state.selectedAttachment) == null ? void 0 : _a.id) {
      let reviews = await methods.loadReviews(state.selectedAttachment.id);
      if (reviews) {
        setReviewData(reviews);
      }
    }
  }
  useEffect(() => {
    fetchReviews();
  }, [state.selectedAttachment]);
  const attachment = state == null ? void 0 : state.selectedAttachment;
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "loading-container", children: "Loading..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
      "Error: ",
      error
    ] });
  }
  if (!attachment) {
    return /* @__PURE__ */ jsx("div", { className: "error-container", children: "Attachment not found" });
  }
  const getAttachmentSpecifications = (attachment2) => {
    return [
      {
        key: "attachment_type",
        parameter: "Attachment Type",
        details: (attachment2 == null ? void 0 : attachment2.type) || "Standard",
        condition: () => attachment2 == null ? void 0 : attachment2.type
      },
      {
        key: "compatibility",
        parameter: "Compatibility",
        details: (attachment2 == null ? void 0 : attachment2.compatibility) || "Universal Fit",
        condition: () => true
      },
      {
        key: "material",
        parameter: "Material",
        details: (attachment2 == null ? void 0 : attachment2.material) || "High-Grade Steel",
        condition: () => true
      },
      {
        key: "working_pressure",
        parameter: "Working Pressure",
        details: (attachment2 == null ? void 0 : attachment2.working_pressure) ? `${attachment2.working_pressure} bar` : null,
        condition: () => attachment2 == null ? void 0 : attachment2.working_pressure
      },
      {
        key: "flow_rate",
        parameter: "Flow Rate",
        details: (attachment2 == null ? void 0 : attachment2.flow_rate) ? `${attachment2.flow_rate} L/min` : null,
        condition: () => attachment2 == null ? void 0 : attachment2.flow_rate
      }
    ];
  };
  const customSpecs = getAttachmentSpecifications(attachment);
  return /* @__PURE__ */ jsx("div", { className: "product-page-container", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-6", children: [
    /* @__PURE__ */ jsx("div", { className: "product-title-section mb-6", children: /* @__PURE__ */ jsx("h1", { className: "product-main-title", children: attachment == null ? void 0 : attachment.name }) }),
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], children: [
      /* @__PURE__ */ jsx(Col, { xs: 24, lg: 12, children: /* @__PURE__ */ jsx(
        ProductImageGallery,
        {
          images: attachment == null ? void 0 : attachment.images,
          height: "400px",
          showThumbnails: true,
          thumbnailCount: 4
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, lg: 12, children: /* @__PURE__ */ jsxs("div", { className: "product-info-section", children: [
        /* @__PURE__ */ jsx(
          ProductSpecificationTable,
          {
            product: attachment,
            title: "Attachment Specifications",
            customFields: customSpecs
          }
        ),
        /* @__PURE__ */ jsx(Divider, {}),
        (attachment == null ? void 0 : attachment.features) && /* @__PURE__ */ jsx(Card, { title: "Key Features", className: "features-card mb-4", children: /* @__PURE__ */ jsx("div", { className: "product-features", children: Parser().parse(attachment.features) }) }),
        /* @__PURE__ */ jsx("div", { className: "action-buttons", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://wa.me/13072950382?text=${encodeURIComponent("Hey, I'm interested in " + (attachment == null ? void 0 : attachment.name))}`,
            className: "whatsapp-button",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
              /* @__PURE__ */ jsx(MdWhatsapp, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "Chat to Buy" })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Divider, { className: "section-divider" }),
    /* @__PURE__ */ jsx("div", { className: "product-description-section", children: /* @__PURE__ */ jsx(Card, { title: "Attachment Description", className: "description-card", children: /* @__PURE__ */ jsx("div", { className: "product-description", children: (attachment == null ? void 0 : attachment.description) ? Parser().parse(attachment.description) : /* @__PURE__ */ jsx("p", { children: "No description available for this attachment." }) }) }) }),
    /* @__PURE__ */ jsx(Divider, { className: "section-divider" }),
    /* @__PURE__ */ jsx(RelatedAttachments, {})
  ] }) });
};
const AttachmentProduct = ({ auth }) => {
  return /* @__PURE__ */ jsx(HomeContextProvider, { auth, children: /* @__PURE__ */ jsx(AttachmentProductContent, { auth }) });
};
export {
  AttachmentProduct as default
};
