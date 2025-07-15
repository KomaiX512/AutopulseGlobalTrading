import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Form, message, Button, Row, Col, Card, Input, Select, InputNumber, Upload, Divider, Checkbox, Tooltip } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { b as Ck5Editor } from "./DefaultLayout-CdjuhZAb.js";
import "react-hot-toast";
import "react/jsx-runtime";
import "@coreui/react";
import "./helpers-D56oASBL.js";
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
const { Option } = Select;
const { TextArea } = Input;
function AttachmentForm() {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [attachmentData, setAttachmentData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    loadCategories();
    loadBrands();
    loadProductTypes();
    if (id) {
      setIsEdit(true);
      loadAttachment(id);
    }
  }, [id]);
  const loadCategories = async () => {
    try {
      const response = await axios.get("/api/get/categories?product_type_id=7");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  const loadBrands = async () => {
    try {
      const response = await axios.get("/api/get/brands");
      setBrands(response.data.brands || []);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };
  const loadProductTypes = async () => {
    try {
      const response = await axios.get("/api/get/product-types");
      setProductTypes(response.data.productTypes || []);
    } catch (error) {
      console.error("Error loading product types:", error);
    }
  };
  const loadAttachment = async (attachmentId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/get/attachment/${attachmentId}`);
      const attachment = response.data.attachment;
      setAttachmentData(attachment);
      if (attachment.images && attachment.images.length > 0) {
        setSelectedImages(attachment.images.map((img) => {
          var _a;
          return {
            uid: img.id,
            name: img.filename || "image",
            status: "done",
            url: (_a = img.path) == null ? void 0 : _a.replace("public", "/storage")
          };
        }));
      }
      form.setFieldsValue({
        name: attachment.name,
        description: attachment.description,
        features: attachment.features,
        category_id: attachment.category_id,
        brand_id: attachment.brand_id,
        price: attachment.price,
        stock: attachment.stock,
        type: attachment.type || "customer",
        is_viewable: attachment.is_viewable
      });
    } catch (error) {
      console.error("Error loading attachment:", error);
      message.error("Failed to load attachment data");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (info) => {
    setSelectedImages(info.fileList);
  };
  const onFinish = async (values) => {
    var _a, _b;
    setLoading(true);
    try {
      const formData = new FormData();
      const currentValues = form.getFieldsValue();
      Object.keys(currentValues).forEach((key) => {
        let value = currentValues[key];
        if (value === void 0 || value === null || value === "") return;
        if (key === "is_viewable") value = value ? 1 : 0;
        if (key === "price" || key === "stock") value = Number(value);
        formData.append(key, value);
      });
      Object.keys(values).forEach((key) => {
        let value = values[key];
        if (value === void 0 || value === null || value === "") return;
        if (key === "is_viewable") value = value ? 1 : 0;
        if (key === "price" || key === "stock") value = Number(value);
        if (!formData.has(key)) {
          formData.append(key, value);
        }
      });
      selectedImages.forEach((file, index) => {
        if (file.originFileObj) {
          formData.append(`images[${index}]`, file.originFileObj);
        }
      });
      console.log("Form values being sent:", values);
      console.log("Current form values:", currentValues);
      console.log("Selected images:", selectedImages);
      for (let [key, value] of formData.entries()) {
        console.log(`FormData ${key}:`, value);
      }
      if (isEdit) {
        const updateData = {
          name: currentValues.name,
          description: currentValues.description,
          features: currentValues.features,
          category_id: currentValues.category_id,
          brand_id: currentValues.brand_id,
          price: Number(currentValues.price),
          stock: Number(currentValues.stock),
          type: currentValues.type,
          is_viewable: currentValues.is_viewable ? 1 : 0
        };
        console.log("Update data being sent:", updateData);
      }
      let response;
      if (isEdit) {
        const updateData = {
          name: currentValues.name,
          description: currentValues.description,
          features: currentValues.features,
          category_id: currentValues.category_id,
          brand_id: currentValues.brand_id,
          price: Number(currentValues.price),
          stock: Number(currentValues.stock),
          type: currentValues.type,
          is_viewable: currentValues.is_viewable ? 1 : 0
        };
        response = await axios.post(`/api/update/attachment/${id}`, updateData, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content"),
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          withCredentials: true
        });
      } else {
        response = await axios.post("/api/save/attachment", formData, {
          headers: {
            "X-CSRF-TOKEN": (_b = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _b.getAttribute("content"),
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          withCredentials: true
        });
      }
      if (response.data.success) {
        message.success(`Attachment ${isEdit ? "updated" : "created"} successfully!`);
        navigate("/attachments/list");
      } else {
        message.error(response.data.message || `Failed to ${isEdit ? "update" : "create"} attachment`);
      }
    } catch (error) {
      console.error("Error saving attachment:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          message.error(`${key}: ${errors[key].join(", ")}`);
        });
      } else if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error(`Error ${isEdit ? "updating" : "creating"} attachment`);
      }
    } finally {
      setLoading(false);
    }
  };
  const uploadProps = {
    listType: "picture-card",
    fileList: selectedImages,
    onChange: handleImageChange,
    beforeUpload: () => false,
    // Prevent auto upload
    multiple: true,
    accept: "image/*"
  };
  return /* @__PURE__ */ jsxs("div", { style: { padding: "24px", maxWidth: "1200px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, {}),
          onClick: () => navigate("/attachments/list"),
          children: "Back to List"
        }
      ),
      /* @__PURE__ */ jsx("h2", { style: { margin: 0 }, children: isEdit ? "Edit Attachment" : "Add New Attachment" })
    ] }),
    /* @__PURE__ */ jsx(
      Form,
      {
        form,
        layout: "vertical",
        onFinish,
        initialValues: {
          type: "customer",
          is_viewable: true,
          stock: 1
        },
        children: /* @__PURE__ */ jsxs(Row, { gutter: 24, children: [
          /* @__PURE__ */ jsxs(Col, { xs: 24, lg: 16, children: [
            /* @__PURE__ */ jsxs(Card, { title: "Basic Information", style: { marginBottom: "24px" }, children: [
              /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
                /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    name: "name",
                    label: "Attachment Name",
                    rules: [{ required: true, message: "Please enter attachment name" }],
                    children: /* @__PURE__ */ jsx(Input, { placeholder: "e.g., Hydraulic Hammer" })
                  }
                ) }),
                /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    name: "type",
                    label: "Type",
                    rules: [{ required: true, message: "Please select type" }],
                    children: /* @__PURE__ */ jsxs(Select, { placeholder: "Select type", children: [
                      /* @__PURE__ */ jsx(Option, { value: "customer", children: "Customer" }),
                      /* @__PURE__ */ jsx(Option, { value: "business", children: "Business" })
                    ] })
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
                /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    name: "category_id",
                    label: "Category",
                    rules: [{ required: true, message: "Please select category" }],
                    children: /* @__PURE__ */ jsx(Select, { placeholder: "Select category", showSearch: true, children: categories.map((category) => /* @__PURE__ */ jsxs(Option, { value: category.id, children: [
                      category.name,
                      " ",
                      category.productType ? `(${category.productType.name})` : ""
                    ] }, category.id)) })
                  }
                ) }),
                /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    name: "brand_id",
                    label: "Brand",
                    children: /* @__PURE__ */ jsx(Select, { placeholder: "Select brand", allowClear: true, showSearch: true, children: brands.map((brand) => /* @__PURE__ */ jsx(Option, { value: brand.id, children: brand.name }, brand.id)) })
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs(Row, { gutter: 16, children: [
                /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    name: "price",
                    label: "Price ($)",
                    rules: [{ required: true, message: "Please enter price" }],
                    children: /* @__PURE__ */ jsx(
                      InputNumber,
                      {
                        style: { width: "100%" },
                        placeholder: "0.00",
                        min: 0,
                        precision: 2,
                        formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        parser: (value) => value.replace(/\$\s?|(,*)/g, "")
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
                  Form.Item,
                  {
                    name: "stock",
                    label: "Stock Quantity",
                    rules: [{ required: true, message: "Please enter stock quantity" }],
                    children: /* @__PURE__ */ jsx(
                      InputNumber,
                      {
                        style: { width: "100%" },
                        placeholder: "0",
                        min: 0,
                        precision: 0
                      }
                    )
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Card, { title: "Description & Features", style: { marginBottom: "24px" }, children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "description",
                  label: "Description",
                  rules: [{ required: true, message: "Please enter description" }],
                  children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                    Ck5Editor,
                    {
                      name: "description",
                      defaultValue: "",
                      onChange: (value) => {
                        console.log("Description changed:", value);
                        form.setFieldsValue({ description: value });
                      }
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "features",
                  label: "Features",
                  children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                    Ck5Editor,
                    {
                      name: "features",
                      defaultValue: "",
                      onChange: (value) => {
                        console.log("Features changed:", value);
                        form.setFieldsValue({ features: value });
                      }
                    }
                  ) })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(Col, { xs: 24, lg: 8, children: /* @__PURE__ */ jsxs(Card, { title: "Images & Settings", children: [
            /* @__PURE__ */ jsxs(Form.Item, { label: "Attachment Images", children: [
              /* @__PURE__ */ jsx(Upload, { ...uploadProps, children: selectedImages.length < 8 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(PlusOutlined, {}),
                /* @__PURE__ */ jsx("div", { style: { marginTop: 8 }, children: "Upload" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: "12px", color: "#666", marginTop: "8px" }, children: "You can upload up to 8 images. First image will be the main image." })
            ] }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "is_viewable",
                valuePropName: "checked",
                children: /* @__PURE__ */ jsx(Checkbox, { children: /* @__PURE__ */ jsx(Tooltip, { title: "Check this box to make this attachment visible on homepage", children: "Make This Attachment Visible On Homepage" }) })
              }
            ),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                htmlType: "submit",
                icon: /* @__PURE__ */ jsx(SaveOutlined, {}),
                loading,
                size: "large",
                style: { width: "100%" },
                children: loading ? "Saving..." : isEdit ? "Update Attachment" : "Create Attachment"
              }
            ) })
          ] }) })
        ] })
      }
    ),
    !isEdit && /* @__PURE__ */ jsxs(Card, { style: { marginTop: "24px", backgroundColor: "#f6ffed", borderColor: "#b7eb8f" }, children: [
      /* @__PURE__ */ jsx("h3", { style: { color: "#52c41a", marginBottom: "12px" }, children: "Quick Tips:" }),
      /* @__PURE__ */ jsxs("ul", { style: { color: "#52c41a", margin: 0, paddingLeft: "20px" }, children: [
        /* @__PURE__ */ jsx("li", { children: "Upload multiple high-quality images for better presentation" }),
        /* @__PURE__ */ jsx("li", { children: "First image will be used as the main display image" }),
        /* @__PURE__ */ jsx("li", { children: "Provide detailed description and features for better customer understanding" }),
        /* @__PURE__ */ jsx("li", { children: "Set appropriate pricing and stock levels" }),
        /* @__PURE__ */ jsx("li", { children: "Choose the right category for better organization" }),
        /* @__PURE__ */ jsx("li", { children: "Make attachments visible to show them on the homepage" })
      ] })
    ] })
  ] });
}
export {
  AttachmentForm as default
};
