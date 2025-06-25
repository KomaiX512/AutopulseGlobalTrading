import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import React, { useReducer, useContext } from "react";
import { Flex, Image, Tooltip } from "antd";
import { GrCalendar, GrCar } from "react-icons/gr";
import { RiWeightLine } from "react-icons/ri";
import { MdWhatsapp } from "react-icons/md";
import { a as ajaxRequest, S as ShowToast } from "./helpers-isL4n3oi.js";
import { FaCheck } from "react-icons/fa";
function rootReducer(state, { type, payload }) {
  switch (type) {
    case "SET_SELECTED_ATTACHMENT":
      return { ...state, selectedAttachment: payload };
    case "SET_RELATED_ATTACHMENTS":
      return { ...state, relatedAttachments: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };
    default: {
      return { ...state, ...payload };
    }
  }
}
async function loadBlogs(id = null) {
  try {
    const method = "get";
    let api = `/api/get/blogs${id ? `/${id}` : ""}`;
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
async function loadReviews(id) {
  try {
    const method = "get";
    let api = `/api/get/reviews/${id}`;
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
async function loadUserReviews() {
  try {
    const method = "get";
    let api = `/api/user/get/reviews`;
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
async function loadSlides(view) {
  try {
    const method = "get";
    let api = `/api/get/slides/${view}`;
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
async function loadFaqs() {
  try {
    const method = "get";
    let api = `/api/user/get/faqs`;
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
async function filterProducts({ prod_type, selectedCategories = [], selectedBrands = [], selectedPrice = "", page = 1, selectedWeights = [], selectedYears = [] }) {
  var _a;
  try {
    this.dispatch({ payload: { loading: true } });
    const queryParams = { page };
    if (selectedPrice) {
      queryParams.price = selectedPrice;
    }
    if (prod_type) {
      queryParams.prod_type_slug = prod_type;
    }
    if (selectedWeights.length > 0) {
      queryParams.weights = selectedWeights.join(",");
    }
    if ((selectedBrands == null ? void 0 : selectedBrands.length) > 0) {
      queryParams.brands = selectedBrands.join(",");
    }
    if (selectedCategories.length > 0) {
      queryParams.categories = selectedCategories.join(",");
    }
    if (selectedYears.length > 0) {
      queryParams.years = selectedYears.join(",");
    }
    const response = await axios.get(`/api/filter/product/type/${prod_type}`, { params: queryParams });
    if ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.success) {
      this.dispatch({ payload: { filterProducts: response == null ? void 0 : response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadCategories() {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "get";
    let api = "/api/get/categories";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { categories: response == null ? void 0 : response.categories } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { category_modal: false, loading: false } });
  }
}
async function makeCall(type) {
  var _a;
  const queryParams = { page: 1, prod_type_slug: type };
  try {
    const response = await axios.get(`/api/filter/product/type/${type}`, { params: queryParams });
    console.log("res", response);
    if ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.success) {
      return response.data.products;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
async function loadProductsWithTypes() {
  let home_prods = {};
  let machines = [];
  const request_page_type = location.pathname.split("/")[1];
  const productMap = {
    parts: {
      machines: "machine-parts"
    },
    "": {
      machines: "machine"
    }
  };
  try {
    if (productMap[request_page_type]) {
      const { machines: machineType } = productMap[request_page_type];
      machines = await makeCall(machineType);
      if (machines) {
        home_prods = { machines };
        this.dispatch({ payload: { home_prods } });
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loadingProds: false } });
  }
}
async function loadBrandsAndCats({ slug }) {
  var _a, _b;
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "get";
    let api = `/api/get/product-type/cats-brands/${slug}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    console.log("response", response);
    if (response.success) {
      this.dispatch({ payload: { brands: (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.brands, categories: ((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.categories) ?? [] } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { category_modal: false, loading: false } });
  }
}
async function loadProductsWithCategories() {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "get";
    let api = "/api/get/home/categories";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { viewableCategories: response == null ? void 0 : response.categories } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { category_modal: false, loading: false } });
  }
}
async function loadAttachments() {
  this.dispatch({ payload: { loadingAttachments: true } });
  try {
    const method = "get";
    let api = "/api/get/home/attachments";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { attachments: response == null ? void 0 : response.attachments } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loadingAttachments: false } });
  }
}
async function loadAttachmentCategories() {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "get";
    let api = "/api/get/attachment/categories/fixed";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response) {
      this.dispatch({ payload: { attachmentCategories: response } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function filterAttachments({ selectedPrice = "", sort = "desc", type = "", selectedCategories = [], page = 1 }) {
  var _a;
  try {
    this.dispatch({ payload: { loading: true } });
    const queryParams = { page };
    if (selectedPrice) {
      queryParams.price = selectedPrice;
    }
    if (sort) {
      queryParams.sort_order = sort;
    }
    if (type) {
      queryParams.type = type;
    }
    if (selectedCategories.length > 0) {
      queryParams.categories = selectedCategories.join(",");
    }
    const response = await axios.get("/api/filter/attachments", { params: queryParams });
    if ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.success) {
      this.dispatch({ payload: { filterAttachments: response == null ? void 0 : response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function loadBusinessprods() {
  var _a;
  try {
    const response = await axios.get("/api/filter/products?page=1&sort_order=desc&type=business");
    console.log("business", response);
    if (response.data.success) {
      this.dispatch({ payload: { business_products: (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.products } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function loadProducts() {
  try {
    const method = "get";
    let api = "/api/get/home/products";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      console.log("prodcuts", response);
      this.dispatch({ payload: { products: response == null ? void 0 : response.prodcuts } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function loadUserOrders() {
  try {
    const method = "get";
    let api = "/api/get/home/orders";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { orders: response == null ? void 0 : response.orders } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function loadProduct(id) {
  try {
    const method = "get";
    let api = `/api/get/products/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function getRelatedProducs(slug) {
  try {
    const method = "get";
    let api = `/api/products/related/${slug}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { relatedProducts: response == null ? void 0 : response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function getProductDetails(slug) {
  try {
    const method = "get";
    let api = `/api/get/product/${slug}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts[0] } });
      getRelatedProducs.call(this, slug);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
}
async function loadCart() {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "get";
    let api = "/api/cart/items";
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    if (response) {
      console.log("response", response);
      this.dispatch({ payload: { cart: response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: true } });
  }
}
async function addToCart(id) {
  try {
    const method = "post";
    let api = `/api/cart/add`;
    const config = {};
    let formValues = new FormData();
    formValues.append("product_id", id);
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      ShowToast({ message: "Item added to cart", icon: /* @__PURE__ */ jsx(FaCheck, {}) });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadCart.call(this);
    this.dispatch({ payload: { loading: true } });
  }
}
async function removeFromCart(id) {
  try {
    const method = "post";
    let api = `/api/cart/remove`;
    const config = {};
    let formValues = new FormData();
    formValues.append("product_id", id);
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadCart.call(this);
  }
}
async function changeCartQuantity(value, id) {
  try {
    const method = "post";
    let api = `/api/cart/change/quantity`;
    const config = {};
    let formValues = new FormData();
    formValues.append("id", id);
    formValues.append("quantity", value);
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadCart.call(this);
  }
}
async function proceedCart(step) {
  try {
    const method = "post";
    let api = `/api/update/checkout_step`;
    const config = {};
    let formValues = new FormData();
    formValues.append("checkout_step", step);
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadCart.call(this);
  }
}
async function updateUserProfile(formValues) {
  try {
    const method = "post";
    let api = `/api/update/user/details`;
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success) {
      this.dispatch({ payload: { selectedProduct: response == null ? void 0 : response.prodcuts } });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadCart.call(this);
  }
}
async function loadSolutions() {
  try {
    const method = "get";
    let api = "/api/get/home/solutions";
    const response = await ajaxRequest(method, api, {}, {});
    if (response.success) {
      this.dispatch({ payload: { solutions: response.solutions } });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
const HomeContext = React.createContext();
function HomeContextProvider({ children, auth }) {
  const initState = {
    loading: false,
    loadingProds: true,
    loadingAttachments: true,
    categories: [],
    products: [],
    attachments: [],
    attachmentCategories: [],
    filterAttachments: { attachments: [], total: 0, current_page: 1 },
    selectedAttachment: null,
    relatedAttachments: [],
    isEdit: false,
    auth,
    solutions: []
  };
  const [state, dispatch] = useReducer(rootReducer, initState);
  const getAttachmentDetails = async (slug) => {
    try {
      const response = await fetch(`/api/attachment/details/${slug}`);
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "SET_SELECTED_ATTACHMENT",
          payload: data.attachment
        });
      }
    } catch (error) {
      console.error("Error fetching attachment details:", error);
    }
  };
  const loadRelatedAttachments = async (slug) => {
    try {
      const response = await fetch(`/api/attachment/related/${slug}`);
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "SET_RELATED_ATTACHMENTS",
          payload: data.relatedAttachments
        });
      }
    } catch (error) {
      console.error("Error loading related attachments:", error);
    }
  };
  const methods = {
    loadCategories: loadCategories.bind({ state, dispatch }),
    loadProductsWithTypes: loadProductsWithTypes.bind({ state, dispatch }),
    loadSlides: loadSlides.bind({ state, dispatch }),
    loadBlogs: loadBlogs.bind({ state, dispatch }),
    loadReviews: loadReviews.bind({ state, dispatch }),
    loadUserReviews: loadUserReviews.bind({ state, dispatch }),
    loadFaqs: loadFaqs.bind({ state, dispatch }),
    loadBrandsAndCats: loadBrandsAndCats.bind({ state, dispatch }),
    loadProducts: loadProducts.bind({ state, dispatch }),
    loadBusinessprods: loadBusinessprods.bind({ state, dispatch }),
    loadProductsWithCategories: loadProductsWithCategories.bind({ state, dispatch }),
    loadUserOrders: loadUserOrders.bind({ state, dispatch }),
    loadProduct: loadProduct.bind({ state, dispatch }),
    getProductDetails: getProductDetails.bind({ state, dispatch }),
    filterProducts: filterProducts.bind({ state, dispatch }),
    loadCart: loadCart.bind({ state, dispatch }),
    addToCart: addToCart.bind({ state, dispatch }),
    removeFromCart: removeFromCart.bind({ state, dispatch }),
    changeCartQuantity: changeCartQuantity.bind({ state, dispatch }),
    proceedCart: proceedCart.bind({ state, dispatch }),
    updateUserProfile: updateUserProfile.bind({ state, dispatch }),
    loadAttachments: loadAttachments.bind({ state, dispatch }),
    loadAttachmentCategories: loadAttachmentCategories.bind({ state, dispatch }),
    filterAttachments: filterAttachments.bind({ state, dispatch }),
    getAttachmentDetails,
    loadRelatedAttachments,
    loadSolutions: loadSolutions.bind({ state, dispatch })
  };
  return /* @__PURE__ */ jsx(HomeContext.Provider, { value: { state, methods, dispatch }, children });
}
function AttachmentComponent({ attachment, index }) {
  var _a, _b;
  const { methods } = useContext(HomeContext);
  const isBusiness = attachment.type === "business";
  return /* @__PURE__ */ jsx("div", { className: "product-card", style: { height: "100%" }, "data-wow-delay": `0.${index + 2}s`, children: /* @__PURE__ */ jsxs("div", { className: "product-item", children: [
    /* @__PURE__ */ jsx(Flex, { gap: 10, className: "prod-images-modal", children: /* @__PURE__ */ jsxs(Image.PreviewGroup, { children: [
      /* @__PURE__ */ jsx(
        Image,
        {
          loading: "lazy",
          src: `${(attachment == null ? void 0 : attachment.image) ? attachment.image.startsWith("public/") ? attachment.image.replace("public", "/storage") : attachment.image.startsWith("/") ? `/storage${attachment.image}` : `/storage/${attachment.image}` : "/images/placeholder-attachment.jpg"}`,
          fallback: "/images/placeholder-attachment.jpg",
          alt: `Attachment Image ${index + 1}`,
          style: { width: "100%", maxHeight: "250px", marginBottom: "10px" }
        }
      ),
      (_a = attachment == null ? void 0 : attachment.images) == null ? void 0 : _a.map((image, idx) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          Image,
          {
            loading: "lazy",
            src: `${(_a2 = image == null ? void 0 : image.image_path) == null ? void 0 : _a2.replace("public", "/storage")}`,
            alt: `Attachment Image ${idx + 1}`,
            style: { width: "0px !important", height: "auto", marginBottom: "10px", display: "none" }
          },
          idx
        );
      })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "product-details", children: [
      /* @__PURE__ */ jsxs("div", { className: "down-content", children: [
        isBusiness && /* @__PURE__ */ jsxs("div", { className: "flex text-cats flex-wrap align-center gap-3 pb-3 py-1", style: { lineHeight: "normal", fontSize: "12px" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex align-center gap-2", children: [
            /* @__PURE__ */ jsx(GrCalendar, { color: "#ceaa4d", size: 16 }),
            /* @__PURE__ */ jsx("span", { className: "text-dark", children: (attachment == null ? void 0 : attachment.year) || "Latest" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex align-center gap-2", children: [
            /* @__PURE__ */ jsx(GrCar, { color: "#ceaa4d", size: 16 }),
            /* @__PURE__ */ jsx("span", { className: "text-dark", children: (_b = attachment == null ? void 0 : attachment.category) == null ? void 0 : _b.name })
          ] }),
          (attachment == null ? void 0 : attachment.weight) && /* @__PURE__ */ jsxs("div", { className: "flex align-center gap-1", children: [
            /* @__PURE__ */ jsx(RiWeightLine, { color: "#ceaa4d", size: 20 }),
            /* @__PURE__ */ jsxs("span", { className: "text-dark", children: [
              attachment.weight,
              " kg"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("a", { title: "View Attachment Details", className: "card-title-link", style: { height: "40px", display: "block" }, href: `/attachment/${attachment == null ? void 0 : attachment.slug}`, children: /* @__PURE__ */ jsx(Tooltip, { title: attachment == null ? void 0 : attachment.name, children: /* @__PURE__ */ jsx("h4", { className: "m-0", children: attachment == null ? void 0 : attachment.name }) }) }),
        !isBusiness && /* @__PURE__ */ jsx("small", { children: /* @__PURE__ */ jsxs("div", { style: { color: "gray" }, className: "mb-2 text-zinc-400", children: [
          "Stock: ",
          (attachment == null ? void 0 : attachment.stock) || 0
        ] }) })
      ] }),
      isBusiness ? /* @__PURE__ */ jsx("a", { target: "_blank", rel: "noopener noreferrer", style: { height: "60px" }, href: `https://wa.me/13072950382?text=${encodeURIComponent("I would like to inquire about " + (attachment == null ? void 0 : attachment.name))}`, className: "card-footers py-2", children: /* @__PURE__ */ jsxs("button", { style: { width: "100%" }, className: "btn-whatsapp", children: [
        /* @__PURE__ */ jsx(MdWhatsapp, { size: 20, stroke: "3" }),
        "Chat Now"
      ] }) }) : /* @__PURE__ */ jsx("a", { title: "View Attachment Details", href: `/attachment/${attachment == null ? void 0 : attachment.slug}`, className: "card-footers py-2", children: /* @__PURE__ */ jsx("button", { style: { width: "100%" }, className: "primary-btn !gap-3 flex items-center mb-2", children: "View Details" }) })
    ] })
  ] }) }, index);
}
export {
  AttachmentComponent as A,
  HomeContextProvider as H,
  HomeContext as a
};
