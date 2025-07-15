import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import { useContext, useState, useEffect } from "react";
import { P as PageContext, a as PageContextProvider } from "./PageContext-DXogRDn-.js";
import { Card, Typography, Collapse, Form, Row, Col, Input, Select, Divider, Button, Space } from "antd";
import { EditOutlined, PlusOutlined, SaveOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { U as UploadImage, b as Ck5Editor, C as Confirm } from "./DefaultLayout-CdjuhZAb.js";
import "react/jsx-runtime";
import "./helpers-D56oASBL.js";
import "axios";
import "react-hot-toast";
import "react-icons/fa";
import "react-router-dom";
import "@coreui/react";
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
const { Panel } = Collapse;
const { Title, Text } = Typography;
const BlogForm = () => {
  const { state, methods, dispatch } = useContext(PageContext);
  const [blogs, setBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState({});
  async function fetchBlogs() {
    setSaving(true);
    let blogs2 = await methods.loadBlogs();
    if (blogs2) {
      setBlogs(blogs2);
      setSaving(false);
    }
  }
  const isObject = (value) => typeof value === "object" && value !== null;
  useEffect(() => {
    fetchBlogs();
  }, []);
  const addBlog = () => {
    setBlogs([...blogs, {
      title: "",
      content: "",
      image: "",
      excerpt: "",
      category: "machinery",
      author: "Autopulse Team",
      readTime: "3 min read"
    }]);
  };
  const handleInputChange = (index, field, value) => {
    const newBlogs = [...blogs];
    newBlogs[index][field] = value;
    setBlogs(newBlogs);
  };
  const saveBlogs = async () => {
    try {
      setSaving(true);
      const result = await methods.saveBlogs(blogs);
      if (result) {
        await fetchBlogs();
      }
    } catch (error) {
      console.error("Error saving blogs:", error);
    } finally {
      setSaving(false);
    }
  };
  const deleteBlog = (index) => {
    const newBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(newBlogs);
  };
  const handleDeleteBlog = async (index, blog) => {
    try {
      const result = await methods.deleteBlog(blog.id);
      if (result) {
        deleteBlog(index);
      } else {
        await fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      await fetchBlogs();
    }
  };
  const togglePreview = (index) => {
    setPreviewMode((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "Discover insights about machinery, shipping, and our global trading expertise...";
    const text = content.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const getReadTime = (content) => {
    if (!content) return "3 min read";
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime} min read`;
  };
  const genExtra = (index, blog) => /* @__PURE__ */ jsxs(Space, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "text",
        icon: /* @__PURE__ */ jsx(EyeOutlined, {}),
        onClick: (e) => {
          e.stopPropagation();
          togglePreview(index);
        },
        title: "Preview"
      }
    ),
    /* @__PURE__ */ jsx(
      Confirm,
      {
        title: "Are you sure, you want to delete this blog?",
        onConfirm: () => handleDeleteBlog(index, blog),
        children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "text",
            danger: true,
            icon: /* @__PURE__ */ jsx(DeleteOutlined, {}),
            title: "Delete"
          }
        )
      }
    )
  ] });
  return /* @__PURE__ */ jsx("div", { className: "p-6 bg-gray-50 min-h-screen", children: /* @__PURE__ */ jsxs(Card, { className: "shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs(Title, { level: 2, className: "text-gray-800 mb-2", children: [
        /* @__PURE__ */ jsx(EditOutlined, { className: "mr-3 text-yellow-600" }),
        "Blog Management"
      ] }),
      /* @__PURE__ */ jsx(Text, { type: "secondary", className: "text-base", children: "Create and manage professional blog articles with rich content and images" })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, className: "mb-6", children: blogs == null ? void 0 : blogs.map((blog, index) => {
      var _a, _b;
      return /* @__PURE__ */ jsx(
        Panel,
        {
          header: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between w-full", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Text, { strong: true, className: "text-lg", children: [
              "Blog ",
              index + 1,
              ": ",
              blog.title || "Untitled Blog"
            ] }),
            blog.id && /* @__PURE__ */ jsxs(Text, { type: "secondary", className: "ml-2", children: [
              "(ID: ",
              blog.id,
              ")"
            ] })
          ] }) }),
          extra: genExtra(index, blog),
          children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(Form.Item, { label: "Blog Image", className: "mb-4", children: /* @__PURE__ */ jsx(
                UploadImage,
                {
                  defaultValue: (blog == null ? void 0 : blog.id) && !isObject(blog == null ? void 0 : blog.image) && typeof (blog == null ? void 0 : blog.image) === "string" ? (_a = blog == null ? void 0 : blog.image) == null ? void 0 : _a.replace("public", "/storage") : "",
                  setSelectedFile: (file) => handleInputChange(index, "image", file == null ? void 0 : file.originFileObj),
                  onClear: () => handleInputChange(index, "image", null)
                }
              ) }) }),
              /* @__PURE__ */ jsx(Col, { span: 12, children: /* @__PURE__ */ jsx(Form.Item, { label: "Blog Title", className: "mb-4", children: /* @__PURE__ */ jsx(
                Input,
                {
                  value: blog.title,
                  onChange: (e) => handleInputChange(index, "title", e.target.value),
                  placeholder: "Enter blog title...",
                  size: "large"
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
              /* @__PURE__ */ jsx(Col, { span: 8, children: /* @__PURE__ */ jsx(Form.Item, { label: "Category", children: /* @__PURE__ */ jsxs(
                Select,
                {
                  value: blog.category || "machinery",
                  onChange: (value) => handleInputChange(index, "category", value),
                  size: "large",
                  children: [
                    /* @__PURE__ */ jsx(Select.Option, { value: "machinery", children: "Machine Knowledge" }),
                    /* @__PURE__ */ jsx(Select.Option, { value: "shipping", children: "Shipping Tips" }),
                    /* @__PURE__ */ jsx(Select.Option, { value: "customer", children: "Customer Stories" }),
                    /* @__PURE__ */ jsx(Select.Option, { value: "industry", children: "Industry News" }),
                    /* @__PURE__ */ jsx(Select.Option, { value: "trading", children: "Global Trading" }),
                    /* @__PURE__ */ jsx(Select.Option, { value: "equipment", children: "Equipment Guide" })
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsx(Col, { span: 8, children: /* @__PURE__ */ jsx(Form.Item, { label: "Author", children: /* @__PURE__ */ jsx(
                Input,
                {
                  value: blog.author || "Autopulse Team",
                  onChange: (e) => handleInputChange(index, "author", e.target.value),
                  placeholder: "Author name...",
                  size: "large"
                }
              ) }) }),
              /* @__PURE__ */ jsx(Col, { span: 8, children: /* @__PURE__ */ jsx(Form.Item, { label: "Read Time", children: /* @__PURE__ */ jsx(
                Input,
                {
                  value: blog.readTime || getReadTime(blog.content),
                  onChange: (e) => handleInputChange(index, "readTime", e.target.value),
                  placeholder: "e.g., 5 min read",
                  size: "large"
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsx(Form.Item, { label: "Blog Excerpt", children: /* @__PURE__ */ jsx(
              Input.TextArea,
              {
                value: blog.excerpt || getExcerpt(blog.content),
                onChange: (e) => handleInputChange(index, "excerpt", e.target.value),
                placeholder: "Enter a brief excerpt for the blog...",
                rows: 3,
                showCount: true,
                maxLength: 200
              }
            ) }),
            /* @__PURE__ */ jsx(Form.Item, { label: "Blog Content", children: /* @__PURE__ */ jsx(
              Ck5Editor,
              {
                name: "content",
                defaultValue: blog == null ? void 0 : blog.content,
                onChange: (data) => {
                  handleInputChange(index, "content", data);
                  const newReadTime = getReadTime(data);
                  const newExcerpt = getExcerpt(data);
                  handleInputChange(index, "readTime", newReadTime);
                  if (!blog.excerpt) {
                    handleInputChange(index, "excerpt", newExcerpt);
                  }
                }
              }
            ) }),
            previewMode[index] && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsx(Divider, { children: "Preview" }),
              /* @__PURE__ */ jsx(Card, { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: blog.title || "Untitled Blog" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-600 mb-4", children: [
                    /* @__PURE__ */ jsxs("span", { className: "mr-4", children: [
                      "By ",
                      blog.author || "Autopulse Team"
                    ] }),
                    /* @__PURE__ */ jsx("span", { children: blog.readTime || getReadTime(blog.content) })
                  ] }),
                  blog.image && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: ((_b = blog.image) == null ? void 0 : _b.includes("public")) ? blog.image.replace("public", "/storage") : blog.image,
                      alt: blog.title,
                      className: "w-full h-64 object-cover rounded-lg mb-6"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "prose prose-lg max-w-none",
                    dangerouslySetInnerHTML: { __html: blog.content }
                  }
                )
              ] }) })
            ] })
          ] })
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, className: "mt-8", children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "dashed",
          icon: /* @__PURE__ */ jsx(PlusOutlined, {}),
          onClick: addBlog,
          size: "large",
          className: "border-2 border-dashed border-yellow-400 hover:border-yellow-500",
          children: "Add New Blog"
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "primary",
          icon: /* @__PURE__ */ jsx(SaveOutlined, {}),
          onClick: saveBlogs,
          loading: saving,
          size: "large",
          className: "bg-yellow-600 hover:bg-yellow-700 border-yellow-600",
          children: saving ? "Saving Blogs..." : "Save All Blogs"
        }
      ) })
    ] })
  ] }) });
};
function Blogs() {
  return /* @__PURE__ */ jsx(PageContextProvider, { children: /* @__PURE__ */ jsx(BlogForm, {}) });
}
export {
  Blogs as default
};
