import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useContext, useState, useEffect } from "react";
import { P as PageContext, a as PageContextProvider } from "./PageContext-BvCxP2Sv.js";
import { Collapse, Form, Flex, Input, Row, Col, Button } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { U as UploadImage, b as Ck5Editor, C as Confirm } from "./DefaultLayout-CQKz9vmn.js";
import { GrTrash } from "react-icons/gr";
import "react/jsx-runtime";
import "./helpers-isL4n3oi.js";
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
const BlogForm = () => {
  const { state, methods, dispatch } = useContext(PageContext);
  const [blogs, setBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [saving, setSaving] = useState(false);
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
      image: ""
    }]);
  };
  const handleInputChange = (index, field, value) => {
    const newBlogs = [...blogs];
    newBlogs[index][field] = value;
    setBlogs(newBlogs);
  };
  const saveBlogs = () => {
    methods.saveBlogs(blogs);
    dispatch({ payload: { loading: false } });
    fetchBlogs();
  };
  const deleteBlog = (index) => {
    const newBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(newBlogs);
  };
  const genExtra = (index, blog) => /* @__PURE__ */ jsx("div", { onClick: () => {
  }, children: /* @__PURE__ */ jsx(
    Confirm,
    {
      title: "Are you sure, you want to delte this blog?",
      onConfirm: () => {
        methods.deleteBlog(blog.id);
        deleteBlog(index);
      },
      children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" })
    }
  ) });
  return /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "All Blogs" }) }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: blogs == null ? void 0 : blogs.map((blog, index) => {
      var _a;
      return /* @__PURE__ */ jsx(Panel, { header: `Blog.${index + 1} ${blog.title}`, extra: genExtra(index, blog), children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", children: [
        /* @__PURE__ */ jsxs(Flex, { gap: 10, align: "center w-full", children: [
          /* @__PURE__ */ jsx(
            UploadImage,
            {
              defaultValue: (blog == null ? void 0 : blog.id) && !isObject(blog == null ? void 0 : blog.image) && typeof (blog == null ? void 0 : blog.image) === "string" ? (_a = blog == null ? void 0 : blog.image) == null ? void 0 : _a.replace("public", "/storage") : "",
              setSelectedFile: (file) => handleInputChange(index, "image", file == null ? void 0 : file.originFileObj)
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Blog Title", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: blog.title,
              onChange: (e) => handleInputChange(index, "title", e.target.value)
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { gap: 10, align: "center w-full my-2", children: /* @__PURE__ */ jsx(Form.Item, { className: "w-full", label: "Blog Content", children: /* @__PURE__ */ jsx(Ck5Editor, { name: "content", defaultValue: blog == null ? void 0 : blog.content, onChange: (data) => {
          handleInputChange(index, "content", data);
        } }) }) })
      ] }) }, index);
    }) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addBlog, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveBlogs, children: saving ? "Saving Blogs..." : "Save All Blogs" }) })
    ] })
  ] });
};
function Blogs() {
  return /* @__PURE__ */ jsx(PageContextProvider, { children: /* @__PURE__ */ jsx(BlogForm, {}) });
}
export {
  Blogs as default
};
