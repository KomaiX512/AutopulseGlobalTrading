import { j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import React, { useReducer } from "react";
import { a as ajaxRequest, S as ShowToast } from "./helpers-isL4n3oi.js";
import { FaSmile } from "react-icons/fa";
function rootReducer(state, { type, payload }) {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
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
async function loadHomeSettings() {
  try {
    const method = "get";
    let api = `/api/get/all/settings`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    console.log("resp", response);
    if (response.success) {
      this.dispatch({ payload: { home_settings: response.data } });
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function saveSlides(formValues) {
  try {
    const method = "post";
    const saveApi = `/api/save/slide`;
    const config = {};
    this.dispatch({ payload: { loading: true } });
    const promises = formValues == null ? void 0 : formValues.map((slide) => {
      let formValues2 = new FormData();
      for (const i in slide) {
        formValues2.append(i, slide[i]);
      }
      if (slide == null ? void 0 : slide.id) {
        return ajaxRequest(method, `/api/update/slide/${slide == null ? void 0 : slide.id}`, formValues2, config);
      }
      return ajaxRequest(method, saveApi, formValues2, config);
    });
    const responses = await Promise.all(promises);
    const allSuccessful = responses.every((response) => response == null ? void 0 : response.success);
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
async function deleteSlides(id) {
  try {
    const method = "delete";
    let api = `/api/delete/slide/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    return ShowToast({ message: "Review Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function deleteBlog(id) {
  try {
    const method = "delete";
    let api = `/api/delete/blog/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    return ShowToast({ message: "Blog Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function saveAboutText({ formValues, setLoadingState }) {
  try {
    const method = "post";
    let api = `/api/save/about/content`;
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success)
      return ShowToast({ message: "About us content updated" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function saveContactText({ formValues, setLoadingState }) {
  try {
    const method = "post";
    let api = `/api/save/contact/content`;
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
    if (response.success)
      return ShowToast({ message: "Contact us content updated" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
async function loadReviews() {
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
async function saveReviews(formValues) {
  try {
    const method = "post";
    const saveApi = `/api/user/save/review`;
    const config = {};
    const promises = formValues == null ? void 0 : formValues.map((review) => {
      if (review.id) {
        this.dispatch({ payload: { loading: true } });
        return ajaxRequest(method, `/api/user/update/review`, review, config);
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
    let api = `/api/user/delete/review/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    return ShowToast({ message: "Review Deleted Successfully" });
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
async function loadBlogs() {
  try {
    const method = "get";
    let api = `/api/get/blogs`;
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
async function saveFaqs(formValues) {
  try {
    const method = "post";
    const saveApi = `/api/user/save/faqs`;
    const config = {};
    const promises = formValues == null ? void 0 : formValues.map((review) => {
      if (review.id) {
        this.dispatch({ payload: { loading: true } });
        return ajaxRequest(method, `/api/user/update/faqs`, review, config);
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
async function saveBlogs(formValues) {
  try {
    const method = "post";
    const saveApi = `/api/save/blogs`;
    const config = {};
    const promises = formValues == null ? void 0 : formValues.map((blog) => {
      let formValues2 = new FormData();
      for (const i in blog) {
        formValues2.append(i, blog[i]);
      }
      if (blog == null ? void 0 : blog.id) {
        return ajaxRequest(method, `/api/update/blog`, formValues2, config);
      }
      return ajaxRequest(method, saveApi, formValues2, config);
    });
    const responses = await Promise.all(promises);
    const allSuccessful = responses.every((response) => response.success);
    if (allSuccessful) {
      return ShowToast({ message: "All blogs saved successfully", icon: /* @__PURE__ */ jsx(FaSmile, {}) });
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
async function deleteFaqs(id) {
  try {
    const method = "delete";
    let api = `/api/user/delete/faqs/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    return ShowToast({ message: "Review Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return false;
  } finally {
  }
}
const PageContext = React.createContext();
function PageContextProvider({ children }) {
  const initState = {
    loading: true
  };
  const [state, dispatch] = useReducer(rootReducer, initState);
  const methods = {
    loadSlides: loadSlides.bind({ state, dispatch }),
    loadBlogs: loadBlogs.bind({ state, dispatch }),
    saveSlides: saveSlides.bind({ state, dispatch }),
    deleteSlides: deleteSlides.bind({ state, dispatch }),
    saveContactText: saveContactText.bind({ state, dispatch }),
    saveAboutText: saveAboutText.bind({ state, dispatch }),
    loadHomeSettings: loadHomeSettings.bind({ state, dispatch }),
    loadReviews: loadReviews.bind({ state, dispatch }),
    saveReviews: saveReviews.bind({ state, dispatch }),
    deleteReview: deleteReview.bind({ state, dispatch }),
    loadFaqs: loadFaqs.bind({ state, dispatch }),
    saveFaqs: saveFaqs.bind({ state, dispatch }),
    saveBlogs: saveBlogs.bind({ state, dispatch }),
    deleteFaqs: deleteFaqs.bind({ state, dispatch }),
    deleteBlog: deleteBlog.bind({ state, dispatch })
  };
  return /* @__PURE__ */ jsx(PageContext.Provider, { value: { state, methods, dispatch }, children });
}
export {
  PageContext as P,
  PageContextProvider as a
};
