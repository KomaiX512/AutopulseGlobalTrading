import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useContext, useState, useEffect } from "react";
import { Collapse, Form, Flex, Input, Row, Col, Button } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { M as MyEditor, C as Confirm } from "./DefaultLayout-CQKz9vmn.js";
import { GrTrash } from "react-icons/gr";
import { P as PageContext, a as PageContextProvider } from "./PageContext-BvCxP2Sv.js";
import "react/jsx-runtime";
import "react-router-dom";
import "@coreui/react";
import "./helpers-isL4n3oi.js";
import "axios";
import "react-hot-toast";
import "react-icons/fa";
import "react-quill";
import "prop-types";
import "quill";
import "quill-table-ui";
import "antd/es/grid/col.js";
import "react-dropzone";
import "moment";
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
const FAQForm = () => {
  const { state, methods, dispatch } = useContext(PageContext);
  const [Faqs, setFaqs] = useState([]);
  const [saving, setSaving] = useState(false);
  async function fetchFaqs() {
    setSaving(true);
    let Faqs2 = await methods.loadFaqs();
    if (Faqs2) {
      setFaqs(Faqs2);
    }
    setSaving(false);
  }
  useEffect(() => {
    fetchFaqs();
  }, []);
  const addReview = () => {
    setFaqs([...Faqs, {
      question: "",
      answer: "",
      description: ""
    }]);
  };
  const handleInputChange = (index, field, value) => {
    const newFaqs = [...Faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };
  const saveFaqs = () => {
    methods.saveFaqs(Faqs);
    dispatch({ payload: { loading: false } });
    fetchFaqs();
  };
  const deleteFAQ = (index) => {
    const newFaqs = Faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };
  const genExtra = (index, faq) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Confirm, { onConfirm: (e) => {
    methods.deleteFaqs(faq.id).then(() => {
      console.log("FAQ deleted from server");
      deleteFAQ(index);
    }).catch((error) => {
      console.error("Error deleting faq:", error);
    });
  }, description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" }) }) });
  return /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "User Faqs" }) }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: Faqs == null ? void 0 : Faqs.map((faq, index) => /* @__PURE__ */ jsx(Panel, { header: `FAQ ${index + 1}`, extra: genExtra(index, faq), children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", children: [
      /* @__PURE__ */ jsx(Flex, { gap: 10, align: "center w-full", children: /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Question", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: faq.question,
          onChange: (e) => handleInputChange(index, "question", e.target.value)
        }
      ) }) }),
      /* @__PURE__ */ jsx(Flex, { gap: 10, align: "center w-full", children: /* @__PURE__ */ jsx(Form.Item, { className: "w-full", label: "Answer", children: /* @__PURE__ */ jsx(MyEditor, { defaultValue: (faq == null ? void 0 : faq.answer) ?? "Write answer here...", onChange: (value) => handleInputChange(index, "answer", value) }) }) })
    ] }) }, index)) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addReview, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { disabled: saving, type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveFaqs, children: saving ? "Saving Faqs..." : "Save All Faqs" }) })
    ] })
  ] });
};
function FAQIndex() {
  return /* @__PURE__ */ jsx(PageContextProvider, { children: /* @__PURE__ */ jsx(FAQForm, {}) });
}
export {
  FAQIndex as default
};
