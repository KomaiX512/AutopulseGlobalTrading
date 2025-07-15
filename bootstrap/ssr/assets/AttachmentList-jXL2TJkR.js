import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useEffect } from "react";
import { message, Button, Input, Select, Tag, Table, Badge, Space, Tooltip, Modal } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react/jsx-runtime";
const { Search } = Input;
const { Option } = Select;
function AttachmentList() {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    loadAttachments();
    loadCategories();
    loadBrands();
  }, []);
  const loadAttachments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/get/attachments");
      setAttachments(response.data.attachments || []);
    } catch (error) {
      console.error("Error loading attachments:", error);
      message.error("Failed to load attachments");
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      const response = await axios.get("/api/get/categories");
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
  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this attachment?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await axios.delete(`/api/delete/attachment/${id}`);
          message.success("Attachment deleted successfully");
          loadAttachments();
        } catch (error) {
          console.error("Error deleting attachment:", error);
          message.error("Failed to delete attachment");
        }
      }
    });
  };
  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      await axios.put(`/api/update/attachment/${id}`, {
        is_viewable: !currentStatus
      });
      message.success(`Attachment ${!currentStatus ? "made visible" : "hidden"} successfully`);
      loadAttachments();
    } catch (error) {
      console.error("Error updating attachment:", error);
      message.error("Failed to update attachment");
    }
  };
  const filteredAttachments = attachments.filter((attachment) => {
    var _a;
    const matchesSearch = attachment.name.toLowerCase().includes(searchText.toLowerCase()) || ((_a = attachment.description) == null ? void 0 : _a.toLowerCase().includes(searchText.toLowerCase()));
    const matchesCategory = !selectedCategory || attachment.category_id == selectedCategory;
    const matchesBrand = !selectedBrand || attachment.brand_id == selectedBrand;
    const matchesType = !selectedType || attachment.type === selectedType;
    return matchesSearch && matchesCategory && matchesBrand && matchesType;
  });
  const columns = [
    {
      title: "Image",
      dataIndex: "primary_image",
      key: "image",
      width: 80,
      render: (primaryImage) => {
        var _a;
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: ((_a = primaryImage == null ? void 0 : primaryImage.path) == null ? void 0 : _a.replace("public", "/storage")) || "/images/placeholder.png",
            alt: "Attachment",
            style: { width: 50, height: 50, objectFit: "cover", borderRadius: 4 },
            onError: (e) => {
              e.target.src = "/images/placeholder.png";
            }
          }
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        var _a;
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: { fontWeight: "bold" }, children: text }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: "12px", color: "#666" }, children: ((_a = record.category) == null ? void 0 : _a.name) && `Category: ${record.category.name}` })
        ] });
      }
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price ? `$${parseFloat(price).toLocaleString()}` : "N/A"
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => /* @__PURE__ */ jsx(
        Badge,
        {
          count: stock || 0,
          style: {
            backgroundColor: (stock || 0) > 0 ? "#52c41a" : "#ff4d4f",
            color: "white"
          }
        }
      )
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => /* @__PURE__ */ jsx(Tag, { color: type === "customer" ? "blue" : "green", children: type === "customer" ? "Customer" : "Business" })
    },
    {
      title: "Status",
      dataIndex: "is_viewable",
      key: "is_viewable",
      render: (isViewable, record) => /* @__PURE__ */ jsx(
        Tag,
        {
          color: isViewable ? "green" : "red",
          style: { cursor: "pointer" },
          onClick: () => handleToggleVisibility(record.id, isViewable),
          children: isViewable ? "Visible" : "Hidden"
        }
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => /* @__PURE__ */ jsxs(Space, { size: "small", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: "View Details", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "text",
            icon: /* @__PURE__ */ jsx(EyeOutlined, {}),
            onClick: () => navigate(`/attachments/view/${record.id}`)
          }
        ) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Edit Attachment", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "text",
            icon: /* @__PURE__ */ jsx(EditOutlined, {}),
            onClick: () => navigate(`/attachments/edit/${record.id}`)
          }
        ) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Delete Attachment", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "text",
            danger: true,
            icon: /* @__PURE__ */ jsx(DeleteOutlined, {}),
            onClick: () => handleDelete(record.id)
          }
        ) })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { padding: "24px" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx("h2", { style: { margin: 0 }, children: "Attachments & Accessories Management" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "primary",
          icon: /* @__PURE__ */ jsx(PlusOutlined, {}),
          onClick: () => navigate("/attachments/add"),
          children: "Add New Attachment"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx(
        Search,
        {
          placeholder: "Search attachments...",
          allowClear: true,
          style: { width: 300 },
          value: searchText,
          onChange: (e) => setSearchText(e.target.value),
          prefix: /* @__PURE__ */ jsx(SearchOutlined, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          placeholder: "Filter by Category",
          allowClear: true,
          style: { width: 200 },
          value: selectedCategory,
          onChange: setSelectedCategory,
          children: categories.map((category) => /* @__PURE__ */ jsx(Option, { value: category.id, children: category.name }, category.id))
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          placeholder: "Filter by Brand",
          allowClear: true,
          style: { width: 200 },
          value: selectedBrand,
          onChange: setSelectedBrand,
          children: brands.map((brand) => /* @__PURE__ */ jsx(Option, { value: brand.id, children: brand.name }, brand.id))
        }
      ),
      /* @__PURE__ */ jsxs(
        Select,
        {
          placeholder: "Filter by Type",
          allowClear: true,
          style: { width: 150 },
          value: selectedType,
          onChange: setSelectedType,
          children: [
            /* @__PURE__ */ jsx(Option, { value: "customer", children: "Customer" }),
            /* @__PURE__ */ jsx(Option, { value: "business", children: "Business" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "16px" }, children: [
      /* @__PURE__ */ jsxs(Tag, { color: "blue", children: [
        "Total: ",
        filteredAttachments.length,
        " attachments"
      ] }),
      /* @__PURE__ */ jsxs(Tag, { color: "green", children: [
        "Visible: ",
        filteredAttachments.filter((a) => a.is_viewable).length
      ] }),
      /* @__PURE__ */ jsxs(Tag, { color: "red", children: [
        "Hidden: ",
        filteredAttachments.filter((a) => !a.is_viewable).length
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: filteredAttachments,
        loading,
        rowKey: "id",
        pagination: {
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} attachments`
        },
        scroll: { x: 1200 }
      }
    )
  ] });
}
export {
  AttachmentList as default
};
