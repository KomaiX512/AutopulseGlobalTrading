import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useContext, useEffect } from "react";
import { H as HomeLayout, T as Track, A as AboutPage, C as ContactPage, a as AllProducts, b as AllAttachments, c as AttachmentProductType, d as App, P as ProductType, S as SingleBlog, e as AllBlogs, f as PrivacyPolicy } from "./main-CxuOxKVi.js";
import Login from "./Login-DwsyLap7.js";
import { a as HomeContext, H as HomeContextProvider } from "./AttachmentComponent-BnWqiux2.js";
import { useParams, BrowserRouter, Routes, Route } from "react-router-dom";
import { S as SolutionsByProject, P as ProductComponent, H as HomePage, O as OrderSuccess } from "./OrderSuccess-Dpnj_0G2.js";
import Register from "./Register-DuQZAZXo.js";
import { Parser } from "html-to-react";
import { R as RelatedAttachments } from "./RelatedAttachments-0D_FgIcx.js";
import { MdWhatsapp } from "react-icons/md";
import { Row, Col, Divider, Card, Spin, Breadcrumb, Empty } from "antd";
import { P as ProductImageGallery, a as ProductSpecificationTable } from "./ProductImageGallery-PqcnGb5H.js";
import { FaArrowLeft, FaHome, FaCog } from "react-icons/fa";
import "react/jsx-runtime";
import "./Slider-D_k0UNaj.js";
import "./VideoPlayer-uOeot7yT.js";
import "react-player";
import "framer-motion";
import "react-icons/gr";
import "./AppLoader-ZfOck8L3.js";
import "react-hot-toast";
import "./helpers-D56oASBL.js";
import "axios";
import "react-icons/ci";
import "lodash.debounce";
import "@ant-design/icons";
import "react-icons/fa6";
import "react-slick";
import "@inertiajs/react";
import "./TextInput-B6lQlW2Q.js";
import "./InputLabel-BbJGG6HL.js";
import "react-icons/ri";
const AttachmentProduct = () => {
  var _a, _b, _c, _d, _e, _f;
  const [reviewData, setReviewData] = useState([]);
  const context = useContext(HomeContext);
  const { state, methods } = context;
  useEffect(() => {
    methods.getAttachmentDetails(location.pathname.split("/").pop());
  }, []);
  async function fetchReviews() {
    var _a2;
    let reviews = await methods.loadReviews((_a2 = state == null ? void 0 : state.selectedAttachment) == null ? void 0 : _a2.id);
    if (reviews) {
      setReviewData(reviews);
    }
  }
  useEffect(() => {
    fetchReviews();
  }, [state.selectedAttachment]);
  const attachment = state == null ? void 0 : state.selectedAttachment;
  let galleryImages = ((_a = attachment == null ? void 0 : attachment.images) == null ? void 0 : _a.map((img) => ({
    ...img,
    path: img.path || img.image_path
  }))) || [];
  if ((_b = attachment == null ? void 0 : attachment.primary_image) == null ? void 0 : _b.path) {
    const mainImagePath = attachment.primary_image.path.replace("public", "/storage");
    const mainImageAlreadyInGallery = galleryImages.some((img) => {
      var _a2;
      const imgPath = (_a2 = img.path || img.image_path) == null ? void 0 : _a2.replace("public", "/storage");
      return imgPath === mainImagePath;
    });
    if (!mainImageAlreadyInGallery) {
      galleryImages = [
        {
          path: attachment.primary_image.path,
          alt: attachment.name || "Main Image",
          isMainImage: true
        },
        ...galleryImages
      ];
    }
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
  return /* @__PURE__ */ jsxs("div", { className: "product-page-container", children: [
    (attachment == null ? void 0 : attachment.category) && /* @__PURE__ */ jsx("div", { className: "hero-section", children: /* @__PURE__ */ jsxs("div", { className: "hero-image-container", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `${((_d = (_c = attachment == null ? void 0 : attachment.category) == null ? void 0 : _c.image) == null ? void 0 : _d.replace("public", "/storage")) || "/storage/images/default-category.jpg"}`,
          alt: `${(_e = attachment == null ? void 0 : attachment.category) == null ? void 0 : _e.name} Category`,
          className: "hero-image"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hero-overlay", children: /* @__PURE__ */ jsx("h1", { className: "hero-title", children: (_f = attachment == null ? void 0 : attachment.category) == null ? void 0 : _f.name }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4", children: [
      /* @__PURE__ */ jsx("div", { className: "product-title-section mb-6", children: /* @__PURE__ */ jsx("h1", { className: "product-main-title", children: attachment == null ? void 0 : attachment.name }) }),
      /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], align: "top", justify: "start", children: [
        /* @__PURE__ */ jsx(Col, { xs: 24, lg: 12, children: /* @__PURE__ */ jsx(
          ProductImageGallery,
          {
            images: galleryImages,
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
    ] })
  ] });
};
function SolutionsPage() {
  const { methods } = useContext(HomeContext);
  useEffect(() => {
    methods.loadSolutions();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(SolutionsByProject, { showExploreButton: false }) });
}
function SolutionProducts() {
  const { slug } = useParams();
  const { state } = useContext(HomeContext);
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSolution = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/solution/details/${slug}`);
        const data = await res.json();
        if (data.success && data.solution) {
          setSolution(data.solution);
        } else {
          setError("Solution not found");
        }
      } catch (e) {
        console.error("Error fetching solution:", e);
        setError("Failed to load solution");
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchSolution();
    }
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center", children: [
      /* @__PURE__ */ jsx(Spin, { size: "large" }),
      /* @__PURE__ */ jsx("span", { className: "ml-3 text-lg", children: "Loading solution..." })
    ] });
  }
  if (error || !solution) {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto py-10 px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Solution Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "The solution you're looking for doesn't exist or has been removed." }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => window.location.href = "/solutions",
          className: "primary-btn px-6 py-3 rounded-lg transition-colors duration-300",
          children: [
            /* @__PURE__ */ jsx(FaArrowLeft, { className: "inline mr-2" }),
            "Back to Solutions"
          ]
        }
      )
    ] }) });
  }
  const products = solution.products || [];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-4", children: /* @__PURE__ */ jsx(
      Breadcrumb,
      {
        items: [
          {
            href: "/",
            title: /* @__PURE__ */ jsx(FaHome, {})
          },
          {
            href: "/solutions",
            title: "Solutions"
          },
          {
            title: solution.name
          }
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: solution.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl opacity-90 mb-8", children: solution.description }),
      products.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block", children: /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold", children: [
        /* @__PURE__ */ jsx(FaCog, { className: "inline mr-2" }),
        products.length,
        " Machine",
        products.length !== 1 ? "s" : "",
        " Available"
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto py-12 px-4", children: products.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-gray-800 mb-4", children: [
          "Featured Machines for ",
          solution.name
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 max-w-2xl mx-auto", children: [
          "Explore our carefully selected heavy machinery designed specifically for ",
          solution.name.toLowerCase(),
          " applications."
        ] })
      ] }),
      /* @__PURE__ */ jsx(Row, { gutter: [24, 24], children: products.map((prod, idx) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 8, lg: 6, xl: 6, children: /* @__PURE__ */ jsx(ProductComponent, { prod, index: idx }) }, idx)) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mt-12 p-8 bg-white rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Need Help Choosing the Right Machine?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Our experts are here to help you find the perfect solution for your specific needs." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => window.location.href = "/contact",
              className: "primary-btn px-8 py-3 rounded-lg font-semibold transition-colors duration-300",
              children: "Get Expert Consultation"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => window.location.href = "/products/machine",
              className: "bg-white text-yellow-600 border border-yellow-500 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-yellow-50",
              children: "Browse All Machines"
            }
          )
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-16", children: /* @__PURE__ */ jsx(
      Empty,
      {
        image: Empty.PRESENTED_IMAGE_SIMPLE,
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "No Machines Found" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-6", children: [
            "We're currently updating our inventory for ",
            solution.name,
            ". Check back soon or browse our complete machine catalog."
          ] })
        ] }),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => window.location.href = "/solutions",
              className: "primary-btn px-6 py-3 rounded-lg transition-colors duration-300",
              children: [
                /* @__PURE__ */ jsx(FaArrowLeft, { className: "inline mr-2" }),
                "Back to Solutions"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => window.location.href = "/products/machine",
              className: "bg-white text-yellow-600 border border-yellow-500 px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-yellow-50",
              children: "Browse All Machines"
            }
          )
        ] })
      }
    ) }) }),
    (state == null ? void 0 : state.solutions) && state.solutions.length > 1 && /* @__PURE__ */ jsx("div", { className: "bg-white py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800 text-center mb-8", children: "Other Solutions You Might Like" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: state.solutions.filter((s) => s.slug !== slug).slice(0, 3).map((relatedSolution) => {
        var _a;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer",
            onClick: () => window.location.href = `/solutions/${relatedSolution.slug}`,
            children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-800 mb-2", children: relatedSolution.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm mb-4", children: [
                (_a = relatedSolution.description) == null ? void 0 : _a.substring(0, 100),
                "..."
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-yellow-600 font-medium text-sm hover:text-yellow-700", children: "Learn more →" })
            ]
          },
          relatedSolution.id
        );
      }) })
    ] }) })
  ] });
}
function Welcome({ auth, laravelVersion, phpVersion }) {
  return /* @__PURE__ */ jsx(HomeContextProvider, { auth, children: /* @__PURE__ */ jsx(HomeLayout, { auth, children: /* @__PURE__ */ jsx(BrowserRouter, { basename: "", children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/track", element: /* @__PURE__ */ jsx(Track, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products", element: /* @__PURE__ */ jsx(AllProducts, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products/attachments", element: /* @__PURE__ */ jsx(AllAttachments, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/attachments", element: /* @__PURE__ */ jsx(AttachmentProductType, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/product/:slug", element: /* @__PURE__ */ jsx(App, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/attachment/:slug", element: /* @__PURE__ */ jsx(AttachmentProduct, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products/:slug/search", element: /* @__PURE__ */ jsx(AllProducts, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/products/:slug", element: /* @__PURE__ */ jsx(ProductType, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blogs/:slug", element: /* @__PURE__ */ jsx(SingleBlog, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blogs", element: /* @__PURE__ */ jsx(AllBlogs, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/payment/successfull", element: /* @__PURE__ */ jsx(OrderSuccess, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(Login, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(Register, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/solutions", element: /* @__PURE__ */ jsx(SolutionsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/solutions/:slug", element: /* @__PURE__ */ jsx(SolutionProducts, {}) })
  ] }) }) }) });
}
export {
  Welcome as default
};
