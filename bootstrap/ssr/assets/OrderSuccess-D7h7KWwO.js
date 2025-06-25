import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import React, { useContext, useState, useEffect } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { a as HomeContext, A as AttachmentComponent } from "./AttachmentComponent-CRE5apCQ.js";
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight, FaShoppingCart, FaShip, FaPlane, FaTruck, FaClock, FaUser, FaCalendar, FaRegHandshake, FaGlobe, FaMinus, FaPlus, FaEnvelope, FaWhatsapp, FaPhone, FaFacebook, FaLinkedin, FaTwitter, FaCheck, FaTimes } from "react-icons/fa";
import { Row, Col, Card, Skeleton, Flex, Image, Tooltip, Form, Input, Spin, Alert, Modal } from "antd";
import Slider from "react-slick";
import { RiWeightLine } from "react-icons/ri";
import { GrCalendar, GrCar } from "react-icons/gr";
import { MdWhatsapp, MdDirectionsCar, MdHighQuality, MdLanguage, MdPriceChange } from "react-icons/md";
import { Parser } from "html-to-react";
import axios from "axios";
import { S as ShowToast } from "./helpers-isL4n3oi.js";
import { FaLocationDot } from "react-icons/fa6";
function HeroSection() {
  const { state, dispatch, methods } = useContext(HomeContext);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  async function fetchSlides() {
    let slides2 = await methods.loadSlides("home_slider");
    if (slides2) {
      setSlides(slides2);
    }
  }
  useEffect(() => {
    fetchSlides();
  }, []);
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5e3);
      return () => clearInterval(interval);
    }
  }, [slides]);
  return /* @__PURE__ */ jsxs("section", { className: "hero-section relative overflow-hidden gradient-overlay", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: slides.map((slide, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-40" : "opacity-0"}`,
        children: slide.type === "video" ? /* @__PURE__ */ jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            className: "w-full h-full object-cover",
            src: slide.url
          }
        ) : /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.url,
            alt: slide.title,
            className: "w-full h-full object-cover"
          }
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 min-h-screen flex items-center", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center text-white", children: [
      /* @__PURE__ */ jsxs("h1", { className: "heading-primary text-white text-shadow-lg mb-6", children: [
        "Global Machinery Solutions",
        /* @__PURE__ */ jsx("span", { className: "block text-accent", children: "from China" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto text-shadow", children: "Premium heavy machinery and construction equipment exported worldwide with unmatched quality and reliability." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn-primary text-gray-900 font-bold px-8 py-4 text-base",
            onClick: () => window.location.href = "/products",
            children: [
              /* @__PURE__ */ jsx(FaArrowRight, { className: "mr-2" }),
              "Explore Machines"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "btn-outline text-white border-white hover:bg-white hover:text-gray-900 px-8 py-4 text-base",
            onClick: () => window.location.href = "/contact",
            children: [
              /* @__PURE__ */ jsx(FaPlay, { className: "mr-2" }),
              "Get a Quote"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-400 border-opacity-30", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center fade-in-up", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-accent", children: "50+" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm opacity-75", children: "Countries Served" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center fade-in-up", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-accent", children: "1000+" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm opacity-75", children: "Machines Exported" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center fade-in-up", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-accent", children: "20+" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm opacity-75", children: "Years Experience" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center fade-in-up", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-accent", children: "24/7" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm opacity-75", children: "Support" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-1 h-8 bg-white opacity-50 rounded-full mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs opacity-75", children: "Scroll" })
    ] }) })
  ] });
}
function MachinesByBodyType() {
  const { state, methods } = useContext(HomeContext);
  useEffect(() => {
    methods.loadBrandsAndCats({ slug: "machine" });
  }, []);
  const categories = (state == null ? void 0 : state.categories) || [];
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Heavy Machinery by Category" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Explore our comprehensive range of heavy machinery across different categories" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "categories-container bg-white rounded-2xl shadow-lg p-8", children: [
      /* @__PURE__ */ jsx(Row, { gutter: [], style: { gap: "30px" }, children: categories.map((cat, index) => {
        var _a;
        return /* @__PURE__ */ jsx(
          Col,
          {
            xs: 10,
            sm: 10,
            md: 8,
            lg: 10,
            xl: 6,
            xxl: 4,
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `/products/machine/search?categories=${cat.id}&page=1&price=&type=machine`,
                className: "product-card group block",
                style: { height: "100%" },
                "data-aos": "zoom-in",
                "data-aos-delay": "100",
                children: /* @__PURE__ */ jsxs("div", { className: "product-item w-full flex flex-col align-center gap-1 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative h-48 w-full overflow-hidden", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        loading: "lazy",
                        style: { height: "200px", width: "100%", objectFit: "cover" },
                        src: `${(_a = cat == null ? void 0 : cat.image) == null ? void 0 : _a.replace("public", "/storage")}`,
                        alt: cat == null ? void 0 : cat.name,
                        className: "transition-transform duration-500 group-hover:scale-110"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 flex-1 flex flex-col justify-between", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 text-center group-hover:text-yellow-600 transition-colors duration-300", children: cat == null ? void 0 : cat.name }),
                    cat.description && /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm text-center mt-2 leading-relaxed", children: [
                      cat.description.replace(/<[^>]*>/g, "").substring(0, 80),
                      "..."
                    ] })
                  ] })
                ] })
              }
            )
          },
          index
        );
      }) }),
      categories.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "No machinery categories available at the moment." }) })
    ] })
  ] }) });
}
function MachinesByBrand() {
  const { state, methods } = useContext(HomeContext);
  useEffect(() => {
    methods.loadBrandsAndCats({ slug: "machine" });
  }, []);
  const brands = (state == null ? void 0 : state.brands) || [];
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Heavy Machinery by Brand" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Choose from leading global manufacturers of heavy machinery and construction equipment" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "brands-container bg-gray-50 rounded-2xl shadow-lg p-8", children: [
      /* @__PURE__ */ jsx(Row, { gutter: [], style: { gap: "30px" }, children: brands.map((brand, index) => {
        var _a;
        return /* @__PURE__ */ jsx(
          Col,
          {
            xs: 10,
            sm: 10,
            md: 8,
            lg: 10,
            xl: 6,
            xxl: 4,
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `/products/machine/search?brands=${brand.id}&page=1&price=&type=machine`,
                className: "product-card group block",
                style: { height: "100%" },
                "data-aos": "zoom-in",
                "data-aos-delay": "100",
                children: /* @__PURE__ */ jsxs("div", { className: "product-item w-full bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative h-24 w-full flex items-center justify-center p-4 bg-gray-50", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      loading: "lazy",
                      style: { height: "60px", width: "100%", objectFit: "contain" },
                      src: `${(_a = brand == null ? void 0 : brand.logo) == null ? void 0 : _a.replace("public", "/storage")}`,
                      alt: brand == null ? void 0 : brand.name,
                      className: "transition-transform duration-300 group-hover:scale-110"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 text-center group-hover:text-yellow-600 transition-colors duration-300", children: brand == null ? void 0 : brand.name }),
                    brand.description && /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm text-center mt-2 leading-relaxed", children: [
                      brand.description.replace(/<[^>]*>/g, "").substring(0, 100),
                      "..."
                    ] })
                  ] })
                ] })
              }
            )
          },
          index
        );
      }) }),
      brands.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(FaArrowRight, { className: "text-gray-400", size: 24 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700 mb-2", children: "Brands Coming Soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "We're partnering with leading manufacturers to bring you the best heavy machinery brands." })
      ] }) }),
      brands.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: "btn-professional px-8 py-4 text-base font-bold flex items-center gap-2 mx-auto",
          onClick: () => window.location.href = "/products/machine",
          children: [
            /* @__PURE__ */ jsx("span", { children: "View All Machinery" }),
            /* @__PURE__ */ jsx(FaArrowRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] })
  ] }) });
}
function SolutionsByProject({ showExploreButton = true }) {
  const { state, methods } = useContext(HomeContext);
  useEffect(() => {
    methods.loadSolutions();
  }, []);
  const solutions = (state == null ? void 0 : state.solutions) || [];
  const handleCardClick = (slug) => {
    window.location.href = `/solutions/${slug}`;
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Solutions by Industry or Project" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Find the perfect heavy machinery solutions tailored to your specific industry needs and project requirements" })
    ] }),
    solutions.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: solutions.map((solution) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer",
        onClick: () => handleCardClick(solution.slug),
        children: [
          solution.image && /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110",
                style: {
                  backgroundImage: `url(${solution.image.replace("public", "/storage")})`
                }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }),
            solution.products_count > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold", children: [
              solution.products_count,
              " Machines"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300", children: solution.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3", children: solution.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("button", { className: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105", children: "View Machines" }),
              /* @__PURE__ */ jsx("div", { className: "text-gray-400 group-hover:text-yellow-600 transition-colors duration-300", children: /* @__PURE__ */ jsx(FaArrowRight, { className: "text-sm transform group-hover:translate-x-1 transition-transform duration-300" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-2 border-transparent group-hover:border-yellow-200 rounded-2xl transition-colors duration-300" })
        ]
      },
      solution.id
    )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "No solutions available at the moment." }) }),
    showExploreButton && solutions.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        onClick: () => window.location.href = "/solutions",
        children: "Explore All Solutions"
      }
    ) })
  ] }) });
}
function AttachmentsByCategory() {
  const { state, methods } = useContext(HomeContext);
  useEffect(() => {
    methods.loadAttachmentCategories();
  }, []);
  const attachmentCategories = (state == null ? void 0 : state.attachmentCategories) || [];
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Attachments & Accessories by Category" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Explore our comprehensive range of attachments and accessories across different categories" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "categories-container bg-white rounded-2xl shadow-lg p-8", children: [
      /* @__PURE__ */ jsx(Row, { gutter: [], style: { gap: "30px" }, children: attachmentCategories.map((cat, index) => {
        var _a;
        return /* @__PURE__ */ jsx(
          Col,
          {
            xs: 10,
            sm: 10,
            md: 8,
            lg: 10,
            xl: 6,
            xxl: 4,
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `/products/attachments?categories=${cat.id}&page=1&price=&type=&sort=desc`,
                className: "product-card group block",
                style: { height: "100%" },
                "data-aos": "zoom-in",
                "data-aos-delay": "100",
                children: /* @__PURE__ */ jsxs("div", { className: "product-item w-full flex flex-col align-center gap-1 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative h-48 w-full overflow-hidden", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        loading: "lazy",
                        style: { height: "200px", width: "100%", objectFit: "cover" },
                        src: `${(_a = cat == null ? void 0 : cat.image) == null ? void 0 : _a.replace("public", "/storage")}`,
                        alt: cat == null ? void 0 : cat.name,
                        className: "transition-transform duration-500 group-hover:scale-110"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 flex-1 flex flex-col justify-between", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 text-center group-hover:text-yellow-600 transition-colors duration-300", children: cat == null ? void 0 : cat.name }),
                    cat.description && /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm text-center mt-2 leading-relaxed", children: [
                      cat.description.replace(/<[^>]*>/g, "").substring(0, 80),
                      "..."
                    ] })
                  ] })
                ] })
              }
            )
          },
          index
        );
      }) }),
      attachmentCategories.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "No attachment categories available at the moment." }) })
    ] })
  ] }) });
}
const ProductCardSkeleton = () => {
  return /* @__PURE__ */ jsxs(Card, { className: "prod-card-skelton", style: { margin: "16px 0" }, children: [
    /* @__PURE__ */ jsx(Skeleton.Image, { style: { width: "100%", height: 200 } }),
    /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 2 } })
  ] });
};
const ProductListSkeleton = ({ count = 12 }) => {
  return /* @__PURE__ */ jsx(Row, { gutter: [16, 16], children: Array.from({ length: count }).map((_, index) => /* @__PURE__ */ jsx(
    Col,
    {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 6,
      xxl: 6,
      children: /* @__PURE__ */ jsx(ProductCardSkeleton, {})
    },
    index
  )) });
};
function ExploreAttachments() {
  const { state, methods } = useContext(HomeContext);
  useEffect(() => {
    methods.loadAttachments();
  }, []);
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
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
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
  const attachments = (state == null ? void 0 : state.attachments) || [];
  return /* @__PURE__ */ jsx("div", { className: "section-professional", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "card-professional p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "heading-secondary mb-2", children: "Explore Attachments & Accessories" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted", children: "Discover our premium collection of attachments and accessories" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                var _a;
                return (_a = sliderRef.current) == null ? void 0 : _a.slickPrev();
              },
              className: "btn-ghost p-3 rounded-full hover:bg-gray-100",
              disabled: (state == null ? void 0 : state.loadingAttachments) || attachments.length === 0,
              children: /* @__PURE__ */ jsx(FaChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                var _a;
                return (_a = sliderRef.current) == null ? void 0 : _a.slickNext();
              },
              className: "btn-ghost p-3 rounded-full hover:bg-gray-100",
              disabled: (state == null ? void 0 : state.loadingAttachments) || attachments.length === 0,
              children: /* @__PURE__ */ jsx(FaChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/products/attachments",
            className: "btn-primary px-6 py-3 text-sm",
            children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "View All" }),
              /* @__PURE__ */ jsx(FaArrowRight, { className: "text-xs" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: (state == null ? void 0 : state.loadingAttachments) ? /* @__PURE__ */ jsx(ProductListSkeleton, { count: 5 }) : attachments.length > 0 ? /* @__PURE__ */ jsx(Slider, { ref: sliderRef, ...settings, children: attachments.map((attachment, index) => /* @__PURE__ */ jsx(
      AttachmentComponent,
      {
        attachment,
        index
      },
      attachment.id || index
    )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No attachments available at the moment." }) }) })
  ] }) }) });
}
function ProductComponent({ prod, index }) {
  var _a, _b, _c, _d, _e;
  const { methods, dispatch, state } = useContext(HomeContext);
  const handleAddToCart = () => {
    methods.addToCart(prod.id);
  };
  return /* @__PURE__ */ jsx("div", { className: "product-card", style: { height: "100%" }, "data-wow-delay": `0.${index + 2}s`, children: /* @__PURE__ */ jsxs("div", { className: "product-item", children: [
    /* @__PURE__ */ jsx(Flex, { gap: 10, className: "prod-images-modal", children: /* @__PURE__ */ jsxs(Image.PreviewGroup, { children: [
      /* @__PURE__ */ jsx(
        Image,
        {
          loading: "lazy",
          src: `${(prod == null ? void 0 : prod.image) ? prod.image.startsWith("public/") ? prod.image.replace("public", "/storage") : `/storage/${prod.image}` : ""}`,
          fallback: "/images/placeholder-product.jpg",
          alt: `Product Image ${index + 1}`,
          style: { width: "100%", maxHeight: "250px", marginBottom: "10px" }
        },
        index
      ),
      (_a = prod == null ? void 0 : prod.images) == null ? void 0 : _a.map((image, index2) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          Image,
          {
            loading: "lazy",
            src: `${(_a2 = image == null ? void 0 : image.image_path) == null ? void 0 : _a2.replace("public", "/storage")}`,
            alt: `Product Image ${index2 + 1}`,
            style: { width: "0px !important", height: "auto", marginBottom: "10px", display: "none" }
          },
          index2
        );
      })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "product-details", children: [
      /* @__PURE__ */ jsxs("div", { className: "down-content", children: [
        prod.is_business_product && /* @__PURE__ */ jsxs("div", { className: "flex text-cats flex-wrap align-center gap-3 pb-3 py-1", style: { lineHeight: "normal", fontSize: "12px" }, children: [
          ((_b = prod == null ? void 0 : prod.category) == null ? void 0 : _b.product_type_id) != 2 && /* @__PURE__ */ jsxs("div", { className: "flex align-center gap-2", children: [
            /* @__PURE__ */ jsx(GrCalendar, { color: "#ceaa4d", size: 16 }),
            /* @__PURE__ */ jsx("span", { className: "text-dark", children: prod == null ? void 0 : prod.make })
          ] }),
          ((_c = prod == null ? void 0 : prod.category) == null ? void 0 : _c.product_type_id) !== 2 && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex align-center gap-2", children: [
            /* @__PURE__ */ jsx(GrCar, { color: "#ceaa4d", size: 16 }),
            /* @__PURE__ */ jsx("span", { className: "text-dark", children: (_d = prod == null ? void 0 : prod.category) == null ? void 0 : _d.name })
          ] }) }),
          ((_e = prod == null ? void 0 : prod.category) == null ? void 0 : _e.product_type_id) === 1 && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex align-center gap-1", children: [
            /* @__PURE__ */ jsx(RiWeightLine, { color: "#ceaa4d", size: 20 }),
            /* @__PURE__ */ jsxs("span", { className: "text-dark", children: [
              prod == null ? void 0 : prod.weight,
              " Tons"
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("a", { title: "View Product Details", className: "card-title-link", style: { height: "40px", display: "block" }, href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/product/${prod == null ? void 0 : prod.slug}`, children: /* @__PURE__ */ jsx(Tooltip, { title: prod == null ? void 0 : prod.name, children: /* @__PURE__ */ jsx("h4", { className: "m-0", children: prod == null ? void 0 : prod.name }) }) }),
        !(prod == null ? void 0 : prod.is_business_product) && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("small", { children: /* @__PURE__ */ jsxs("div", { style: { color: "gray" }, className: "mb-2 text-zinc-400", children: [
          "Sotck: ",
          prod == null ? void 0 : prod.stock
        ] }) }) })
      ] }),
      (prod == null ? void 0 : prod.is_business_product) ? /* @__PURE__ */ jsx("a", { target: "_blank", style: { height: "60px" }, href: `https://wa.me/13072950382?text=${encodeURIComponent("I would like to investigate " + (prod == null ? void 0 : prod.name))}`, className: "card-footers py-2", children: /* @__PURE__ */ jsxs(
        "button",
        {
          style: { width: "100%" },
          className: "btn-whatsapp",
          href: "",
          children: [
            /* @__PURE__ */ jsx(MdWhatsapp, { size: 20, stroke: "3" }),
            "Chat Now"
          ]
        }
      ) }) : /* @__PURE__ */ jsxs(
        "button",
        {
          style: { width: "100%" },
          className: "primary-btn !gap-3 flex items-center mb-2",
          onClick: handleAddToCart,
          children: [
            /* @__PURE__ */ jsx(FaShoppingCart, { color: "white", size: 20, stroke: "3" }),
            "Add to Cart"
          ]
        }
      )
    ] })
  ] }) }, index);
}
const prod_types = {
  machines: "Heavy Machinery"
};
const prod_links = {
  machines: "machine"
};
function ProductsList({ product_type_key = null, product_type = {} }) {
  const { state, dispatch, methods } = useContext(HomeContext);
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
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
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
  return /* @__PURE__ */ jsx("div", { className: "section-professional", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "card-professional p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "heading-secondary mb-2", children: [
          "Explore ",
          prod_types[product_type_key]
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted", children: "Discover our premium collection of heavy machinery" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => sliderRef.current.slickPrev(),
              className: "btn-ghost p-3 rounded-full hover:bg-gray-100",
              children: /* @__PURE__ */ jsx(FaChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => sliderRef.current.slickNext(),
              className: "btn-ghost p-3 rounded-full hover:bg-gray-100",
              children: /* @__PURE__ */ jsx(FaChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/products/${prod_links[product_type_key]}`,
            className: "btn-primary px-6 py-3 text-sm",
            children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "View All" }),
              /* @__PURE__ */ jsx(FaArrowRight, { className: "text-xs" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: (state == null ? void 0 : state.loadingProds) ? /* @__PURE__ */ jsx(ProductListSkeleton, { count: 4 }) : /* @__PURE__ */ jsx(Slider, { ref: sliderRef, ...settings, children: product_type == null ? void 0 : product_type.map((prod, index) => /* @__PURE__ */ jsx(ProductComponent, { prod, index }, prod.id || index)) }) })
  ] }) }) });
}
function Latest({ header = true }) {
  var _a;
  const context = useContext(HomeContext);
  const { state, dispatch, methods } = context;
  useEffect(() => {
    methods == null ? void 0 : methods.loadProductsWithTypes();
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: (state == null ? void 0 : state.home_prods) && ((_a = Object == null ? void 0 : Object.keys(state == null ? void 0 : state.home_prods)) == null ? void 0 : _a.map((key, index) => {
    return /* @__PURE__ */ jsx(ProductsList, { product_type_key: key, product_type: state == null ? void 0 : state.home_prods[key] }, index);
  })) });
}
const shipmentData = [
  {
    id: 1,
    image: "/images/shipments/container-loading.jpg",
    title: "Container Loading - Dubai",
    description: "5 Excavators shipped to UAE",
    date: "2024-01-15",
    destination: "Dubai, UAE",
    type: "container"
  },
  {
    id: 2,
    image: "/images/shipments/truck-delivery.jpg",
    title: "Truck Delivery - Kenya",
    description: "3 Bulldozers delivered to Nairobi",
    date: "2024-01-12",
    destination: "Nairobi, Kenya",
    type: "truck"
  },
  {
    id: 3,
    image: "/images/shipments/port-loading.jpg",
    title: "Port Loading - Nigeria",
    description: "8 Road Rollers shipped to Lagos",
    date: "2024-01-10",
    destination: "Lagos, Nigeria",
    type: "ship"
  },
  {
    id: 4,
    image: "/images/shipments/crane-loading.jpg",
    title: "Heavy Lift - Brazil",
    description: "2 Large Excavators to São Paulo",
    date: "2024-01-08",
    destination: "São Paulo, Brazil",
    type: "crane"
  },
  {
    id: 5,
    image: "/images/shipments/warehouse.jpg",
    title: "Warehouse Preparation - Ghana",
    description: "6 Wheel Loaders ready for shipment",
    date: "2024-01-05",
    destination: "Accra, Ghana",
    type: "warehouse"
  },
  {
    id: 6,
    image: "/images/shipments/delivery-truck.jpg",
    title: "Final Delivery - Tanzania",
    description: "4 Forklifts delivered to Dar es Salaam",
    date: "2024-01-03",
    destination: "Dar es Salaam, Tanzania",
    type: "delivery"
  }
];
const getShipmentIcon = (type) => {
  switch (type) {
    case "ship":
    case "container":
      return /* @__PURE__ */ jsx(FaShip, { className: "text-blue-500" });
    case "truck":
    case "delivery":
      return /* @__PURE__ */ jsx(FaTruck, { className: "text-green-500" });
    case "plane":
      return /* @__PURE__ */ jsx(FaPlane, { className: "text-orange-500" });
    default:
      return /* @__PURE__ */ jsx(FaShip, { className: "text-blue-500" });
  }
};
function ShipmentsShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % shipmentData.length);
      }, 4e3);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shipmentData.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shipmentData.length) % shipmentData.length);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-br from-blue-50 to-indigo-100", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Recent Shipments & Deliveries" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "See our latest machinery deliveries to clients worldwide" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prevSlide,
          onMouseEnter: () => setIsAutoPlay(false),
          onMouseLeave: () => setIsAutoPlay(true),
          className: "absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110",
          children: /* @__PURE__ */ jsx(FaChevronLeft, { className: "text-gray-600" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: nextSlide,
          onMouseEnter: () => setIsAutoPlay(false),
          onMouseLeave: () => setIsAutoPlay(true),
          className: "absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110",
          children: /* @__PURE__ */ jsx(FaChevronRight, { className: "text-gray-600" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex transition-transform duration-500 ease-in-out",
          style: { transform: `translateX(-${currentSlide * (100 / 3)}%)` },
          children: shipmentData.map((shipment, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-1/3 flex-shrink-0 px-3",
              children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110",
                      style: {
                        backgroundImage: `url(${shipment.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      },
                      children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-80" })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-600", children: new Date(shipment.date).toLocaleDateString() }) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-full p-2", children: getShipmentIcon(shipment.type) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-2", children: shipment.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-3", children: shipment.description }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Destination:" }),
                    /* @__PURE__ */ jsx("span", { className: "ml-1", children: shipment.destination })
                  ] })
                ] })
              ] })
            },
            shipment.id
          ))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-8 space-x-2", children: shipmentData.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => goToSlide(index),
          className: `w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"}`
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 bg-white rounded-2xl shadow-lg p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8 text-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-blue-600 mb-2", children: "200+" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Shipments This Year" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "50+" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Countries Delivered" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-orange-600 mb-2", children: "99%" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "On-Time Delivery" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-600 mb-2", children: "24/7" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Tracking Support" })
      ] })
    ] }) })
  ] }) });
}
const defaultBlogs = [
  {
    id: 1,
    title: "Top 10 Heavy Machinery Trends in 2024",
    excerpt: "Discover the latest trends in heavy machinery technology and what to expect in the construction industry this year.",
    image: "/images/blog/machinery-trends-2024.jpg",
    author: "John Smith",
    date: "2024-01-15",
    readTime: "5 min read",
    slug: "top-10-heavy-machinery-trends-2024",
    category: "Industry News"
  },
  {
    id: 2,
    title: "Complete Guide: Choosing the Right Excavator",
    excerpt: "Everything you need to know about selecting the perfect excavator for your construction project needs.",
    image: "/images/blog/excavator-guide.jpg",
    author: "Sarah Johnson",
    date: "2024-01-12",
    readTime: "8 min read",
    slug: "complete-guide-choosing-right-excavator",
    category: "Buying Guide"
  },
  {
    id: 3,
    title: "Maintenance Tips for Heavy Construction Equipment",
    excerpt: "Essential maintenance practices to extend the life of your heavy machinery and reduce operational costs.",
    image: "/images/blog/maintenance-tips.jpg",
    author: "Mike Chen",
    date: "2024-01-08",
    readTime: "6 min read",
    slug: "maintenance-tips-heavy-construction-equipment",
    category: "Maintenance"
  }
];
function BlogPreview() {
  const { state, methods } = useContext(HomeContext);
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadLatestBlogs();
  }, []);
  const loadLatestBlogs = async () => {
    setLoading(true);
    try {
      const blogsData = await methods.loadBlogs();
      if (blogsData && blogsData.length > 0) {
        setBlogs(blogsData.slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Latest from Our Blog" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Stay updated with the latest news, insights, and tips from the heavy machinery industry" })
    ] }),
    loading ? (
      // Loading Skeleton
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "h-48 bg-gray-200 animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse mb-2" }),
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded animate-pulse mb-4" }),
          /* @__PURE__ */ jsx("div", { className: "h-16 bg-gray-200 rounded animate-pulse mb-4" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 w-24 bg-gray-200 rounded animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "h-4 w-20 bg-gray-200 rounded animate-pulse" })
          ] })
        ] })
      ] }, item)) })
    ) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogs.map((blog) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer",
        onClick: () => window.location.href = `/blogs/${blog.slug}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110",
                style: {
                  backgroundImage: `url(${blog.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                },
                children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white bg-opacity-90 rounded-full px-3 py-1", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-700", children: blog.category }) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full px-3 py-1 flex items-center", children: [
              /* @__PURE__ */ jsx(FaClock, { className: "text-xs mr-1" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: blog.readTime })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2", children: blog.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3", children: blog.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500 mb-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(FaUser, { className: "mr-1" }),
                /* @__PURE__ */ jsx("span", { children: blog.author })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(FaCalendar, { className: "mr-1" }),
                /* @__PURE__ */ jsx("span", { children: formatDate(blog.date) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-300", children: "Read More" }),
              /* @__PURE__ */ jsx(FaArrowRight, { className: "text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-colors duration-300" })
        ]
      },
      blog.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        onClick: () => window.location.href = "/blogs",
        children: "View All Articles"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Stay Updated" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Subscribe to our newsletter for the latest industry insights and updates" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row max-w-md mx-auto gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            placeholder: "Enter your email",
            className: "flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300", children: "Subscribe" })
      ] })
    ] })
  ] }) });
}
const servicesData = [
  {
    id: 1,
    icon: /* @__PURE__ */ jsx(MdDirectionsCar, { size: 25 }),
    title: "WHAT IS AUTOPULSE",
    description: "Autopulse Global Trading Company is a leader in exporting top-quality used machinery, vehicles, and bikes from China. Our mission is to provide affordable solutions without compromising on quality. We cater to a wide range of industries and individuals across the globe, ensuring that every product meets the highest standards of excellence.",
    delay: "0.1s",
    bgColor: "bg-blue-500",
    textColor: "text-blue-600"
  },
  {
    id: 2,
    icon: /* @__PURE__ */ jsx(MdHighQuality, { size: 25 }),
    title: "QUALITY CONTROL",
    description: "Quality control is a cornerstone of our operations at Autopulse. We conduct thorough inspections at every stage of the sourcing and delivery process. Our commitment to quality ensures that every product we export meets stringent international standards, giving our clients peace of mind and confidence in their purchases.",
    delay: "0.2s",
    bgColor: "bg-green-500",
    textColor: "text-green-600"
  },
  {
    id: 3,
    icon: /* @__PURE__ */ jsx(FaRegHandshake, { size: 25 }),
    title: "MARKET EXPERTISE",
    description: "With over two decades of experience in the export industry, Autopulse has built a reputation for reliability and expertise. Our team of professionals brings deep industry knowledge and a commitment to excellence, ensuring that our clients receive expert advice and support throughout their business journey with us.",
    delay: "0.3s",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-600"
  },
  {
    id: 4,
    icon: /* @__PURE__ */ jsx(MdLanguage, { size: 25 }),
    title: "CLIENT SATISFACTION",
    description: "At Autopulse, client satisfaction is our ultimate goal. We measure our success by the positive feedback and ongoing partnerships we have with our clients. We go the extra mile to ensure that every client is satisfied with our products and services, building trust and long-term relationships along the way.",
    delay: "0.4s",
    bgColor: "bg-purple-500",
    textColor: "text-purple-600"
  },
  {
    id: 5,
    icon: /* @__PURE__ */ jsx(FaGlobe, { size: 25 }),
    title: "GLOBAL REACH",
    description: "Autopulse operates on a global scale, serving clients in over 50 countries. Our extensive network allows us to manage logistics efficiently and ensure timely delivery, no matter where our clients are located. Our global presence and experience make us a preferred partner for businesses around the world.",
    delay: "0.5s",
    bgColor: "bg-red-500",
    textColor: "text-red-500"
  },
  {
    id: 6,
    icon: /* @__PURE__ */ jsx(MdPriceChange, { size: 25 }),
    title: "COMPETITIVE PRICING",
    description: "We understand that pricing is a crucial factor for our clients. At Autopulse, we offer competitive pricing without sacrificing quality. Our flexible financing options and bulk purchase discounts make it possible for businesses of all sizes to access high-quality machinery and vehicles, enhancing their operations and profitability.",
    delay: "0.6s",
    bgColor: "bg-teal-500",
    textColor: "text-teal-600"
  }
];
function Services() {
  return /* @__PURE__ */ jsx("section", { className: "bg-white p-3 py-5 my-5 container", id: "services", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 pb-5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "Why Us" }),
      /* @__PURE__ */ jsx("h3", { className: "text-secondary text-2xl font-semibold", children: "Explore Our Services" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-10 mt-10", children: servicesData == null ? void 0 : servicesData.map((service) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
      /* @__PURE__ */ jsx("span", { className: `bg-yellow-500/10  text-yellow-600 p-3 rounded-full`, children: service.icon }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg text-gray-700", children: service.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-500", children: service.description })
      ] })
    ] }, service.id)) })
  ] }) });
}
const FAQ = () => {
  const { state, methods } = useContext(HomeContext);
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  async function fetchFAqs() {
    let faqs2 = await methods.loadFaqs();
    setFaqs(faqs2);
  }
  useEffect(() => {
    fetchFAqs();
  }, []);
  return /* @__PURE__ */ jsx("section", { id: "faq-container", className: "bg-white p-3 container py-5 my-5 ", "data-wow-delay": 0.5, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-0 faq-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 pb-5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "FAQ's" }),
      /* @__PURE__ */ jsx("h2", { className: "text-secondary text-2xl font-semibold", children: "Frequently Asked Questions" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 sm-gird-cols-1 gap-4", children: faqs && (faqs == null ? void 0 : faqs.map((faq) => /* @__PURE__ */ jsxs(
      "div",
      {
        style: { height: "fit-content" },
        className: "border border-gray-200 bg-white  overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              style: { height: "55px", fontWeight: "500x", border: "none" },
              className: "faq-item w-full border-none px-4 py-2 text-left bg-white-100 hover:bg-white-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between",
              onClick: () => toggleCollapse(faq == null ? void 0 : faq.id),
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "faq-title",
                    style: { fontWeight: "500", fontSize: "18px" },
                    children: faq == null ? void 0 : faq.question
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: activeIndex === faq.id ? /* @__PURE__ */ jsx(FaMinus, { size: 16, color: "#c29d3d" }) : /* @__PURE__ */ jsx(FaPlus, { size: 16, color: "#c29d3d" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transition-all  duration-300 overflow-hidden ${activeIndex === (faq == null ? void 0 : faq.id) ? "max-h-screen" : "max-h-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "px-4 py-2 bg-light-50", style: { letterSpacing: "1.1px" }, children: Parser().parse(faq == null ? void 0 : faq.answer) })
            }
          )
        ]
      },
      faq.id
    ))) })
  ] }) });
};
function Testimonials() {
  const { state, methods } = useContext(HomeContext);
  const [userReviews, setUserReviews] = useState([]);
  const fetchReviews = async () => {
    let reviews = await (methods == null ? void 0 : methods.loadUserReviews());
    setUserReviews(reviews);
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 container py-5 my-5 mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 pb-5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "Reviews" }),
      /* @__PURE__ */ jsx("h2", { className: "text-secondary text-2xl font-bold", children: "User Reviews" })
    ] }),
    "            ",
    /* @__PURE__ */ jsx(Slider, { ...settings, children: userReviews == null ? void 0 : userReviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md mx-auto h-auto", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-8 fill-amber-300", viewBox: "0 0 35 30", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M22.3838 27.6777C23.5264 28.9961 25.3721 29.6992 27.4814 29.6992C31.6123 29.6992 34.249 26.9746 34.249 22.7559C34.249 18.625 31.5244 15.6367 27.6572 15.6367C26.8662 15.6367 25.9873 15.8125 25.1084 16.0762C24.5811 9.48438 27.833 4.03516 32.2275 2.36523L31.7881 0.871094C24.2295 3.77148 19.4834 11.1543 19.4834 19.8555C19.4834 22.668 20.5381 25.7441 22.3838 27.6777ZM0.499023 19.8555C0.499023 24.6895 3.22363 29.6992 8.49707 29.6992C12.54 29.6992 15.1768 26.9746 15.1768 22.7559C15.1768 18.625 12.4521 15.6367 8.67285 15.6367C7.88184 15.6367 7.00293 15.8125 6.12402 16.0762C5.59668 9.48438 8.84863 4.03516 13.2432 2.36523L12.7158 0.871094C5.24512 3.77148 0.499023 11.1543 0.499023 19.8555Z"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "md:text-lg leading-relaxed", children: Parser().parse(review == null ? void 0 : review.review_text) }),
      /* @__PURE__ */ jsx("p", { className: "md:text-lg leading-relaxed text-gray-500", children: review == null ? void 0 : review.review_date }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        (review == null ? void 0 : review.country) === "Guyana" ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { alt: "Yifan testimonial for ShipFast", loading: "lazy", width: "48", height: "48", decoding: "async", "data-nimg": "1", className: "w-10 h-10 rounded-full object-cover", src: "/images/pngwing.com.png" }) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { alt: "Yifan testimonial for ShipFast", loading: "lazy", width: "48", height: "48", decoding: "async", "data-nimg": "1", className: "w-10 h-10 rounded-full object-cover", src: "/images/pngwing.com (1).png" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: review == null ? void 0 : review.user_name }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: review == null ? void 0 : review.user_email })
        ] })
      ] })
    ] }, (review == null ? void 0 : review.id) || (review == null ? void 0 : review.review_date))) })
  ] });
}
function Contact() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    setErrorMessage("");
    setSentMessage("");
    try {
      const response = await axios.post("/api/queries", values);
      ShowToast({ message: `Your message has been sent. Thank you!`, icon: /* @__PURE__ */ jsx(FaCheck, { color: "green" }) });
      setFormData({ user_name: "", user_email: "", subject: "", message: "" });
    } catch (error) {
      setErrorMessage("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container !m-auto newsletter mt-3 bg-white wow fadeIn bg-white p-3 container py-5 my-5  !sm:p-0", style: { width: "100%" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 pb-5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-yellow-600 text-lg font-semibold", children: "Contact" }),
      /* @__PURE__ */ jsx("h2", { className: "text-gray-700 text-3xl font-bold mt-2", children: "Submit Your Queries" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-content-center", children: /* @__PURE__ */ jsx("section", { className: "contact p-0", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-lg-5 d-flex align-items-stretch aos-init aos-animate", "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "info flex flex-col justify-center gap-6 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx(FaLocationDot, { className: "text-yellow-600", size: 24 }),
          /* @__PURE__ */ jsxs("div", { className: "p-0 m-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "p-0 m-0 font-semibold text-gray-800", children: "Location:" }),
            /* @__PURE__ */ jsxs("p", { className: "p-0 m-0 text-gray-600", children: [
              "Autopulse Trading Center",
              /* @__PURE__ */ jsx("br", {}),
              "Hong Kong"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx(FaEnvelope, { className: "text-blue-600", size: 24 }),
          /* @__PURE__ */ jsxs("div", { className: "p-0 m-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "p-0 m-0 font-semibold text-gray-800", children: "Email:" }),
            /* @__PURE__ */ jsx("p", { className: "p-0 m-0 text-gray-600", children: "info@autopulsetrading.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx(FaWhatsapp, { className: "text-green-600", size: 24 }),
          /* @__PURE__ */ jsxs("div", { className: "p-0 m-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "p-0 m-0 font-semibold text-gray-800", children: "WhatsApp:" }),
            /* @__PURE__ */ jsx("p", { className: "p-0 m-0 text-gray-600", children: "+1307 2950382" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-info-item phone flex items-center gap-4 p-4 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx(FaPhone, { className: "text-purple-600", size: 24 }),
          /* @__PURE__ */ jsxs("div", { className: "p-0 m-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "p-0 m-0 font-semibold text-gray-800", children: "Phone:" }),
            /* @__PURE__ */ jsx("p", { className: "p-0 m-0 text-gray-600", children: "+1307 2950382" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-info-item phone flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200", children: [
          /* @__PURE__ */ jsx(FaClock, { className: "text-yellow-600", size: 24 }),
          /* @__PURE__ */ jsxs("div", { className: "p-0 m-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "p-0 m-0 font-semibold text-gray-800", children: "Working Hours:" }),
            /* @__PURE__ */ jsxs("p", { className: "p-0 m-0 text-gray-600", children: [
              "Mon - Fri: 9:00 AM - 6:00 PM",
              /* @__PURE__ */ jsx("br", {}),
              "Saturday: 9:00 AM - 2:00 PM"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "social-media mt-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-800 mb-3", children: "Follow Us:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors", children: /* @__PURE__ */ jsx(FaFacebook, { size: 18 }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors", children: /* @__PURE__ */ jsx(FaWhatsapp, { size: 18 }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors", children: /* @__PURE__ */ jsx(FaLinkedin, { size: 18 }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors", children: /* @__PURE__ */ jsx(FaTwitter, { size: 18 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "map-container mt-4", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            style: { width: "100%", height: "250px", borderRadius: "8px" },
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.648827808653!2d114.15107011496368!3d22.28549898533414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007ebc7c76f7%3A0x1c5e67434c66f174!2sThe%20L.%20Plaza%2C%20367-375%20Queen's%20Road%20Central%2C%20Sheung%20Wan%2C%20Hong%20Kong!5e0!3m2!1sen!2s!4v1721902999999!5m2!1sen!2s",
            allowFullScreen: "",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch", "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs(
        Form,
        {
          style: { width: "100%", padding: "30px", boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "10px", background: "white" },
          onFinish: handleSubmit,
          initialValues: formData,
          layout: "vertical",
          className: "php-email-form bg-white border",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "form-header mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Send us a Message" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Fill out the form below and we'll get back to you as soon as possible." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-row flex gap-4", children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "user_name",
                  label: /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: "Your Name" }),
                  className: "form-group flex-1",
                  rules: [{ required: true, message: "Please enter your name" }],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      size: "large",
                      placeholder: "Enter your full name",
                      value: formData.user_name,
                      onChange: handleChange,
                      className: "rounded-lg"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "user_email",
                  label: /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: "Your Email" }),
                  className: "form-group flex-1",
                  rules: [
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "email",
                      size: "large",
                      placeholder: "Enter your email address",
                      value: formData.user_email,
                      onChange: handleChange,
                      className: "rounded-lg"
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "subject",
                label: /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: "Subject" }),
                rules: [{ required: true, message: "Please enter a subject" }],
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    size: "large",
                    placeholder: "What is this about?",
                    value: formData.subject,
                    onChange: handleChange,
                    className: "rounded-lg"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "message",
                label: /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: "Message" }),
                rules: [{ required: true, message: "Please enter your message" }],
                children: /* @__PURE__ */ jsx(
                  Input.TextArea,
                  {
                    rows: 6,
                    placeholder: "Tell us more about your inquiry...",
                    value: formData.message,
                    onChange: handleChange,
                    className: "rounded-lg"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              loading && /* @__PURE__ */ jsx(Spin, { tip: "Sending message..." }),
              errorMessage && /* @__PURE__ */ jsx(Alert, { message: errorMessage, type: "error", className: "mb-3" }),
              sentMessage && /* @__PURE__ */ jsx(Alert, { message: sentMessage, type: "success", className: "mb-3" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
              "button",
              {
                className: "primary-btn text-lg px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300",
                type: "submit",
                disabled: loading,
                children: loading ? "Sending..." : "Send Message"
              }
            ) })
          ]
        }
      ) })
    ] }) }) }) })
  ] });
}
function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "+8613800000000";
  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your heavy machinery. Can you help me?";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `whatsapp-btn ${isOpen ? "scale-105" : ""}`,
        children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleWhatsAppClick,
            onMouseEnter: () => setIsOpen(true),
            onMouseLeave: () => setIsOpen(false),
            className: "relative group w-full h-full flex items-center justify-center",
            children: [
              /* @__PURE__ */ jsx(FaWhatsapp, { size: 24, className: "relative z-10" }),
              /* @__PURE__ */ jsxs("div", { className: `absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap transition-all duration-300 shadow-professional ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`, children: [
                "Chat with us on WhatsApp",
                /* @__PURE__ */ jsx("div", { className: "absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900" })
              ] })
            ]
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed bottom-20 right-6 z-40 card-professional max-w-sm transform transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "gradient-primary rounded-full p-2 mr-3", children: /* @__PURE__ */ jsx(FaWhatsapp, { className: "text-white", size: 16 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-800", children: "Autopulse Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted", children: "Typically replies instantly" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOpen(false),
            className: "text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1",
            children: /* @__PURE__ */ jsx(FaTimes, { size: 14 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Hi there! 👋 How can we help you with heavy machinery today?" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleWhatsAppClick,
              className: "w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200 hover:border-gray-300",
              children: "💬 Get Product Information"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleWhatsAppClick,
              className: "w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200 hover:border-gray-300",
              children: "💰 Request Quote"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleWhatsAppClick,
              className: "w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200 hover:border-gray-300",
              children: "🚚 Shipping Information"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleWhatsAppClick,
          className: "w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105",
          children: [
            /* @__PURE__ */ jsx(FaWhatsapp, { className: "mr-2" }),
            "Start Chat"
          ]
        }
      )
    ] }) })
  ] });
}
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { className: "p-0 relative", children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(MachinesByBodyType, {}),
    /* @__PURE__ */ jsx(MachinesByBrand, {}),
    /* @__PURE__ */ jsx(Latest, {}),
    /* @__PURE__ */ jsx(AttachmentsByCategory, {}),
    /* @__PURE__ */ jsx(ExploreAttachments, {}),
    /* @__PURE__ */ jsx(SolutionsByProject, {}),
    /* @__PURE__ */ jsx(Services, {}),
    /* @__PURE__ */ jsx(ShipmentsShowcase, {}),
    /* @__PURE__ */ jsx(BlogPreview, {}),
    /* @__PURE__ */ jsx(FAQ, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Contact, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] });
}
const OrderSuccess = () => {
  const [popup, setPopup] = useState(true);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HomePage, {}),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Order Success",
        visible: popup,
        onCancel: () => {
          setPopup(false);
        },
        footer: null,
        children: /* @__PURE__ */ jsxs("div", { className: "flex  items-center justify-center bg-gray-100 ", style: { maxHeight: "550px" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "order-successfull-container container p-3 bg-white text-center ", children: [
            /* @__PURE__ */ jsx("div", { className: "animate-bounce", children: /* @__PURE__ */ jsx(CheckCircleOutlined, { style: { fontSize: "4rem", color: "#52c41a" } }) }),
            /* @__PURE__ */ jsxs("div", { className: "order-success-msg p-3", style: { borderRadius: "5px" }, children: [
              /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold mt-4 text-gray", children: "Order Successful Placed!" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg mt-2", children: "Thank you for your purchase." }),
              /* @__PURE__ */ jsx("a", { href: "/track", children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary btn-home-primary", children: "Track Order" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "fireworks-container" })
        ] })
      }
    )
  ] });
};
const OrderSuccess$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OrderSuccess
}, Symbol.toStringTag, { value: "Module" }));
export {
  Contact as C,
  HomePage as H,
  OrderSuccess as O,
  ProductComponent as P,
  SolutionsByProject as S,
  ProductListSkeleton as a,
  OrderSuccess$1 as b
};
