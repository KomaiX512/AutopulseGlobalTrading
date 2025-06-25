import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useState } from "react";
import { U as UploadImage } from "./DefaultLayout-CQKz9vmn.js";
import { Checkbox, Tooltip, message } from "antd";
import axios from "axios";
import "react/jsx-runtime";
import "react-router-dom";
import "@coreui/react";
import "./helpers-isL4n3oi.js";
import "react-hot-toast";
import "@ant-design/icons";
import "react-icons/fa";
import "react-quill";
import "prop-types";
import "quill";
import "quill-table-ui";
import "antd/es/grid/col.js";
import "react-dropzone";
import "moment";
import "react-icons/gr";
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
function AttachmentForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isViewable, setIsViewable] = useState(true);
  const [loading, setLoading] = useState(false);
  function handleViewableCheckbox() {
    setIsViewable(!isViewable);
  }
  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("is_viewable", isViewable ? 1 : 0);
      if (selectedImage) {
        formData.append("image", selectedImage.originFileObj);
      }
      const response = await axios.post("/api/save/attachment", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data.success) {
        message.success("Attachment created successfully!");
        setName("");
        setDescription("");
        setSelectedImage(null);
        setIsViewable(true);
        e.target.reset();
      } else {
        message.error("Failed to create attachment");
      }
    } catch (error) {
      console.error("Error creating attachment:", error);
      message.error("Error creating attachment");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "form", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Add New Attachment" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col p-3 bg-white", style: { gap: "10px" }, onSubmit: submitForm, children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col my-4", htmlFor: "image", children: [
        /* @__PURE__ */ jsx("span", { className: "mb-2", children: "Attachment Image" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            UploadImage,
            {
              setSelectedFile: setSelectedImage
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "flex-column py-3", style: { width: "fit-content" }, htmlFor: "", children: /* @__PURE__ */ jsx(
            Checkbox,
            {
              name: "is_viewable",
              style: { color: "green", textDecoration: "underline" },
              onChange: handleViewableCheckbox,
              checked: isViewable,
              children: /* @__PURE__ */ jsx(Tooltip, { title: "Check this box to make this attachment visible on homepage", children: "Make This Attachment Visible On Homepage?" })
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", htmlFor: "", children: [
        /* @__PURE__ */ jsx("span", { children: "Attachment Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            className: "p-2 border border-gray-300 rounded",
            placeholder: "e.g., Hydraulic Hammer"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", htmlFor: "", children: [
        /* @__PURE__ */ jsx("span", { children: "Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            required: true,
            rows: 4,
            className: "p-2 border border-gray-300 rounded",
            placeholder: "Describe the attachment and its uses..."
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
          disabled: loading,
          children: loading ? "Creating..." : "Create Attachment"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-yellow-800", children: "Real-time Testing Instructions:" }),
      /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside mt-2 text-yellow-700", children: [
        /* @__PURE__ */ jsx("li", { children: "Fill out the form above with attachment details" }),
        /* @__PURE__ */ jsx("li", { children: "Upload an image for the attachment" }),
        /* @__PURE__ */ jsx("li", { children: 'Click "Create Attachment"' }),
        /* @__PURE__ */ jsx("li", { children: "Go to the homepage (localhost:8000) and refresh" }),
        /* @__PURE__ */ jsx("li", { children: 'Check if your new attachment appears in the "Attachments & Accessories" section' })
      ] })
    ] })
  ] });
}
export {
  AttachmentForm as default
};
