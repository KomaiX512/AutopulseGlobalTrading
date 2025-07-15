import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import React, { createElement, useReducer, useState, useEffect, useCallback, useContext, createContext, useRef, useMemo, Suspense } from "react";
import { useLocation, useParams, useNavigate, Outlet, Link, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { CBreadcrumb, CBreadcrumbItem, CFormSelect, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner, CDropdown, CDropdownToggle, CAvatar, CDropdownMenu, CDropdownHeader, CDropdownItem, CDropdownDivider, useColorModes, CHeader, CContainer, CHeaderToggler, CHeaderNav, CNavItem, CNavLink, CSidebarNav, CBadge, CNavTitle, CNavGroup, CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton, CSidebarFooter, CSidebarToggler, CCallout, CLink, CNav, CTabContent, CTabPane } from "@coreui/react";
import { Upload, message, Popconfirm, Flex as Flex$1, Button, Image, Tag, Spin, Collapse, Form, Input, DatePicker, Row, Col, Tabs, Space, Select, Dropdown, Skeleton, Table, Avatar, Tooltip, Steps, Modal, notification, Checkbox, Typography, Alert, Card, Statistic, Progress, Badge, Switch, Transfer } from "antd";
import { a as ajaxRequest, S as ShowToast, f as formatDate } from "./helpers-D56oASBL.js";
import { SmileOutlined, PlusOutlined, DeleteOutlined, SaveOutlined, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { FaSmile, FaPlus, FaEdit, FaImage, FaChevronCircleLeft, FaChevronCircleRight, FaIndustry, FaExclamationTriangle, FaEye, FaCog, FaChartBar, FaFilter, FaSearch, FaEyeSlash, FaTrash, FaUpload, FaArrowLeft, FaSave } from "react-icons/fa";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import Quill from "quill";
import QuillTable from "quill-table-ui";
import Flex from "antd/es/grid/col.js";
import { useDropzone } from "react-dropzone";
import moment from "moment";
import { GrTrash, GrBarChart, GrList, GrProjects, GrCreditCard, GrCart, GrCar, GrServices, GrMultiple, GrDeliver, GrAttachment, GrHome, GrCircleInformation, GrContact, GrUserExpert, GrBlog, GrContactInfo, GrCircleQuestion } from "react-icons/gr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdInventory, MdDelete } from "react-icons/md";
import { debounce } from "lodash";
import { A as AppLoader } from "./AppLoader-ZfOck8L3.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-D0u1QRLJ.js";
import CIcon from "@coreui/icons-react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import { cilEnvelopeOpen, cilUser, cilSettings, cilCreditCard, cilCart, cilLockLocked, cilMenu, cilCarAlt, cilList, cilMoon, cilContrast, cilSun, cilMediaPlay, cilCode } from "@coreui/icons";
const Dashboard = React.lazy(() => import("./Dashboard-kGu52r3Z.js"));
const Charts = React.lazy(() => import("./Charts-n0S5z6zW.js"));
const Widgets = React.lazy(() => import("./Widgets-DnH6jWDv.js"));
const Transaction = React.lazy(() => import("./TransactionApp-B_8SWe2x.js"));
const Orders = React.lazy(() => import("./OrdersApp-CPKZhHHq.js"));
const ProfileUpdate = React.lazy(() => import("./Edit-DzxD5Btn.js"));
const Quries = React.lazy(() => import("./index-Ds-lQYup.js"));
const HomeSettings = React.lazy(() => import("./HomeSettingApp-CI4jMBqB.js"));
const AboutUSApp = React.lazy(() => import("./AboutUsApp-CUYASKXZ.js"));
const ContactUSApp = React.lazy(() => import("./ContactIndex-DgRTe303.js"));
const UserReviews = React.lazy(() => import("./UserReviewIndex-xZdP48be.js"));
const FAQs = React.lazy(() => import("./FAQIndex-DZHElXD_.js"));
const Blogs = React.lazy(() => import("./Blogs-B7RHZort.js"));
const AttachmentForm = React.lazy(() => import("./AttachmentForm-DTQ4bDnY.js"));
const AttachmentList = React.lazy(() => import("./AttachmentList-jXL2TJkR.js"));
React.lazy(() => Promise.resolve().then(() => Solutions$1));
React.lazy(() => Promise.resolve().then(() => SolutionForm$1));
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/home", name: "Dashboard", element: Dashboard },
  { path: "/widgets", name: "Widgets", element: Widgets },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/transactions", name: "Transaction", element: Transaction },
  { path: "/customers/orders", name: "Orders", element: Orders },
  { path: "/profile/settings", name: "Profile", element: ProfileUpdate },
  { path: "/user/quries", name: "Quries", element: Quries },
  { path: "/home/index/setting", name: "Home Settings", element: HomeSettings },
  { path: "/home/about/setting", name: "About Settings", element: AboutUSApp },
  { path: "/home/contact/setting", name: "Contact Settings", element: ContactUSApp },
  { path: "/home/user/reviews", name: "User Reviews", element: UserReviews },
  { path: "/home/faqs", name: "FAQs", element: FAQs },
  { path: "/home/blogs", name: "Blogs", element: Blogs },
  { path: "/attachments/list", name: "Attachments List", element: AttachmentList },
  { path: "/attachments/add", name: "Add Attachment", element: AttachmentForm },
  { path: "/attachments/edit/:id", name: "Edit Attachment", element: AttachmentForm },
  { path: "/solutions/products/:id", name: "Manage Solution Products", element: React.lazy(() => Promise.resolve().then(() => SolutionProductsManager)) }
];
const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;
  const getRouteName = (pathname, routes2) => {
    const currentRoute = routes2.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };
  const getBreadcrumbs = (location2) => {
    const breadcrumbs2 = [];
    location2.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName && breadcrumbs2.push({
        pathname: currentPathname,
        name: routeName,
        active: index + 1 === array.length ? true : false
      });
      return currentPathname;
    });
    return breadcrumbs2;
  };
  const breadcrumbs = getBreadcrumbs(currentLocation);
  return /* @__PURE__ */ jsxs(CBreadcrumb, { className: "my-0", children: [
    /* @__PURE__ */ jsx(CBreadcrumbItem, { href: "/", children: "Home" }),
    breadcrumbs == null ? void 0 : breadcrumbs.map((breadcrumb, index) => {
      return /* @__PURE__ */ createElement(
        CBreadcrumbItem,
        {
          ...breadcrumb.active ? { active: true } : { href: breadcrumb.pathname },
          key: index
        },
        breadcrumb.name
      );
    })
  ] });
};
React.memo(AppBreadcrumb);
function rootReducer$3(state, { type, payload }) {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
  }
}
async function loadProducts$1({ search, price, categories, brands, sort, type, page = 1, perPage = 15 }) {
  this.dispatch({ payload: { loading: true } });
  try {
    const queryParams = { page };
    if (search) {
      queryParams.search_term = search;
    }
    if (price) {
      queryParams.price = price;
    }
    if (categories) {
      queryParams.categories = categories;
    }
    if (brands) {
      queryParams.brands = brands;
    }
    if (sort) {
      queryParams.sort_order = sort;
    }
    if (page) {
      queryParams.page = page;
    }
    if (type) {
      queryParams.type = type;
    }
    queryParams.is_business_type = true;
    const response = await axios.get("/api/filter/products", { params: queryParams });
    console.log("response", response);
    if (response.data.success) {
      this.dispatch({ payload: { products: response == null ? void 0 : response.data.products, total: response == null ? void 0 : response.data.total, currentPage: response == null ? void 0 : response.data.current_page, lastPage: response == null ? void 0 : response.data.last_page } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadProduct$1(id) {
  try {
    const method = "get";
    let api = `/api/get/products/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts[0] } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadCategories$2() {
  try {
    const method = "get";
    let api = "/api/get/categories";
    const config = {};
    const categories_res = await ajaxRequest(method, api, {}, config);
    const brands_res = await ajaxRequest(method, "/api/get/brands", {}, config);
    if (categories_res.success && brands_res.success) {
      let response = {
        categories: categories_res == null ? void 0 : categories_res.categories,
        brands: brands_res == null ? void 0 : brands_res.brands
      };
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
  }
}
async function saveProduct$1({ id = null, formValues, navigate }) {
  try {
    if (id) {
      formValues.append("id", id);
    }
    const method = "post";
    let api = id ? "/api/update/product" : "/api/save/product";
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      ShowToast({ message: `Product ${id ? "Updated" : "Created"}`, icon: /* @__PURE__ */ jsx(SmileOutlined, { color: "green" }) });
      return true;
    }
    return false;
  } catch (error) {
    ShowToast({ message: "Sorry, There was an error creating category" });
    return false;
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteProduct$1(id) {
  try {
    const method = "delete";
    let api = `/api/delete/product/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
    } else {
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadProducts$1.call(this);
  }
}
async function uploadProductImages$1(files, product) {
  this.dispatch({ payload: { loading: true } });
  try {
    const formValues = new FormData();
    formValues.append("id", product.id);
    for (let i = 0; i < files.length; i++) {
      formValues.append("files[]", files[i].file);
    }
    const response = await axios.post("/api/save/product/images", formValues, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (response.data.success) {
      ShowToast({ message: `Product images uploaded`, icon: /* @__PURE__ */ jsx(SmileOutlined, { color: "green" }) });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
    loadProduct$1.call(this, product.id);
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteProductImage$1(id) {
  var _a;
  try {
    const method = "delete";
    let api = `/api/product/images/delete/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
    loadProduct$1.call(this, (_a = this == null ? void 0 : this.selectedProduct) == null ? void 0 : _a.id);
  }
}
async function loadReviews$1() {
  var _a, _b;
  try {
    let selectedProductId = (_b = (_a = this == null ? void 0 : this.state) == null ? void 0 : _a.selectedProduct) == null ? void 0 : _b.id;
    const method = "get";
    let api = `/api/get/reviews/${selectedProductId}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function saveReviews$1(formValues) {
  var _a, _b;
  try {
    let selectedProductId = (_b = (_a = this == null ? void 0 : this.state) == null ? void 0 : _a.selectedProduct) == null ? void 0 : _b.id;
    if (!selectedProductId) {
      return ShowToast({ message: "Kindly save the product first, before saving reviews" });
    }
    const method = "post";
    const saveApi = `/api/save/review/${selectedProductId}`;
    const config = {};
    const promises = formValues == null ? void 0 : formValues.map((review) => {
      if (review.id) {
        this.dispatch({ payload: { loading: true } });
        return ajaxRequest(method, `/api/update/review/${review == null ? void 0 : review.id}`, review, config);
      }
      this.dispatch({ payload: { loading: true } });
      return ajaxRequest(method, saveApi, review, config);
    });
    const responses = await Promise.all(promises);
    const allSuccessful = responses.every((response) => response.success);
    if (allSuccessful) {
      return ShowToast({ message: "All reviews saved successfully", icon: /* @__PURE__ */ jsx(FaSmile, {}) });
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
    this.dispatch({ payload: { loading: true } });
  }
}
async function deleteReview$1(id) {
  try {
    const method = "delete";
    let api = `/api/delete/review/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    return ShowToast({ message: "Review Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
const ProductContext$1 = React.createContext();
function ProductContextProvider$1({ children }) {
  const initState = {
    loading: true,
    prodcts: []
  };
  const [state, dispatch] = useReducer(rootReducer$3, initState);
  const methods = {
    loadProducts: loadProducts$1.bind({ state, dispatch }),
    loadProduct: loadProduct$1.bind({ state, dispatch }),
    loadCategories: loadCategories$2.bind({ state, dispatch }),
    saveProduct: saveProduct$1.bind({ state, dispatch }),
    deleteProduct: deleteProduct$1.bind({ state, dispatch }),
    uploadProductImages: uploadProductImages$1.bind({ state, dispatch }),
    deleteProductImage: deleteProductImage$1.bind({ state, dispatch }),
    loadReviews: loadReviews$1.bind({ state, dispatch }),
    saveReviews: saveReviews$1.bind({ state, dispatch }),
    deleteReview: deleteReview$1.bind({ state, dispatch })
  };
  return /* @__PURE__ */ jsx(ProductContext$1.Provider, { value: { state, methods, dispatch }, children });
}
Quill.register("modules/table", QuillTable);
const MyEditor = ({ name, placeholder, defaultValue, onChange = () => {
} }) => {
  const [editorHtml, setEditorHtml] = useState(defaultValue || "");
  const [theme, setTheme] = useState("snow");
  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };
  useEffect(() => {
    setEditorHtml(defaultValue);
  }, [defaultValue]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      ReactQuill,
      {
        theme,
        onChange: handleChange,
        value: editorHtml,
        modules: MyEditor.modules,
        formats: MyEditor.formats,
        bounds: ".app",
        placeholder
      }
    ),
    /* @__PURE__ */ jsx("textarea", { hidden: true, name, value: editorHtml, id: "", cols: "30", rows: "10" })
  ] });
};
MyEditor.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }],
    // outdent/indent
    [{ direction: "rtl" }],
    // text direction
    [{ size: ["small", false, "large", "huge"] }],
    // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
    ["table"]
    // Add the table button to the toolbar
  ],
  clipboard: {
    matchVisual: false
  },
  table: true
  // Enable the table module
};
MyEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
  "table"
  // Add table format support
];
MyEditor.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt50M = file.size / 1024 / 1024 < 50;
  if (!isLt50M) {
    message.error("Image must be smaller than 50MB!");
  }
  return isJpgOrPng && isLt50M;
};
const UploadImage = ({ defaultValue, setSelectedFile, onClear }) => {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  useEffect(() => {
    setImageUrl(defaultValue);
  }, [defaultValue]);
  const handleChange = (info) => {
    if (info.file) {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
        setSelectedFile(info.file);
      });
    }
  };
  const handleClear = () => {
    setImageUrl("");
    setSelectedFile(null);
    if (onClear) {
      onClear();
    }
  };
  const uploadButton = /* @__PURE__ */ jsxs(
    "button",
    {
      style: {
        border: 0,
        background: "none"
      },
      type: "button",
      children: [
        /* @__PURE__ */ jsx(PlusOutlined, {}),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              marginTop: 8
            },
            children: "Thumbnail"
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsx(Flex, { gap: "middle", wrap: true, children: /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx(
      Upload,
      {
        name: "avatar",
        listType: "picture-card",
        className: "avatar-uploader",
        showUploadList: false,
        beforeUpload,
        onChange: handleChange,
        customRequest: () => Promise.resolve(),
        children: imageUrl ? /* @__PURE__ */ jsx(
          "img",
          {
            src: imageUrl,
            alt: "avatar",
            style: {
              width: "100%"
            }
          }
        ) : uploadButton
      }
    ),
    imageUrl && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: handleClear,
        style: {
          position: "absolute",
          top: "-8px",
          right: "-8px",
          background: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        title: "Remove image",
        children: "×"
      }
    )
  ] }) });
};
const Confirm = ({ title = "Delete Category", onConfirm, children, description }) => {
  return /* @__PURE__ */ jsx(
    Popconfirm,
    {
      title,
      description,
      onConfirm,
      onOpenChange: () => console.log("open change"),
      children
    }
  );
};
const MultiFileUploaders = ({ defaultImages = [], onSave, onDelete }) => {
  const [fileList, setFileList] = useState(defaultImages);
  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
    if (file.id) {
      onDelete(file.id);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles == null ? void 0 : acceptedFiles.map((file) => ({
      uid: file.uid || URL.createObjectURL(file),
      name: file.name,
      status: "done",
      url: URL.createObjectURL(file),
      file
    }));
    setFileList([...fileList, ...newFiles]);
  }, [fileList]);
  const saveFiles = () => {
    onSave(fileList);
    message.success("Images saved successfully!");
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      Flex$1,
      {
        align: "center",
        justify: "center",
        ...getRootProps(),
        style: {
          border: "2px dashed #d9d9d9",
          padding: "20px",
          textAlign: "center",
          backgroundColor: isDragActive ? "#f0f0f0" : "#fff",
          height: "300px"
        },
        children: [
          /* @__PURE__ */ jsx("input", { ...getInputProps() }),
          /* @__PURE__ */ jsxs(Flex$1, { className: "flex-col", style: { flexDirection: "column" }, gap: 3, align: "center", children: [
            /* @__PURE__ */ jsx("p", { className: "ant-upload-drag-icon", children: /* @__PURE__ */ jsx(Button, { className: "", children: "Select" }) }),
            /* @__PURE__ */ jsx("p", { className: "ant-upload-text", children: "Drag and drop images here or click to select" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }, children: fileList == null ? void 0 : fileList.map((file, index) => /* @__PURE__ */ jsxs("div", { className: "border", style: { position: "relative", display: "inline-block", maxWidth: "300px" }, children: [
      /* @__PURE__ */ jsx(Image, { loading: "lazy", src: file.url, alt: file.name, style: { width: "100%", height: "auto" } }),
      /* @__PURE__ */ jsxs("div", { className: "px-3 ", style: { position: "absolute", top: "5px", right: "5px", display: "flex", justifyContent: "space-between", width: "100%", gap: "5px" }, children: [
        file.id ? /* @__PURE__ */ jsx(Tag, { color: "green", children: "Saved" }) : /* @__PURE__ */ jsx(Tag, { color: "red", children: "Unsaved" }),
        /* @__PURE__ */ jsx(Flex$1, { gap: 3, align: "center", children: /* @__PURE__ */ jsx(Confirm, { onConfirm: () => handleRemove(file), description: "Are you sure you want to delete ?", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(DeleteOutlined, {}) }) }) })
      ] })
    ] }, index)) }),
    /* @__PURE__ */ jsx(Button, { className: "", onClick: saveFiles, style: { marginTop: "20px" }, children: "Save Images" })
  ] });
};
function LoadingSpinner({ size = "large", message: message2 = "Loading Data..." }) {
  return /* @__PURE__ */ jsx("div", { className: "spinner-loader", children: /* @__PURE__ */ jsxs("div", { className: "flex  flex-col", style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
    /* @__PURE__ */ jsx(Spin, { size, style: { zIndex: "1000000" } }),
    /* @__PURE__ */ jsx("p", { className: "bg-white tex-bold", children: message2 })
  ] }) });
}
const { Panel: Panel$1 } = Collapse;
const ProductReviews$1 = () => {
  const { state, methods, dispatch } = useContext(ProductContext$1);
  const [reviews, setReviews] = useState([]);
  const [saving, setSaving] = useState(false);
  async function fetchReviews() {
    setSaving(true);
    let reviews2 = await methods.loadReviews();
    if (reviews2) {
      setReviews(reviews2);
    }
    setSaving(false);
  }
  useEffect(() => {
    fetchReviews();
  }, []);
  const addReview = () => {
    var _a;
    setReviews([...reviews, {
      product_id: (_a = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a.id,
      review_text: "",
      rating: 0,
      user_name: "",
      user_email: "",
      review_date: "",
      country: ""
    }]);
  };
  const handleInputChange = (index, field, value) => {
    const newReviews = [...reviews];
    newReviews[index][field] = value;
    setReviews(newReviews);
  };
  const saveReviews2 = () => {
    methods.saveReviews(reviews);
    dispatch({ payload: { loading: false } });
    fetchReviews();
  };
  const deleteReview2 = (index) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };
  const genExtra = (index, review) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Confirm, { onConfirm: (e) => {
    console.log("Delete confirmed for review ID:", review.id);
    methods.deleteReview(review.id).then(() => {
      console.log("Review deleted from server");
      deleteReview2(index);
    }).catch((error) => {
      console.error("Error deleting review:", error);
    });
  }, description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" }) }) });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: reviews == null ? void 0 : reviews.map((review, index) => /* @__PURE__ */ jsx(Panel$1, { header: `Review ${index + 1}`, extra: genExtra(index, review), children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", children: [
      /* @__PURE__ */ jsxs(Flex$1, { gap: 10, align: "center w-full", children: [
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Reviewer Name", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.user_name,
            onChange: (e) => handleInputChange(index, "user_name", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Reviewer Email", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.user_email,
            onChange: (e) => handleInputChange(index, "user_email", e.target.value)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Flex$1, { gap: 10, align: "center", children: [
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/3", label: "Reviewing Country", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.country,
            onChange: (e) => handleInputChange(index, "country", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/3", label: "Reviewing Rating", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.rating,
            onChange: (e) => handleInputChange(index, "rating", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/3", label: "Reviewing Date", children: /* @__PURE__ */ jsx(
          DatePicker,
          {
            className: "w-full",
            value: review.date ? moment(review.review_date) : null,
            onChange: (date, dateString) => handleInputChange(index, "review_date", dateString)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(MyEditor, { defaultValue: review == null ? void 0 : review.review_text, onChange: (value) => handleInputChange(index, "review_text", value) })
    ] }) }, index)) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addReview, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { disabled: saving, type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveReviews2, children: saving ? "Saving Reviews..." : "Save All Reviews" }) })
    ] })
  ] });
};
const Ck5Editor = ({ name, defaultValue = "", onChange }) => {
  const [editorData, setEditorData] = useState();
  useEffect(() => {
    setEditorData(defaultValue);
  }, [defaultValue]);
  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }
  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }
    async upload() {
      const file = await this.loader.file;
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        const tokenEl = document == null ? void 0 : document.querySelector('meta[name="csrf-token"]');
        const csrfToken = tokenEl == null ? void 0 : tokenEl.getAttribute("content");
        fetch("/api/upload/file", {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": csrfToken
          },
          body: formData
        }).then((res) => res.json()).then((data) => {
          resolve({ default: data.url });
        }).catch(reject);
      });
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "ck-editor-container", children: [
    /* @__PURE__ */ jsx(
      CKEditor,
      {
        editor: ClassicEditor,
        data: editorData,
        config: {
          extraPlugins: [MyCustomUploadAdapterPlugin],
          toolbar: {
            items: [
              "heading",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "alignment",
              "|",
              "numberedList",
              "bulletedList",
              "|",
              "indent",
              "outdent",
              "|",
              "link",
              "blockQuote",
              "insertTable",
              "mediaEmbed",
              "|",
              "undo",
              "redo"
            ]
          },
          fontSize: {
            options: [
              8,
              10,
              12,
              14,
              "default",
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36,
              40,
              44,
              48,
              52,
              56,
              60,
              64,
              68,
              72,
              76,
              80
            ]
          },
          fontFamily: {
            options: [
              "default",
              "Arial, Helvetica, sans-serif",
              "Courier New, Courier, monospace",
              "Georgia, serif",
              "Lucida Sans Unicode, Lucida Grande, sans-serif",
              "Tahoma, Geneva, sans-serif",
              "Times New Roman, Times, serif",
              "Trebuchet MS, Helvetica, sans-serif",
              "Verdana, Geneva, sans-serif",
              "Poppins, sans-serif",
              "Roboto, sans-serif",
              "Open Sans, sans-serif",
              "Lato, sans-serif",
              "Montserrat, sans-serif"
            ]
          },
          heading: {
            options: [
              { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
              { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
              { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
              { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
              { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
              { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
              { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" }
            ]
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties"
            ]
          },
          image: {
            resizeOptions: [
              {
                name: "imageResize:original",
                value: null,
                label: "Original"
              },
              {
                name: "imageResize:25",
                value: "25",
                label: "25%"
              },
              {
                name: "imageResize:50",
                value: "50",
                label: "50%"
              },
              {
                name: "imageResize:75",
                value: "75",
                label: "75%"
              },
              {
                name: "imageResize:100",
                value: "100",
                label: "100%"
              }
            ],
            resizeUnit: "%",
            styles: [
              "alignLeft",
              "alignCenter",
              "alignRight"
            ],
            toolbar: [
              "imageStyle:alignLeft",
              "imageStyle:alignCenter",
              "imageStyle:alignRight",
              "|",
              "imageResize",
              "|",
              "linkImage"
            ]
          },
          mediaEmbed: {
            previewsInData: true,
            providers: [
              {
                name: "youtube",
                url: [
                  /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                  /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                  /^youtube\.com\/embed\/([\w-]+)/,
                  /^youtu\.be\/([\w-]+)/
                ],
                html: (match) => {
                  const id = match[1];
                  return '<div class="video-embed"><iframe src="https://www.youtube.com/embed/' + id + '" width="560" height="315" frameborder="0" allowfullscreen="true"></iframe></div>';
                }
              },
              {
                name: "vimeo",
                url: [
                  /^vimeo\.com\/(\d+)/,
                  /^vimeo\.com\/video\/(\d+)/,
                  /^vimeo\.com\/groups\/[\w-]+\/videos\/(\d+)/,
                  /^vimeo\.com\/channels\/[\w-]+\/(\d+)/
                ],
                html: (match) => {
                  const id = match[1];
                  return '<div class="video-embed"><iframe src="https://player.vimeo.com/video/' + id + '" width="560" height="315" frameborder="0" allowfullscreen="true"></iframe></div>';
                }
              }
            ]
          }
        },
        onChange: (event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          onChange(data);
        }
      }
    ),
    /* @__PURE__ */ jsx("textarea", { hidden: true, name, value: editorData }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .ck-editor-container .ck-editor__editable {
                    min-height: 300px;
                    max-height: 600px;
                    overflow-y: auto;
                }
                .ck-editor-container .ck-editor__editable img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 10px auto;
                }
                .ck-editor-container .ck-editor__editable h1,
                .ck-editor-container .ck-editor__editable h2,
                .ck-editor-container .ck-editor__editable h3,
                .ck-editor-container .ck-editor__editable h4,
                .ck-editor-container .ck-editor__editable h5,
                .ck-editor-container .ck-editor__editable h6 {
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    font-weight: 600;
                    line-height: 1.2;
                }
                .ck-editor-container .ck-editor__editable p {
                    margin-bottom: 1em;
                    line-height: 1.6;
                }
                .ck-editor-container .ck-editor__editable blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1em;
                    margin: 1em 0;
                    font-style: italic;
                    color: #6b7280;
                }
                .ck-editor-container .ck-editor__editable table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1em 0;
                }
                .ck-editor-container .ck-editor__editable table td,
                .ck-editor-container .ck-editor__editable table th {
                    border: 1px solid #d1d5db;
                    padding: 8px 12px;
                }
                .ck-editor-container .ck-editor__editable table th {
                    background-color: #f9fafb;
                    font-weight: 600;
                }
            ` })
  ] });
};
const { TabPanel: TabPanel$1 } = Tabs;
function ProductForm() {
  var _a, _b, _c, _d, _e;
  const { id } = useParams();
  const context = useContext(ProductContext$1);
  const { state, dispatch, methods } = context;
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedBrand, setSlectedBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prodTitle, setProdTitle] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [discount, setDiscount] = useState("");
  const [year, setYear] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedTab, setSelectedTab] = useState("basic-info");
  let navigate = useNavigate();
  async function fetchData() {
    await loadCategories2();
    if (id) {
      await methods.loadProduct(id);
    }
    dispatch({ payload: { loading: false } });
  }
  useEffect(() => {
    dispatch({ payload: { loading: true } });
    fetchData();
  }, [id]);
  useEffect(() => {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _i;
    if (id) {
      setSelectedCat((_a2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a2.category_id);
      setSlectedBrand((_b2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _b2.brand_id);
      setProdTitle((_c2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _c2.name);
      setPrice((_d2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _d2.price);
      setModel((_e2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _e2.model);
      setWeight((_f = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _f.weight);
      setDiscount((_g = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _g.discount);
      setQuantity((_h = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _h.stock);
      setYear((_i = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _i.make);
    }
  }, [state == null ? void 0 : state.selectedProduct]);
  async function loadCategories2() {
    let response = await (methods == null ? void 0 : methods.loadCategories());
    setCategories(response == null ? void 0 : response.categories);
    setBrands(response == null ? void 0 : response.brands);
  }
  async function submitForm(e) {
    dispatch({ payload: { loading: true } });
    e.preventDefault();
    let formValues = new FormData(e.target);
    if (selectedImage) {
      formValues.append("image", selectedImage == null ? void 0 : selectedImage.originFileObj);
    }
    let res = await (methods == null ? void 0 : methods.saveProduct({ id, formValues, navigate }));
    if (res) {
      navigate("/machinery-vehicles/list");
    }
  }
  const categoriesOptions = categories == null ? void 0 : categories.map((cat) => ({
    value: cat.id,
    label: cat.name
  }));
  const brandsOptions = brands == null ? void 0 : brands.map((brand) => ({
    value: brand.id,
    label: brand.name
  }));
  function handleCatSelect(value) {
    setSelectedCat(value);
  }
  function handleSelectBrand(value) {
    setSlectedBrand(value);
  }
  const handleSave = async (files) => {
    if (files.length > 0) {
      let unsavedFiles = files == null ? void 0 : files.filter((file) => !file.id);
      await (methods == null ? void 0 : methods.uploadProductImages(unsavedFiles, state == null ? void 0 : state.selectedProduct));
    }
  };
  const handleImageDelete = async (id2) => {
    await methods.deleteProductImage(id2);
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full w-full", children: [
    (state == null ? void 0 : state.loading) && /* @__PURE__ */ jsx(LoadingSpinner, {}),
    /* @__PURE__ */ jsxs("form", { className: "flex-column form bg-white  p-3", onSubmit: submitForm, children: [
      /* @__PURE__ */ jsxs(Tabs, { defaultActiveKey: "basic-info", onChange: setSelectedTab, centered: true, children: [
        /* @__PURE__ */ jsxs(TabPanel$1, { tab: "Product Info", children: [
          /* @__PURE__ */ jsxs("div", { className: "product-image", children: [
            /* @__PURE__ */ jsx(
              UploadImage,
              {
                defaultValue: id ? (_b = (_a = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a.image) == null ? void 0 : _b.replace("public", "/storage") : "",
                setSelectedFile: setSelectedImage
              }
            ),
            /* @__PURE__ */ jsx("label", { className: "flex-column py-3", style: { width: "fit-content" }, htmlFor: "", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "is_business_product",
                value: true,
                hidden: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Product Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  defaultValue: prodTitle,
                  name: "name",
                  placeholder: "Enter the product title here",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Category" }),
              /* @__PURE__ */ jsx(
                CFormSelect,
                {
                  name: "category_id",
                  value: selectedCat,
                  options: categoriesOptions,
                  onChange: (e) => handleCatSelect(e.target.value),
                  className: "select-area"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Make" }),
              /* @__PURE__ */ jsx(
                CFormSelect,
                {
                  name: "brand_id",
                  value: selectedBrand,
                  options: brandsOptions,
                  onChange: (e) => handleSelectBrand(e.target.value),
                  className: "select-area"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Unit Price" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "price",
                  defaultValue: price,
                  placeholder: "Enter the single product price",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Discount %" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "discount",
                  defaultValue: discount,
                  placeholder: "Enter the product discount in percent.",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Year" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "make",
                  defaultValue: year,
                  placeholder: "Enter the product make value.",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Model" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "model",
                  defaultValue: model,
                  placeholder: "Enter the product model",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Quantity" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "stock",
                  defaultValue: quantity,
                  placeholder: "Enter the available stock/quantity",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Weight" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  step: "any",
                  type: "number",
                  name: "weight",
                  defaultValue: weight,
                  placeholder: "Enter the product make value.",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "field-group", children: /* @__PURE__ */ jsxs("label", { htmlFor: "", children: [
            "Product Features",
            /* @__PURE__ */ jsx(Ck5Editor, { onChange: () => {
            }, name: "features", defaultValue: id ? ((_c = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _c.features) ?? "" : "" })
          ] }) })
        ] }, "basic-info"),
        /* @__PURE__ */ jsx(TabPanel$1, { tab: "Product Overview", children: /* @__PURE__ */ jsx("div", { className: "field-group", children: /* @__PURE__ */ jsxs("label", { htmlFor: "", children: [
          "Product Overview",
          /* @__PURE__ */ jsx(Ck5Editor, { onChange: () => {
          }, name: "description", defaultValue: id ? ((_d = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _d.description) ?? "" : "" })
        ] }) }) }, "product-description"),
        /* @__PURE__ */ jsx(TabPanel$1, { tab: "Product Images", children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px" }, children: [
          /* @__PURE__ */ jsx("h2", { children: "Upload Product Images" }),
          /* @__PURE__ */ jsx(
            MultiFileUploaders,
            {
              defaultImages: (_e = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _e.images,
              onSave: handleSave,
              onDelete: handleImageDelete
            }
          )
        ] }) }, "product-images"),
        /* @__PURE__ */ jsx(TabPanel$1, { tab: "Product Reviews", children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px" }, children: [
          /* @__PURE__ */ jsx("h2", { children: "Product Reviews" }),
          /* @__PURE__ */ jsx(ProductReviews$1, {})
        ] }) }, "product-reviews")
      ] }),
      /* @__PURE__ */ jsx(Button, { className: " ml-auto", style: { width: "fit-content" }, htmlType: "submit", children: "Save Product" })
    ] })
  ] });
}
function ProductIndex() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ProductContextProvider$1, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const { Option: Option$4 } = Select;
const ProductsHeader$1 = ({ isBusiness, searchTerm, handleSearchChange, handlePriceChange, handleBrandChange, handleCategoryChange, handleSortChange, handleTypeChange }) => {
  const { state, dispatch, methods } = useContext(ProductContext$1);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  async function fetchCategories() {
    let res = await methods.loadCategories();
    console.log("respo", res);
    if (res.categories) {
      console.log("cats", res);
      setCategories(res == null ? void 0 : res.categories);
    }
    if (res.brands) {
      console.log("cats", res);
      setBrands(res == null ? void 0 : res.brands);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  const filterMenu = /* @__PURE__ */ jsxs(Space, { direction: "vertical", size: 16, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Price" }),
      /* @__PURE__ */ jsxs(Select, { placeholder: "Select Price", style: { width: "100%" }, onChange: handlePriceChange, children: [
        /* @__PURE__ */ jsxs(Option$4, { value: "lowToHigh", children: [
          /* @__PURE__ */ jsx(FilterOutlined, {}),
          " Price: Low to High"
        ] }),
        /* @__PURE__ */ jsxs(Option$4, { value: "highToLow", children: [
          /* @__PURE__ */ jsx(FilterOutlined, {}),
          " Price: High to Low"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Categories" }),
      /* @__PURE__ */ jsx(
        Select,
        {
          mode: "multiple",
          placeholder: "Select Categories",
          style: { width: "100%" },
          onChange: handleCategoryChange,
          children: categories == null ? void 0 : categories.map((cat, index) => /* @__PURE__ */ jsx(Option$4, { value: cat.id, children: cat.name }, index))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Brands" }),
      /* @__PURE__ */ jsx(
        Select,
        {
          mode: "multiple",
          placeholder: "Select Categories",
          style: { width: "100%" },
          onChange: handleBrandChange,
          children: brands == null ? void 0 : brands.map((brand, index) => /* @__PURE__ */ jsx(Option$4, { value: brand.id, children: brand.name }, index))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Product Type" }),
      /* @__PURE__ */ jsxs(Select, { placeholder: "Select Type", style: { width: "100%" }, onChange: handleTypeChange, children: [
        /* @__PURE__ */ jsx(Option$4, { value: "business", children: "Business Products" }),
        /* @__PURE__ */ jsx(Option$4, { value: "customer", children: "Customer Products" }),
        /* @__PURE__ */ jsx(Option$4, { value: "", children: "Both" })
      ] })
    ] })
  ] });
  const sortMenu = /* @__PURE__ */ jsx(Space, { direction: "vertical", size: 16, children: /* @__PURE__ */ jsxs(Select, { defaultValue: "desc", style: { width: "100%" }, onChange: handleSortChange, children: [
    /* @__PURE__ */ jsxs(Option$4, { value: "desc", children: [
      /* @__PURE__ */ jsx(SortDescendingOutlined, {}),
      " Sort Desc"
    ] }),
    /* @__PURE__ */ jsxs(Option$4, { value: "asc", children: [
      /* @__PURE__ */ jsx(SortAscendingOutlined, {}),
      " Sort Asc"
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs(Row, { style: { justifyContent: "space-between" }, gutter: [16, 16], justify: "space-between", align: "middle", className: "mb-4 table-header", children: [
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Search products",
        value: searchTerm,
        onChange: handleSearchChange,
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsxs(Space, { style: { width: "fit-content", gap: "20px", marginLeft: "auto", display: "flex" }, align: "center", children: [
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          visible: filterMenuVisible,
          onVisibleChange: setFilterMenuVisible,
          overlay: filterMenu,
          trigger: ["click"],
          children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FilterOutlined, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          visible: sortMenuVisible,
          onVisibleChange: setSortMenuVisible,
          overlay: sortMenu,
          trigger: ["click"],
          children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(SortAscendingOutlined, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Link, { style: { textDecoration: "none" }, to: "/machinery-vehicles/form", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FaPlus, {}), children: "Add New" }) })
    ] }) })
  ] });
};
function Products() {
  var _a;
  const context = useContext(ProductContext$1);
  const { state, methods, dispatch } = context;
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [brands, setBrands] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const debouncedLoadProducts = useCallback(
    debounce(({ search: search2, price: price2, categories: categories2, brands: brands2, type: type2, sort: sort2, page: page2 }) => {
      methods.loadProducts({ search: search2, price: price2, type: type2, categories: categories2, brands: brands2, sort: sort2, page: page2 });
    }, 600),
    []
  );
  useEffect(() => {
    dispatch({ payload: { loading: true } });
    debouncedLoadProducts({ search, type, price, categories, brands, sort, page });
  }, [price, categories, brands, sort, page, type]);
  useEffect(() => {
    debouncedLoadProducts({ search, price, type, categories, brands, sort, page });
  }, [search]);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handlePriceChange = (value) => {
    setPrice(value);
  };
  const handleCategoryChange = (value) => {
    setCategories(value.join(","));
  };
  const handleBrandChange = (value) => {
    setBrands(value.join(","));
  };
  const handleSortChange = (value) => {
    setSort(value);
  };
  const handlePageChange = (page2) => {
    setPage(page2);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };
  const isBusiness = location.pathname.split("/")[2] == "business";
  const columns = [
    {
      title: /* @__PURE__ */ jsx(MdInventory, {}),
      dataIndex: "image",
      key: "image",
      render: (src) => /* @__PURE__ */ jsx(Avatar, { size: "md", src: src.replace("public", "/storage") }),
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => /* @__PURE__ */ jsxs(Link, { className: "pointer", to: `/machinery-vehicles/form/${record.id}`, children: [
        /* @__PURE__ */ jsx("div", { className: "pointer", children: text }),
        /* @__PURE__ */ jsxs("div", { className: "small text-body-secondary text-nowrap", children: [
          "Created: ",
          new Date(record.created_at).toLocaleDateString()
        ] })
      ] }),
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category == null ? void 0 : category.name,
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand == null ? void 0 : brand.name,
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Weight (Ton)",
      dataIndex: "weight",
      key: "weight",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Type",
      dataIndex: "is_business_product",
      key: "is_business_product",
      render: (record) => {
        return record == 1 ? /* @__PURE__ */ jsx(Tag, { color: "purple", children: "Business" }) : /* @__PURE__ */ jsx(Tag, { color: "green", children: "Customer" });
      },
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text, record) => {
        console.log("record", record);
        return /* @__PURE__ */ jsxs("div", { className: "action-column flex  gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: `/machinery-vehicles/form/${record.id}`, children: /* @__PURE__ */ jsx(Tooltip, { title: "Edit Product", children: /* @__PURE__ */ jsx(FaEdit, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx(Confirm, { onConfirm: () => methods.deleteProduct(record.id), description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(MdDelete, { className: "h-4 w-4" }) })
        ] });
      },
      responsive: ["xs", "sm", "md"]
    }
  ];
  console.log("products", state == null ? void 0 : state.products);
  const data = (_a = state == null ? void 0 : state.products) == null ? void 0 : _a.map((item, index) => ({
    ...item,
    key: index
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ProductsHeader$1,
      {
        searchTerm: search,
        handleCategoryChange,
        handleBrandChange,
        handlePriceChange,
        handleSortChange,
        handleSearchChange,
        handleTypeChange,
        isBusiness
      }
    ),
    state.loading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: data,
        pagination: {
          current: state.currentPage,
          total: state.total,
          pageSize: 16,
          onChange: handlePageChange
        }
      }
    )
  ] });
}
async function loadOrders({ setOrders, id = null, selectedStatus, search, dates, price, sortOrder, page }) {
  try {
    const queryParams = { page };
    if (search) {
      queryParams.search = search;
    }
    if (selectedStatus) {
      queryParams.status = selectedStatus;
    }
    if (dates && dates.length === 2) {
      queryParams.from_date = dates[0].toISOString();
      queryParams.to_date = dates[1].toISOString();
    } else if (dates && dates.length === 1) {
      queryParams.from_date = dates[0].toISOString();
    }
    if (price) {
      queryParams.price = price;
    }
    if (sortOrder) {
      queryParams.sort_order = sortOrder;
    }
    const method = "get";
    let api = id ? `/api/get/all/orders/${id}` : `/api/get/all/orders`;
    const response = await ajaxRequest(method, api, {}, { params: queryParams });
    setOrders(response);
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function updateOrderStatus({ order_id, status }) {
  try {
    const method = "post";
    let api = "/api/update/order/status";
    const config = {};
    let formValues = new FormData();
    formValues.append("status", status);
    formValues.append("order_id", order_id);
    const response = await ajaxRequest(method, api, formValues, config);
    return response;
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
let order_steps = {
  0: "Pending",
  1: "Processing",
  2: "Shipping",
  3: "Shipped",
  4: "Delivered"
};
function OrderDetailsPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I;
  const { id } = useParams();
  const [order, setOrders] = useState(null);
  const [statusModal, setStatusModal] = useState(false);
  useEffect(() => {
    loadOrders({ setOrders, id });
  }, []);
  let current_order = order == null ? void 0 : order.data;
  console.log("currunt order", current_order);
  let orderStatus = Number((_a = current_order == null ? void 0 : current_order.status) == null ? void 0 : _a.status);
  async function updateStatus(status) {
    let newStatus = Number(orderStatus);
    if (status === "next") {
      newStatus += 1;
    } else {
      newStatus -= 1;
    }
    let res = await updateOrderStatus({ order_id: current_order == null ? void 0 : current_order.id, status: newStatus });
    if (res == null ? void 0 : res.success)
      loadOrders({ setOrders, id });
  }
  return /* @__PURE__ */ jsxs("div", { className: "order-informations", children: [
    /* @__PURE__ */ jsxs("div", { className: "order-details", children: [
      /* @__PURE__ */ jsx("h3", { className: "m-0 py-2", children: "Basic Order Details" }),
      /* @__PURE__ */ jsx("p", { children: "This is the basic order details" }),
      /* @__PURE__ */ jsxs("div", { className: "curstomer-information", children: [
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Product Count" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_b = current_order == null ? void 0 : current_order.order_details) == null ? void 0 : _b.length })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Subtotal Amount" }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            "$",
            current_order == null ? void 0 : current_order.total_amount,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Discount" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: "0" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Order Status" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: /* @__PURE__ */ jsxs(Flex$1, { gap: 5, style: { flexDirection: "column" }, children: [
            /* @__PURE__ */ jsx(Tag, { color: "blue", style: { width: "fit-content" }, children: order_steps[Number((_c = current_order == null ? void 0 : current_order.status) == null ? void 0 : _c.status)] }),
            formatDate((_d = current_order == null ? void 0 : current_order.status) == null ? void 0 : _d.created_at)
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Order Date" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: formatDate(current_order == null ? void 0 : current_order.created_at) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "order-container", children: [
      /* @__PURE__ */ jsx("h3", { className: "m-0 py-2", children: "Billing Address" }),
      /* @__PURE__ */ jsx("p", { children: "This is the billing information of customer, Entered while checkout" }),
      /* @__PURE__ */ jsxs("div", { className: "curstomer-information", children: [
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Name" }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_e = current_order == null ? void 0 : current_order.user) == null ? void 0 : _e.first_name,
            " ",
            (_f = current_order == null ? void 0 : current_order.user) == null ? void 0 : _f.last_name
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", title: "Contact", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Email" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: /* @__PURE__ */ jsx("a", { href: `mailto:${(_g = current_order == null ? void 0 : current_order.user) == null ? void 0 : _g.email}`, children: (_h = current_order == null ? void 0 : current_order.user) == null ? void 0 : _h.email }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Phone" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_i = current_order == null ? void 0 : current_order.user) == null ? void 0 : _i.phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Address Line 1" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_j = current_order == null ? void 0 : current_order.user) == null ? void 0 : _j.address_line1 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Address Line 2" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: ((_k = current_order == null ? void 0 : current_order.user) == null ? void 0 : _k.address_line2) ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "City" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_l = current_order == null ? void 0 : current_order.user) == null ? void 0 : _l.city })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "State" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_m = current_order == null ? void 0 : current_order.user) == null ? void 0 : _m.state })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Country" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_n = current_order == null ? void 0 : current_order.user) == null ? void 0 : _n.country })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Postal Code" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_o = current_order == null ? void 0 : current_order.user) == null ? void 0 : _o.postal_code })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "order-container", children: [
      /* @__PURE__ */ jsx("h3", { className: "m-0 py-2", children: "Shipping Address" }),
      /* @__PURE__ */ jsx("p", { children: "This is the shipping address of customer, Entered while checkout" }),
      /* @__PURE__ */ jsxs("div", { className: "curstomer-information", children: [
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Name" }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_p = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _p.first_name,
            " ",
            (_q = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _q.last_name
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", title: "Contact", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Email" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: /* @__PURE__ */ jsx("a", { href: `mailto:${(_r = current_order == null ? void 0 : current_order.user) == null ? void 0 : _r.email}`, children: (_s = current_order == null ? void 0 : current_order.user) == null ? void 0 : _s.email }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Phone" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_t = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _t.phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Address Line 1" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_u = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _u.address_line1 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Address Line 2" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: ((_v = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _v.address_line2) ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "City" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_w = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _w.city })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "State" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_x = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _x.state })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Country" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_y = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _y.country })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Postal Code" }),
          /* @__PURE__ */ jsx("div", { className: "value", children: (_z = current_order == null ? void 0 : current_order.shipping_address) == null ? void 0 : _z.zipcode })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "order-container", children: [
      /* @__PURE__ */ jsx("h3", { className: "m-0 py-2", children: "Transaction Details" }),
      /* @__PURE__ */ jsx("p", { children: "This is the transaction details of customer, Entered while checkout" }),
      /* @__PURE__ */ jsxs("div", { className: "curstomer-information", children: [
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Card Holder Name " }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            "$",
            (_A = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _A.card_holder,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Card Holder Name " }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_B = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _B.card_holder,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Card Expiry Date " }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_C = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _C.exp_month,
            "/",
            (_D = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _D.exp_year,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Card Last4 " }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_E = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _E.last4,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Card Brand " }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_F = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _F.brand,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Country" }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            (_G = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _G.country,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Amount Paid" }),
          /* @__PURE__ */ jsxs("div", { className: "value", children: [
            "$",
            (_H = current_order == null ? void 0 : current_order.transaction) == null ? void 0 : _H.amount,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsx("h4", { className: "name", children: "Payment Status " }),
          /* @__PURE__ */ jsx(Tag, { style: { width: "fit-content" }, color: "green", children: "Completed" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "product-information", children: [
      /* @__PURE__ */ jsx("h3", { className: "py-2 m-0", children: "Prodcut Information" }),
      /* @__PURE__ */ jsx("p", { children: "This is the information for the prodcuts ordered by the customer" }),
      /* @__PURE__ */ jsxs(CTable, { align: "middle", className: "mb-0 border", hover: true, responsive: true, children: [
        /* @__PURE__ */ jsx(CTableHead, { className: "text-nowrap", children: /* @__PURE__ */ jsxs(CTableRow, { children: [
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary text-bold", children: "#" }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary text-bold", children: /* @__PURE__ */ jsx(FaImage, {}) }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary", children: "Name" }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary", children: "Unit Price" }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary", children: "Discount" }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary", children: "Quantity" }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary ", children: "Available Stock" }),
          /* @__PURE__ */ jsx(CTableHeaderCell, { className: "bg-body-tertiary ", children: "Total Price" })
        ] }) }),
        /* @__PURE__ */ jsx(CTableBody, { children: (current_order == null ? void 0 : current_order.order_details) && ((_I = current_order == null ? void 0 : current_order.order_details) == null ? void 0 : _I.map((item, index) => {
          var _a2, _b2, _c2, _d2;
          return (item == null ? void 0 : item.product) && /* @__PURE__ */ jsxs(CTableRow, { "v-for": "item in tableItems", children: [
            /* @__PURE__ */ jsx(CTableDataCell, { className: "", children: index + 1 }),
            /* @__PURE__ */ jsx(CTableDataCell, { className: "", children: /* @__PURE__ */ jsx(Image, { width: 90, src: `/${(_a2 = item == null ? void 0 : item.product) == null ? void 0 : _a2.image.replace("public", "/storage")}` }) }),
            /* @__PURE__ */ jsxs(CTableDataCell, { children: [
              /* @__PURE__ */ jsx("div", { children: (_b2 = item.product) == null ? void 0 : _b2.name }),
              /* @__PURE__ */ jsx("div", { className: "small text-body-secondary text-nowrap", children: formatDate(item == null ? void 0 : item.created_at) })
            ] }),
            /* @__PURE__ */ jsxs(CTableDataCell, { className: "", children: [
              "$ ",
              (_c2 = item.product) == null ? void 0 : _c2.price
            ] }),
            /* @__PURE__ */ jsx(CTableDataCell, { className: "", children: "0" }),
            /* @__PURE__ */ jsx(CTableDataCell, { children: item == null ? void 0 : item.quantity }),
            /* @__PURE__ */ jsx(CTableDataCell, { children: (_d2 = item == null ? void 0 : item.product) == null ? void 0 : _d2.stock }),
            /* @__PURE__ */ jsxs(CTableDataCell, { children: [
              "$",
              Number(item == null ? void 0 : item.price) * Number(item == null ? void 0 : item.quantity)
            ] })
          ] }, index);
        })) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "order-status", children: [
      /* @__PURE__ */ jsxs("div", { className: "header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "m-0 py-2", children: "Order Status" }),
          /* @__PURE__ */ jsx("p", { children: "This is the order status for the customer, indicating the steps to deliver order" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "header gap-3", children: [
          /* @__PURE__ */ jsx(
            Confirm,
            {
              title: "Update Status",
              onConfirm: (e) => updateStatus("prev"),
              description: "Are you sure you want to update status ?",
              children: /* @__PURE__ */ jsxs(
                "button",
                {
                  className: " header btn-primary btn-home-primary",
                  children: [
                    /* @__PURE__ */ jsx(FaChevronCircleLeft, {}),
                    " ",
                    /* @__PURE__ */ jsx("span", { children: " Update  Previous" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Confirm,
            {
              onConfirm: (e) => updateStatus("next"),
              title: "Update Status",
              description: "Are you sure you want to update status ?",
              children: /* @__PURE__ */ jsxs(
                "button",
                {
                  className: " header btn-primary btn-home-primary",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: " Update  Next" }),
                    /* @__PURE__ */ jsx(FaChevronCircleRight, {})
                  ]
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "steps-container p-5", children: /* @__PURE__ */ jsx(
        Steps,
        {
          className: "step-container",
          current: orderStatus,
          items: [
            {
              title: "Pending",
              description: "The product payment is done, order is pending"
            },
            {
              title: "Processing",
              description: "complete form with billing address"
            },
            {
              title: "Shipping",
              description: "process payment through cards"
            },
            {
              title: "Shipped",
              description: "process payment through cards"
            },
            {
              title: "Delivered",
              description: "process payment through cards"
            }
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Vertically centered modal dialog",
        centered: true,
        open: statusModal,
        onOk: () => setStatusModal(false),
        onCancel: () => setStatusModal(false),
        children: /* @__PURE__ */ jsx("input", { type: "text", name: "description" })
      }
    )
  ] });
}
function rootReducer$2(state, { type, payload }) {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
  }
}
async function loadCategories$1(searchTerm = "", sortOrder = "") {
  try {
    const method = "get";
    let api = `/api/get/categories?search_term=${searchTerm}&sort_order=${sortOrder}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { categories: response == null ? void 0 : response.categories, selectedCategory: {} } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadCategory(id) {
  try {
    const method = "get";
    let api = `/api/get/category/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { selectedCategory: response == null ? void 0 : response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function saveCategory(formValues, id = null) {
  this.dispatch({ payload: { loading: true } });
  try {
    if (id) {
      formValues.append("id", id);
    }
    const method = "post";
    let api = id ? `/api/update/category` : "/api/save/category";
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      ShowToast({ message: id ? "Category updated successfully" : "New category added", icon: /* @__PURE__ */ jsx(SmileOutlined, { color: "green" }) });
      return true;
    } else {
      if (response.errors) {
        const errorMessages = Object.values(response.errors).flat().join(", ");
        ShowToast({ message: "Validation errors: " + errorMessages });
      } else {
        ShowToast({ message: response.message || "Failed to save category" });
      }
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(", ");
        ShowToast({ message: "Validation errors: " + errorMessages });
      } else if (error.response.data.message) {
        ShowToast({ message: error.response.data.message });
      } else {
        ShowToast({ message: "Sorry, There was an error creating category" });
      }
    } else {
      ShowToast({ message: "Sorry, There was an error creating category" });
    }
    return false;
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteCategory(id) {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "delete";
    let api = `/api/delete/category/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
    } else {
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { category_modal: false, loading: false } });
    loadCategories$1.call(this);
  }
}
const CategoriesContext = React.createContext();
function CategoriesContextProvider({ children, business }) {
  const [api, contextHolder] = notification.useNotification();
  const initState = {
    loading: true,
    category_modal: false,
    categories: [],
    isEdit: false,
    SelectedCategory: {},
    business,
    contextHolder
  };
  const [state, dispatch] = useReducer(rootReducer$2, initState);
  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Notification Title",
      description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      showProgress: true,
      pauseOnHover
    });
  };
  const methods = {
    loadCategories: loadCategories$1.bind({ state, dispatch }),
    loadCategory: loadCategory.bind({ state, dispatch }),
    saveCategory: saveCategory.bind({ state, dispatch }),
    deleteCategory: deleteCategory.bind({ state, dispatch }),
    openNotification
  };
  return /* @__PURE__ */ jsx(CategoriesContext.Provider, { value: { state, methods, dispatch }, children });
}
function CategoryIndex({ business = false }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CategoriesContextProvider, { busines: business, children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const { Option: Option$3 } = Select;
const CategoryHeader = ({ isBusiness, searchTerm, handleSearchChange, handleSortChange }) => {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const sortMenu = /* @__PURE__ */ jsx(Space, { direction: "vertical", size: 16, children: /* @__PURE__ */ jsxs(Select, { defaultValue: "desc", style: { width: "100%" }, onChange: handleSortChange, children: [
    /* @__PURE__ */ jsxs(Option$3, { value: "desc", children: [
      /* @__PURE__ */ jsx(SortDescendingOutlined, {}),
      " Sort Desc"
    ] }),
    /* @__PURE__ */ jsxs(Option$3, { value: "asc", children: [
      /* @__PURE__ */ jsx(SortAscendingOutlined, {}),
      " Sort Asc"
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs(Row, { style: { justifyContent: "space-between" }, gutter: [16, 16], justify: "space-between", align: "middle", className: "mb-4 table-header", children: [
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Search products",
        value: searchTerm,
        onChange: handleSearchChange,
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsxs(Space, { style: { width: "fit-content", gap: "20px", marginLeft: "auto", display: "flex" }, align: "center", children: [
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          visible: sortMenuVisible,
          onVisibleChange: setSortMenuVisible,
          overlay: sortMenu,
          trigger: ["click"],
          children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(SortAscendingOutlined, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Link, { style: { textDecoration: "none" }, to: isBusiness == "business" ? "/business/categories/form" : "/categories/form", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FaPlus, {}), children: "Add New" }) })
    ] }) })
  ] });
};
function Categories() {
  var _a;
  const context = useContext(CategoriesContext);
  if (!context) {
    return /* @__PURE__ */ jsx("div", { style: { color: "red", textAlign: "center", margin: "2rem 0" }, children: "Failed to load categories context." });
  }
  const { state, dispatch, methods } = context;
  if (!state) {
    return /* @__PURE__ */ jsx("div", { style: { color: "red", textAlign: "center", margin: "2rem 0" }, children: "Failed to load categories state." });
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const debouncedLoadCategories = useCallback(
    debounce((search, sort) => {
      if (methods && methods.loadCategories) {
        methods.loadCategories(search, sort);
      }
    }, 500),
    [methods]
  );
  useEffect(() => {
    if (dispatch) {
      dispatch({ payload: { loading: true } });
    }
    debouncedLoadCategories(searchTerm, sortOrder);
  }, [sortOrder]);
  useEffect(() => {
    debouncedLoadCategories(searchTerm, sortOrder);
  }, [searchTerm]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSortChange = (value) => {
    setSortOrder(value);
  };
  const isBusiness = ((_a = location == null ? void 0 : location.pathname) == null ? void 0 : _a.split("/")[2]) ?? "";
  const columns = [
    { title: /* @__PURE__ */ jsx(MdInventory, {}), dataIndex: "image", key: "image", render: (src) => /* @__PURE__ */ jsx(Avatar, { size: "large", src: (src == null ? void 0 : src.replace("public", "/storage")) || "" }) },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Created At", dataIndex: "created_at", key: "created_at", render: (date) => formatDate(date) },
    { title: "Last Updated", dataIndex: "updated_at", key: "updated_at", render: (date) => formatDate(date) },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text, record) => /* @__PURE__ */ jsxs("div", { className: "action-column flex  gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: isBusiness == "business" ? `/business/categories/form/${record == null ? void 0 : record.id}` : `/categories/form/${record == null ? void 0 : record.id}`, children: /* @__PURE__ */ jsx(Tooltip, { title: "Edit Category", children: /* @__PURE__ */ jsx(FaEdit, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx(Confirm, { onConfirm: () => {
          var _a2;
          return (_a2 = methods == null ? void 0 : methods.deleteCategory) == null ? void 0 : _a2.call(methods, record == null ? void 0 : record.id);
        }, description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(MdDelete, { className: "h-4 w-4" }) })
      ] })
    }
  ];
  const data = Array.isArray(state == null ? void 0 : state.categories) ? state.categories.map((item, index) => ({
    ...item,
    key: index
  })) : [];
  const isLoading = Boolean(state == null ? void 0 : state.loading);
  const isEmpty = !isLoading && (!data || data.length === 0);
  const isError = !isLoading && !Array.isArray(state == null ? void 0 : state.categories);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      CategoryHeader,
      {
        isBusiness,
        handleSearchChange,
        handleSortChange,
        searchTerm
      }
    ),
    isLoading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : isError ? /* @__PURE__ */ jsx("div", { style: { color: "red", textAlign: "center", margin: "2rem 0" }, children: "Failed to load categories. Please try again later." }) : isEmpty ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", margin: "2rem 0", color: "#888" }, children: "No categories found." }) : /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: data,
        pagination: false,
        rowKey: "id"
      }
    )
  ] });
}
function CategoriesForm() {
  var _a, _b;
  let context = useContext(CategoriesContext);
  const { state, dispatch, methods } = context;
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isViewable, setIsViewable] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      methods.loadCategory(id);
    } else {
      dispatch({ payload: { loading: false } });
    }
    loadProductTypes();
  }, [id]);
  const loadProductTypes = async () => {
    try {
      const response = await fetch("/api/get/product-types");
      const data = await response.json();
      if (data.success) {
        setProductTypes(data.productTypes || []);
      } else {
        setProductTypes([
          { id: 1, name: "Machine" },
          { id: 2, name: "Electric Bikes" },
          { id: 3, name: "Electric Vehicles" },
          { id: 4, name: "Heavy Machinery" },
          { id: 5, name: "Vehicle Part" },
          { id: 6, name: "Bike Part" },
          { id: 7, name: "Attachments & Accessories" }
        ]);
      }
    } catch (error) {
      console.error("Error loading product types:", error);
      setProductTypes([
        { id: 1, name: "Machine" },
        { id: 2, name: "Electric Bikes" },
        { id: 3, name: "Electric Vehicles" },
        { id: 4, name: "Heavy Machinery" },
        { id: 5, name: "Vehicle Part" },
        { id: 6, name: "Bike Part" },
        { id: 7, name: "Attachments & Accessories" }
      ]);
    }
  };
  useEffect(() => {
    var _a2, _b2, _c;
    if (state == null ? void 0 : state.selectedCategory) {
      setName(state.selectedCategory.name || "");
      setDescription(((_a2 = state.selectedCategory) == null ? void 0 : _a2.description) || "");
      setIsViewable((_b2 = state.selectedCategory) == null ? void 0 : _b2.is_viewable);
      setSelectedProd((_c = state.selectedCategory) == null ? void 0 : _c.product_type_id);
    }
  }, [state == null ? void 0 : state.selectedCategory]);
  function handleBusinessCheckbox() {
    setIsViewable(!isViewable);
  }
  async function submitForm(e) {
    e.preventDefault();
    if (state == null ? void 0 : state.loading) {
      return;
    }
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }
    if (!selectedProd) {
      alert("Please select a product type");
      return;
    }
    if (!selectedImage && !id) {
      alert("Please select a category image");
      return;
    }
    let formValues = new FormData(e.target);
    formValues.append("description", description || "");
    formValues.append("product_type_id", selectedProd);
    formValues.append("is_viewable", isViewable ? "1" : "0");
    if (selectedImage) {
      formValues.append("image", selectedImage.originFileObj);
    }
    try {
      const res = await methods.saveCategory(formValues, id);
      if (res) {
        navigate("/categories/list");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  const productsOptions = productTypes == null ? void 0 : productTypes.map((prod) => ({
    value: prod.id,
    label: prod.name
  }));
  return /* @__PURE__ */ jsxs("div", { className: "form", children: [
    (state == null ? void 0 : state.loading) ? /* @__PURE__ */ jsx(AppLoader, {}) : "",
    /* @__PURE__ */ jsxs("form", { className: "flex  flex-col p-3 bg-white", style: { gap: "10px" }, onSubmit: submitForm, children: [
      /* @__PURE__ */ jsxs("label", { className: "flex  flex-col my-4", htmlFor: "image", children: [
        /* @__PURE__ */ jsx("span", { className: "mb-2", children: "Category Image" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            UploadImage,
            {
              defaultValue: id ? (_b = (_a = state == null ? void 0 : state.selectedCategory) == null ? void 0 : _a.image) == null ? void 0 : _b.replace("public", "/storage") : "",
              setSelectedFile: setSelectedImage
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "flex-column py-3", style: { width: "fit-content" }, htmlFor: "", children: /* @__PURE__ */ jsx(
            Checkbox,
            {
              name: "is_viewable",
              style: { color: "green", textDecoration: "underline" },
              onChange: handleBusinessCheckbox,
              checked: isViewable,
              children: /* @__PURE__ */ jsx(Tooltip, { title: "Check this box, to make this category visisble on homepage", children: "Make This Category Visible On Homepage?" })
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
        /* @__PURE__ */ jsxs("label", { className: "flex  flex-col", htmlFor: "", children: [
          /* @__PURE__ */ jsx("span", { children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              className: "p-2 border border-gray-300 rounded"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
          /* @__PURE__ */ jsx("span", { children: "Product Type" }),
          /* @__PURE__ */ jsx(
            CFormSelect,
            {
              name: "product_type_id",
              value: selectedProd,
              options: productsOptions,
              onChange: (e) => setSelectedProd(e.target.value),
              className: "select-area",
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("strong", { children: "Overview" }),
      /* @__PURE__ */ jsx(
        Ck5Editor,
        {
          name: "description",
          defaultValue: description,
          onChange: (value) => setDescription(value)
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "mt-4", children: "Save" })
    ] })
  ] });
}
function rootReducer$1(state, { type, payload }) {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
  }
}
async function loadBrands(searchTerm = "", sortOrder = "") {
  try {
    const method = "get";
    let api = `/api/get/brands?search_term=${searchTerm}&sort_order=${sortOrder}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { brands: response == null ? void 0 : response.brands, selectedBrand: {} } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadBrand(id) {
  try {
    const method = "get";
    let api = `/api/get/brands/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      console.log("response", response);
      this.dispatch({ payload: { selectedBrand: response == null ? void 0 : response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function saveBrand(formValues, id = null) {
  this.dispatch({ payload: { loading: true } });
  try {
    if (id) {
      formValues.append("id", id);
    }
    const method = "post";
    let api = id ? `/api/update/brand` : "/api/save/brand";
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      ShowToast({ message: id ? "Brand updated successfully" : "New brand added", icon: /* @__PURE__ */ jsx(SmileOutlined, { color: "green" }) });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
    ShowToast({ message: "Sorry, There was an error creating Brand" });
    return false;
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteBrand(id) {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "delete";
    let api = `/api/delete/brand/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
    } else {
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { Brand_modal: false, loading: false } });
    loadBrands.call(this);
  }
}
const BrandsContext = React.createContext();
function BrandsContextProvider({ children, business }) {
  const [api, contextHolder] = notification.useNotification();
  const initState = {
    loading: true,
    Brand_modal: false,
    Brands: [],
    isEdit: false,
    SelectedBrand: {},
    business,
    contextHolder
  };
  const [state, dispatch] = useReducer(rootReducer$1, initState);
  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Notification Title",
      description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      showProgress: true,
      pauseOnHover
    });
  };
  const methods = {
    loadBrands: loadBrands.bind({ state, dispatch }),
    loadBrand: loadBrand.bind({ state, dispatch }),
    saveBrand: saveBrand.bind({ state, dispatch }),
    deleteBrand: deleteBrand.bind({ state, dispatch }),
    openNotification
  };
  return /* @__PURE__ */ jsx(BrandsContext.Provider, { value: { state, methods, dispatch }, children });
}
const { Option: Option$2 } = Select;
const BrandHeader = ({ searchTerm, handleSearchChange, handleSortChange }) => {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const sortMenu = /* @__PURE__ */ jsx(Space, { direction: "vertical", size: 16, children: /* @__PURE__ */ jsxs(Select, { defaultValue: "desc", style: { width: "100%" }, onChange: handleSortChange, children: [
    /* @__PURE__ */ jsxs(Option$2, { value: "desc", children: [
      /* @__PURE__ */ jsx(SortDescendingOutlined, {}),
      " Sort Desc"
    ] }),
    /* @__PURE__ */ jsxs(Option$2, { value: "asc", children: [
      /* @__PURE__ */ jsx(SortAscendingOutlined, {}),
      " Sort Asc"
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs(Row, { style: { justifyContent: "space-between" }, gutter: [16, 16], justify: "space-between", align: "middle", className: "mb-4 table-header", children: [
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Search products",
        value: searchTerm,
        onChange: handleSearchChange,
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsxs(Space, { style: { width: "fit-content", gap: "20px", marginLeft: "auto", display: "flex" }, align: "center", children: [
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          visible: sortMenuVisible,
          onVisibleChange: setSortMenuVisible,
          overlay: sortMenu,
          trigger: ["click"],
          children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(SortAscendingOutlined, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Link, { style: { textDecoration: "none" }, to: "/brands/form", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FaPlus, {}), children: "Add New" }) })
    ] }) })
  ] });
};
function Brands() {
  var _a, _b;
  const context = useContext(BrandsContext);
  const { state, dispatch, methods } = context;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const debouncedLoadBrands = useCallback(
    debounce((search, sort) => {
      methods.loadBrands(search, sort);
    }, 500),
    []
  );
  useEffect(() => {
    dispatch({ payload: { loading: true } });
    debouncedLoadBrands(searchTerm, sortOrder);
  }, [sortOrder]);
  useEffect(() => {
    debouncedLoadBrands(searchTerm, sortOrder);
  }, [searchTerm]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSortChange = (value) => {
    setSortOrder(value);
  };
  ((_a = location == null ? void 0 : location.pathname) == null ? void 0 : _a.split("/")[2]) ?? "";
  const columns = [
    { title: /* @__PURE__ */ jsx(MdInventory, {}), dataIndex: "logo", key: "logo", render: (src) => {
      console.log("src", src);
      return /* @__PURE__ */ jsx(Avatar, { size: "large", src: src == null ? void 0 : src.replace("public", "/storage") });
    } },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Created At", dataIndex: "created_at", key: "created_at", render: (date) => formatDate(date) },
    { title: "Last Updated", dataIndex: "updated_at", key: "updated_at", render: (date) => formatDate(date) },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text, record) => /* @__PURE__ */ jsxs("div", { className: "action-column flex  gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: `/brands/form/${record.id}`, children: /* @__PURE__ */ jsx(Tooltip, { title: "Edit Brand", children: /* @__PURE__ */ jsx(FaEdit, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx(Confirm, { title: "Delete Brand", onConfirm: () => methods.deleteBrand(record.id), description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(MdDelete, { className: "h-4 w-4" }) })
      ] })
    }
  ];
  const data = (_b = state == null ? void 0 : state.brands) == null ? void 0 : _b.map((item, index) => ({
    ...item,
    key: index
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      BrandHeader,
      {
        handleSearchChange,
        handleSortChange,
        searchTerm
      }
    ),
    state.loading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: data,
        pagination: false,
        rowKey: "id"
      }
    )
  ] });
}
function BrandIndex() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BrandsContextProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function BrandForm() {
  var _a, _b;
  let context = useContext(BrandsContext);
  const { state, dispatch, methods } = context;
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isViewable, setIsViewable] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      methods.loadBrand(id);
    } else {
      dispatch({ payload: { loading: false } });
    }
  }, [id]);
  useEffect(() => {
    var _a2;
    if (state == null ? void 0 : state.selectedBrand) {
      setName(state.selectedBrand.name || "");
      setDescription(((_a2 = state.selectedBrand) == null ? void 0 : _a2.description) || "");
    }
  }, [state == null ? void 0 : state.selectedBrand]);
  console.log("brand", state);
  function submitForm(e) {
    e.preventDefault();
    let formValues = new FormData(e.target);
    if (selectedImage) {
      formValues.append("logo", selectedImage.originFileObj);
    }
    let res = methods.saveBrand(formValues, id);
    if (res) {
      navigate("/brands/list");
    }
    e.target.reset();
  }
  return /* @__PURE__ */ jsxs("div", { className: "form", children: [
    (state == null ? void 0 : state.loading) ? /* @__PURE__ */ jsx(AppLoader, {}) : "",
    /* @__PURE__ */ jsxs("form", { className: "flex  flex-col p-3 bg-white", style: { gap: "10px" }, onSubmit: submitForm, children: [
      /* @__PURE__ */ jsxs("label", { className: "flex  flex-col my-4", htmlFor: "image", children: [
        /* @__PURE__ */ jsx("span", { className: "mb-2", children: "Brand Logo" }),
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          UploadImage,
          {
            defaultValue: id ? (_b = (_a = state == null ? void 0 : state.selectedBrand) == null ? void 0 : _a.logo) == null ? void 0 : _b.replace("public", "/storage") : "",
            setSelectedFile: setSelectedImage
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Flex$1, { gap: 10, children: /* @__PURE__ */ jsxs("label", { className: "flex  flex-col", htmlFor: "", children: [
        /* @__PURE__ */ jsx("span", { children: "Title" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            className: "p-2 border border-gray-300 rounded"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("strong", { children: "Overview" }),
      /* @__PURE__ */ jsx(Ck5Editor, { name: "overview", defaultValue: description }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "mt-4", children: "Save" })
    ] })
  ] });
}
function rootReducer(state, { type, payload }) {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
  }
}
async function loadProducts({ search, price, categories, brands, sort, type, page = 1, perPage = 15 }) {
  this.dispatch({ payload: { loading: true } });
  try {
    const queryParams = { page };
    if (search) {
      queryParams.search_term = search;
    }
    if (price) {
      queryParams.price = price;
    }
    if (categories) {
      queryParams.categories = categories;
    }
    if (brands) {
      queryParams.brands = brands;
    }
    if (sort) {
      queryParams.sort_order = sort;
    }
    if (page) {
      queryParams.page = page;
    }
    const response = await axios.get("/api/filter/products", { params: queryParams });
    console.log("response", response);
    if (response.data.success) {
      this.dispatch({ payload: { products: response == null ? void 0 : response.data.products, total: response == null ? void 0 : response.data.total, currentPage: response == null ? void 0 : response.data.current_page, lastPage: response == null ? void 0 : response.data.last_page } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadProduct(id) {
  try {
    const method = "get";
    let api = `/api/get/products/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts[0] } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadCategories() {
  try {
    const method = "get";
    let api = "/api/get/categories";
    const config = {};
    const categories_res = await ajaxRequest(method, api, {}, config);
    const brands_res = await ajaxRequest(method, "/api/get/brands", {}, config);
    if (categories_res.success && brands_res.success) {
      let response = {
        categories: categories_res == null ? void 0 : categories_res.categories,
        brands: brands_res == null ? void 0 : brands_res.brands
      };
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
  }
}
async function saveProduct({ id = null, formValues, navigate }) {
  try {
    if (id) {
      formValues.append("id", id);
    }
    const method = "post";
    let api = id ? "/api/update/product" : "/api/save/product";
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      ShowToast({ message: `Product ${id ? "Updated" : "Created"}`, icon: /* @__PURE__ */ jsx(SmileOutlined, { color: "green" }) });
      return true;
    }
    return false;
  } catch (error) {
    ShowToast({ message: "Sorry, There was an error creating category" });
    return false;
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteProduct(id) {
  try {
    const method = "delete";
    let api = `/api/delete/product/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
    } else {
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadProducts.call(this);
  }
}
async function uploadProductImages(files, product) {
  this.dispatch({ payload: { loading: true } });
  try {
    const formValues = new FormData();
    formValues.append("id", product.id);
    for (let i = 0; i < files.length; i++) {
      formValues.append("files[]", files[i].file);
    }
    const response = await axios.post("/api/save/product/images", formValues, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (response.data.success) {
      ShowToast({ message: `Product images uploaded`, icon: /* @__PURE__ */ jsx(SmileOutlined, { color: "green" }) });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
    loadProduct.call(this, product.id);
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteProductImage(id) {
  var _a;
  try {
    const method = "delete";
    let api = `/api/product/images/delete/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
    loadProduct.call(this, (_a = this == null ? void 0 : this.selectedProduct) == null ? void 0 : _a.id);
  }
}
async function loadReviews() {
  var _a, _b;
  try {
    let selectedProductId = (_b = (_a = this == null ? void 0 : this.state) == null ? void 0 : _a.selectedProduct) == null ? void 0 : _b.id;
    const method = "get";
    let api = `/api/get/reviews/${selectedProductId}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function saveReviews(formValues) {
  var _a, _b;
  try {
    let selectedProductId = (_b = (_a = this == null ? void 0 : this.state) == null ? void 0 : _a.selectedProduct) == null ? void 0 : _b.id;
    if (!selectedProductId) {
      return ShowToast({ message: "Kindly save the product first, before saving reviews" });
    }
    const method = "post";
    const saveApi = `/api/save/review/${selectedProductId}`;
    const config = {};
    const promises = formValues == null ? void 0 : formValues.map((review) => {
      if (review.id) {
        this.dispatch({ payload: { loading: true } });
        return ajaxRequest(method, `/api/update/review/${review == null ? void 0 : review.id}`, review, config);
      }
      this.dispatch({ payload: { loading: true } });
      return ajaxRequest(method, saveApi, review, config);
    });
    const responses = await Promise.all(promises);
    const allSuccessful = responses.every((response) => response.success);
    if (allSuccessful) {
      return ShowToast({ message: "All reviews saved successfully", icon: /* @__PURE__ */ jsx(FaSmile, {}) });
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
    this.dispatch({ payload: { loading: true } });
  }
}
async function deleteReview(id) {
  try {
    const method = "delete";
    let api = `/api/delete/review/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    return ShowToast({ message: "Review Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
const ProductContext = React.createContext();
function ProductContextProvider({ children }) {
  const initState = {
    loading: true,
    prodcts: []
  };
  const [state, dispatch] = useReducer(rootReducer, initState);
  const methods = {
    loadProducts: loadProducts.bind({ state, dispatch }),
    loadProduct: loadProduct.bind({ state, dispatch }),
    loadCategories: loadCategories.bind({ state, dispatch }),
    saveProduct: saveProduct.bind({ state, dispatch }),
    deleteProduct: deleteProduct.bind({ state, dispatch }),
    uploadProductImages: uploadProductImages.bind({ state, dispatch }),
    deleteProductImage: deleteProductImage.bind({ state, dispatch }),
    loadReviews: loadReviews.bind({ state, dispatch }),
    saveReviews: saveReviews.bind({ state, dispatch }),
    deleteReview: deleteReview.bind({ state, dispatch })
  };
  return /* @__PURE__ */ jsx(ProductContext.Provider, { value: { state, methods, dispatch }, children });
}
function SparePartsIndex() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ProductContextProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const { Option: Option$1 } = Select;
const ProductsHeader = ({ isBusiness, searchTerm, handleSearchChange, handlePriceChange, handleBrandChange, handleCategoryChange, handleSortChange, handleTypeChange }) => {
  const { state, dispatch, methods } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  async function fetchCategories() {
    let res = await methods.loadCategories();
    console.log("respo", res);
    if (res.categories) {
      console.log("cats", res);
      setCategories(res == null ? void 0 : res.categories);
    }
    if (res.brands) {
      console.log("cats", res);
      setBrands(res == null ? void 0 : res.brands);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  const filterMenu = /* @__PURE__ */ jsxs(Space, { direction: "vertical", size: 16, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Price" }),
      /* @__PURE__ */ jsxs(Select, { placeholder: "Select Price", style: { width: "100%" }, onChange: handlePriceChange, children: [
        /* @__PURE__ */ jsxs(Option$1, { value: "lowToHigh", children: [
          /* @__PURE__ */ jsx(FilterOutlined, {}),
          " Price: Low to High"
        ] }),
        /* @__PURE__ */ jsxs(Option$1, { value: "highToLow", children: [
          /* @__PURE__ */ jsx(FilterOutlined, {}),
          " Price: High to Low"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Categories" }),
      /* @__PURE__ */ jsx(
        Select,
        {
          mode: "multiple",
          placeholder: "Select Categories",
          style: { width: "100%" },
          onChange: handleCategoryChange,
          children: categories == null ? void 0 : categories.map((cat, index) => /* @__PURE__ */ jsx(Option$1, { value: cat.id, children: cat.name }, index))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Brands" }),
      /* @__PURE__ */ jsx(
        Select,
        {
          mode: "multiple",
          placeholder: "Select Categories",
          style: { width: "100%" },
          onChange: handleBrandChange,
          children: brands == null ? void 0 : brands.map((brand, index) => /* @__PURE__ */ jsx(Option$1, { value: brand.id, children: brand.name }, index))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Product Type" }),
      /* @__PURE__ */ jsxs(Select, { placeholder: "Select Type", style: { width: "100%" }, onChange: handleTypeChange, children: [
        /* @__PURE__ */ jsx(Option$1, { value: "business", children: "Business Products" }),
        /* @__PURE__ */ jsx(Option$1, { value: "customer", children: "Customer Products" }),
        /* @__PURE__ */ jsx(Option$1, { value: "", children: "Both" })
      ] })
    ] })
  ] });
  const sortMenu = /* @__PURE__ */ jsx(Space, { direction: "vertical", size: 16, children: /* @__PURE__ */ jsxs(Select, { defaultValue: "desc", style: { width: "100%" }, onChange: handleSortChange, children: [
    /* @__PURE__ */ jsxs(Option$1, { value: "desc", children: [
      /* @__PURE__ */ jsx(SortDescendingOutlined, {}),
      " Sort Desc"
    ] }),
    /* @__PURE__ */ jsxs(Option$1, { value: "asc", children: [
      /* @__PURE__ */ jsx(SortAscendingOutlined, {}),
      " Sort Asc"
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs(Row, { style: { justifyContent: "space-between" }, gutter: [16, 16], justify: "space-between", align: "middle", className: "mb-4 table-header", children: [
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Search products",
        value: searchTerm,
        onChange: handleSearchChange,
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsxs(Space, { style: { width: "fit-content", gap: "20px", marginLeft: "auto", display: "flex" }, align: "center", children: [
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          visible: filterMenuVisible,
          onVisibleChange: setFilterMenuVisible,
          overlay: filterMenu,
          trigger: ["click"],
          children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FilterOutlined, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          visible: sortMenuVisible,
          onVisibleChange: setSortMenuVisible,
          overlay: sortMenu,
          trigger: ["click"],
          children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(SortAscendingOutlined, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Link, { style: { textDecoration: "none" }, to: "/spare-parts/form", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FaPlus, {}), children: "Add New" }) })
    ] }) })
  ] });
};
function SpareParts() {
  var _a;
  const context = useContext(ProductContext);
  const { state, methods, dispatch } = context;
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [brands, setBrands] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const debouncedLoadProducts = useCallback(
    debounce(({ search: search2, price: price2, categories: categories2, brands: brands2, type: type2, sort: sort2, page: page2 }) => {
      methods.loadProducts({ search: search2, price: price2, type: type2, categories: categories2, brands: brands2, sort: sort2, page: page2 });
    }, 600),
    []
  );
  useEffect(() => {
    dispatch({ payload: { loading: true } });
    debouncedLoadProducts({ search, type, price, categories, brands, sort, page });
  }, [price, categories, brands, sort, page, type]);
  useEffect(() => {
    debouncedLoadProducts({ search, price, type, categories, brands, sort, page });
  }, [search]);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handlePriceChange = (value) => {
    setPrice(value);
  };
  const handleCategoryChange = (value) => {
    setCategories(value.join(","));
  };
  const handleBrandChange = (value) => {
    setBrands(value.join(","));
  };
  const handleSortChange = (value) => {
    setSort(value);
  };
  const handlePageChange = (page2) => {
    setPage(page2);
  };
  const handleTypeChange = (value) => {
    setType(value);
  };
  const isBusiness = location.pathname.split("/")[2] == "business";
  const columns = [
    {
      title: /* @__PURE__ */ jsx(MdInventory, {}),
      dataIndex: "image",
      key: "image",
      render: (src) => /* @__PURE__ */ jsx(Avatar, { size: "md", src: src.replace("public", "/storage") }),
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { children: text }),
        /* @__PURE__ */ jsxs("div", { className: "small text-body-secondary text-nowrap", children: [
          "Created: ",
          new Date(record.created_at).toLocaleDateString()
        ] })
      ] }),
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category == null ? void 0 : category.name,
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand == null ? void 0 : brand.name,
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Weight (Ton)",
      dataIndex: "weight",
      key: "weight",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Type",
      dataIndex: "is_business_product",
      key: "is_business_product",
      render: (record) => {
        return record == 1 ? /* @__PURE__ */ jsx(Tag, { color: "purple", children: "Business" }) : /* @__PURE__ */ jsx(Tag, { color: "green", children: "Customer" });
      },
      responsive: ["xs", "sm", "md"]
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text, record) => {
        console.log("record", record);
        return /* @__PURE__ */ jsxs("div", { className: "action-column flex  gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: `/spare-parts/form/${record.id}`, children: /* @__PURE__ */ jsx(Tooltip, { title: "Edit Product", children: /* @__PURE__ */ jsx(FaEdit, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsx(Confirm, { onConfirm: () => methods.deleteProduct(record.id), description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(MdDelete, { className: "h-4 w-4" }) })
        ] });
      },
      responsive: ["xs", "sm", "md"]
    }
  ];
  const data = (_a = state == null ? void 0 : state.products) == null ? void 0 : _a.map((item, index) => ({
    ...item,
    key: index
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ProductsHeader,
      {
        searchTerm: search,
        handleCategoryChange,
        handleBrandChange,
        handlePriceChange,
        handleSortChange,
        handleSearchChange,
        handleTypeChange,
        isBusiness
      }
    ),
    state.loading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: data,
        pagination: {
          current: state.currentPage,
          total: state.total,
          pageSize: 16,
          onChange: handlePageChange
        }
      }
    )
  ] });
}
const { Panel } = Collapse;
const ProductReviews = () => {
  const { state, methods, dispatch } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [saving, setSaving] = useState(false);
  async function fetchReviews() {
    setSaving(true);
    let reviews2 = await methods.loadReviews();
    if (reviews2) {
      setReviews(reviews2);
    }
    setSaving(false);
  }
  useEffect(() => {
    fetchReviews();
  }, []);
  const addReview = () => {
    var _a;
    setReviews([...reviews, {
      product_id: (_a = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a.id,
      review_text: "",
      rating: 0,
      user_name: "",
      user_email: "",
      review_date: "",
      country: ""
    }]);
  };
  const handleInputChange = (index, field, value) => {
    const newReviews = [...reviews];
    newReviews[index][field] = value;
    setReviews(newReviews);
  };
  const saveReviews2 = () => {
    methods.saveReviews(reviews);
    dispatch({ payload: { loading: false } });
    fetchReviews();
  };
  const deleteReview2 = (index) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };
  const genExtra = (index, review) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Confirm, { onConfirm: (e) => {
    console.log("Delete confirmed for review ID:", review.id);
    methods.deleteReview(review.id).then(() => {
      console.log("Review deleted from server");
      deleteReview2(index);
    }).catch((error) => {
      console.error("Error deleting review:", error);
    });
  }, description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" }) }) });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: reviews == null ? void 0 : reviews.map((review, index) => /* @__PURE__ */ jsx(Panel, { header: `Review ${index + 1}`, extra: genExtra(index, review), children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", children: [
      /* @__PURE__ */ jsxs(Flex$1, { gap: 10, align: "center w-full", children: [
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Reviewer Name", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.user_name,
            onChange: (e) => handleInputChange(index, "user_name", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Reviewer Email", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.user_email,
            onChange: (e) => handleInputChange(index, "user_email", e.target.value)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Flex$1, { gap: 10, align: "center", children: [
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/3", label: "Reviewing Country", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.country,
            onChange: (e) => handleInputChange(index, "country", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/3", label: "Reviewing Rating", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: review.rating,
            onChange: (e) => handleInputChange(index, "rating", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/3", label: "Reviewing Date", children: /* @__PURE__ */ jsx(
          DatePicker,
          {
            className: "w-full",
            value: review.date ? moment(review.review_date) : null,
            onChange: (date, dateString) => handleInputChange(index, "review_date", dateString)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(MyEditor, { defaultValue: review == null ? void 0 : review.review_text, onChange: (value) => handleInputChange(index, "review_text", value) })
    ] }) }, index)) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addReview, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { disabled: saving, type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveReviews2, children: saving ? "Saving Reviews..." : "Save All Reviews" }) })
    ] })
  ] });
};
const { TabPanel } = Tabs;
function SparePartsForm() {
  var _a, _b, _c, _d, _e;
  const { id } = useParams();
  const context = useContext(ProductContext);
  const { state, dispatch, methods } = context;
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedBrand, setSlectedBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [businessProd, setBusinessProd] = useState(false);
  const [prodTitle, setProdTitle] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [discount, setDiscount] = useState("");
  const [year, setYear] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedTab, setSelectedTab] = useState("basic-info");
  let navigate = useNavigate();
  async function fetchData() {
    await loadCategories2();
    if (id) {
      await methods.loadProduct(id);
    }
    dispatch({ payload: { loading: false } });
  }
  useEffect(() => {
    dispatch({ payload: { loading: true } });
    fetchData();
  }, [id]);
  useEffect(() => {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _i, _j;
    if (id) {
      setBusinessProd(((_a2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a2.is_business_product) == 1);
      setSelectedCat((_b2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _b2.category_id);
      setSlectedBrand((_c2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _c2.brand_id);
      setProdTitle((_d2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _d2.name);
      setPrice((_e2 = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _e2.price);
      setModel((_f = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _f.model);
      setWeight((_g = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _g.weight);
      setDiscount((_h = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _h.discount);
      setQuantity((_i = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _i.stock);
      setYear((_j = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _j.make);
    }
  }, [state == null ? void 0 : state.selectedProduct]);
  async function loadCategories2() {
    let response = await (methods == null ? void 0 : methods.loadCategories());
    setCategories(response == null ? void 0 : response.categories);
    setBrands(response == null ? void 0 : response.brands);
  }
  async function submitForm(e) {
    dispatch({ payload: { loading: true } });
    e.preventDefault();
    let formValues = new FormData(e.target);
    if (selectedImage) {
      formValues.append("image", selectedImage == null ? void 0 : selectedImage.originFileObj);
    }
    let res = await (methods == null ? void 0 : methods.saveProduct({ id, formValues, navigate }));
    if (res) {
      navigate("/spare-parts/list");
    }
  }
  const categoriesOptions = categories == null ? void 0 : categories.map((cat) => ({
    value: cat.id,
    label: cat.name
  }));
  const brandsOptions = brands == null ? void 0 : brands.map((brand) => ({
    value: brand.id,
    label: brand.name
  }));
  function handleCatSelect(value) {
    setSelectedCat(value);
  }
  function handleSelectBrand(value) {
    setSlectedBrand(value);
  }
  const handleSave = async (files) => {
    if (files.length > 0) {
      let unsavedFiles = files == null ? void 0 : files.filter((file) => !file.id);
      await (methods == null ? void 0 : methods.uploadProductImages(unsavedFiles, state == null ? void 0 : state.selectedProduct));
    }
  };
  const handleImageDelete = async (id2) => {
    await methods.deleteProductImage(id2);
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full w-full", children: [
    (state == null ? void 0 : state.loading) && /* @__PURE__ */ jsx(LoadingSpinner, {}),
    /* @__PURE__ */ jsxs("form", { className: "flex-column form bg-white  p-3", onSubmit: submitForm, children: [
      /* @__PURE__ */ jsxs(Tabs, { defaultActiveKey: "basic-info", onChange: setSelectedTab, centered: true, children: [
        /* @__PURE__ */ jsxs(TabPanel, { tab: "Product Info", children: [
          /* @__PURE__ */ jsx("div", { className: "product-image", children: /* @__PURE__ */ jsx(
            UploadImage,
            {
              defaultValue: id ? (_b = (_a = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _a.image) == null ? void 0 : _b.replace("public", "/storage") : "",
              setSelectedFile: setSelectedImage
            }
          ) }),
          /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Product Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  defaultValue: prodTitle,
                  name: "name",
                  placeholder: "Enter the product title here",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Category" }),
              /* @__PURE__ */ jsx(
                CFormSelect,
                {
                  name: "category_id",
                  value: selectedCat,
                  options: categoriesOptions,
                  onChange: (e) => handleCatSelect(e.target.value),
                  className: "select-area"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Make" }),
              /* @__PURE__ */ jsx(
                CFormSelect,
                {
                  name: "brand_id",
                  value: selectedBrand,
                  options: brandsOptions,
                  onChange: (e) => handleSelectBrand(e.target.value),
                  className: "select-area"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Unit Price" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "price",
                  defaultValue: price,
                  placeholder: "Enter the single product price",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Discount %" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "discount",
                  defaultValue: discount,
                  placeholder: "Enter the product discount in percent.",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Year" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "make",
                  defaultValue: year,
                  placeholder: "Enter the product make value.",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Flex$1, { gap: 10, children: [
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Model" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "model",
                  defaultValue: model,
                  placeholder: "Enter the product model",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Quantity" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "stock",
                  defaultValue: quantity,
                  placeholder: "Enter the available stock/quantity",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex-column", htmlFor: "", children: [
              /* @__PURE__ */ jsx("span", { children: "Weight" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  step: "any",
                  type: "number",
                  name: "weight",
                  defaultValue: weight,
                  placeholder: "Enter the product make value.",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "field-group", children: /* @__PURE__ */ jsxs("label", { htmlFor: "", children: [
            "Product Features",
            /* @__PURE__ */ jsx(Ck5Editor, { onChange: () => {
            }, name: "features", defaultValue: id ? ((_c = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _c.features) ?? "" : "" })
          ] }) })
        ] }, "basic-info"),
        /* @__PURE__ */ jsx(TabPanel, { tab: "Product Overview", children: /* @__PURE__ */ jsx("div", { className: "field-group", children: /* @__PURE__ */ jsxs("label", { htmlFor: "", children: [
          "Product Overview",
          /* @__PURE__ */ jsx(Ck5Editor, { onChange: () => {
          }, name: "description", defaultValue: id ? ((_d = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _d.description) ?? "" : "" })
        ] }) }) }, "product-description"),
        /* @__PURE__ */ jsx(TabPanel, { tab: "Product Images", children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px" }, children: [
          /* @__PURE__ */ jsx("h2", { children: "Upload Product Images" }),
          /* @__PURE__ */ jsx(
            MultiFileUploaders,
            {
              defaultImages: (_e = state == null ? void 0 : state.selectedProduct) == null ? void 0 : _e.images,
              onSave: handleSave,
              onDelete: handleImageDelete
            }
          )
        ] }) }, "product-images"),
        /* @__PURE__ */ jsx(TabPanel, { tab: "Product Reviews", children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px" }, children: [
          /* @__PURE__ */ jsx("h2", { children: "Product Reviews" }),
          /* @__PURE__ */ jsx(ProductReviews, {})
        ] }) }, "product-reviews")
      ] }),
      /* @__PURE__ */ jsx(Button, { className: " ml-auto", style: { width: "fit-content" }, htmlType: "submit", children: "Save Product" })
    ] })
  ] });
}
const SolutionsContext = createContext();
const initialState = {
  solutions: [],
  loading: false,
  error: null,
  currentSolution: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  filters: {
    search: "",
    is_viewable: ""
  }
};
const solutionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SOLUTIONS": {
      const payload = action.payload || {};
      const list = Array.isArray(payload.data) ? payload.data : [];
      return {
        ...state,
        solutions: list,
        pagination: {
          ...state.pagination,
          current: payload.current_page || 1,
          total: payload.total || list.length,
          pageSize: payload.per_page || 10
        },
        loading: false,
        error: null
        // Clear any previous errors
      };
    }
    case "SET_CURRENT_SOLUTION":
      return { ...state, currentSolution: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_PAGINATION":
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case "DELETE_SOLUTION":
      return {
        ...state,
        solutions: state.solutions.filter((solution) => solution.id !== action.payload)
      };
    case "UPDATE_SOLUTION":
      return {
        ...state,
        solutions: state.solutions.map(
          (solution) => solution.id === action.payload.id ? action.payload : solution
        )
      };
    case "ADD_SOLUTION":
      return {
        ...state,
        solutions: [action.payload, ...state.solutions]
      };
    default:
      return state;
  }
};
const getCsrfToken = () => {
  var _a;
  try {
    const metaToken = (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content");
    if (metaToken) {
      return decodeURIComponent(metaToken);
    }
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const xsrfCookie = cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="));
    if (xsrfCookie) {
      return decodeURIComponent(xsrfCookie.split("=")[1]);
    }
    const laravelCookie = cookies.find((cookie) => cookie.startsWith("laravel_session="));
    if (laravelCookie) {
      return decodeURIComponent(laravelCookie.split("=")[1]);
    }
    console.warn("CSRF token not found in any expected location");
    return null;
  } catch (error) {
    console.error("Error getting CSRF token:", error);
    return null;
  }
};
const refreshSession = async () => {
  try {
    let response = await fetch("/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!response.ok) {
      response = await fetch("/api/refresh-csrf", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json"
        }
      });
    }
    if (response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return getCsrfToken();
    }
  } catch (error) {
    console.error("Failed to refresh session:", error);
  }
  return null;
};
const makeAuthenticatedRequest = async (url, options = {}) => {
  let attempts = 0;
  const maxAttempts = 2;
  while (attempts < maxAttempts) {
    try {
      let csrfToken = getCsrfToken();
      if (!csrfToken && attempts === 0) {
        csrfToken = await refreshSession();
      }
      if (!csrfToken) {
        throw new Error("CSRF token not available");
      }
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...options.headers
      };
      if (options.body instanceof FormData) {
        delete headers["Content-Type"];
      }
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "same-origin"
      });
      if (response.status === 419) {
        if (attempts < maxAttempts - 1) {
          attempts++;
          await refreshSession();
          continue;
        }
        throw new Error("CSRF token mismatch. Please refresh the page and try again.");
      }
      if (response.status === 401) {
        throw new Error("Authentication required. Please log in again.");
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }
      return data;
    } catch (error) {
      if (attempts === maxAttempts - 1) {
        throw error;
      }
      attempts++;
    }
  }
};
const solutionsAPI = {
  // Get solutions list
  async getSolutions(filters = {}, pagination = {}) {
    const params = new URLSearchParams({
      ...filters,
      page: pagination.current || 1,
      per_page: pagination.pageSize || 10
    });
    return makeAuthenticatedRequest(`/api/admin/solutions?${params}`, {
      method: "GET"
    });
  },
  // Get single solution
  async getSolution(id) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${id}`, {
      method: "GET"
    });
  },
  // Create solution
  async createSolution(solutionData) {
    return makeAuthenticatedRequest("/api/admin/solutions", {
      method: "POST",
      body: solutionData
      // Remove headers for FormData
    });
  },
  // Update solution
  async updateSolution(id, solutionData) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${id}`, {
      method: "PUT",
      body: solutionData
      // Remove headers for FormData
    });
  },
  // Delete solution
  async deleteSolution(id) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${id}`, {
      method: "DELETE"
    });
  },
  // Get available products
  async getAvailableProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return makeAuthenticatedRequest(`/api/admin/solutions/products/available?${params}`, {
      method: "GET"
    });
  },
  // Assign products
  async assignProducts(solutionId, productIds) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${solutionId}/products/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product_ids: productIds })
    });
  },
  // Remove products
  async removeProducts(solutionId, productIds) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${solutionId}/products/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product_ids: productIds })
    });
  }
};
const SolutionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(solutionsReducer, initialState);
  const methods = {
    // Load solutions
    async loadSolutions(filters = {}, pagination = {}) {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const data = await solutionsAPI.getSolutions(filters, pagination);
        dispatch({ type: "SET_SOLUTIONS", payload: data });
      } catch (error) {
        console.error("Error loading solutions:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
        if (error.message.includes("Authentication") || error.message.includes("Unauthenticated")) {
          window.location.href = "/login";
          return;
        }
        if (error.message.includes("NetworkError") || error.message.includes("fetch")) {
          dispatch({ type: "SET_ERROR", payload: "Network error. Please check your connection and try again." });
          return;
        }
        message.error(error.message || "Failed to load solutions");
      }
    },
    // Load single solution
    async loadSolution(id) {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });
        const solution = await solutionsAPI.getSolution(id);
        dispatch({ type: "SET_CURRENT_SOLUTION", payload: solution });
        dispatch({ type: "SET_LOADING", payload: false });
        return solution;
      } catch (error) {
        console.error("Error loading solution:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
        dispatch({ type: "SET_LOADING", payload: false });
        if (error.message.includes("Authentication") || error.message.includes("Unauthenticated")) {
          window.location.href = "/login";
          return;
        }
        message.error(error.message || "Failed to load solution");
        throw error;
      }
    },
    // Create solution
    async createSolution(solutionData) {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const solution = await solutionsAPI.createSolution(solutionData);
        dispatch({ type: "ADD_SOLUTION", payload: solution });
        dispatch({ type: "SET_LOADING", payload: false });
        message.success("Solution created successfully");
        return solution;
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
        message.error(error.message || "Failed to create solution");
        throw error;
      }
    },
    // Update solution
    async updateSolution(id, solutionData) {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const solution = await solutionsAPI.updateSolution(id, solutionData);
        dispatch({ type: "UPDATE_SOLUTION", payload: solution });
        dispatch({ type: "SET_CURRENT_SOLUTION", payload: solution });
        dispatch({ type: "SET_LOADING", payload: false });
        message.success("Solution updated successfully");
        return solution;
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
        message.error(error.message || "Failed to update solution");
        throw error;
      }
    },
    // Delete solution
    async deleteSolution(id) {
      try {
        await solutionsAPI.deleteSolution(id);
        dispatch({ type: "DELETE_SOLUTION", payload: id });
        message.success("Solution deleted successfully");
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },
    // Get available products
    async getAvailableProducts(filters = {}) {
      try {
        return await solutionsAPI.getAvailableProducts(filters);
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },
    // Assign products
    async assignProducts(solutionId, productIds) {
      try {
        await solutionsAPI.assignProducts(solutionId, productIds);
        message.success("Products assigned successfully");
        await methods.loadSolution(solutionId);
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },
    // Remove products
    async removeProducts(solutionId, productIds) {
      try {
        await solutionsAPI.removeProducts(solutionId, productIds);
        message.success("Products removed successfully");
        await methods.loadSolution(solutionId);
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },
    // Set filters
    setFilters(filters) {
      dispatch({ type: "SET_FILTERS", payload: filters });
    },
    // Set pagination
    setPagination(pagination) {
      dispatch({ type: "SET_PAGINATION", payload: pagination });
    },
    // Clear current solution
    clearCurrentSolution() {
      dispatch({ type: "SET_CURRENT_SOLUTION", payload: null });
    }
  };
  return /* @__PURE__ */ jsx(SolutionsContext.Provider, { value: { state, dispatch, methods }, children });
};
const SolutionsIndex = () => {
  return /* @__PURE__ */ jsx(SolutionsProvider, { children: /* @__PURE__ */ jsx("div", { style: { height: "auto", minHeight: "100vh" }, children: /* @__PURE__ */ jsx(Outlet, {}) }) });
};
const { Search } = Input;
const { Option } = Select;
const { Title: Title$1, Text: Text$1 } = Typography;
function Solutions() {
  const { state, methods } = useContext(SolutionsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewableFilter, setViewableFilter] = useState("");
  const searchTimeoutRef = useRef(null);
  useEffect(() => {
    methods.loadSolutions({}, { current: 1, pageSize: 10 });
  }, []);
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
  const handleSearch = (term, filter) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      const filters = {
        search: term,
        is_viewable: filter
      };
      methods.setFilters(filters);
      methods.loadSolutions(filters, state.pagination);
    }, 500);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value, viewableFilter);
  };
  const handleFilterChange = (value) => {
    setViewableFilter(value);
    handleSearch(searchTerm, value);
  };
  const handleTableChange = (pagination) => {
    const newPagination = {
      current: pagination.current,
      pageSize: pagination.pageSize
    };
    methods.setPagination(newPagination);
    methods.loadSolutions(state.filters, newPagination);
  };
  const handleDelete = async (id) => {
    try {
      await methods.deleteSolution(id);
      const currentPage = state.pagination.current;
      const totalPages = Math.ceil((state.pagination.total - 1) / state.pagination.pageSize);
      const newPage = currentPage > totalPages ? Math.max(1, totalPages) : currentPage;
      methods.loadSolutions(state.filters, {
        ...state.pagination,
        current: newPage
      });
    } catch (error) {
      console.error("Error deleting solution:", error);
    }
  };
  const clearFilters = () => {
    setSearchTerm("");
    setViewableFilter("");
    methods.setFilters({ search: "", is_viewable: "" });
    methods.loadSolutions({}, { current: 1, pageSize: 10 });
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image, record) => {
        var _a, _b;
        const imgSrc = typeof image === "string" && image ? image.replace("public", "/storage") : null;
        return /* @__PURE__ */ jsx(
          Avatar,
          {
            size: 64,
            src: imgSrc,
            style: { backgroundColor: "#f0f0f0" },
            children: !imgSrc && ((_b = (_a = record.name) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase())
          }
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { to: `/solutions/form/${record.id}`, className: "font-semibold text-blue-600 hover:text-blue-800", children: text }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
          "Slug: ",
          record.slug
        ] })
      ] })
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => /* @__PURE__ */ jsx("div", { className: "max-w-xs", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: text ? text.length > 100 ? `${text.substring(0, 100)}...` : text : "No description" }) })
    },
    {
      title: "Products",
      dataIndex: "products_count",
      key: "products_count",
      width: 100,
      render: (count) => {
        const num = typeof count === "number" ? count : parseInt(count || "0", 10);
        return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx(Badge, { count: num, showZero: true, style: { backgroundColor: "#1890ff" }, children: /* @__PURE__ */ jsx("div", { className: "text-center p-2", children: /* @__PURE__ */ jsx(FaIndustry, { className: "text-lg text-blue-500" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "machines" })
        ] });
      }
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: 100,
      render: (isActive) => /* @__PURE__ */ jsx(
        Badge,
        {
          status: isActive ? "success" : "error",
          text: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            isActive ? /* @__PURE__ */ jsx(FaEye, { className: "text-green-500" }) : /* @__PURE__ */ jsx(FaEyeSlash, { className: "text-red-500" }),
            isActive ? "Visible" : "Hidden"
          ] })
        }
      )
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 120,
      render: (date) => /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: new Date(date).toLocaleDateString() })
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "small", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "Edit Solution", children: /* @__PURE__ */ jsx(Link, { to: `/solutions/form/${record.id}`, children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "primary",
            icon: /* @__PURE__ */ jsx(FaEdit, {}),
            size: "small",
            className: "flex items-center"
          }
        ) }) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Manage Products", children: /* @__PURE__ */ jsx(Link, { to: `/solutions/products/${record.id}`, children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "default",
            icon: /* @__PURE__ */ jsx(FaCog, {}),
            size: "small",
            className: "flex items-center"
          }
        ) }) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Delete Solution", children: /* @__PURE__ */ jsx(
          Popconfirm,
          {
            title: "Delete Solution",
            description: "Are you sure you want to delete this solution? This action cannot be undone.",
            onConfirm: () => handleDelete(record.id),
            okText: "Yes, Delete",
            cancelText: "Cancel",
            okButtonProps: { danger: true },
            children: /* @__PURE__ */ jsx(
              Button,
              {
                danger: true,
                icon: /* @__PURE__ */ jsx(FaTrash, {}),
                size: "small",
                className: "flex items-center"
              }
            )
          }
        ) })
      ] })
    }
  ];
  const totalSolutions = state.pagination.total;
  const visibleSolutions = state.solutions.filter((s) => s.is_active).length;
  const totalProducts = state.solutions.reduce((sum, s) => sum + (s.products_count || 0), 0);
  const avgProductsPerSolution = totalSolutions > 0 ? (totalProducts / totalSolutions).toFixed(1) : 0;
  const visibilityPercentage = totalSolutions > 0 ? (visibleSolutions / totalSolutions * 100).toFixed(1) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50 min-h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Title$1, { level: 2, className: "mb-2", children: [
          /* @__PURE__ */ jsx(FaIndustry, { className: "inline mr-2 text-blue-600" }),
          "Solutions Management"
        ] }),
        /* @__PURE__ */ jsx(Text$1, { type: "secondary", children: "Manage solution categories for heavy machinery and industrial equipment" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/solutions/form", children: /* @__PURE__ */ jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsx(FaPlus, {}), size: "large", className: "flex items-center", children: "Add New Solution" }) })
    ] }) }),
    state.error && /* @__PURE__ */ jsx(
      Alert,
      {
        message: "Error",
        description: state.error,
        type: "error",
        showIcon: true,
        icon: /* @__PURE__ */ jsx(FaExclamationTriangle, {}),
        className: "mb-6",
        action: /* @__PURE__ */ jsx(Button, { size: "small", danger: true, onClick: () => methods.loadSolutions({}, { current: 1, pageSize: 10 }), children: "Retry" })
      }
    ),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, className: "mb-6", children: [
      /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, lg: 6, children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Solutions",
          value: totalSolutions,
          prefix: /* @__PURE__ */ jsx(FaIndustry, { className: "text-blue-500" }),
          valueStyle: { color: "#1890ff" }
        }
      ) }) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, lg: 6, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(
          Statistic,
          {
            title: "Visible Solutions",
            value: visibleSolutions,
            prefix: /* @__PURE__ */ jsx(FaEye, { className: "text-green-500" }),
            valueStyle: { color: "#52c41a" }
          }
        ),
        /* @__PURE__ */ jsx(Progress, { percent: parseFloat(visibilityPercentage), size: "small", showInfo: false })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, lg: 6, children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Total Products",
          value: totalProducts,
          prefix: /* @__PURE__ */ jsx(FaCog, { className: "text-orange-500" }),
          valueStyle: { color: "#fa8c16" }
        }
      ) }) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, lg: 6, children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(
        Statistic,
        {
          title: "Avg Products/Solution",
          value: avgProductsPerSolution,
          prefix: /* @__PURE__ */ jsx(FaChartBar, { className: "text-purple-500" }),
          valueStyle: { color: "#722ed1" }
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
        /* @__PURE__ */ jsx(FaFilter, { className: "mr-2 text-gray-500" }),
        /* @__PURE__ */ jsx(Text$1, { strong: true, children: "Filters & Search" })
      ] }),
      /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
        /* @__PURE__ */ jsx(Col, { xs: 24, md: 8, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text$1, { className: "block mb-2", children: "Search Solutions" }),
          /* @__PURE__ */ jsx(
            Search,
            {
              placeholder: "Search by name or description...",
              value: searchTerm,
              onChange: handleSearchChange,
              allowClear: true,
              prefix: /* @__PURE__ */ jsx(FaSearch, { className: "text-gray-400" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(Col, { xs: 24, md: 8, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text$1, { className: "block mb-2", children: "Visibility Status" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              placeholder: "Filter by visibility",
              value: viewableFilter,
              onChange: handleFilterChange,
              style: { width: "100%" },
              allowClear: true,
              children: [
                /* @__PURE__ */ jsx(Option, { value: "1", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FaEye, { className: "mr-2 text-green-500" }),
                  "Visible"
                ] }) }),
                /* @__PURE__ */ jsx(Option, { value: "0", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FaEyeSlash, { className: "mr-2 text-red-500" }),
                  "Hidden"
                ] }) })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(Col, { xs: 24, md: 8, className: "flex items-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: clearFilters,
            className: "w-full",
            children: "Clear Filters"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx(Text$1, { strong: true, children: "Solutions List" }),
        /* @__PURE__ */ jsxs(Text$1, { type: "secondary", children: [
          "Showing ",
          state.solutions.length,
          " of ",
          totalSolutions,
          " solutions"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Table,
        {
          columns,
          dataSource: state.solutions,
          loading: state.loading,
          pagination: {
            current: state.pagination.current,
            pageSize: state.pagination.pageSize,
            total: state.pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} solutions`,
            pageSizeOptions: ["10", "20", "50", "100"]
          },
          onChange: handleTableChange,
          rowKey: "id",
          scroll: { x: 1e3 },
          size: "middle",
          className: "custom-table"
        }
      )
    ] })
  ] });
}
const Solutions$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Solutions
}, Symbol.toStringTag, { value: "Module" }));
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Step } = Steps;
const SolutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state, methods } = useContext(SolutionsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (id) {
      loadSolution();
    }
  }, [id]);
  const loadSolution = async () => {
    try {
      setLoading(true);
      const solution = await methods.loadSolution(id);
      form.setFieldsValue({
        name: solution.name,
        description: solution.description,
        is_active: solution.is_active
      });
    } catch (err) {
      message.error("Failed to load solution. Please try again.");
      console.error("Error loading solution:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    var _a, _b, _c;
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      setLoading(true);
      setError(null);
      const formValues = form.getFieldsValue(true);
      if (!formValues.name || !formValues.name.trim()) {
        throw new Error("Solution name is required");
      }
      if (!formValues.description || !formValues.description.trim()) {
        throw new Error("Solution description is required");
      }
      const formData = new FormData();
      formData.append("name", formValues.name.trim());
      formData.append("description", formValues.description.trim());
      formData.append("is_active", formValues.is_active ? "1" : "0");
      if (formValues.image && formValues.image.length > 0) {
        const imageFile = formValues.image[0];
        if (imageFile.originFileObj) {
          formData.append("image", imageFile.originFileObj);
        }
      }
      let response;
      if (id) {
        formData.append("_method", "PUT");
        response = await methods.updateSolution(id, formData);
      } else {
        response = await methods.createSolution(formData);
      }
      message.success(`Solution ${id ? "updated" : "created"} successfully!`);
      navigate("/dashboard/solutions");
    } catch (err) {
      console.error("Error saving solution:", err);
      if (((_a = err.response) == null ? void 0 : _a.status) === 422) {
        const validationErrors = err.response.data.errors;
        const errorMessage = Object.values(validationErrors).flat().join("\n");
        setError(errorMessage || "Validation failed. Please check your input.");
        message.error(errorMessage || "Validation failed. Please check your input.");
      } else if (((_b = err.message) == null ? void 0 : _b.includes("CSRF")) || ((_c = err.response) == null ? void 0 : _c.status) === 419) {
        message.error("Session expired. Please refresh the page and try again.");
        window.location.reload();
      } else {
        setError(err.message || "Failed to save solution. Please try again.");
        message.error(err.message || "Failed to save solution. Please try again.");
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(["name", "description"]);
      }
      setCurrentStep((current) => current + 1);
    } catch (err) {
      message.error("Please fill in all required fields before proceeding");
    }
  };
  const steps = [
    {
      title: "Basic Info",
      content: /* @__PURE__ */ jsxs(Card, { title: "Basic Information", className: "mb-4", children: [
        /* @__PURE__ */ jsx(
          Form.Item,
          {
            name: "name",
            label: "Solution Name",
            rules: [
              { required: true, message: "Please enter the solution name" },
              { whitespace: true, message: "Name cannot be empty" }
            ],
            children: /* @__PURE__ */ jsx(Input, { placeholder: "Enter solution name" })
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Item,
          {
            name: "description",
            label: "Description",
            rules: [
              { required: true, message: "Please enter the description" },
              { whitespace: true, message: "Description cannot be empty" }
            ],
            children: /* @__PURE__ */ jsx(TextArea, { rows: 4, placeholder: "Enter solution description" })
          }
        )
      ] })
    },
    {
      title: "Media",
      content: /* @__PURE__ */ jsx(Card, { title: "Media", className: "mb-4", children: /* @__PURE__ */ jsx(
        Form.Item,
        {
          name: "image",
          label: "Solution Image",
          valuePropName: "fileList",
          getValueFromEvent: (e) => Array.isArray(e) ? e : e == null ? void 0 : e.fileList,
          children: /* @__PURE__ */ jsx(
            Upload,
            {
              accept: "image/*",
              listType: "picture-card",
              maxCount: 1,
              beforeUpload: () => false,
              children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(FaUpload, {}),
                /* @__PURE__ */ jsx("div", { style: { marginTop: 8 }, children: "Upload" })
              ] })
            }
          )
        }
      ) })
    },
    {
      title: "Settings",
      content: /* @__PURE__ */ jsx(Card, { title: "Settings", className: "mb-4", children: /* @__PURE__ */ jsx(
        Form.Item,
        {
          name: "is_active",
          label: "Active Status",
          valuePropName: "checked",
          initialValue: true,
          children: /* @__PURE__ */ jsx(Switch, {})
        }
      ) })
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4 flex justify-between items-center", children: /* @__PURE__ */ jsxs(Space, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          icon: /* @__PURE__ */ jsx(FaArrowLeft, {}),
          onClick: () => navigate("/dashboard/solutions"),
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsx(Title, { level: 4, style: { margin: 0 }, children: id ? "Edit Solution" : "Create New Solution" })
    ] }) }),
    error && /* @__PURE__ */ jsx(
      Alert,
      {
        message: "Error",
        description: error,
        type: "error",
        showIcon: true,
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ jsx(Steps, { current: currentStep, className: "mb-8", children: steps.map((item) => /* @__PURE__ */ jsx(Step, { title: item.title }, item.title)) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        layout: "vertical",
        onFinish: handleSubmit,
        initialValues: {
          is_active: true
        },
        validateTrigger: ["onBlur", "onChange"],
        preserve: true,
        children: [
          /* @__PURE__ */ jsx("div", { className: "steps-content", children: steps[currentStep].content }),
          /* @__PURE__ */ jsxs("div", { className: "steps-action mt-4 flex justify-between", children: [
            currentStep > 0 && /* @__PURE__ */ jsx(Button, { onClick: () => setCurrentStep((current) => current - 1), children: "Previous" }),
            /* @__PURE__ */ jsxs("div", { children: [
              currentStep < steps.length - 1 && /* @__PURE__ */ jsx(Button, { type: "primary", onClick: handleNext, children: "Next" }),
              currentStep === steps.length - 1 && /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading,
                  disabled: isSubmitting,
                  icon: /* @__PURE__ */ jsx(FaSave, {}),
                  children: [
                    id ? "Update" : "Create",
                    " Solution"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] }) });
};
const SolutionForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SolutionForm
}, Symbol.toStringTag, { value: "Module" }));
const ManagerInner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, methods } = useContext(SolutionsContext);
  const [loading, setLoading] = useState(true);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Loading data for solution ID:", id);
        const solution = await methods.loadSolution(id);
        console.log("Solution loaded:", solution);
        const assignedProductIds = Array.isArray(solution.products) ? solution.products.map((p) => p.id.toString()) : [];
        console.log("Assigned product IDs:", assignedProductIds);
        setTargetKeys(assignedProductIds);
        const products = await methods.getAvailableProducts({ search });
        console.log("Available products loaded:", products);
        if (Array.isArray(products)) {
          setAvailableProducts(products);
        } else {
          console.error("Invalid products data:", products);
          setAvailableProducts([]);
        }
      } catch (error2) {
        console.error("Error loading data:", error2);
        setError(error2.message || "Failed to load data");
        message.error(error2.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, search]);
  const transferData = useMemo(() => {
    if (!Array.isArray(availableProducts)) {
      console.error("availableProducts is not an array:", availableProducts);
      return [];
    }
    return availableProducts.map((prod) => {
      var _a;
      return {
        key: prod.id.toString(),
        title: prod.name || "Unnamed Product",
        description: ((_a = prod.category) == null ? void 0 : _a.name) || "No Category"
      };
    });
  }, [availableProducts]);
  const handleChange = async (nextTargetKeys, direction, moveKeys) => {
    try {
      setTargetKeys(nextTargetKeys);
      if (direction === "right") {
        await methods.assignProducts(id, moveKeys.map((k) => parseInt(k)));
      } else {
        await methods.removeProducts(id, moveKeys.map((k) => parseInt(k)));
      }
    } catch (error2) {
      console.error("Error updating products:", error2);
      message.error(error2.message || "Failed to update products");
      setTargetKeys((prev) => prev);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx(Space, { className: "mb-4", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FaArrowLeft, {}), onClick: () => navigate("/solutions/list"), children: "Back to Solutions" }) }),
      /* @__PURE__ */ jsx(
        Alert,
        {
          message: "Error",
          description: error,
          type: "error",
          showIcon: true,
          action: /* @__PURE__ */ jsx(Button, { size: "small", onClick: () => window.location.reload(), children: "Retry" })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx(Space, { className: "mb-4", children: /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx(FaArrowLeft, {}), onClick: () => navigate("/solutions/list"), children: "Back to Solutions" }) }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-screen", children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) : /* @__PURE__ */ jsxs(Card, { title: "Manage Products for Solution", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 max-w-sm", children: /* @__PURE__ */ jsx(
        Input.Search,
        {
          placeholder: "Search products...",
          allowClear: true,
          onSearch: handleSearch,
          loading
        }
      ) }),
      transferData.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-gray-500", children: "No products available" }) : /* @__PURE__ */ jsx(
        Transfer,
        {
          dataSource: transferData,
          titles: [`Available (${transferData.length})`, `Assigned (${targetKeys.length})`],
          listStyle: { width: 350, height: 400 },
          targetKeys,
          onChange: handleChange,
          render: (item) => `${item.title} (${item.description})`,
          showSearch: true,
          filterOption: (inputValue, item) => item.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        }
      )
    ] })
  ] });
};
function SolutionProductsManagerWrapper() {
  return /* @__PURE__ */ jsx(SolutionsProvider, { children: /* @__PURE__ */ jsx(ManagerInner, {}) });
}
const SolutionProductsManager = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SolutionProductsManagerWrapper
}, Symbol.toStringTag, { value: "Module" }));
const AppContent = () => {
  return /* @__PURE__ */ jsx("div", { id: "dash-root-responsive", className: "dash-root-responsive px-5", style: { position: "relative" }, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(CSpinner, { color: "primary" }), children: /* @__PURE__ */ jsxs(Routes, { children: [
    routes == null ? void 0 : routes.map((route, idx) => {
      return route.element && /* @__PURE__ */ jsx(
        Route,
        {
          path: route.path,
          exact: route.exact,
          name: route.name,
          element: /* @__PURE__ */ jsx(route.element, {})
        },
        idx
      );
    }),
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Navigate, { to: "dashboard", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/transactions", element: /* @__PURE__ */ jsx(Navigate, { to: "transactions", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/orders", element: /* @__PURE__ */ jsx(Navigate, { to: "dashboard", replace: true }) }),
    /* @__PURE__ */ jsxs(Route, { path: "/machinery-vehicles", element: /* @__PURE__ */ jsx(ProductIndex, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "list", element: /* @__PURE__ */ jsx(Products, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "form/:id?", element: /* @__PURE__ */ jsx(ProductForm, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "details/:id?", element: /* @__PURE__ */ jsx(ProductForm, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Route, { path: "/spare-parts", element: /* @__PURE__ */ jsx(SparePartsIndex, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "list", element: /* @__PURE__ */ jsx(SpareParts, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "form/:id?", element: /* @__PURE__ */ jsx(SparePartsForm, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "details/:id?", element: /* @__PURE__ */ jsx(SparePartsForm, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Route, { path: "/categories", element: /* @__PURE__ */ jsx(CategoryIndex, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "list", element: /* @__PURE__ */ jsx(Categories, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "form/:id?", element: /* @__PURE__ */ jsx(CategoriesForm, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "details/:id?", element: /* @__PURE__ */ jsx(CategoriesForm, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Route, { path: "/brands", element: /* @__PURE__ */ jsx(BrandIndex, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "list", element: /* @__PURE__ */ jsx(Brands, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "form/:id?", element: /* @__PURE__ */ jsx(BrandForm, {}) })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "/customers/order/:id", element: /* @__PURE__ */ jsx(OrderDetailsPage, {}) }),
    /* @__PURE__ */ jsxs(Route, { path: "/solutions", element: /* @__PURE__ */ jsx(SolutionsIndex, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "list", element: /* @__PURE__ */ jsx(Solutions, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "form/:id?", element: /* @__PURE__ */ jsx(SolutionForm, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "products/:id", element: /* @__PURE__ */ jsx(SolutionProductsManagerWrapper, {}) })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "/profile/update", element: /* @__PURE__ */ jsx(UpdateProfileInformation, {}) })
  ] }) }) });
};
const AppContent$1 = React.memo(AppContent);
const AppFooter = () => {
  return /* @__PURE__ */ jsx(Fragment, {});
};
const AppFooter$1 = React.memo(AppFooter);
const avatar8 = "/build/assets/8-CQnrj2m9.jpg";
const AppHeaderDropdown = () => {
  return /* @__PURE__ */ jsxs(CDropdown, { variant: "nav-item", children: [
    /* @__PURE__ */ jsx(CDropdownToggle, { placement: "bottom-end", className: "py-0 pe-0", caret: false, children: /* @__PURE__ */ jsx(CAvatar, { src: avatar8, size: "md" }) }),
    /* @__PURE__ */ jsxs(CDropdownMenu, { className: "pt-0", placement: "bottom-end", children: [
      /* @__PURE__ */ jsx(CDropdownHeader, { className: "bg-body-secondary fw-semibold mb-2", children: "Account" }),
      /* @__PURE__ */ jsxs(CDropdownItem, { href: "/dashboard/user/quries", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilEnvelopeOpen, className: "me-2" }),
        "Messages"
      ] }),
      /* @__PURE__ */ jsx(CDropdownHeader, { className: "bg-body-secondary fw-semibold my-2", children: "Settings" }),
      /* @__PURE__ */ jsxs(CDropdownItem, { href: "/profile", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilUser, className: "me-2" }),
        "Profile"
      ] }),
      /* @__PURE__ */ jsxs(CDropdownItem, { href: "/dashboard/home/index/setting", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilSettings, className: "me-2" }),
        "Settings"
      ] }),
      /* @__PURE__ */ jsxs(CDropdownItem, { href: "/dashboard/transactions", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilCreditCard, className: "me-2" }),
        "Payments"
      ] }),
      /* @__PURE__ */ jsxs(CDropdownItem, { href: "/dashboard/customers/orders", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilCart, className: "me-2" }),
        "Orders"
      ] }),
      /* @__PURE__ */ jsx(CDropdownDivider, {}),
      /* @__PURE__ */ jsxs(CDropdownItem, { href: "/logout", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilLockLocked, className: "me-2" }),
        "Log Out"
      ] })
    ] })
  ] });
};
const AppHeader = () => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes("coreui-free-react-admin-template-theme");
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      headerRef.current && headerRef.current.classList.toggle("shadow-sm", document.documentElement.scrollTop > 0);
    });
  }, []);
  return /* @__PURE__ */ jsxs(CHeader, { position: "sticky", style: { background: "white" }, className: "mb-4 p-0", ref: headerRef, children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs(CContainer, { className: "border-bottom px-4 bg-white", fluid: true, children: [
      /* @__PURE__ */ jsx(
        CHeaderToggler,
        {
          onClick: () => dispatch({ type: "set", sidebarShow: !sidebarShow }),
          style: { marginInlineStart: "-14px" },
          children: /* @__PURE__ */ jsx(CIcon, { icon: cilMenu, size: "lg" })
        }
      ),
      /* @__PURE__ */ jsxs(CHeaderNav, { className: "d-none d-md-flex", children: [
        /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsx(CNavLink, { to: "/home", as: NavLink, children: "Dashboard" }) }),
        /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsx(CNavLink, { href: "#", children: "App Settings" }) })
      ] }),
      /* @__PURE__ */ jsxs(CHeaderNav, { className: "ms-auto", children: [
        /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsx(CNavLink, { href: "/dashboard/products/list", children: /* @__PURE__ */ jsx(CIcon, { icon: cilCarAlt, size: "lg" }) }) }),
        /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsx(CNavLink, { href: "#", children: /* @__PURE__ */ jsx(CIcon, { icon: cilList, size: "lg" }) }) }),
        /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsx(CNavLink, { href: "/dashboard/user/quries", children: /* @__PURE__ */ jsx(CIcon, { icon: cilEnvelopeOpen, size: "lg" }) }) })
      ] }),
      /* @__PURE__ */ jsxs(CHeaderNav, { children: [
        /* @__PURE__ */ jsx("li", { className: "nav-item py-1", children: /* @__PURE__ */ jsx("div", { className: "vr h-100 mx-2 text-body text-opacity-75" }) }),
        /* @__PURE__ */ jsxs(CDropdown, { variant: "nav-item", placement: "bottom-end", children: [
          /* @__PURE__ */ jsx(CDropdownToggle, { caret: false, children: colorMode === "dark" ? /* @__PURE__ */ jsx(CIcon, { icon: cilMoon, size: "lg" }) : colorMode === "auto" ? /* @__PURE__ */ jsx(CIcon, { icon: cilContrast, size: "lg" }) : /* @__PURE__ */ jsx(CIcon, { icon: cilSun, size: "lg" }) }),
          /* @__PURE__ */ jsxs(CDropdownMenu, { children: [
            /* @__PURE__ */ jsxs(
              CDropdownItem,
              {
                active: colorMode === "light",
                className: "d-flex  align-items-center",
                as: "button",
                type: "button",
                onClick: () => setColorMode("light"),
                children: [
                  /* @__PURE__ */ jsx(CIcon, { className: "me-2", icon: cilSun, size: "lg" }),
                  " Light"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              CDropdownItem,
              {
                active: colorMode === "dark",
                className: "d-flex  align-items-center",
                as: "button",
                type: "button",
                onClick: () => setColorMode("dark"),
                children: [
                  /* @__PURE__ */ jsx(CIcon, { className: "me-2", icon: cilMoon, size: "lg" }),
                  " Dark"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              CDropdownItem,
              {
                active: colorMode === "auto",
                className: "d-flex  align-items-center",
                as: "button",
                type: "button",
                onClick: () => setColorMode("auto"),
                children: [
                  /* @__PURE__ */ jsx(CIcon, { className: "me-2", icon: cilContrast, size: "lg" }),
                  " Auto"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("li", { className: "nav-item py-1", children: /* @__PURE__ */ jsx("div", { className: "vr h-100 mx-2 text-body text-opacity-75" }) }),
        /* @__PURE__ */ jsx(AppHeaderDropdown, {})
      ] })
    ] })
  ] });
};
const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge, indent = false) => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      icon ? icon : indent && /* @__PURE__ */ jsx("span", { className: "nav-icon", children: /* @__PURE__ */ jsx("span", { className: "nav-icon-bullet" }) }),
      name && name,
      badge && /* @__PURE__ */ jsx(CBadge, { color: badge.color, className: "ms-auto", children: badge.text })
    ] });
  };
  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return /* @__PURE__ */ jsx(Component, { as: "div", children: rest.to || rest.href ? /* @__PURE__ */ jsx(CNavLink, { ...rest.to && { as: NavLink }, ...rest, children: navLink(name, icon, badge, indent) }) : navLink(name, icon, badge, indent) }, index);
  };
  const navGroup = (item, index) => {
    var _a;
    const { component, name, icon, items: items2, to, ...rest } = item;
    const Component = component;
    return /* @__PURE__ */ jsx(Component, { compact: true, as: "div", toggler: navLink(name, icon), ...rest, children: (_a = item.items) == null ? void 0 : _a.map(
      (item2, index2) => item2.items ? navGroup(item2, index2) : navItem(item2, index2, true)
    ) }, index);
  };
  return /* @__PURE__ */ jsx(CSidebarNav, { as: SimpleBar, children: items && items.map((item, index) => item.items ? navGroup(item, index) : navItem(item, index)) });
};
AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    icon: /* @__PURE__ */ jsx(GrBarChart, { size: 20, color: "white" }),
    to: "/home",
    role: ["instructor", "owner"],
    badge: {
      color: "info",
      text: "NEW"
    }
  },
  {
    component: CNavTitle,
    name: ""
  },
  {
    component: CNavItem,
    name: "Categories",
    to: "/categories/list",
    icon: /* @__PURE__ */ jsx(GrList, { size: 20, color: "white" })
  },
  {
    component: CNavItem,
    name: "Brands",
    to: "/brands/list",
    icon: /* @__PURE__ */ jsx(GrProjects, { size: 20, color: "white" })
  },
  // {
  //   component: CNavItem,
  //   name: 'Products',
  //   to: '/products/list',
  //   icon: <GrDeliver size={20} color='white' />,
  // },
  {
    component: CNavItem,
    name: "Transactions",
    to: "/transactions",
    icon: /* @__PURE__ */ jsx(GrCreditCard, { size: 20, color: "white" })
  },
  {
    component: CNavItem,
    name: "Orders",
    to: "/customers/orders",
    icon: /* @__PURE__ */ jsx(GrCart, { size: 20, color: "white" })
  },
  {
    component: CNavGroup,
    name: "Products ",
    to: "/home",
    icon: /* @__PURE__ */ jsx(GrMultiple, { size: 20, color: "white" }),
    items: [
      {
        component: CNavItem,
        name: "B2B",
        to: "/machinery-vehicles/list",
        icon: /* @__PURE__ */ jsx(GrCar, { size: 20, color: "white" })
      },
      {
        component: CNavItem,
        name: "Machine Parts",
        to: "/spare-parts/list",
        icon: /* @__PURE__ */ jsx(GrServices, { size: 20, color: "white" })
      }
    ]
  },
  {
    component: CNavGroup,
    name: "Attachments & Accessories",
    to: "/home",
    icon: /* @__PURE__ */ jsx(GrAttachment, { size: 20, color: "white" }),
    items: [
      {
        component: CNavItem,
        name: "All Attachments",
        to: "/attachments/list",
        icon: /* @__PURE__ */ jsx(GrList, { size: 20, color: "white" })
      },
      {
        component: CNavItem,
        name: "Add Attachment",
        to: "/attachments/add",
        icon: /* @__PURE__ */ jsx(GrDeliver, { size: 20, color: "white" })
      }
    ]
  },
  {
    component: CNavGroup,
    name: "Pages ",
    to: "/home",
    icon: /* @__PURE__ */ jsx(GrMultiple, { size: 20, color: "white" }),
    items: [
      {
        component: CNavItem,
        name: "Home Page",
        to: "/home/index/setting",
        icon: /* @__PURE__ */ jsx(GrHome, { size: 20, color: "white" })
      },
      {
        component: CNavItem,
        name: "About Us",
        to: "/home/about/setting",
        icon: /* @__PURE__ */ jsx(GrCircleInformation, { size: 20, color: "white" })
      },
      {
        component: CNavItem,
        name: "Contact Us",
        to: "/home/contact/setting",
        icon: /* @__PURE__ */ jsx(GrContact, { size: 20, color: "white" })
      },
      {
        component: CNavItem,
        name: "User Reviews",
        to: "/home/user/reviews",
        icon: /* @__PURE__ */ jsx(GrUserExpert, { size: 20, color: "white" })
      },
      {
        component: CNavItem,
        name: "Blogs",
        to: "/home/blogs",
        icon: /* @__PURE__ */ jsx(GrBlog, { size: 20, color: "white" })
      }
    ]
  },
  {
    component: CNavItem,
    name: "Quries",
    to: "/user/quries",
    icon: /* @__PURE__ */ jsx(GrContactInfo, { size: 20, color: "white" })
  },
  {
    component: CNavItem,
    name: "FAQs",
    to: "/home/faqs",
    icon: /* @__PURE__ */ jsx(GrCircleQuestion, { size: 20, color: "white" })
  },
  {
    component: CNavItem,
    name: "Solutions",
    to: "/solutions/list",
    icon: /* @__PURE__ */ jsx(GrProjects, { size: 20, color: "white" })
  }
];
const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  return /* @__PURE__ */ jsxs(
    CSidebar,
    {
      className: "border-end",
      colorScheme: "dark",
      position: "fixed",
      unfoldable,
      visible: sidebarShow,
      onVisibleChange: (visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      },
      children: [
        /* @__PURE__ */ jsxs(CSidebarHeader, { className: "border-bottom", children: [
          /* @__PURE__ */ jsx(CSidebarBrand, { to: "/", children: /* @__PURE__ */ jsx(
            "img",
            {
              loading: "lazy",
              width: 100,
              src: "/images/final_logo.png",
              alt: "Logo"
            }
          ) }),
          /* @__PURE__ */ jsx(
            CCloseButton,
            {
              className: "d-lg-none",
              dark: true,
              onClick: () => dispatch({ type: "set", sidebarShow: false })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AppSidebarNav, { items: _nav }),
        /* @__PURE__ */ jsx(CSidebarFooter, { className: "border-top d-none d-lg-flex", children: /* @__PURE__ */ jsx(
          CSidebarToggler,
          {
            onClick: () => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
          }
        ) })
      ]
    }
  );
};
const AppSidebar$1 = React.memo(AppSidebar);
const DocsCallout = (props) => {
  const { content, href, name } = props;
  const plural = name.slice(-1) === "s" ? true : false;
  const _href = `https://coreui.io/react/docs/${href}`;
  return /* @__PURE__ */ jsxs(CCallout, { color: "info", className: "bg-white", children: [
    content ? content : `A React ${name} component ${plural ? "have" : "has"} been created as a native React.js version
      of Bootstrap ${name}. ${name} ${plural ? "are" : "is"} delivered with some new features,
      variants, and unique design that matches CoreUI Design System requirements.`,
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "For more information please visit our official",
    " ",
    /* @__PURE__ */ jsx(CLink, { href: _href, target: "_blank", children: "documentation of CoreUI Components Library for React.js" }),
    "."
  ] });
};
DocsCallout.propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string
};
const DocsCallout$1 = React.memo(DocsCallout);
const DocsLink = (props) => {
  const { href, name, text, ...rest } = props;
  const _href = name ? `https://coreui.io/react/docs/components/${name}` : href;
  return /* @__PURE__ */ jsx("div", { className: "float-end", children: /* @__PURE__ */ jsx(
    CLink,
    {
      ...rest,
      href: _href,
      rel: "noreferrer noopener",
      target: "_blank",
      className: "card-header-action",
      children: /* @__PURE__ */ jsx("small", { className: "text-body-secondary", children: text || "docs" })
    }
  ) });
};
DocsLink.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string
};
React.memo(DocsLink);
const DocsExample = (props) => {
  const { children, href, tabContentClassName } = props;
  const _href = `https://coreui.io/react/docs/${href}`;
  return /* @__PURE__ */ jsxs("div", { className: "example", children: [
    /* @__PURE__ */ jsxs(CNav, { variant: "underline-border", children: [
      /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsxs(CNavLink, { href: "#", active: true, children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilMediaPlay, className: "me-2" }),
        "Preview"
      ] }) }),
      /* @__PURE__ */ jsx(CNavItem, { children: /* @__PURE__ */ jsxs(CNavLink, { href: _href, target: "_blank", children: [
        /* @__PURE__ */ jsx(CIcon, { icon: cilCode, className: "me-2" }),
        "Code"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(CTabContent, { className: `rounded-bottom ${tabContentClassName ? tabContentClassName : ""}`, children: /* @__PURE__ */ jsx(CTabPane, { className: "p-3 preview", visible: true, children }) })
  ] });
};
DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  tabContentClassName: PropTypes.string
};
const DocsExample$1 = React.memo(DocsExample);
const DefaultLayout = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AppSidebar$1, {}),
    /* @__PURE__ */ jsxs("div", { className: "wrapper d-flex  flex-column min-vh-100", children: [
      /* @__PURE__ */ jsx(AppHeader, {}),
      /* @__PURE__ */ jsx("div", { className: "body flex-grow-1", children: /* @__PURE__ */ jsx(AppContent$1, {}) }),
      /* @__PURE__ */ jsx(AppFooter$1, {})
    ] })
  ] });
};
const DefaultLayout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DefaultLayout
}, Symbol.toStringTag, { value: "Module" }));
export {
  Confirm as C,
  DocsCallout$1 as D,
  MyEditor as M,
  UploadImage as U,
  DocsExample$1 as a,
  Ck5Editor as b,
  DefaultLayout$1 as c,
  loadOrders as l
};
