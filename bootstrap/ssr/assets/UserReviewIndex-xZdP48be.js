import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useContext, useState, useEffect } from "react";
import { Collapse, Form, Flex, Input, DatePicker, Row, Col, Button } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import moment from "moment";
import { M as MyEditor, C as Confirm } from "./DefaultLayout-CdjuhZAb.js";
import { GrTrash } from "react-icons/gr";
import { P as PageContext, a as PageContextProvider } from "./PageContext-DXogRDn-.js";
import "react/jsx-runtime";
import "react-router-dom";
import "@coreui/react";
import "./helpers-D56oASBL.js";
import "axios";
import "react-hot-toast";
import "react-icons/fa";
import "react-quill";
import "prop-types";
import "quill";
import "quill-table-ui";
import "antd/es/grid/col.js";
import "react-dropzone";
import "@ckeditor/ckeditor5-react";
import "@ckeditor/ckeditor5-build-classic";
import "react-icons/md";
import "lodash";
import "./AppLoader-ZfOck8L3.js";
import "./UpdateProfileInformationForm-D0u1QRLJ.js";
import "./TextInput-B6lQlW2Q.js";
import "./InputLabel-BbJGG6HL.js";
import "./PrimaryButton-BkETuGhS.js";
import "@inertiajs/react";
import "@headlessui/react";
import "@coreui/icons-react";
import "react-redux";
import "simplebar-react";
import "@coreui/icons";
const { Panel } = Collapse;
const ReviewForm = () => {
  const { state, methods, dispatch } = useContext(PageContext);
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
    setReviews([...reviews, {
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
  const saveReviews = () => {
    methods.saveReviews(reviews);
    dispatch({ payload: { loading: false } });
    fetchReviews();
  };
  const deleteReview = (index) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };
  const genExtra = (index, review) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Confirm, { onConfirm: (e) => {
    console.log("Delete confirmed for review ID:", review.id);
    methods.deleteReview(review.id).then(() => {
      console.log("Review deleted from server");
      deleteReview(index);
    }).catch((error) => {
      console.error("Error deleting review:", error);
    });
  }, description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" }) }) });
  return /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "User Reviews" }) }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: reviews && (reviews == null ? void 0 : reviews.map((review, index) => /* @__PURE__ */ jsx(Panel, { header: `Review ${index + 1}`, extra: genExtra(index, review), children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", children: [
      /* @__PURE__ */ jsxs(Flex, { gap: 10, align: "center w-full", children: [
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
      /* @__PURE__ */ jsxs(Flex, { gap: 10, align: "center", children: [
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
    ] }) }, index))) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addReview, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { disabled: saving, type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveReviews, children: saving ? "Saving Reviews..." : "Save All Reviews" }) })
    ] })
  ] });
};
function UserReviewIndex() {
  return /* @__PURE__ */ jsx(PageContextProvider, { children: /* @__PURE__ */ jsx(ReviewForm, {}) });
}
export {
  UserReviewIndex as default
};
