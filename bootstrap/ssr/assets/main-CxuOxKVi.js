import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { a as HomeContext, A as AttachmentComponent } from "./AttachmentComponent-BnWqiux2.js";
import { FaFacebook, FaLinkedin, FaYoutube, FaWhatsapp, FaRocket, FaHandshake, FaAward, FaCog, FaGlobe, FaUsers, FaSearch, FaTag, FaClock, FaCalendar, FaUser, FaArrowRight, FaTwitter, FaShare, FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { S as Slider } from "./Slider-D_k0UNaj.js";
import { MdCheckCircle, MdBuild, MdVerified, MdMonitor, MdFeedback, MdDelete, MdConstruction, MdOutlineLocationOn, MdWhatsapp } from "react-icons/md";
import { Layout, Drawer, Button, Row, Col, Empty, Pagination, Select, Checkbox, Flex, Card, Steps, Typography, Form, Space, Input, Tooltip, Avatar, Popconfirm, Table, Radio, Skeleton, List, Dropdown, Badge, Divider } from "antd";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { a as ProductListSkeleton, P as ProductComponent, C as Contact, A as AttachmentsByCategory } from "./OrderSuccess-Dpnj_0G2.js";
import { GrClose, GrFilter, GrUserSettings, GrDashboard, GrLocation, GrLogout, GrLogin, GrServices, GrMenu, GrHome, GrProjects, GrInfo, GrCircleInformation, GrPhone, GrMail, GrCart } from "react-icons/gr";
import { A as AppLoader } from "./AppLoader-ZfOck8L3.js";
import { Parser } from "html-to-react";
import { Toaster } from "react-hot-toast";
import { f as formatDate } from "./helpers-D56oASBL.js";
import axios$1 from "axios";
import { CiShoppingCart } from "react-icons/ci";
import debounce from "lodash.debounce";
import { SearchOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaRegUser, FaSquareWhatsapp, FaSquareInstagram } from "react-icons/fa6";
import Slider$1 from "react-slick";
import { P as ProductImageGallery, a as ProductSpecificationTable } from "./ProductImageGallery-PqcnGb5H.js";
const data = [
  {
    id: 1,
    icon: /* @__PURE__ */ jsx(MdCheckCircle, { size: 25 }),
    title: "Thorough Inspection",
    description: "Every product, whether used machinery, vehicles, or bikes, undergoes a meticulous inspection process. Our team of experts evaluates each item for functionality, durability, and safety, identifying any defects or issues that may affect performance.",
    delay: "0.1s",
    bgColor: "bg-blue-500",
    textColor: "text-blue-600"
  },
  {
    id: 2,
    icon: /* @__PURE__ */ jsx(MdBuild, { size: 25 }),
    title: "Refurbishment and Testing",
    description: "For used machinery and vehicles, we conduct thorough refurbishment and testing. This process includes replacing worn-out parts, repairing any damage, and performing rigorous operational tests to ensure optimal functionality.",
    delay: "0.2s",
    bgColor: "bg-green-500",
    textColor: "text-green-600"
  },
  {
    id: 3,
    icon: /* @__PURE__ */ jsx(MdVerified, { size: 25 }),
    title: "Certified Standards",
    description: "We adhere to international quality standards and certifications. Our products are inspected and certified to meet industry-specific requirements, providing our customers with the assurance that they are receiving reliable and safe products.",
    delay: "0.3s",
    bgColor: "bg-red-500",
    textColor: "text-red-600"
  },
  {
    id: 4,
    icon: /* @__PURE__ */ jsx(MdMonitor, { size: 25 }),
    title: "Continuous Monitoring",
    description: "Quality assurance doesn't end with inspection and testing. We continuously monitor the performance and quality of our products, making adjustments and improvements as needed to maintain the highest levels of satisfaction.",
    delay: "0.4s",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-600"
  },
  {
    id: 5,
    icon: /* @__PURE__ */ jsx(MdFeedback, { size: 25 }),
    title: "Customer Feedback",
    description: "We value our customers' input and use their feedback to enhance our products and services. By listening to our clients, we can address any concerns and improve our quality control processes.",
    delay: "0.5s",
    bgColor: "bg-purple-500",
    textColor: "text-purple-600"
  }
];
const milestones = [
  {
    year: "2009",
    title: "Company Founded",
    description: "Autopulse Global Trading Company was established in China with a vision to connect global buyers with quality machinery.",
    icon: /* @__PURE__ */ jsx(FaRocket, { className: "text-yellow-600" })
  },
  {
    year: "2012",
    title: "First International Partnership",
    description: "Expanded operations to Africa and Middle East, establishing our first major international partnerships.",
    icon: /* @__PURE__ */ jsx(FaHandshake, { className: "text-blue-600" })
  },
  {
    year: "2015",
    title: "Quality Certification",
    description: "Achieved ISO quality certifications and established our rigorous inspection processes.",
    icon: /* @__PURE__ */ jsx(FaAward, { className: "text-green-600" })
  },
  {
    year: "2018",
    title: "Digital Transformation",
    description: "Launched our digital platform, making it easier for customers to browse and purchase machinery online.",
    icon: /* @__PURE__ */ jsx(FaCog, { className: "text-purple-600" })
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Extended services to Guyana and South America, becoming a truly global trading company.",
    icon: /* @__PURE__ */ jsx(FaGlobe, { className: "text-red-600" })
  },
  {
    year: "2024",
    title: "15 Years of Excellence",
    description: "Celebrating 15 years of trusted service with over 10,000+ satisfied customers worldwide.",
    icon: /* @__PURE__ */ jsx(FaUsers, { className: "text-indigo-600" })
  }
];
const partnerBrands = [
  { name: "Doosan", logo: "/images/brands/doosan-logo.png" },
  { name: "CAT", logo: "/images/brands/cat-logo.png" },
  { name: "XCMG", logo: "/images/brands/xcmg-logo.png" },
  { name: "Komatsu", logo: "/images/brands/komatsu-logo.png" },
  { name: "Hitachi", logo: "/images/brands/hitachi-logo.png" },
  { name: "Volvo", logo: "/images/brands/volvo-logo.png" }
];
function AboutPage() {
  const { state, dispatch, methods } = useContext(HomeContext);
  const [slides, setSlides] = useState([]);
  async function fetchSlides() {
    let slides2 = await methods.loadSlides("about_slider");
    if (slides2) {
      setSlides(slides2);
    }
  }
  useEffect(() => {
    fetchSlides();
  }, []);
  const videos = [
    {
      src: "/images/WhatsApp Video 2024-08-21 at 11.48.14 PM.mp4"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "container-fluid page-header m-0 p-0",
        style: {
          height: "100%",
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/images/about-banner.jpg) center center/cover`
        },
        children: /* @__PURE__ */ jsx("div", { className: "container-fluid page-header-inner py-20 mt-16", children: /* @__PURE__ */ jsxs("div", { className: "container text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "display-2 text-white mb-4 font-bold animated slideInDown", children: "Who We Are – Trusted Global Machinery Exporters" }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-xl mb-4 opacity-90", children: "15 years of excellence in connecting global buyers with premium machinery" }),
          /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", style: { background: "transparent" }, children: /* @__PURE__ */ jsxs("ol", { className: "breadcrumb justify-content-center text-uppercase", style: { background: "transparent" }, children: [
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-light hover:text-yellow-300", children: "Home" }) }),
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item text-white active", "aria-current": "page", children: "About Us" })
          ] }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "brand-story-section py-16", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "story-content", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-6", children: "Our Story" }),
        /* @__PURE__ */ jsxs("div", { className: "story-text space-y-4 text-gray-600 text-lg leading-relaxed", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-yellow-600", children: "Who we are:" }),
            " Autopulse Global Trading Company is a premier exporter of high-quality machinery, vehicles, and equipment with over 15 years of industry expertise. Based in China, we have built a reputation for reliability, quality, and exceptional customer service."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-yellow-600", children: "What we export:" }),
            " We specialize in both used and new machinery, including construction equipment, industrial machinery, commercial and passenger vehicles, and a diverse range of bikes. Every product undergoes rigorous inspection and quality assurance processes."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-yellow-600", children: "Where we serve:" }),
            " Our global reach extends across Africa, the Middle East, Guyana, South America, and beyond. We understand the unique needs of different markets and provide customized solutions for each region."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { className: "text-yellow-600", children: "Why people trust us:" }),
            " Our commitment to honesty, transparency, and customization sets us apart. We don't just sell products – we build lasting relationships by understanding your specific needs and delivering solutions that exceed expectations."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "stats-row mt-8 grid grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "stat-item text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-yellow-600", children: "15+" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Years Experience" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-item text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-blue-600", children: "10,000+" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Happy Customers" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-item text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600", children: "50+" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Countries Served" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "story-visual", children: /* @__PURE__ */ jsx(Slider, { videos, slides, link: false }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "milestones-section py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Our Journey" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "From a small trading company to a global leader in machinery exports – here's our story of growth and excellence." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "timeline-container", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: milestones.map((milestone, index) => /* @__PURE__ */ jsxs("div", { className: "milestone-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "milestone-icon flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mr-4", children: milestone.icon }),
          /* @__PURE__ */ jsx("div", { className: "milestone-year text-2xl font-bold text-yellow-600", children: milestone.year })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-3", children: milestone.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: milestone.description })
      ] }, index)) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "partners-section py-16", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Trusted Brand Partners" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600", children: "We work with world-renowned brands to bring you the best machinery and equipment" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "partners-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center", children: partnerBrands.map((brand, index) => /* @__PURE__ */ jsx("div", { className: "partner-logo-container bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-semibold text-lg", children: brand.name }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Partner" })
      ] }) }, index)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
        /* @__PURE__ */ jsx("strong", { children: "Note:" }),
        " Partner logos and brand certifications available upon request. Contact us for detailed brand partnerships and certifications."
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "best-features about-features py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "left-content", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-yellow-600 mb-4", children: "What is Autopulse" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 leading-relaxed mb-6", children: "Autopulse Global Trading Company, with 15 years of experience, is your trusted partner in exporting high-quality used machinery, new and used vehicles, and new bikes from China. We pride ourselves on our fast shipping services and rigorous quality assurance processes, ensuring you receive top-notch products promptly and reliably. Our commitment to excellence and customer satisfaction sets us apart, making us a preferred choice for clients worldwide." }),
        /* @__PURE__ */ jsxs("ul", { className: "social-icons flex gap-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors", href: "#", children: /* @__PURE__ */ jsx(FaFacebook, { size: 20 }) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors", href: "#", children: /* @__PURE__ */ jsx(FaLinkedin, { size: 20 }) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors", href: "#", children: /* @__PURE__ */ jsx(FaYoutube, { size: 20 }) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors", href: "#", children: /* @__PURE__ */ jsx(FaWhatsapp, { size: 20 }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "right-image", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/machinery-showcase.jpg", alt: "Autopulse Machinery", className: "w-full rounded-lg shadow-lg" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" })
      ] }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "company-intro py-12 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Company Introduction" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 leading-relaxed", children: "Welcome to Autopulse Global Trading Company! Established in 2009 and headquartered in China, we have over 15 years of experience as a leading exporter of high-quality used machinery, new and used vehicles, and new bikes from China. Our extensive range of products includes industrial and construction machinery, passenger and commercial vehicles, and a variety of bikes, including mountain, road, and electric models. We are committed to delivering exceptional products and services, backed by rigorous quality assurance and fast, reliable shipping to clients worldwide. Our team of experts ensures a seamless and efficient experience, making us a trusted partner for customers across the globe." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mission py-12 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Our Mission" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 leading-relaxed", children: "At Autopulse Global Trading Company, our mission is to connect global buyers with high-quality used machinery, vehicles, and bikes from China, providing reliable and cost-effective solutions. We are dedicated to fostering long-term relationships with our customers by consistently delivering exceptional products and outstanding service. Through our commitment to quality, innovation, and efficiency, we aim to be a trusted partner, supporting the growth and success of businesses and individuals worldwide." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "quality-assurance py-12 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Quality Assurance" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 leading-relaxed mb-8", children: "At Autopulse Global Trading Company, quality assurance is a cornerstone of our operations. We implement a comprehensive quality control process to ensure that every product we offer meets our high standards and exceeds customer expectations. Our quality assurance procedures include:" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: data.map((service) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300", children: [
        /* @__PURE__ */ jsx("span", { className: `bg-yellow-500/10 text-yellow-600 p-3 rounded-full flex-shrink-0`, children: service.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-xl text-gray-800 mb-2", children: service.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: service.description })
        ] })
      ] }, service.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "cta-section py-16 bg-gradient-to-r from-yellow-600 to-yellow-700", children: /* @__PURE__ */ jsxs("div", { className: "container text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-white mb-4", children: "Let's Build Together – Get in Touch" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-yellow-100 mb-8 max-w-3xl mx-auto", children: "Ready to find the perfect machinery for your needs? Our team of experts is here to help you discover quality equipment that drives your success forward." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx("a", { href: "/contact", className: "bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg", children: "Contact Us Today" }),
        /* @__PURE__ */ jsx("a", { href: "/products", className: "bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-yellow-600 transition-colors", children: "Browse Products" })
      ] })
    ] }) })
  ] });
}
const { Option: Option$1 } = Select;
const { Footer: Footer$2, Sider: Sider$1, Content: Content$1, Header: Header$1 } = Layout;
const AllProducts = () => {
  var _a, _b, _c, _d, _e;
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const location2 = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location2.search);
  const parseParam = (param) => param ? param.split(",") : [];
  let initialCategories = parseParam(queryParams.get("categories"));
  initialCategories = initialCategories == null ? void 0 : initialCategories.map((cat) => Number(cat));
  let initialBrands = parseParam(queryParams.get("brands"));
  initialBrands = initialBrands == null ? void 0 : initialBrands.map((brand) => Number(brand));
  const initialWeights = parseParam(queryParams.get("weights"));
  const initialYears = parseParam(queryParams.get("years"));
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [selectedPrice, setSelectedPrice] = useState(queryParams.get("price") || "");
  const [page, setPage] = useState(parseInt(queryParams.get("page")) || 1);
  const [loading, setLoading] = useState(true);
  const [selectedWeights, setSelectedWeights] = useState(initialWeights);
  const [selectedYears, setSelectedYears] = useState(initialYears);
  const { state, methods } = useContext(HomeContext);
  const slug = location2.pathname.split("/")[2];
  useEffect(() => {
    methods == null ? void 0 : methods.loadBrandsAndCats({ slug });
  }, [slug]);
  useEffect(() => {
    setLoading(false);
  }, [state.filterProducts]);
  useEffect(() => {
    setLoading(true);
    methods == null ? void 0 : methods.filterProducts({ prod_type: slug, selectedCategories, selectedBrands, selectedPrice, page, selectedWeights, selectedYears });
    const queryParams2 = new URLSearchParams({
      price: selectedPrice,
      page,
      type: slug,
      categories: selectedCategories.join(","),
      brands: selectedBrands.join(","),
      weights: selectedWeights.join(","),
      years: selectedYears.join(",")
    });
    navigate(`/products/${slug}/search?${queryParams2.toString()}`);
  }, [selectedPrice, slug, selectedCategories, selectedBrands, page, selectedWeights, selectedYears]);
  const weightFilters = [
    { key: "up_to_10", value: "Up to 10 Ton" },
    { key: "up_to_20", value: "Up to 20 Ton" },
    { key: "up_to_30", value: "Up to 30 Ton" },
    { key: "up_to_40", value: "Up to 40 Ton" },
    { key: "up_to_50", value: "Up to 50 Ton" },
    { key: "over_50", value: "Over 50 Ton" }
  ];
  const yearFilters = Array.from({ length: 2024 - 2e3 + 1 }, (_, i) => 2e3 + i);
  const handleWeightChange = (checkedValues) => setSelectedWeights(checkedValues);
  const handleCategoryChange = (checkedValues) => {
    console.log("Category checked values:", checkedValues);
    setSelectedCategories(checkedValues);
  };
  const handleBrandChange = (checkedValues) => {
    console.log("Brand checked values:", checkedValues);
    setSelectedBrands(checkedValues);
  };
  const handleYearChange = (values) => {
    console.log("Year selected values:", values);
    setSelectedYears(values);
  };
  const RenderSider = () => {
    var _a2, _b2;
    return /* @__PURE__ */ jsxs(Sider$1, { width: "100%", style: { backgroundColor: "white", padding: "10px" }, children: [
      /* @__PURE__ */ jsx("h3", { style: { fontSize: "16px", borderBottom: "1px solid", padding: "10px", textAlign: "left", fontWeight: "bold" }, children: "Filters" }),
      slug != "electric-bikes" && /* @__PURE__ */ jsxs("div", { className: "filter-item", style: { marginTop: "20px", padding: "10px" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Year" }),
        /* @__PURE__ */ jsx(
          Select,
          {
            mode: "multiple",
            className: "item-group my-3",
            placeholder: "Select years",
            onChange: handleYearChange,
            style: { width: "100%" },
            value: selectedYears,
            children: yearFilters == null ? void 0 : yearFilters.map((year) => /* @__PURE__ */ jsx(Option$1, { value: year, children: year }, year))
          }
        )
      ] }),
      slug != "electric-bikes" && slug != "electric-vehicles" && /* @__PURE__ */ jsxs("div", { className: "filter-item", style: { marginTop: "20px", padding: "10px" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Weight" }),
        /* @__PURE__ */ jsx(
          Checkbox.Group,
          {
            className: "item-group flex flex-col gap-3 my-3",
            options: weightFilters == null ? void 0 : weightFilters.map((filter) => ({ label: filter.value, value: filter.key })),
            onChange: handleWeightChange,
            value: selectedWeights
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "filter-item", style: { marginTop: "20px", padding: "10px" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Brands" }),
        /* @__PURE__ */ jsx(
          Checkbox.Group,
          {
            className: "item-group flex flex-col gap-3 my-3",
            options: (_a2 = state == null ? void 0 : state.brands) == null ? void 0 : _a2.map((brand) => ({ label: brand.name, value: brand.id })),
            onChange: handleBrandChange,
            value: selectedBrands
          }
        )
      ] }),
      slug != "electric-bikes" && /* @__PURE__ */ jsxs("div", { className: "filter-item", style: { marginTop: "20px", padding: "10px" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Categories" }),
        /* @__PURE__ */ jsx(
          Checkbox.Group,
          {
            className: "item-group flex flex-col gap-3 my-3",
            options: (_b2 = state == null ? void 0 : state.categories) == null ? void 0 : _b2.map((cat) => ({ label: cat.name, value: cat.id })),
            onChange: handleCategoryChange,
            value: selectedCategories
          }
        )
      ] })
    ] });
  };
  return /* @__PURE__ */ jsx("div", { className: "pt-3 mb-20 all-products-container mx-auto", style: { width: "100%", maxWidth: "1500px" }, children: /* @__PURE__ */ jsxs(Layout, { style: { overflow: "hidden" }, children: [
    /* @__PURE__ */ jsx(
      Drawer,
      {
        title: /* @__PURE__ */ jsxs("div", { style: { display: "flex !important" }, className: "mobile-all-prod-filters hidden flex justify-between w-full ", children: [
          /* @__PURE__ */ jsx("h4", { children: "Menu" }),
          /* @__PURE__ */ jsx(GrClose, { onClick: onClose })
        ] }),
        placement: "left",
        closable: false,
        onClose,
        open,
        width: 250,
        children: /* @__PURE__ */ jsx(RenderSider, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "desktop-all-prod-filters p-0", style: { width: "250px", marginRight: "10px" }, children: /* @__PURE__ */ jsx(RenderSider, {}) }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Header$1, { className: "z-[1] bg-white p-3 hidden mobile-all-prod-filters", children: /* @__PURE__ */ jsx(Button, { className: "p-3 border text-dark", onClick: showDrawer, icon: /* @__PURE__ */ jsx(GrFilter, { size: 20, color: "black" }), children: "Filter" }) }),
      /* @__PURE__ */ jsx(Content$1, { children: /* @__PURE__ */ jsx("div", { className: "latest-products", children: /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", style: { minHeight: "70vh" }, children: [
        loading && /* @__PURE__ */ jsx(ProductListSkeleton, {}),
        !loading && ((_b = (_a = state == null ? void 0 : state.filterProducts) == null ? void 0 : _a.products) == null ? void 0 : _b.length) > 0 ? /* @__PURE__ */ jsx(Row, { gutter: [10], children: (_d = (_c = state == null ? void 0 : state.filterProducts) == null ? void 0 : _c.products) == null ? void 0 : _d.map((item, index) => /* @__PURE__ */ jsx(
          Col,
          {
            xs: 12,
            sm: 10,
            md: 8,
            lg: 8,
            xl: 6,
            xxl: 6,
            span: 8,
            className: "mb-4",
            children: /* @__PURE__ */ jsx(ProductComponent, { prod: item })
          },
          index
        )) }) : /* @__PURE__ */ jsx(Empty, {})
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer$2, { children: /* @__PURE__ */ jsx(Pagination, { current: page, onChange: (current) => setPage(current), pageSize: 16, total: (_e = state == null ? void 0 : state.filterProducts) == null ? void 0 : _e.total }) })
    ] })
  ] }) });
};
function ContactPage() {
  return /* @__PURE__ */ jsxs("div", { id: "about", className: "about  ", children: [
    /* @__PURE__ */ jsx("div", { class: "container-fluid page-header m-0 p-0", style: { height: "100%", background: `url(/images/about-banner.jpg) center center/cover` }, children: /* @__PURE__ */ jsx("div", { class: "container-fluid page-header-inner py-5", children: /* @__PURE__ */ jsxs("div", { class: "container text-center", children: [
      /* @__PURE__ */ jsx("h1", { class: "display-3 text-white mb-3 animated slideInDown", children: "Contact Us" }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", style: { background: "transparent" }, children: /* @__PURE__ */ jsxs("ol", { class: "breadcrumb justify-content-center text-uppercase", style: { background: "transparent" }, children: [
        /* @__PURE__ */ jsx("li", { class: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-light", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { class: "breadcrumb-item text-white active", "aria-current": "page", children: "Contact" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container flex flex-col gap-4 ", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row lg:justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { className: "container newsletter mt-3  wow fadeIn  lg:pt-0 lg:pr-4 ", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", "data-aos": "fade-up", children: "Let's Connect" }),
      /* @__PURE__ */ jsx("p", { className: "py-2 text-lg text-gray-600", "data-aos": "fade-up", "data-aos-delay": "100", children: "We would love to hear from you! Whether you have questions about our products, need support, or want to provide feedback, our team is here to assist you. Reach out to us through the contact form or by the information provided below. We are committed to providing you with prompt and helpful responses." })
    ] }) }) }),
    /* @__PURE__ */ jsx(Contact, {})
  ] });
}
function ProductType() {
  var _a, _b, _c, _d;
  const { state, methods, dispatch } = useContext(HomeContext);
  const prod_type = location.pathname.split("/").pop();
  useEffect(() => {
    methods.loadBrandsAndCats({ slug: prod_type });
    methods.filterProducts({ prod_type, page: 1 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "sm-p-0 container pt-5 p-3 sm:p-0 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "brands-container p-3 bg-white py-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 py-5 pb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "Brands" }),
        /* @__PURE__ */ jsx("h2", { className: "text-secondary text-2xl font-semibold", children: "Explore By Brands" })
      ] }),
      /* @__PURE__ */ jsx(Row, { gutter: [16, 16], justify: "center", children: (_a = state == null ? void 0 : state.brands) == null ? void 0 : _a.map((brand, index) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          Col,
          {
            xs: 12,
            sm: 8,
            md: 6,
            lg: 4,
            xl: 3,
            xxl: 2,
            style: { marginBottom: "1rem" },
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/products/${prod_type}/search?brands=${brand.id}&page=1&price=&type=${prod_type}`,
                className: "product-card block",
                style: { height: "100%" },
                "data-aos": "zoom-in",
                "data-aos-delay": "100",
                children: /* @__PURE__ */ jsxs("div", { className: "product-item w-full h-full flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300", style: { minHeight: "120px" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "image-container", style: { height: "60px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem" }, children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      loading: "lazy",
                      style: {
                        maxHeight: "60px",
                        maxWidth: "100%",
                        objectFit: "contain",
                        width: "auto",
                        height: "auto"
                      },
                      src: `${(_a2 = brand == null ? void 0 : brand.logo) == null ? void 0 : _a2.replace("public", "/storage")}`,
                      alt: (brand == null ? void 0 : brand.name) || "Brand logo"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "text-dark font-medium text-primary text-center", style: { fontSize: "1rem", lineHeight: "1.3", fontWeight: "600" }, children: brand == null ? void 0 : brand.name })
                ] })
              }
            )
          },
          index
        );
      }) })
    ] }),
    prod_type != "electric-bikes" && /* @__PURE__ */ jsxs("div", { className: "categories-container p-3 bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 py-5 pb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "Categories" }),
        /* @__PURE__ */ jsx("h2", { className: "text-secondary text-2xl font-semibold", children: "Explore By Categories" })
      ] }),
      /* @__PURE__ */ jsx(Row, { gutter: [16, 16], justify: "center", children: (_b = state == null ? void 0 : state.categories) == null ? void 0 : _b.map((cat, index) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          Col,
          {
            xs: 12,
            sm: 8,
            md: 6,
            lg: 4,
            xl: 3,
            xxl: 2,
            style: { marginBottom: "1rem" },
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/products/${prod_type}/search?categories=${cat.id}&page=1&price=&type=${prod_type}`,
                className: "product-card block",
                style: { height: "100%" },
                "data-aos": "zoom-in",
                "data-aos-delay": "100",
                children: /* @__PURE__ */ jsxs("div", { className: "product-item w-full h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300", style: { minHeight: "160px" }, children: [
                  /* @__PURE__ */ jsx("div", { className: "image-container", style: { height: "120px", width: "100%", overflow: "hidden" }, children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      loading: "lazy",
                      style: {
                        height: "100%",
                        width: "100%",
                        objectFit: "cover"
                      },
                      src: `${(_a2 = cat == null ? void 0 : cat.image) == null ? void 0 : _a2.replace("public", "/storage")}`,
                      alt: (cat == null ? void 0 : cat.name) || "Category image"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "p-3 flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-dark font-medium text-primary text-center", style: { fontSize: "1rem", lineHeight: "1.3", fontWeight: "600" }, children: cat == null ? void 0 : cat.name }) })
                ] })
              }
            )
          },
          index
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "latest-products my-5 bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 py-5 pb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "Products" }),
        /* @__PURE__ */ jsx("h2", { className: "text-secondary text-2xl font-semibold", children: "Explore Products" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 sm-p-0", style: { minHeight: "70vh" }, children: [
        /* @__PURE__ */ jsx(Row, { gutter: [8, 8], justify: "center", children: (_d = (_c = state == null ? void 0 : state.filterProducts) == null ? void 0 : _c.products) == null ? void 0 : _d.map((prod, index) => index <= 11 && /* @__PURE__ */ jsx(
          Col,
          {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 6,
            xl: 6,
            xxl: 4,
            style: { marginBottom: "1rem" },
            children: /* @__PURE__ */ jsx(ProductComponent, { prod, index })
          },
          index
        )) }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "link",
            href: location.pathname + "/search",
            className: "primary-btn mx-auto px-10 py-3",
            style: {
              minHeight: "44px",
              borderRadius: "8px"
            },
            children: "View All Products"
          }
        ) })
      ] })
    ] })
  ] });
}
const { Step } = Steps;
const { Title, Text: Text$1 } = Typography;
const steps = [
  { title: "Pending", description: "Order received", date: "2024-06-01", emoji: "🕐" },
  { title: "Processing", description: "Order is being processed", date: "2024-06-02", emoji: "🔄" },
  { title: "Shipping", description: "Order is on the way", date: "2024-06-03", emoji: "🚚" },
  { title: "Shipped", description: "Order has been shipped", date: "2024-06-04", emoji: "📦" },
  { title: "Delivered", description: "Order delivered to customer", date: "", emoji: "📬" }
];
function Track() {
  var _a, _b, _c;
  const { state, dispatch, methods } = useContext(HomeContext);
  useEffect(() => {
    if (state == null ? void 0 : state.auth)
      methods == null ? void 0 : methods.loadUserOrders();
  }, [state == null ? void 0 : state.auth]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-whtite p-3 container", children: [
    /* @__PURE__ */ jsx("div", { class: "container-fluid page-header m-0 p-0", style: { height: "100%", background: `url(https://img.freepik.com/free-vector/tiny-man-ordering-products-online-via-smartphone_74855-15542.jpg?w=1380&t=st=1718950111~exp=1718950711~hmac=7b69e587a309e610e48395c3c73deca1d1c46ad7a25ef71b)center center/cover` }, children: /* @__PURE__ */ jsx("div", { class: "container-fluid page-header-inner py-5", children: /* @__PURE__ */ jsxs("div", { class: "container text-center", children: [
      /* @__PURE__ */ jsx("h1", { class: "display-3 text-white mb-3 animated slideInDown", children: "Track" }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", style: { background: "transparent" }, children: /* @__PURE__ */ jsxs("ol", { class: "breadcrumb justify-content-center text-uppercase", style: { background: "transparent" }, children: [
        /* @__PURE__ */ jsx("li", { class: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { class: "breadcrumb-item text-white active", "aria-current": "page", children: "Track" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container order-tracking-container container bg-white p-3", children: (state == null ? void 0 : state.auth) ? /* @__PURE__ */ jsxs("div", { style: { padding: "20px" }, children: [
      !((_a = state == null ? void 0 : state.orders) == null ? void 0 : _a.lenght) < 1 ? /* @__PURE__ */ jsx(
        Empty,
        {
          className: "pt-5",
          imageStyle: {
            height: "100%",
            width: "300px"
          },
          image: "/images/emtycart.png",
          description: /* @__PURE__ */ jsxs(Flex, { align: "center", className: "flex-col", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold mt-4 text-gray", children: "Oops! No pending order found" }),
            /* @__PURE__ */ jsx("a", { href: "/products", children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary btn-home-primary", children: "View Products" }) })
          ] })
        }
      ) : "",
      (_c = (_b = (state == null ? void 0 : state.orders) && (state == null ? void 0 : state.orders[0])) == null ? void 0 : _b.orders) == null ? void 0 : _c.map((o, index) => {
        var _a2;
        return /* @__PURE__ */ jsxs(Card, { title: `Order ID: ${o == null ? void 0 : o.id}`, bordered: true, children: [
          /* @__PURE__ */ jsx(Fragment, { children: (_a2 = o == null ? void 0 : o.order_details) == null ? void 0 : _a2.map((prod, index2) => {
            return /* @__PURE__ */ jsx("div", {});
          }) }),
          /* @__PURE__ */ jsx(Steps, { current: Number(o == null ? void 0 : o.status), children: steps == null ? void 0 : steps.map((step, index2) => /* @__PURE__ */ jsx(
            Step,
            {
              title: /* @__PURE__ */ jsxs("div", { children: [
                step.emoji,
                " ",
                step.title
              ] }),
              description: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Text$1, { children: step.description }),
                step.date && /* @__PURE__ */ jsxs(Text$1, { type: "secondary", children: [
                  " (",
                  step.date,
                  ")"
                ] })
              ] })
            },
            index2
          )) })
        ] }, index);
      })
    ] }) : /* @__PURE__ */ jsx(
      "div",
      {
        className: "not-login-user-container",
        style: { background: "url('/images/not-login.png') center center/cover" },
        children: /* @__PURE__ */ jsx(Flex, { className: "py-20", justify: "center", align: "center", children: /* @__PURE__ */ jsx("a", { href: "/login", children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary btn-home-primary", children: "Login" }) }) })
      }
    ) })
  ] });
}
function AllBlogs() {
  var _a;
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { state, methods, dispatch } = useContext(HomeContext);
  const navigate = useNavigate();
  const categories = [
    { id: "all", name: "All Posts", color: "bg-gray-100 text-gray-800", icon: "📰" },
    { id: "shipping", name: "Shipping Tips", color: "bg-blue-100 text-blue-800", icon: "🚢" },
    { id: "machinery", name: "Machine Knowledge", color: "bg-yellow-100 text-yellow-800", icon: "⚙️" },
    { id: "customer", name: "Customer Stories", color: "bg-green-100 text-green-800", icon: "👥" },
    { id: "industry", name: "Industry News", color: "bg-purple-100 text-purple-800", icon: "📈" },
    { id: "trading", name: "Global Trading", color: "bg-red-100 text-red-800", icon: "🌍" },
    { id: "equipment", name: "Equipment Guide", color: "bg-indigo-100 text-indigo-800", icon: "🔧" }
  ];
  async function fetchBlogs() {
    setLoading(true);
    let blogs2 = await methods.loadBlogs();
    if (blogs2) {
      setBlogs(blogs2);
      setFilteredBlogs(blogs2);
      setLoading(false);
    }
  }
  useEffect(() => {
    let filtered = blogs;
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()) || blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => {
        const title = blog.title.toLowerCase();
        const content = (blog.content || "").toLowerCase();
        const description = (blog.description || "").toLowerCase();
        switch (selectedCategory) {
          case "shipping":
            return title.includes("shipping") || content.includes("shipping") || description.includes("shipping");
          case "machinery":
            return title.includes("machine") || title.includes("equipment") || content.includes("machine") || content.includes("equipment");
          case "customer":
            return title.includes("customer") || title.includes("story") || content.includes("customer") || content.includes("story");
          case "industry":
            return title.includes("industry") || title.includes("news") || content.includes("industry") || content.includes("news");
          case "trading":
            return title.includes("trading") || title.includes("global") || content.includes("trading") || content.includes("global");
          case "equipment":
            return title.includes("equipment") || title.includes("guide") || content.includes("equipment") || content.includes("guide");
          default:
            return true;
        }
      });
    }
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, blogs]);
  useEffect(() => {
    fetchBlogs();
  }, []);
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "Discover insights about machinery, shipping, and our global trading expertise...";
    const text = content.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const formatDate2 = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const getReadTime = (content) => {
    if (!content) return "3 min read";
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime} min read`;
  };
  const getBlogCategory = (blog) => {
    const title = blog.title.toLowerCase();
    const content = (blog.content || "").toLowerCase();
    if (title.includes("shipping") || content.includes("shipping")) return "shipping";
    if (title.includes("machine") || title.includes("equipment") || content.includes("machine")) return "machinery";
    if (title.includes("customer") || title.includes("story")) return "customer";
    if (title.includes("industry") || title.includes("news")) return "industry";
    if (title.includes("trading") || title.includes("global")) return "trading";
    if (title.includes("equipment") || title.includes("guide")) return "equipment";
    return "machinery";
  };
  return /* @__PURE__ */ jsxs("div", { className: "blogs-page", children: [
    /* @__PURE__ */ jsx("div", { className: "banner-section relative", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "container-fluid page-header m-0 p-0 relative",
        style: {
          height: "500px",
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/about-banner.jpg) center center/cover`
        },
        children: /* @__PURE__ */ jsx("div", { className: "container-fluid page-header-inner h-full flex flex-col items-center justify-center", style: { paddingTop: "120px" }, children: /* @__PURE__ */ jsxs("div", { className: "container text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "display-2 text-white mb-6 font-bold animated slideInDown leading-tight", style: { fontSize: "3.5rem", fontWeight: "700" }, children: "Latest News & Machinery Knowledge" }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-xl mb-6 opacity-90 leading-relaxed", style: { fontSize: "1.25rem", lineHeight: "1.6" }, children: "Stay updated with the latest insights, tips, and stories from the world of global machinery trading" }),
          /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", style: { background: "transparent" }, children: /* @__PURE__ */ jsxs("ol", { className: "breadcrumb justify-content-center text-uppercase", style: { background: "transparent" }, children: [
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-light hover:text-yellow-300 transition-colors", children: "Home" }) }),
            /* @__PURE__ */ jsx("li", { className: "breadcrumb-item text-white active", "aria-current": "page", children: "Blogs" })
          ] }) })
        ] }) })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "container my-8", children: /* @__PURE__ */ jsx("div", { className: "search-filter-section bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-md-6 mb-4 mb-md-0", children: /* @__PURE__ */ jsxs("div", { className: "search-box relative", children: [
        /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search articles by title, content, or keywords...",
            className: "w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "categories-filter", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Filter by Category:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: categories.map((category) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setSelectedCategory(category.id),
            className: `px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${selectedCategory === category.id ? "bg-yellow-600 text-white shadow-lg transform scale-105" : category.color + " hover:shadow-md hover:scale-105"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-base", children: category.icon }),
              /* @__PURE__ */ jsx("span", { children: category.name })
            ]
          },
          category.id
        )) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "container my-8", children: loading ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsx(AppLoader, {}),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-6 text-lg", children: "Loading latest articles..." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-3 leading-tight", style: { fontSize: "2rem", fontWeight: "700" }, children: searchTerm ? `Search results for "${searchTerm}"` : selectedCategory !== "all" ? `${(_a = categories.find((c) => c.id === selectedCategory)) == null ? void 0 : _a.name}` : "All Articles" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-lg", style: { fontSize: "1.125rem" }, children: [
          filteredBlogs.length,
          " article",
          filteredBlogs.length !== 1 ? "s" : "",
          " found"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "row", children: filteredBlogs.length > 0 ? filteredBlogs.map((blog, index) => {
        var _a2, _b;
        return /* @__PURE__ */ jsx("div", { className: "col-12 col-md-6 col-lg-4 mb-6", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "blog-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full cursor-pointer transform hover:-translate-y-2 overflow-hidden border border-gray-100",
            onClick: () => navigate(`/blogs/${blog.slug}`),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden h-48", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: ((_a2 = blog.image) == null ? void 0 : _a2.replace("public", "/storage")) || "/images/blog-placeholder.jpg",
                    className: "w-full h-full object-cover transition-transform duration-700 hover:scale-105",
                    alt: blog.title,
                    style: { maxHeight: "192px" }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxs("span", { className: "bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center", children: [
                  /* @__PURE__ */ jsx(FaTag, { className: "mr-2" }),
                  ((_b = categories.find((c) => c.id === getBlogCategory(blog))) == null ? void 0 : _b.name) || "Featured"
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center shadow-lg", children: [
                  /* @__PURE__ */ jsx(FaClock, { className: "text-xs mr-1.5" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: getReadTime(blog.content) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col h-full", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-500 text-sm mb-4", children: [
                  /* @__PURE__ */ jsx(FaCalendar, { className: "mr-2 text-gray-400" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-base", children: formatDate2(blog.created_at) }),
                  /* @__PURE__ */ jsx("div", { className: "mx-2", children: "•" }),
                  /* @__PURE__ */ jsx(FaUser, { className: "mr-2 text-gray-400" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-base", children: "Autopulse Team" })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-4 line-clamp-2 hover:text-yellow-600 transition-colors leading-tight", style: { fontSize: "24px", fontWeight: "700", lineHeight: "1.3" }, children: blog.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed", style: { fontSize: "16px", lineHeight: "1.6" }, children: getExcerpt(blog.content) }),
                /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: `/blogs/${blog.slug}`,
                    className: "inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      "Read More",
                      /* @__PURE__ */ jsx(FaArrowRight, { className: "ml-2" })
                    ]
                  }
                ) })
              ] })
            ]
          }
        ) }, blog.id || index);
      }) : /* @__PURE__ */ jsxs("div", { className: "col-12 text-center py-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-400 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "mx-auto h-24 w-24", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-600 mb-2", children: "No articles found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "Try adjusting your search terms or filters" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setSearchTerm("");
              setSelectedCategory("all");
            },
            className: "bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300",
            children: "Clear Filters"
          }
        )
      ] }) })
    ] }) })
  ] });
}
function SingleBlog() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [readTime, setReadTime] = useState(0);
  const contentRef = useRef(null);
  const { methods } = useContext(HomeContext);
  async function fetchBlog() {
    try {
      setLoading(true);
      const blogId = window.location.pathname.split("/").pop();
      const fetchedBlog = await (methods == null ? void 0 : methods.loadBlogs(blogId));
      const recent = await (methods == null ? void 0 : methods.loadBlogs());
      if (fetchedBlog) {
        const blogData = Array.isArray(fetchedBlog) ? fetchedBlog[0] : fetchedBlog;
        setBlog(blogData);
        if (blogData.content) {
          const wordCount = blogData.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
          setReadTime(Math.ceil(wordCount / 200));
        }
      }
      if (recent) {
        setRecentBlogs(recent);
      }
    } catch (error) {
      console.error("Failed to load blog:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBlog();
  }, []);
  useEffect(() => {
    if (blog && contentRef.current) {
      const contentElement = contentRef.current;
      const style = document.createElement("style");
      style.textContent = `
        .blog-content {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.8;
          color: #374151;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }
        
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #111827;
          margin: 1.8rem 0 1rem 0;
          line-height: 1.3;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 1.5rem 0 0.8rem 0;
          line-height: 1.4;
        }
        
        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 1.2rem 0 0.6rem 0;
          line-height: 1.4;
        }
        
        .blog-content h5 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        .blog-content h6 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0.8rem 0 0.4rem 0;
          line-height: 1.4;
        }
        
        .blog-content p {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          color: #374151;
          line-height: 1.8;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease;
          max-height: 500px;
          object-fit: cover;
        }
        
        .blog-content img:hover {
          transform: scale(1.02);
        }
        
        .blog-content blockquote {
          border-left: 4px solid #f59e0b;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background-color: #fef3c7;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #92400e;
          font-size: 1.125rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.6;
        }
        
        .blog-content ul li {
          list-style-type: disc;
        }
        
        .blog-content ol li {
          list-style-type: decimal;
        }
        
        .blog-content a {
          color: #f59e0b;
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        
        .blog-content a:hover {
          color: #d97706;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        
        .blog-content table th {
          background-color: #f9fafb;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .blog-content table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        
        .blog-content table tr:hover {
          background-color: #f9fafb;
        }
        
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #dc2626;
        }
        
        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        
        .blog-content .video-embed {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          margin: 2rem 0;
        }
        
        .blog-content .video-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
        
        @media (max-width: 768px) {
          .blog-content h1 {
            font-size: 2rem;
          }
          
          .blog-content h2 {
            font-size: 1.75rem;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
          }
          
          .blog-content p {
            font-size: 1rem;
          }
          
          .blog-content li {
            font-size: 1rem;
          }
        }
      `;
      document.head.appendChild(style);
      contentElement.innerHTML = blog.content;
      contentElement.classList.add("blog-content");
    }
  }, [blog]);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Loading blog content..." })
    ] });
  }
  if (!blog) {
    return /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Blog not found" }),
      /* @__PURE__ */ jsx("a", { href: "/blogs", className: "primary-btn px-6 py-3 inline-block rounded-lg text-white", children: "Back to Blogs" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative h-96 md:h-[500px] overflow-hidden",
        style: {
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${(blog == null ? void 0 : blog.image) ? blog.image.replace("public", "/storage") : "/images/blog-placeholder.jpg"}) center center/cover`
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-white px-4", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold mb-4 leading-tight", children: blog.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-6 text-sm md:text-base", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(FaUser, { className: "mr-2" }),
                /* @__PURE__ */ jsx("span", { children: "Autopulse Team" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(FaCalendar, { className: "mr-2" }),
                /* @__PURE__ */ jsx("span", { children: new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(FaClock, { className: "mr-2" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  readTime,
                  " min read"
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-0 right-0", children: /* @__PURE__ */ jsx("nav", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center space-x-2 text-white text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/", className: "hover:text-yellow-300 transition-colors", children: "Home" }) }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
              /* @__PURE__ */ jsx("a", { href: "/blogs", className: "hover:text-yellow-300 transition-colors", children: "Blogs" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: blog.title })
            ] })
          ] }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxs("article", { className: "bg-white rounded-lg shadow-lg p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 pb-6 border-b border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Share:" }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                  target: "_blank",
                  className: "text-blue-600 hover:text-blue-700 transition-colors",
                  children: /* @__PURE__ */ jsx(FaFacebook, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`,
                  target: "_blank",
                  className: "text-blue-400 hover:text-blue-500 transition-colors",
                  children: /* @__PURE__ */ jsx(FaTwitter, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  target: "_blank",
                  className: "text-blue-700 hover:text-blue-800 transition-colors",
                  children: /* @__PURE__ */ jsx(FaLinkedin, { size: 20 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-600", children: [
            /* @__PURE__ */ jsx(FaShare, { className: "mr-2" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Share Article" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: contentRef, className: "prose prose-lg max-w-none" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 sticky top-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 mb-6", children: "Recent Articles" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: recentBlogs == null ? void 0 : recentBlogs.slice(0, 5).map((recentBlog) => /* @__PURE__ */ jsxs("div", { className: "group cursor-pointer", children: [
          /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-lg mb-3", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105",
              src: (recentBlog == null ? void 0 : recentBlog.image) ? recentBlog.image.replace("public", "/storage") : "/images/blog-placeholder.jpg",
              alt: recentBlog.title,
              style: { maxHeight: "128px" }
            }
          ) }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2", children: recentBlog.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: new Date(recentBlog.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }) })
        ] }, recentBlog.id)) })
      ] }) })
    ] }) })
  ] });
}
function Footer$1() {
  return /* @__PURE__ */ jsxs("div", { className: "container-fluid bg-gray-800 text-light footer wow fadeIn", "data-wow-delay": "0.1s", style: { position: "static", marginTop: "0" }, children: [
    /* @__PURE__ */ jsx("div", { className: "container pb-5", children: /* @__PURE__ */ jsxs("div", { className: "row g-5", children: [
      /* @__PURE__ */ jsx("div", { className: "col-md-6 col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-yellow-600 rounded p-4", children: [
        /* @__PURE__ */ jsx("a", { href: "index.html", children: /* @__PURE__ */ jsx("h1", { className: "text-white text-uppercase mb-3", children: "Autopulse" }) }),
        /* @__PURE__ */ jsx("p", { className: "mb-0 text-white", children: "Welcome to our business! We offer a comprehensive marketplace for heavy machinery including rollers, cranes, and bulldozers. Explore our extensive range of spare parts and products tailored for businesses in the heavy equipment industry. Enjoy a seamless and efficient purchasing experience with us." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-lg-3", children: [
        /* @__PURE__ */ jsx("h6", { className: "section-title text-start text-primary text-uppercase mb-4", children: "Contact" }),
        /* @__PURE__ */ jsx("h3", { children: "China Address" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-2 text-gray-100", children: [
          /* @__PURE__ */ jsx("i", { className: "fa fa-map-marker-alt me-3" }),
          "Unit 1603, 16th Floor, The L. Plaza, 367 - 375 Queen's Road Central, Sheung Wan, Hong Kong"
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "USA Address" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-2 text-gray-100", children: [
          /* @__PURE__ */ jsx("i", { className: "fa fa-map-marker-alt me-3" }),
          "312 W 2ND ST PMB 5596 CASPER WY 82601-2412 UNITED STATES"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mb-2 text-gray-100", children: [
          /* @__PURE__ */ jsx("i", { className: "fa fa-phone-alt me-3" }),
          /* @__PURE__ */ jsx("a", { href: `https://wa.me/13072950382?`, style: { fontWeight: "500" }, children: "+1307 2950382                        " })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mb-2 text-gray-100", children: [
          /* @__PURE__ */ jsx("i", { className: "fa fa-envelope me-3" }),
          /* @__PURE__ */ jsx("a", { style: { fontWeight: "500" }, href: "mailto:autopulsetrading@gmail.com", children: "info@autopulsetrading.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-5 col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "row gy-5 g-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("h6", { className: "section-title text-start text-primary text-uppercase mb-4", children: "Company" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "/about", children: "About Us" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "/contact", children: "Contact Us" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "/privacy-policy", children: "Privacy Policy" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("h6", { className: "section-title text-start text-primary text-uppercase mb-4", children: "Services" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "", children: "Blogs" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "#products-container", children: "Products" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "", children: "Track" }),
          /* @__PURE__ */ jsx("a", { className: "btn btn-link", href: "", children: "Contact" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "copyright", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-md-6 text-center text-md-start mb-3 mb-md-0", children: [
        "© ",
        /* @__PURE__ */ jsx("a", { className: "border-bottom", href: "/", children: "Autopulse" }),
        ", All Right Reserved by Autopulse                        "
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-md-6 text-center text-md-end", children: /* @__PURE__ */ jsxs("div", { className: "footer-menu", children: [
        /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }),
        /* @__PURE__ */ jsx("a", { href: "/contact", children: "Help" }),
        /* @__PURE__ */ jsx("a", { href: "#faq-container", children: "FQAs" })
      ] }) })
    ] }) }) })
  ] });
}
const CheckoutForm = ({ cart_items_ids }) => {
  const createStripeSession = async () => {
    try {
      let formValues = new FormData();
      formValues.append("cart_items_ids", cart_items_ids);
      const response = await axios$1.post("/session", formValues);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };
  const handleCheckout = () => {
    createStripeSession();
  };
  return /* @__PURE__ */ jsx("div", { className: "checkout", children: /* @__PURE__ */ jsx(Button, { className: "btn btn-primary btn-home-primary", onClick: handleCheckout, children: "Checkout" }) });
};
const { Option } = Select;
const Cart = ({ open, onClose, auth }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const context = useContext(HomeContext);
  const { state, dispatch, methods } = context;
  let total_price = (_b = (_a = state == null ? void 0 : state.cart) == null ? void 0 : _a.cartItems) == null ? void 0 : _b.reduce((prev, curr) => {
    var _a2;
    const itemTotal = parseFloat((_a2 = curr == null ? void 0 : curr.product) == null ? void 0 : _a2.price) * (curr == null ? void 0 : curr.quantity);
    return prev + itemTotal;
  }, 0);
  let cart_items_ids = (_d = (_c = state == null ? void 0 : state.cart) == null ? void 0 : _c.cartItems) == null ? void 0 : _d.map((cart) => cart.id);
  const onFinish = async (values) => {
    if (!(values == null ? void 0 : values.is_shipping_same) && !(values == null ? void 0 : values.shipping_first_name)) {
      return alert("Shippng address is required.");
    }
    try {
      let formValues = new FormData();
      formValues.append("cart_items_ids", cart_items_ids);
      formValues.append("total_amount", total_price);
      for (const i in values) {
        formValues.append(i, values[i]);
      }
      const response = await axios.post("/checkout/product", formValues);
      if (response.data.success) {
        window.location.href = response.data.url;
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };
  const changeCheckoutStep = (step) => {
    if (step <= 2)
      methods == null ? void 0 : methods.proceedCart(step);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Drawer,
    {
      title: `Product Cart`,
      width: 1200,
      onClose,
      open,
      styles: {
        body: {
          paddingBottom: 80,
          background: "rgb(254, 248, 245)"
        }
      },
      extra: /* @__PURE__ */ jsxs(Space, { children: [
        ((_e = state == null ? void 0 : state.cart) == null ? void 0 : _e.checkout_step) > 0 && /* @__PURE__ */ jsx(Button, { onClick: () => {
          var _a2;
          changeCheckoutStep(((_a2 = state == null ? void 0 : state.cart) == null ? void 0 : _a2.checkout_step) - 1);
        }, children: "Previous" }),
        ((_f = state == null ? void 0 : state.cart) == null ? void 0 : _f.checkout_step) < 1 && (cart_items_ids == null ? void 0 : cart_items_ids.length) > 0 && /* @__PURE__ */ jsx(Button, { className: "btn btn-primary btn-home-primary", onClick: () => {
          var _a2;
          changeCheckoutStep(((_a2 = state == null ? void 0 : state.cart) == null ? void 0 : _a2.checkout_step) + 1);
        }, type: "primary", children: "Proceed" })
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "container bg-white p-3", style: { minHeight: "100%" }, children: [
        /* @__PURE__ */ jsx(
          Steps,
          {
            className: "step-container",
            current: (_g = state == null ? void 0 : state.cart) == null ? void 0 : _g.checkout_step,
            items: [
              {
                title: "Cart",
                description: "Fil the cart with the selected products"
              },
              {
                title: "Billing Address",
                description: "complete form with billing address"
              },
              {
                title: "Payment",
                description: "process payment through cards"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsx(Form, { className: "p-3 bg-white", style: { width: "100%", background: "rgb(254, 248, 245)" }, onFinish, initialValues: auth.user, layout: "vertical", children: /* @__PURE__ */ jsx(
          RenderCheckoutStep,
          {
            auth,
            state,
            methods,
            current_step: (_h = state == null ? void 0 : state.cart) == null ? void 0 : _h.checkout_step,
            cart_items_ids,
            total_price,
            dispatch
          }
        ) })
      ] })
    }
  ) });
};
function RenderCheckoutStep({ auth, state, methods, dispatch, current_step, total_price, cart_items_ids }) {
  var _a, _b, _c;
  const [displayShippingFrom, setDisplayShippingForm] = useState(false);
  const handleChangeQuantity = (e, id) => {
    if (e.target.value < 1) {
      return;
    }
    methods == null ? void 0 : methods.changeCartQuantity(e.target.value, id);
  };
  switch (current_step) {
    case 0: {
      return /* @__PURE__ */ jsx(CartComponent, { state, handleChangeQuantity, dispatch, removeFromCart: methods.removeFromCart });
    }
    case 1: {
      return /* @__PURE__ */ jsxs(Flex, { align: "top", gap: 30, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", style: { flexDirection: "column", width: "70%" }, children: [
          /* @__PURE__ */ jsx("h5", { className: "py-2 text-left", children: "Billing Address" }),
          /* @__PURE__ */ jsx("hr", {}),
          /* @__PURE__ */ jsxs(Row, { className: "pt-4", gutter: 16, children: [
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_first_name",
                label: "First Name",
                rules: [
                  {
                    required: true,
                    message: "Please enter your first name"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { value: (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.name, placeholder: "Please enter your first name" })
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_last_name",
                label: "Last Name",
                rules: [
                  {
                    required: true,
                    message: "Please enter your last name"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your last name" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_phone",
                label: "Phone",
                rules: [
                  {
                    required: true,
                    message: "Please enter your phone number"
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your phone number" })
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_email",
                label: "Email",
                rules: [
                  {
                    required: true,
                    message: "Please enter your email address"
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your email address" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 24, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "billing_address_line1",
              label: "Address Line 1",
              rules: [
                {
                  required: true,
                  message: "Please enter your address"
                }
              ],
              children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your address" })
            }
          ) }) }),
          /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 24, children: /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "billing_address_line2",
              label: "Address Line 2",
              children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your address (optional)" })
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_city",
                label: "City",
                rules: [
                  {
                    required: true,
                    message: "Please enter your city"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your city" })
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_state",
                label: "State",
                rules: [
                  {
                    required: true,
                    message: "Please enter your state"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your state" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_postal_code",
                label: "Zip Code",
                rules: [
                  {
                    required: true,
                    message: "Please enter your zip code"
                  },
                  {
                    pattern: /^[0-9]{5}$/,
                    message: "Please enter a valid 5-digit zip code"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your zip code" })
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "billing_country",
                label: "Country",
                rules: [
                  {
                    required: true,
                    message: "Please select your country"
                  }
                ],
                children: /* @__PURE__ */ jsxs(Select, { placeholder: "Please select your country", children: [
                  /* @__PURE__ */ jsx(Option, { value: "usa", children: "United States" }),
                  /* @__PURE__ */ jsx(Option, { value: "canada", children: "Canada" }),
                  /* @__PURE__ */ jsx(Option, { value: "other", children: "Other" })
                ] })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("hr", {}),
          /* @__PURE__ */ jsx("h5", { className: "py-2 text-left", children: "Shipping Address" }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "is_shipping_same",
              valuePropName: "checked",
              children: /* @__PURE__ */ jsx(
                Checkbox,
                {
                  onChange: (e) => setDisplayShippingForm(!e.target.checked),
                  className: "py-2",
                  children: /* @__PURE__ */ jsx(Tooltip, { title: "Check this box, to make this product a business product", children: "Same As Billing Address?" })
                }
              )
            }
          ),
          displayShippingFrom && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Row, { className: "pt-4", gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_first_name",
                  label: "First Name",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your first name"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { value: (_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.name, placeholder: "Please enter your first name" })
                }
              ) }),
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_last_name",
                  label: "Last Name",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your last name"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your last name" })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_phone",
                  label: "Phone",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your phone number"
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your phone number" })
                }
              ) }),
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_email",
                  label: "Email",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your email address"
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your email address" })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 24, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "shipping_address_line1",
                label: "Address Line 1",
                rules: [
                  {
                    required: true,
                    message: "Please enter your address"
                  }
                ],
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your address" })
              }
            ) }) }),
            /* @__PURE__ */ jsx(Row, { gutter: 16, children: /* @__PURE__ */ jsx(Col, { span: 24, children: /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "shipping_address_line2",
                label: "Address Line 2",
                children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your address (optional)" })
              }
            ) }) }),
            /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_city",
                  label: "City",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your city"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your city" })
                }
              ) }),
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_state",
                  label: "State",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your state"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your state" })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_postal_code",
                  label: "Zip Code",
                  rules: [
                    {
                      required: true,
                      message: "Please enter your zip code"
                    },
                    {
                      pattern: /^[0-9]{5}$/,
                      message: "Please enter a valid 5-digit zip code"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Please enter your zip code" })
                }
              ) }),
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "shipping_country",
                  label: "Country",
                  rules: [
                    {
                      required: true,
                      message: "Please select your country"
                    }
                  ],
                  children: /* @__PURE__ */ jsxs(Select, { placeholder: "Please select your country", children: [
                    /* @__PURE__ */ jsx(Option, { value: "usa", children: "United States" }),
                    /* @__PURE__ */ jsx(Option, { value: "canada", children: "Canada" }),
                    /* @__PURE__ */ jsx(Option, { value: "other", children: "Other" })
                  ] })
                }
              ) })
            ] })
          ] })
        ] }),
        renderOrderSummary(
          {
            cart: (_c = state == null ? void 0 : state.cart) == null ? void 0 : _c.cartItems,
            total: total_price,
            cart_items_ids
          }
        )
      ] });
    }
    case 2: {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Cart" }),
        /* @__PURE__ */ jsx(CheckoutForm, { amount: total_price, cart_items_ids })
      ] });
    }
    default:
      return /* @__PURE__ */ jsx(CartComponent, { state, handleChangeQuantity, dispatch, removeFromCart: methods.removeFromCart });
  }
}
function renderOrderSummary({ cart, total, cart_items_ids }) {
  var _a;
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text, record) => {
        var _a2;
        return /* @__PURE__ */ jsx("span", { children: (_a2 = record == null ? void 0 : record.product) == null ? void 0 : _a2.name });
      },
      align: "left"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => /* @__PURE__ */ jsxs("span", { children: [
        "X",
        record == null ? void 0 : record.quantity
      ] }),
      align: "left"
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        var _a2;
        return /* @__PURE__ */ jsx("span", { children: Number(record.quantity) * Number((_a2 = record == null ? void 0 : record.product) == null ? void 0 : _a2.price) });
      },
      align: "right"
    }
  ];
  const data2 = (_a = cart ?? []) == null ? void 0 : _a.map((item, index) => {
    var _a2;
    return {
      key: index,
      product: item.product,
      quantity: item.quantity,
      total: Number(item.quantity) * Number((_a2 = item == null ? void 0 : item.product) == null ? void 0 : _a2.price)
    };
  });
  return /* @__PURE__ */ jsxs("div", { style: { width: "30%" }, className: "order-summay p-3 bg-white ", children: [
    /* @__PURE__ */ jsx("h5", { className: "text-left py-2", children: "Order Summary" }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsxs("div", { className: "heading mt-4", children: [
      /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "space-between", className: "header py-3", children: [
        /* @__PURE__ */ jsx("h6", { children: "PRODUCT" }),
        /* @__PURE__ */ jsx("h6", { children: "TOTAL" })
      ] }),
      /* @__PURE__ */ jsx(
        Table,
        {
          className: "cart-table",
          columns,
          dataSource: data2,
          pagination: false,
          rowClassName: (record, index) => index % 2 === 0 ? "even-row" : "odd-row"
        }
      ),
      /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "space-between", className: "header py-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "SUBTOTAL" }),
        /* @__PURE__ */ jsx("strong", { children: total })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "space-between", className: "header py-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "SHIPPING" }),
        /* @__PURE__ */ jsx("strong", { children: "$0" })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "space-between", className: "header py-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "DISCOUNT" }),
        /* @__PURE__ */ jsx("strong", { children: "$0" })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "space-between", className: "header py-3", children: [
        /* @__PURE__ */ jsx("h6", { children: "TOTAL" }),
        /* @__PURE__ */ jsx("h6", { children: total })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "py-3 bg-white", children: /* @__PURE__ */ jsx(Radio, { checked: true, value: "highToLow", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "Credit / Debit Card" }) }) }),
      /* @__PURE__ */ jsx(Tooltip, { title: "Proceed to payment", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary btn-home-primary", children: "Proceed Checkout" }) })
    ] })
  ] });
}
const CartComponent = ({ state, dispatch, handleChangeQuantity, removeFromCart }) => {
  var _a;
  const cartItems = ((_a = state == null ? void 0 : state.cart) == null ? void 0 : _a.cartItems) || [];
  if (cartItems.length < 1) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center pt-5", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/emtycart.png",
          alt: "Empty Cart",
          className: "h-60 w-auto"
        }
      ),
      /* @__PURE__ */ jsx(Typography.Text, { className: "mt-4", children: "Oops, You have no product in your cart!" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          href: "/products",
          className: "mt-4",
          type: "primary",
          icon: /* @__PURE__ */ jsx(CiShoppingCart, { size: 20, color: "white", stroke: "2" }),
          children: "View Products"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: cartItems.map((item, index) => {
    var _a2, _b, _c, _d, _e, _f;
    return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border rounded-lg shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(Avatar, { size: "large", src: (_b = (_a2 = item == null ? void 0 : item.product) == null ? void 0 : _a2.image) == null ? void 0 : _b.replace("public", "/storage") }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: (_c = item == null ? void 0 : item.product) == null ? void 0 : _c.name }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
            "Added: ",
            formatDate((_d = item == null ? void 0 : item.product) == null ? void 0 : _d.created_at)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-gray-800", children: [
            "$",
            (_e = item == null ? void 0 : item.product) == null ? void 0 : _e.price
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            defaultValue: item == null ? void 0 : item.quantity,
            min: 1,
            max: Number((_f = item == null ? void 0 : item.product) == null ? void 0 : _f.stock),
            onChange: (e) => handleChangeQuantity(e, item == null ? void 0 : item.id),
            className: "w-20"
          }
        ),
        /* @__PURE__ */ jsx(
          Popconfirm,
          {
            title: "Remove Item",
            onConfirm: () => {
              var _a3;
              return removeFromCart.call(dispatch, (_a3 = item == null ? void 0 : item.product) == null ? void 0 : _a3.id);
            },
            okText: "Yes",
            cancelText: "No",
            placement: "topRight",
            children: /* @__PURE__ */ jsx(MdDelete, { title: "Remove Item", className: "text-red-500 cursor-pointer", size: 20 })
          }
        )
      ] })
    ] }, item.id);
  }) });
};
const { Text } = Typography;
function ProductSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 500px)").matches);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 500px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const performSearch = async (value) => {
    setLoading(true);
    try {
      const response = await axios$1.get(`/search-products`, { params: { search_term: value } });
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
    setLoading(false);
    setSearchPerformed(true);
  };
  const debouncedSearch = useCallback(
    debounce((value) => performSearch(value), 300),
    []
  );
  useEffect(() => {
    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      setFilteredProducts([]);
      setSearchPerformed(false);
    }
  }, [searchValue, debouncedSearch]);
  const handleIconClick = () => {
    if (searchValue) {
      performSearch(searchValue);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container m-auto above-search-container d-block m-0 p-0 ml-auto", style: { marginLeft: "auto", position: "relative", maxWidth: "700px", width: "100%" }, children: [
    /* @__PURE__ */ jsx("div", { className: "p-0", children: /* @__PURE__ */ jsx(
      Input,
      {
        style: {
          height: "40px",
          borderRadius: "30px",
          border: "1.2px solid black",
          width: isFocused && isMobile ? "98vw" : "100%",
          zIndex: isFocused && isMobile ? 1e3 : "auto",
          position: isFocused && isMobile ? "relative" : "static",
          transition: "all 0.3s ease"
        },
        value: searchValue,
        onChange: (e) => setSearchValue(e.target.value),
        placeholder: "Search products",
        suffix: /* @__PURE__ */ jsx(SearchOutlined, { onClick: handleIconClick, style: { cursor: "pointer" } }),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false)
      }
    ) }),
    loading ? /* @__PURE__ */ jsx("div", { className: "filtered-product-list", style: { display: "flex", justifyContent: "center", position: "relative" }, children: /* @__PURE__ */ jsx(Skeleton, { className: "bg-white p-3", style: { position: "absolute", top: "10px", background: "white", zIndex: "100000" }, active: true, size: "large" }) }) : searchPerformed && (filteredProducts.length > 0 ? /* @__PURE__ */ jsx(
      List,
      {
        className: "filtered-product-list",
        bordered: true,
        dataSource: filteredProducts,
        renderItem: (item) => /* @__PURE__ */ jsx("a", { href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/product/${item == null ? void 0 : item.slug}`, children: /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(
          List.Item.Meta,
          {
            avatar: /* @__PURE__ */ jsx(
              "img",
              {
                loading: "lazy",
                height: 40,
                width: 40,
                src: `${item == null ? void 0 : item.image.replace("public", "/storage")}`,
                style: { width: 50, height: 50, objectFit: "cover" }
              }
            ),
            title: /* @__PURE__ */ jsx("a", { style: { fontSize: "16px", fontWeight: "500" }, href: `/product/${item == null ? void 0 : item.slug}`, children: item == null ? void 0 : item.name })
          }
        ) }) })
      }
    ) : /* @__PURE__ */ jsx(Empty, { className: "empty-product-container", description: "No Products Found", style: { marginTop: "10px" } }))
  ] });
}
const ProfileDropdown = ({ auth, hideIcon = false }) => {
  var _a, _b;
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        location.href = `/profile`;
        break;
      case "signOut":
        location.href = "/logout";
        break;
      case "admin_dash":
        location.href = "/dashboard/home";
        break;
    }
  };
  const menuItems = [
    {
      key: "profile",
      icon: /* @__PURE__ */ jsx(GrUserSettings, { size: 15 }),
      label: ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.name) ?? "Guest"
    },
    ...((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.email) == "admin@autopulse.com" ? [{
      key: "admin_dash",
      icon: /* @__PURE__ */ jsx(GrDashboard, { size: 15 }),
      label: "Dashboard"
    }] : [],
    {
      key: "trackOrder",
      icon: /* @__PURE__ */ jsx(GrLocation, { size: 15 }),
      label: "Track Order"
    },
    auth.user ? {
      key: "signOut",
      icon: /* @__PURE__ */ jsx(GrLogout, {}),
      label: "Sign Out",
      style: { color: "red" }
    } : {
      key: "singIn",
      icon: /* @__PURE__ */ jsx(GrLogin, {}),
      label: "SignIn",
      style: { color: "green" }
    }
  ];
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      className: "p-0",
      menu: {
        items: menuItems,
        onClick: handleMenuClick
      },
      trigger: ["click"],
      children: /* @__PURE__ */ jsx(Button, { className: "primary-btn", icon: /* @__PURE__ */ jsx(FaRegUser, {}), children: "  " })
    }
  );
};
const items = [
  {
    key: 1,
    label: /* @__PURE__ */ jsxs("a", { className: "flex items-center gap-2", rel: "noopener noreferrer", href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/products/machine`, children: [
      /* @__PURE__ */ jsx(GrServices, {}),
      "   Heavy Machinery"
    ] })
  },
  {
    key: 2,
    label: /* @__PURE__ */ jsxs("a", { className: "flex items-center gap-2", rel: "noopener noreferrer", href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/products/attachments`, children: [
      /* @__PURE__ */ jsx(MdConstruction, {}),
      " Attachments & Accessories"
    ] })
  }
];
const ProdDropdown = () => /* @__PURE__ */ jsx(
  Dropdown,
  {
    menu: {
      items
    },
    children: /* @__PURE__ */ jsx("a", { onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx(Space, { className: "text-light", style: { color: "white", cursor: "pointer", fontWeight: "500" }, children: "Products" }) })
  }
);
const App$1 = ({ position = "left" }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleNavigation = (url) => {
    onClose();
    window.location.href = url;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: showDrawer,
        className: "mobile-menu-trigger p-2 rounded-md hover:bg-gray-700 transition-colors",
        "aria-label": "Open navigation menu",
        children: /* @__PURE__ */ jsx(Space, { className: "text-light", style: { color: "white", cursor: "pointer", fontWeight: "500" }, children: /* @__PURE__ */ jsx(GrMenu, { size: 20, color: "white" }) })
      }
    ),
    /* @__PURE__ */ jsxs(
      Drawer,
      {
        title: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white text-lg font-semibold m-0", children: "Navigation" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "text-white hover:text-gray-300 p-2 rounded-md transition-colors min-w-[44px] min-h-[44px]",
              "aria-label": "Close menu",
              children: /* @__PURE__ */ jsx(GrClose, { size: 18 })
            }
          )
        ] }),
        placement: position,
        closable: false,
        onClose,
        open,
        width: 320,
        className: "mobile-navigation-drawer",
        style: { background: "#1F2937" },
        bodyStyle: { padding: "0" },
        children: [
          /* @__PURE__ */ jsx("nav", { className: "mobile-navigation-menu", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-2 text-dark p-4", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                className: "flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                onClick: () => handleNavigation("/"),
                children: [
                  /* @__PURE__ */ jsx(GrHome, { color: "#6B7280", size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-base", children: "Home" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 text-white", children: [
                /* @__PURE__ */ jsx(GrServices, { color: "#6B7280", size: 20 }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-base", children: "Products" })
              ] }),
              /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-1 pl-6 border-l-2 border-gray-600 ml-4", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                    onClick: () => handleNavigation("/products/machine"),
                    children: [
                      /* @__PURE__ */ jsx(GrServices, { color: "#6B7280", size: 18 }),
                      /* @__PURE__ */ jsx("span", { className: "text-white font-normal text-sm", children: "Heavy Machinery" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                    onClick: () => handleNavigation("/products/attachments"),
                    children: [
                      /* @__PURE__ */ jsx(MdConstruction, { color: "#6B7280", size: 18 }),
                      /* @__PURE__ */ jsx("span", { className: "text-white font-normal text-sm", children: "Attachments & Accessories" })
                    ]
                  }
                ) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                className: "flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                onClick: () => handleNavigation("/solutions"),
                children: [
                  /* @__PURE__ */ jsx(GrProjects, { color: "#6B7280", size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-base", children: "Solutions" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                className: "flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                onClick: () => handleNavigation("/blogs"),
                children: [
                  /* @__PURE__ */ jsx(GrInfo, { color: "#6B7280", size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-base", children: "Blogs" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                className: "flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                onClick: () => handleNavigation("/about"),
                children: [
                  /* @__PURE__ */ jsx(GrCircleInformation, { color: "#6B7280", size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-base", children: "About Us" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                className: "flex items-center gap-3 p-4 hover:bg-gray-700 rounded-lg transition-colors w-full text-left min-h-[44px]",
                onClick: () => handleNavigation("/contact"),
                children: [
                  /* @__PURE__ */ jsx(GrPhone, { color: "#6B7280", size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-base", children: "Contact" })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("style", { jsx: true, children: `
                    .mobile-navigation-drawer .ant-drawer-header {
                        background: #1F2937;
                        border-bottom: 1px solid #374151;
                        padding: 16px 24px;
                    }
                    
                    .mobile-navigation-drawer .ant-drawer-body {
                        background: #1F2937;
                        padding: 0;
                    }
                    
                    .mobile-navigation-menu {
                        height: 100%;
                        overflow-y: auto;
                    }
                    
                    .mobile-menu-trigger:focus {
                        outline: 2px solid #3B82F6;
                        outline-offset: 2px;
                    }
                    
                    @media (max-width: 480px) {
                        .mobile-navigation-drawer {
                            width: 280px !important;
                        }
                    }
                ` })
        ]
      }
    )
  ] });
};
const Navbar = ({ auth }) => {
  var _a, _b, _c, _d, _e, _f;
  const [open, setOpen] = useState(false);
  const context = useContext(HomeContext);
  const { state, dispatch, methods } = context;
  const [scrollY, setScrollY] = useState(window.scrollY);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll2 = () => {
      const navFixElement = document.getElementById("nav-fix");
      if (navFixElement) {
        if (window.scrollY >= 40) {
          navFixElement.style.transform = "translateY(0)";
          navFixElement.style.position = "sticky";
          navFixElement.style.top = "0";
          navFixElement.style.width = "100%";
          navFixElement.style.background = "transparent";
          navFixElement.style.borderRadius = "0px";
          navFixElement.classList.remove("container");
        } else {
          navFixElement.style.transform = "";
          navFixElement.style.position = "static";
          navFixElement.style.background = "";
          navFixElement.classList.add("container");
          navFixElement.style.borderRadius = "30px";
        }
      }
    };
    window.addEventListener("scroll", handleScroll2);
    return () => {
      window.removeEventListener("scroll", handleScroll2);
    };
  }, []);
  useEffect(() => {
    if (auth == null ? void 0 : auth.user) {
      methods.loadCart();
    }
  }, [state.loadingCart]);
  const menuItems = [
    { key: "2", label: /* @__PURE__ */ jsx("a", { href: "/solutions", children: "Solutions" }) },
    { key: "3", label: /* @__PURE__ */ jsx("a", { href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/blogs`, children: "Blogs" }) },
    { key: "4", label: /* @__PURE__ */ jsx("a", { href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/about`, children: "About Us" }) },
    { key: "5", label: /* @__PURE__ */ jsx("a", { href: `${location.pathname.split("/")[1] == "parts" ? "/parts" : ""}/contact`, children: "Contact" }) }
  ];
  const socialIcons = /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/autopulseglobaltrading/", children: /* @__PURE__ */ jsx(FaFacebookSquare, { size: 20, className: "text-light-500" }) }),
    /* @__PURE__ */ jsx("a", { href: "", children: /* @__PURE__ */ jsx(FaSquareWhatsapp, { size: 20, className: "text-ligt-500" }) }),
    /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/autopulseglobaltrading/", children: /* @__PURE__ */ jsx(FaLinkedin, { size: 20, className: "text-light-500" }) }),
    /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/autopulseglobaltradingg/", children: /* @__PURE__ */ jsx(FaSquareInstagram, { size: 20, className: "text-light-500" }) }),
    /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/@autopulseglobaltrading/", children: /* @__PURE__ */ jsx(FaYoutubeSquare, { size: 20, className: "text-light-500" }) })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-0 relative z-50 pb-1 mobile-optimized", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsx(Cart, { auth, open, onClose: () => setOpen(false) }),
    /* @__PURE__ */ jsxs("div", { className: "nav-up flex justify-between items-center text-white nav-up-content", style: { padding: "0.5vw" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { gap: "3vw" }, className: "hidden flex items-center unhide-750 mt-2 mx-1", children: [
        /* @__PURE__ */ jsx("div", { className: "mobile-menu-button", children: /* @__PURE__ */ jsx(App$1, {}) }),
        /* @__PURE__ */ jsx("a", { href: "/", className: "mobile-logo", children: /* @__PURE__ */ jsx("img", { loading: "lazy", width: 80, src: "/images/final_logo.png", alt: "Logo" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 hide-1200 mobile-contact-info", children: [
        /* @__PURE__ */ jsxs(Tooltip, { title: "Phone number", className: "text-sm flex items-center gap-1 contact-item", children: [
          /* @__PURE__ */ jsx(FaWhatsapp, { size: 20 }),
          /* @__PURE__ */ jsx("a", { href: `https://wa.me/13072950382?`, style: { fontWeight: "500" }, children: "+1307 2950382" })
        ] }),
        /* @__PURE__ */ jsxs(Tooltip, { title: "Email Us", className: "text-sm flex items-center gap-1 contact-item", children: [
          /* @__PURE__ */ jsx(GrMail, { size: 20 }),
          /* @__PURE__ */ jsx("a", { style: { fontWeight: "500" }, href: "mailto:autopulsetrading@gmail.com", children: "info@autopulsetrading.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-4 py-2 lg:flex justify-center d-none", children: /* @__PURE__ */ jsx(ProductSearch, {}) }),
      /* @__PURE__ */ jsx("div", { id: "home-nav-top", className: "px-4 py-2 lg:flex justify-center", children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "flex gap-8 text-white", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "text-light", style: { fontWeight: "500" }, href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ProdDropdown, {}) }),
        menuItems == null ? void 0 : menuItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { style: { fontWeight: "500" }, className: "text-light", href: item.label.props.href, children: item.label.props.children }) }, item.key))
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 hide-750", children: socialIcons }),
      /* @__PURE__ */ jsxs("div", { className: "hidden unhide-1200 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { style: { gap: "3vw" }, className: "hidden flex items-center icons-container unhide-750 hide-1200 mx-1", children: [
          location.pathname.split("/")[1] === "parts" && /* @__PURE__ */ jsx(Badge, { count: (_b = (_a = state == null ? void 0 : state.cart) == null ? void 0 : _a.cartItems) == null ? void 0 : _b.length, className: "flex items-center gap-3 hide-750", children: /* @__PURE__ */ jsxs("a", { className: "icon-container", onClick: () => setOpen(true), children: [
            /* @__PURE__ */ jsx(GrCart, { className: "text-xl cursor-pointer", onClick: () => setOpen(true) }),
            /* @__PURE__ */ jsx("span", { children: "Cart" })
          ] }) }),
          location.pathname.split("/")[1] === "parts" && /* @__PURE__ */ jsxs("a", { href: "/track", className: "text-gray-800 flex icon-container hide-1200 items-center gap-1", children: [
            /* @__PURE__ */ jsx(MdOutlineLocationOn, { size: 20, className: "text-lg" }),
            /* @__PURE__ */ jsx("span", { children: "Track" })
          ] }),
          !auth.user ? /* @__PURE__ */ jsx("a", { href: "/login", className: "text-light-800 icon-container flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { className: "text-light", children: " Login" }) }) : /* @__PURE__ */ jsx("a", { href: "/logout", className: "text-light-800 icon-container flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { className: "text-light", children: " Logout" }) }),
          !auth.user && /* @__PURE__ */ jsx("a", { href: "/register", className: "text-gray icon-container flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { className: "text-light", children: "Register" }) }),
          /* @__PURE__ */ jsx("div", { className: "hide-1200", children: /* @__PURE__ */ jsx(ProfileDropdown, { auth }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden unhide-1200 hide-750 flex gap-3 items-center", children: [
          /* @__PURE__ */ jsx(App$1, { position: "right" }),
          /* @__PURE__ */ jsx(ProfileDropdown, { auth })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "nav-fix", className: "container nav-down flex justify-between items-center gap-3 bg-white search-container", style: { borderRadius: "30px", padding: "1.5vw" }, children: [
      /* @__PURE__ */ jsx("a", { href: "/", className: "hide-750", children: /* @__PURE__ */ jsx("img", { loading: "lazy", width: 150, src: "/images/final_logo.png", alt: "" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center justify-between sm-gap-3", style: { width: "100%" }, children: [
        /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(ProductSearch, {}) }),
        /* @__PURE__ */ jsxs("div", { style: { marginRight: "3vw" }, className: "d-none unhide-750 sm-gap-3 flex gap-4 items-center hide-1200", children: [
          location.pathname.split("/")[1] === "parts" && /* @__PURE__ */ jsx(Badge, { count: (_d = (_c = state == null ? void 0 : state.cart) == null ? void 0 : _c.cartItems) == null ? void 0 : _d.length, className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(Button, { className: "primary-btn", icon: /* @__PURE__ */ jsx(GrCart, { className: "text-xl cursor-pointer" }), onClick: () => setOpen(true) }) }),
          /* @__PURE__ */ jsx("div", { className: "unhide-1200 unhide-750", children: /* @__PURE__ */ jsx(ProfileDropdown, { auth }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 icons-container hide-750", children: [
          location.pathname.split("/")[1] === "parts" && /* @__PURE__ */ jsx(Badge, { count: (_f = (_e = state == null ? void 0 : state.cart) == null ? void 0 : _e.cartItems) == null ? void 0 : _f.length, className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("a", { className: "icon-container", onClick: () => setOpen(true), children: [
            /* @__PURE__ */ jsx(GrCart, { className: "text-xl cursor-pointer", onClick: () => setOpen(true) }),
            /* @__PURE__ */ jsx("span", { children: "Cart" })
          ] }) }),
          location.pathname.split("/")[1] === "parts" && /* @__PURE__ */ jsxs("a", { href: "/track", className: "text-gray-800 flex icon-container hide-1200 items-center gap-1", children: [
            /* @__PURE__ */ jsx(MdOutlineLocationOn, { size: 20, className: "text-lg" }),
            /* @__PURE__ */ jsx("span", { children: "Track" })
          ] }),
          !auth.user ? /* @__PURE__ */ jsx("a", { href: "/login", className: "text-gray-800 primary-btn icon-container flex items-center gap-1", children: "Login" }) : /* @__PURE__ */ jsx("a", { href: "/logout", className: "primary-btn icon-container flex items-center gap-1", children: "Logout" }),
          !auth.user && /* @__PURE__ */ jsx("a", { href: "/register", className: "primary-btn text-gray icon-container flex items-center gap-1", children: "Register" }),
          /* @__PURE__ */ jsx("div", { className: "hide-1200", children: /* @__PURE__ */ jsx(ProfileDropdown, { auth }) })
        ] })
      ] })
    ] })
  ] });
};
function HomeLayout({ auth, header, children }) {
  const { state } = useState();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen ", style: { background: "#fef8f5" }, children: [
    state == null ? void 0 : state.contextHolder,
    /* @__PURE__ */ jsx(Navbar, { auth }),
    /* @__PURE__ */ jsx("main", { id: "main", style: { background: "#fef8f5", minHeight: "200px" }, children }),
    /* @__PURE__ */ jsx(Footer$1, {})
  ] }) });
}
function PrivacyPolicy() {
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { class: "container-fluid page-header m-0 p-0", style: { height: "100%", background: `url(/images/about-banner.jpg) center center/cover` }, children: /* @__PURE__ */ jsx("div", { class: "container-fluid page-header-inner py-5 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { class: " text-center", children: [
    /* @__PURE__ */ jsx("h1", { class: "display-3 text-white text-center mb-3 animated slideInDown", children: "Privacy Policy" }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", style: { background: "transparent" }, children: /* @__PURE__ */ jsxs("ol", { class: "breadcrumb justify-content-center text-uppercase", style: { background: "transparent" }, children: [
      /* @__PURE__ */ jsx("li", { class: "breadcrumb-item", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-light", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { class: "breadcrumb-item text-white active", "aria-current": "page", children: "Privacy Policy" })
    ] }) })
  ] }) }) }) });
}
function BusinessProd({ header = true }) {
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
    methods.loadBusinessprods();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "latest-products container p-3 bg-white mt-3 no-horizontal-padding", style: { padding: "30px 12px" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 py-2 pb-4 flex align-center justify-between px-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-secondary text-lg font-semibold", children: "Related Products" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary btn-home-primary", children: "View All" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-0 no-horizontal-padding", style: { position: "relative", paddingLeft: 0, paddingRight: 0 }, children: [
      /* @__PURE__ */ jsxs(Flex, { align: "center", style: { position: "absolute", right: "0", top: "-40px" }, justify: "end", gap: 10, className: "flex  justify-between mb-2 mr-auto", children: [
        /* @__PURE__ */ jsx(Button, { onClick: () => sliderRef.current.slickPrev(), icon: /* @__PURE__ */ jsx(LeftOutlined, {}) }),
        /* @__PURE__ */ jsx(Button, { onClick: () => sliderRef.current.slickNext(), icon: /* @__PURE__ */ jsx(RightOutlined, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pr-0", style: { paddingRight: "0px !important", width: "100%" }, children: /* @__PURE__ */ jsx(Slider$1, { ref: sliderRef, ...settings, children: (_a = state == null ? void 0 : state.relatedProducts) == null ? void 0 : _a.map((prod, index) => /* @__PURE__ */ jsx(ProductComponent, { prod, index })) }) })
    ] })
  ] });
}
const ProductHero = ({ product }) => {
  var _a;
  const heroImageUrl = (product == null ? void 0 : product.image) ? product.image.replace("public", "/storage") : ((_a = product == null ? void 0 : product.category) == null ? void 0 : _a.image) ? product.category.image.replace("public", "/storage") : "/storage/images/default-category.jpg";
  const heroTitle = (product == null ? void 0 : product.name) || "Product Details";
  return /* @__PURE__ */ jsx("div", { className: "hero-section", children: /* @__PURE__ */ jsxs("div", { className: "hero-image-container", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: heroImageUrl,
        alt: (product == null ? void 0 : product.name) || "Product",
        className: "hero-image"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "hero-overlay", children: /* @__PURE__ */ jsx("h1", { className: "hero-title", children: heroTitle }) })
  ] }) });
};
const App = () => {
  var _a;
  const [reviewData, setReviewData] = useState([]);
  const context = useContext(HomeContext);
  const { state, methods } = context;
  useEffect(() => {
    methods.getProductDetails(location.pathname.split("/").pop());
  }, []);
  async function fetchReviews() {
    var _a2;
    let reviews = await methods.loadReviews((_a2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a2.id);
    if (reviews) {
      setReviewData(reviews);
    }
  }
  useEffect(() => {
    fetchReviews();
  }, [state.selectedProduct]);
  const product = state == null ? void 0 : state.selectedProduct;
  let galleryImages = ((_a = product == null ? void 0 : product.images) == null ? void 0 : _a.map((img) => ({
    ...img,
    path: img.path || img.image_path
  }))) || [];
  if (product == null ? void 0 : product.image) {
    const mainImagePath = product.image.replace("public", "/storage");
    const mainImageAlreadyInGallery = galleryImages.some((img) => {
      var _a2;
      const imgPath = (_a2 = img.path || img.image_path) == null ? void 0 : _a2.replace("public", "/storage");
      return imgPath === mainImagePath;
    });
    if (!mainImageAlreadyInGallery) {
      galleryImages = [
        {
          path: product.image,
          alt: product.name || "Main Image",
          isMainImage: true
        },
        ...galleryImages
      ];
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "product-page-container", children: [
    /* @__PURE__ */ jsx(ProductHero, { product }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4", children: [
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
          /* @__PURE__ */ jsx(ProductSpecificationTable, { product }),
          /* @__PURE__ */ jsx(Divider, {}),
          (product == null ? void 0 : product.features) && /* @__PURE__ */ jsx(Card, { title: "Key Features", className: "features-card mb-4", children: /* @__PURE__ */ jsx("div", { className: "product-features", children: Parser().parse(product.features) }) }),
          /* @__PURE__ */ jsx("div", { className: "action-buttons", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: `https://wa.me/13072950382?text=${encodeURIComponent("Hey, I'm interested in " + (product == null ? void 0 : product.name))}`,
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
      /* @__PURE__ */ jsx("div", { className: "product-description-section", children: /* @__PURE__ */ jsx(Card, { title: "Product Description", className: "description-card", children: /* @__PURE__ */ jsx("div", { className: "product-description", children: (product == null ? void 0 : product.description) ? Parser().parse(product.description) : /* @__PURE__ */ jsx("p", { children: "No description available for this product." }) }) }) }),
      /* @__PURE__ */ jsx(Divider, { className: "section-divider" }),
      /* @__PURE__ */ jsx(BusinessProd, {})
    ] })
  ] });
};
const { Footer, Sider, Content, Header } = Layout;
const contentStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff"
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "white"
};
function AllAttachments() {
  var _a, _b, _c, _d, _e, _f, _g;
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const navigate = useNavigate();
  const location2 = useLocation();
  const { state, dispatch, methods } = useContext(HomeContext);
  const queryParams = new URLSearchParams(location2.search);
  const initialPrice = queryParams.get("price") || "";
  const initialCategories = (queryParams.get("categories") || "").split(",");
  const initialType = queryParams.get("type") || "";
  const initialSort = queryParams.get("sort") || "desc";
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice);
  const [type, setType] = useState(initialType);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    methods == null ? void 0 : methods.loadAttachmentCategories();
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [state.filterAttachments]);
  useEffect(() => {
    setLoading(true);
    methods == null ? void 0 : methods.filterAttachments({ selectedPrice, sort, type, selectedCategories, page });
    const newSearchParams = new URLSearchParams({
      price: selectedPrice,
      categories: selectedCategories.join(","),
      page: page.toString(),
      type,
      sort
    });
    navigate(`/products/attachments?${newSearchParams.toString()}`);
  }, [selectedPrice, selectedCategories, sort, type, page]);
  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const RenderSider = () => {
    var _a2;
    return /* @__PURE__ */ jsxs(Sider, { width: "100%", style: { backgroundColor: "white", padding: "10px" }, children: [
      /* @__PURE__ */ jsx("h3", { style: { fontSize: "16px", borderBottom: "1px solid", padding: "10px", textAlign: "left", fontWeight: "bold" }, children: "Filters" }),
      /* @__PURE__ */ jsxs("div", { className: "filter-item py-10 pl-3 pb-3", style: { fontWeight: "500" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Sort Product" }),
        /* @__PURE__ */ jsxs(Radio.Group, { className: "item-group", onChange: handleSortChange, children: [
          /* @__PURE__ */ jsx(Radio, { className: "", value: "asc", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "New First" }) }),
          /* @__PURE__ */ jsx(Radio, { value: "desc", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "Old First" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "filter-item py-10 pl-3 pb-3", style: { fontWeight: "500" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Product Type" }),
        /* @__PURE__ */ jsxs(Radio.Group, { className: "item-group", onChange: handleTypeChange, children: [
          /* @__PURE__ */ jsx(Radio, { className: "", value: "business", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "Business Products" }) }),
          /* @__PURE__ */ jsx(Radio, { value: "customer", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "Non Business" }) }),
          /* @__PURE__ */ jsx(Radio, { value: "", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "Both" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "filter-item py-10 pl-3", style: { fontWeight: "500" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Price" }),
        /* @__PURE__ */ jsxs(Radio.Group, { className: "item-group", onChange: handlePriceChange, children: [
          /* @__PURE__ */ jsx(Radio, { className: "", value: "lowToHigh", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "Low to High" }) }),
          /* @__PURE__ */ jsx(Radio, { value: "highToLow", children: /* @__PURE__ */ jsx("span", { style: { fontWeight: "500" }, children: "High to Low" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "filter-item pl-3", style: { marginTop: "20px" }, children: [
        /* @__PURE__ */ jsx("strong", { className: "text-dark heading", children: "Categories" }),
        /* @__PURE__ */ jsx(
          Checkbox.Group,
          {
            className: "item-group flex flex-col gap-3 my-3",
            onChange: handleCategoryChange,
            value: selectedCategories,
            children: Array.isArray(state == null ? void 0 : state.attachmentCategories) && ((_a2 = state == null ? void 0 : state.attachmentCategories) == null ? void 0 : _a2.map((cat, index) => {
              return /* @__PURE__ */ jsx(Checkbox, { className: "montserrat-500", value: cat == null ? void 0 : cat.id, children: cat == null ? void 0 : cat.name }, cat == null ? void 0 : cat.id);
            }))
          }
        )
      ] })
    ] });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pt-3 mb-20 all-products-container mx-auto", style: { width: "100%", maxWidth: "1500px" }, children: /* @__PURE__ */ jsxs(Layout, { style: { overflow: "hidden" }, children: [
    /* @__PURE__ */ jsx(
      Drawer,
      {
        title: /* @__PURE__ */ jsxs("div", { style: { display: "flex !important" }, className: "mobile-all-prod-filters hidden flex justify-between w-full ", children: [
          /* @__PURE__ */ jsx("h4", { children: "Menu" }),
          /* @__PURE__ */ jsx(GrClose, { onClick: onClose })
        ] }),
        placement: "left",
        closable: false,
        onClose,
        open,
        width: 250,
        children: /* @__PURE__ */ jsx(RenderSider, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "desktop-all-prod-filters p-0", style: { width: "250px", marginRight: "10px" }, children: /* @__PURE__ */ jsx(RenderSider, {}) }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Header, { className: "z-[1] bg-white p-3 hidden mobile-all-prod-filters", children: /* @__PURE__ */ jsx(Button, { className: "p-3 border text-dark", onClick: showDrawer, icon: /* @__PURE__ */ jsx(GrFilter, { size: 20, color: "black" }), children: "Filter" }) }),
      /* @__PURE__ */ jsx(Content, { style: contentStyle, children: /* @__PURE__ */ jsx("div", { className: "latest-products", children: /* @__PURE__ */ jsxs("div", { className: " p-3 bg-white", style: { minHeight: "70vh" }, children: [
        loading && /* @__PURE__ */ jsx(ProductListSkeleton, {}),
        !loading && Array.isArray((_a = state == null ? void 0 : state.filterAttachments) == null ? void 0 : _a.attachments) && ((_c = (_b = state == null ? void 0 : state.filterAttachments) == null ? void 0 : _b.attachments) == null ? void 0 : _c.length) > 0 ? /* @__PURE__ */ jsx(Row, { gutter: [], children: (_e = (_d = state == null ? void 0 : state.filterAttachments) == null ? void 0 : _d.attachments) == null ? void 0 : _e.map((attachment, index) => /* @__PURE__ */ jsx(
          Col,
          {
            xs: 12,
            sm: 10,
            md: 8,
            lg: 8,
            xl: 6,
            xxl: 4,
            children: /* @__PURE__ */ jsx(AttachmentComponent, { attachment, index })
          },
          index
        )) }) : !loading && /* @__PURE__ */ jsx(
          Empty,
          {
            image: "/images/no_data.png",
            imageStyle: {
              height: "100%",
              width: "500px"
            },
            description: /* @__PURE__ */ jsx("h1", { style: { fontSize: "20px" }, children: "No attachments found" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer, { style: footerStyle, children: /* @__PURE__ */ jsx(Pagination, { onChange: (current_page) => {
        setPage(current_page);
      }, defaultCurrent: (_f = state == null ? void 0 : state.filterAttachments) == null ? void 0 : _f.current_page, pageSize: 15, total: (_g = state == null ? void 0 : state.filterAttachments) == null ? void 0 : _g.total }) })
    ] })
  ] }) }) });
}
function AttachmentProductType() {
  var _a, _b, _c;
  const { state, methods, dispatch } = useContext(HomeContext);
  useEffect(() => {
    methods.loadAttachmentCategories();
    methods.filterAttachments({ page: 1 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "sm-p-0 container pt-5 p-3 sm:p-0 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsx(AttachmentsByCategory, { rounded: false, cardRounded: false }),
    /* @__PURE__ */ jsxs("div", { className: "categories-container p-3 bg-white py-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 py-5 pb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary text-lg font-semibold", children: "Products" }),
        /* @__PURE__ */ jsx("h2", { className: "text-secondary text-2xl font-semibold", children: "Explore Attachments & Accessories" })
      ] }),
      /* @__PURE__ */ jsx(Row, { gutter: [16, 16], justify: "center", children: (_c = (_b = (_a = state == null ? void 0 : state.filterAttachments) == null ? void 0 : _a.attachments) == null ? void 0 : _b.slice(0, 8)) == null ? void 0 : _c.map((attachment, index) => /* @__PURE__ */ jsx(Col, { xs: 12, sm: 12, md: 8, lg: 6, xl: 6, children: /* @__PURE__ */ jsx(AttachmentComponent, { attachment, index }) }, index)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "primary",
          size: "large",
          onClick: () => window.location.href = "/products/attachments",
          className: "px-8 py-2",
          children: "View All Attachments"
        }
      ) })
    ] })
  ] });
}
!function($) {
  $(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function(e) {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        var scrollto = target.offset().top;
        if ($("#header").length) {
          scrollto -= $("#header").outerHeight();
        }
        if ($(this).attr("href") == "#header") {
          scrollto = 0;
        }
        $("html, body").animate({
          scrollTop: scrollto
        }, 1500, "easeInOutExpo");
        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close");
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none"
    });
    $("body").append($mobile_nav);
    $("body").prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $("body").append('<div class="mobile-nav-overly"></div>');
    $(document).on("click", ".mobile-nav-toggle", function(e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close");
      $(".mobile-nav-overly").toggle();
    });
    $(document).on("click", ".mobile-nav .drop-down > a", function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close");
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1500, "easeInOutExpo");
    return false;
  });
  AOS.init({
    duration: 800,
    easing: "ease-in-out"
  });
}(jQuery);
export {
  AboutPage as A,
  ContactPage as C,
  HomeLayout as H,
  ProductType as P,
  SingleBlog as S,
  Track as T,
  AllProducts as a,
  AllAttachments as b,
  AttachmentProductType as c,
  App as d,
  AllBlogs as e,
  PrivacyPolicy as f
};
