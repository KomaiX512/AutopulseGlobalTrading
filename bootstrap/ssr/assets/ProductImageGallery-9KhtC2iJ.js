import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useRef, useEffect } from "react";
import { Card, Table, Image } from "antd";
import Slider from "react-slick";
import "./AttachmentComponent-CRE5apCQ.js";
const ProductSpecificationTable = ({
  product,
  title = "Specifications",
  customFields = [],
  showDefaults = true
}) => {
  var _a, _b;
  const defaultSpecifications = [
    {
      key: "model",
      parameter: "Model",
      details: (product == null ? void 0 : product.model) || null,
      condition: () => product == null ? void 0 : product.model
    },
    {
      key: "condition",
      parameter: "Condition",
      details: "Used, Excellent",
      condition: () => true
      // Always show condition
    },
    {
      key: "year",
      parameter: "Year",
      details: (product == null ? void 0 : product.make) || null,
      condition: () => product == null ? void 0 : product.make
    },
    {
      key: "weight",
      parameter: "Operating Weight",
      details: (product == null ? void 0 : product.weight) ? `${product.weight} kg` : null,
      condition: () => product == null ? void 0 : product.weight
    },
    {
      key: "category",
      parameter: "Category",
      details: ((_a = product == null ? void 0 : product.category) == null ? void 0 : _a.name) || null,
      condition: () => {
        var _a2;
        return (_a2 = product == null ? void 0 : product.category) == null ? void 0 : _a2.name;
      }
    },
    {
      key: "brand",
      parameter: "Brand",
      details: ((_b = product == null ? void 0 : product.brand) == null ? void 0 : _b.name) || null,
      condition: () => {
        var _a2;
        return (_a2 = product == null ? void 0 : product.brand) == null ? void 0 : _a2.name;
      }
    },
    {
      key: "price",
      parameter: "Price",
      details: (product == null ? void 0 : product.price) ? `$${product.price}` : null,
      condition: () => product == null ? void 0 : product.price
    },
    {
      key: "location",
      parameter: "Location",
      details: "China",
      condition: () => true
      // Always show location
    },
    {
      key: "availability",
      parameter: "Availability",
      details: (product == null ? void 0 : product.stock) > 0 ? "In Stock / Ready to Ship" : "Out of Stock",
      condition: () => true
      // Always show availability
    }
  ];
  const allFields = showDefaults ? [...defaultSpecifications, ...customFields] : customFields;
  const specifications = allFields.filter((spec) => spec.condition && spec.condition() && spec.details !== null).map((spec, index) => ({
    ...spec,
    key: spec.key || `spec-${index}`
  }));
  const columns = [
    {
      title: "Parameter",
      dataIndex: "parameter",
      key: "parameter",
      width: "40%",
      render: (text) => /* @__PURE__ */ jsx("strong", { style: { color: "#2c3e50" }, children: text })
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      width: "60%",
      render: (text) => /* @__PURE__ */ jsx("span", { style: { color: "#555" }, children: text })
    }
  ];
  if (specifications.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Card, { title, className: "specifications-card", children: /* @__PURE__ */ jsx(
    Table,
    {
      columns,
      dataSource: specifications,
      pagination: false,
      size: "middle",
      bordered: true,
      className: "specifications-table",
      showHeader: false
    }
  ) });
};
const ProductImageGallery = ({
  images = [],
  fallbackImage = "/storage/images/default-product.jpg",
  height = "400px",
  showThumbnails = true,
  thumbnailCount = 4
}) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);
  const processedImages = images && images.length > 0 ? images.map((img) => {
    var _a;
    return {
      ...img,
      src: ((_a = img == null ? void 0 : img.image_path) == null ? void 0 : _a.replace("public", "/storage")) || fallbackImage,
      alt: (img == null ? void 0 : img.alt) || "Product Image"
    };
  }) : [{ src: fallbackImage, alt: "Default Product Image" }];
  const mainSliderSettings = {
    asNavFor: nav2,
    ref: sliderRef1,
    fade: true,
    arrows: true,
    dots: false,
    infinite: processedImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  const thumbnailSettings = {
    asNavFor: nav1,
    ref: sliderRef2,
    slidesToShow: Math.min(thumbnailCount, processedImages.length),
    slidesToScroll: 1,
    arrows: processedImages.length > thumbnailCount,
    dots: false,
    infinite: processedImages.length > thumbnailCount,
    focusOnSelect: true,
    vertical: false,
    centerMode: processedImages.length > thumbnailCount,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, processedImages.length),
          vertical: false,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, processedImages.length),
          vertical: false,
          arrows: false
        }
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "product-image-gallery", children: [
    /* @__PURE__ */ jsx("div", { className: "main-image-container", children: /* @__PURE__ */ jsx(Image.PreviewGroup, { children: /* @__PURE__ */ jsx(Slider, { ...mainSliderSettings, children: processedImages.map((image, index) => /* @__PURE__ */ jsx("div", { className: "main-image-slide", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: image.src,
        alt: image.alt,
        className: "main-product-image",
        style: {
          width: "100%",
          height,
          objectFit: "cover",
          borderRadius: "8px"
        },
        placeholder: /* @__PURE__ */ jsx("div", { style: {
          width: "100%",
          height,
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px"
        }, children: "Loading..." })
      }
    ) }, index)) }) }) }),
    showThumbnails && processedImages.length > 1 && /* @__PURE__ */ jsx("div", { className: "thumbnail-container", children: /* @__PURE__ */ jsx(Slider, { ...thumbnailSettings, children: processedImages.map((image, index) => /* @__PURE__ */ jsx("div", { className: "thumbnail-slide", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: image.src,
        alt: `Thumbnail ${index + 1}`,
        className: "thumbnail-image",
        style: {
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "4px",
          cursor: "pointer",
          border: "2px solid transparent",
          margin: "0 5px",
          transition: "all 0.3s ease"
        }
      }
    ) }, index)) }) })
  ] });
};
export {
  ProductImageGallery as P,
  ProductSpecificationTable as a
};
