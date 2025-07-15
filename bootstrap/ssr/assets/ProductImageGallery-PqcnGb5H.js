import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useRef, useEffect } from "react";
import { Card, Table, Image } from "antd";
import Slider from "react-slick";
import "./AttachmentComponent-BnWqiux2.js";
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
      render: (text) => /* @__PURE__ */ jsx(
        "strong",
        {
          style: {
            color: "#2c3e50",
            fontSize: window.innerWidth <= 768 ? "14px" : "16px",
            lineHeight: "1.4"
          },
          children: text
        }
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"]
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      width: "60%",
      render: (text) => /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            color: "#555",
            fontSize: window.innerWidth <= 768 ? "14px" : "16px",
            lineHeight: "1.4",
            wordBreak: "break-word"
          },
          children: text
        }
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"]
    }
  ];
  if (specifications.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    Card,
    {
      title,
      className: "specifications-card",
      bodyStyle: { padding: window.innerWidth <= 768 ? "12px" : "24px" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "specifications-table-container", children: /* @__PURE__ */ jsx(
          Table,
          {
            columns,
            dataSource: specifications,
            pagination: false,
            size: window.innerWidth <= 768 ? "small" : "middle",
            bordered: true,
            className: "specifications-table",
            showHeader: false,
            scroll: { x: true }
          }
        ) }),
        /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .specifications-card {
                    margin-bottom: 20px;
                }
                
                .specifications-table-container {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
                
                .specifications-table .ant-table {
                    font-size: 14px;
                }
                
                .specifications-table .ant-table-tbody > tr > td {
                    padding: 12px 16px;
                    border-right: 1px solid #f0f0f0;
                    vertical-align: top;
                }
                
                .specifications-table .ant-table-tbody > tr:hover > td {
                    background-color: #f5f5f5;
                }
                
                @media (max-width: 768px) {
                    .specifications-card .ant-card-head {
                        padding: 12px 16px;
                        min-height: auto;
                    }
                    
                    .specifications-card .ant-card-head-title {
                        font-size: 16px;
                        font-weight: 600;
                    }
                    
                    .specifications-table .ant-table {
                        font-size: 13px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td {
                        padding: 8px 12px;
                        min-height: 44px;
                        display: table-cell;
                        vertical-align: middle;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:first-child {
                        background-color: #fafafa;
                        font-weight: 600;
                        width: 35%;
                        min-width: 120px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:last-child {
                        width: 65%;
                        word-wrap: break-word;
                        word-break: break-word;
                        hyphens: auto;
                    }
                }
                
                @media (max-width: 480px) {
                    .specifications-card {
                        margin: 0 -8px 16px -8px;
                        border-radius: 8px;
                    }
                    
                    .specifications-table .ant-table {
                        font-size: 12px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td {
                        padding: 6px 8px;
                        min-height: 40px;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:first-child {
                        width: 40%;
                        min-width: 100px;
                        font-size: 11px;
                        line-height: 1.3;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:last-child {
                        width: 60%;
                        font-size: 12px;
                        line-height: 1.4;
                    }
                }
                
                /* Accessibility improvements */
                @media (prefers-reduced-motion: reduce) {
                    .specifications-table .ant-table-tbody > tr:hover > td {
                        transition: none;
                    }
                }
                
                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .specifications-table .ant-table-tbody > tr > td {
                        border-color: #000;
                    }
                    
                    .specifications-table .ant-table-tbody > tr > td:first-child {
                        background-color: #f0f0f0;
                    }
                }
            ` })
      ]
    }
  );
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
  const [imageErrors, setImageErrors] = useState(/* @__PURE__ */ new Set());
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);
  const processedImages = images && images.length > 0 ? images.map((img) => {
    var _a;
    const imageSrc = ((_a = (img == null ? void 0 : img.path) || (img == null ? void 0 : img.image_path)) == null ? void 0 : _a.replace("public", "/storage")) || fallbackImage;
    return {
      ...img,
      src: imageSrc,
      alt: (img == null ? void 0 : img.alt) || "Product Image",
      originalSrc: imageSrc
      // Keep original for debugging
    };
  }) : [{ src: fallbackImage, alt: "Default Product Image", originalSrc: fallbackImage }];
  const validImages = processedImages.filter((img, index) => {
    if (imageErrors.has(index)) {
      console.warn(`Image failed to load: ${img.originalSrc}`);
      return false;
    }
    return true;
  });
  const finalImages = validImages.length > 0 ? validImages : [{
    src: fallbackImage,
    alt: "Default Product Image",
    originalSrc: fallbackImage
  }];
  const handleImageError = (index) => {
    setImageErrors((prev) => /* @__PURE__ */ new Set([...prev, index]));
  };
  const mainSliderSettings = {
    asNavFor: nav2,
    ref: sliderRef1,
    fade: true,
    arrows: true,
    dots: false,
    infinite: finalImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  const thumbnailSettings = {
    asNavFor: nav1,
    ref: sliderRef2,
    slidesToShow: Math.min(thumbnailCount, finalImages.length),
    slidesToScroll: 1,
    arrows: finalImages.length > thumbnailCount,
    dots: false,
    infinite: finalImages.length > thumbnailCount,
    focusOnSelect: true,
    vertical: false,
    centerMode: finalImages.length > thumbnailCount,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, finalImages.length),
          vertical: false,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, finalImages.length),
          vertical: false,
          arrows: false
        }
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "product-image-gallery", children: [
    process.env.NODE_ENV === "development" && /* @__PURE__ */ jsxs("div", { style: {
      background: "#f0f0f0",
      padding: "10px",
      margin: "10px 0",
      fontSize: "12px",
      borderRadius: "4px"
    }, children: [
      /* @__PURE__ */ jsx("strong", { children: "Debug Info:" }),
      /* @__PURE__ */ jsx("br", {}),
      "Total images: ",
      (images == null ? void 0 : images.length) || 0,
      /* @__PURE__ */ jsx("br", {}),
      "Valid images: ",
      finalImages.length,
      /* @__PURE__ */ jsx("br", {}),
      "Failed images: ",
      imageErrors.size,
      /* @__PURE__ */ jsx("br", {}),
      images == null ? void 0 : images.map((img, idx) => {
        var _a;
        return /* @__PURE__ */ jsxs("div", { children: [
          "Image ",
          idx + 1,
          ": ",
          (_a = (img == null ? void 0 : img.path) || (img == null ? void 0 : img.image_path)) == null ? void 0 : _a.replace("public", "/storage"),
          imageErrors.has(idx) ? " ❌" : " ✅"
        ] }, idx);
      })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "main-image-container", children: /* @__PURE__ */ jsx(Image.PreviewGroup, { children: /* @__PURE__ */ jsx(Slider, { ...mainSliderSettings, children: finalImages.map((image, index) => /* @__PURE__ */ jsx("div", { className: "main-image-slide", children: /* @__PURE__ */ jsx(
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
        }, children: "Loading..." }),
        onError: () => handleImageError(index),
        fallback: fallbackImage
      }
    ) }, index)) }) }) }),
    showThumbnails && finalImages.length > 1 && /* @__PURE__ */ jsx("div", { className: "thumbnail-container", children: /* @__PURE__ */ jsx(Slider, { ...thumbnailSettings, children: finalImages.map((image, index) => /* @__PURE__ */ jsx("div", { className: "thumbnail-slide", children: /* @__PURE__ */ jsx(
      Image,
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
        },
        onError: () => handleImageError(index),
        fallback: fallbackImage,
        preview: false
      }
    ) }, index)) }) })
  ] });
};
export {
  ProductImageGallery as P,
  ProductSpecificationTable as a
};
