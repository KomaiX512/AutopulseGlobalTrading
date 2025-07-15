import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useCallback, useEffect } from "react";
import { l as loadOrders } from "./DefaultLayout-CdjuhZAb.js";
import { Row, Col, Input, Space, Dropdown, Button, Select, Skeleton, Table, Tag } from "antd";
import { debounce } from "lodash";
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react/jsx-runtime";
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
import "moment";
import "react-icons/gr";
import "@ckeditor/ckeditor5-react";
import "@ckeditor/ckeditor5-build-classic";
import "react-icons/md";
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
const OrdersHeader = ({ searchTerm, handleSearchChange, handlePriceChange, handleStatusChange, handleSortChange }) => {
  const [categories, setCategories] = useState([]);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const filterMenu = /* @__PURE__ */ jsxs(Space, { direction: "vertical", size: 16, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Price" }),
      /* @__PURE__ */ jsxs(Select, { placeholder: "Select Price", style: { width: "100%" }, onChange: handlePriceChange, children: [
        /* @__PURE__ */ jsxs(Option, { value: "lowToHigh", children: [
          /* @__PURE__ */ jsx(FilterOutlined, {}),
          " Price: Low to High"
        ] }),
        /* @__PURE__ */ jsxs(Option, { value: "highToLow", children: [
          /* @__PURE__ */ jsx(FilterOutlined, {}),
          " Price: High to Low"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Order Status" }),
      /* @__PURE__ */ jsxs(
        Select,
        {
          placeholder: "Select Type",
          style: { width: "100%" },
          onChange: handleStatusChange,
          children: [
            /* @__PURE__ */ jsx(Option, { value: "0", children: "Pending" }),
            /* @__PURE__ */ jsx(Option, { value: "1", children: "Processing" }),
            /* @__PURE__ */ jsx(Option, { value: "2", children: "Shipping" }),
            /* @__PURE__ */ jsx(Option, { value: "3", children: "Shipped" }),
            /* @__PURE__ */ jsx(Option, { value: "4", children: "Delivered" })
          ]
        }
      )
    ] })
  ] });
  const sortMenu = /* @__PURE__ */ jsx(Space, { direction: "vertical", size: 16, children: /* @__PURE__ */ jsxs(Select, { defaultValue: "desc", style: { width: "100%" }, onChange: handleSortChange, children: [
    /* @__PURE__ */ jsxs(Option, { value: "desc", children: [
      /* @__PURE__ */ jsx(SortDescendingOutlined, {}),
      " Sort Desc"
    ] }),
    /* @__PURE__ */ jsxs(Option, { value: "asc", children: [
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
      )
    ] }) })
  ] });
};
const order_steps = {
  0: { value: "Pending", color: "orange" },
  1: { value: "Processing", color: "blue" },
  2: { value: "Shipping", color: "purple" },
  3: { value: "Shipped", color: "purple" },
  4: { value: "Delivered", color: "green" }
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const handlePriceChange = (value) => {
    setPrice(value);
  };
  const debouncedLoadOrders = useCallback(
    debounce((search, selectedStatus2, dates, price2, sortOrder2, page) => {
      setLoading(true);
      loadOrders({ setOrders, selectedStatus: selectedStatus2, search, dates, price: price2, sortOrder: sortOrder2, page }).finally(() => {
        setLoading(false);
      });
    }, 600),
    []
  );
  useEffect(() => {
    debouncedLoadOrders(searchTerm, selectedStatus, null, price, sortOrder, currentPage);
  }, [searchTerm, selectedStatus, price, sortOrder, currentPage]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSortChange = (value) => {
    if (value === "lowToHigh" || value === "highToLow") {
      setPrice(value);
    } else {
      setSortOrder(value);
    }
  };
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount"
    },
    {
      title: "Products Ordered",
      dataIndex: "order_details_count",
      key: "order_details_count"
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt) => new Date(createdAt).toLocaleString()
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => /* @__PURE__ */ jsx(Tag, { color: order_steps[status].color, children: order_steps[Number(status)].value })
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => /* @__PURE__ */ jsx(Link, { to: `/customers/order/${id}`, children: /* @__PURE__ */ jsx(Tag, { color: "green", children: "View" }) })
    }
  ];
  const expandedRowRender = (record) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    return /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "User Name" }),
        /* @__PURE__ */ jsx("th", { children: "User Email" }),
        /* @__PURE__ */ jsx("th", { children: "User Phone" }),
        /* @__PURE__ */ jsx("th", { children: "User City" }),
        /* @__PURE__ */ jsx("th", { children: "User Country" })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: (_b = (_a = record == null ? void 0 : record.user) == null ? void 0 : _a.user_details) == null ? void 0 : _b.first_name }),
        /* @__PURE__ */ jsx("td", { children: (_c = record == null ? void 0 : record.user) == null ? void 0 : _c.email }),
        /* @__PURE__ */ jsx("td", { children: (_e = (_d = record == null ? void 0 : record.user) == null ? void 0 : _d.user_details) == null ? void 0 : _e.phone }),
        /* @__PURE__ */ jsx("td", { children: (_g = (_f = record == null ? void 0 : record.user) == null ? void 0 : _f.user_details) == null ? void 0 : _g.city }),
        /* @__PURE__ */ jsx("td", { children: (_i = (_h = record == null ? void 0 : record.user) == null ? void 0 : _h.user_details) == null ? void 0 : _i.country })
      ] })
    ] }) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      OrdersHeader,
      {
        handlePriceChange,
        handleSortChange,
        handleStatusChange,
        handleSearchChange
      }
    ),
    loading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : /* @__PURE__ */ jsx(
      Table,
      {
        dataSource: orders == null ? void 0 : orders.data,
        columns,
        expandable: { expandedRowRender },
        rowKey: "id",
        pagination: {
          pageSize: 10,
          total: orders == null ? void 0 : orders.total,
          current: currentPage,
          onChange: handlePageChange
        }
      }
    )
  ] });
};
function OrdersApp() {
  return /* @__PURE__ */ jsx(Orders, {});
}
export {
  OrdersApp as default
};
