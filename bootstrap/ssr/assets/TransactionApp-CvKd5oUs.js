import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useCallback, useEffect } from "react";
import { Row, Col, Input, Space, Dropdown, Button, Select, Skeleton, Table, Tag } from "antd";
import { FaCcJcb, FaCcDinersClub, FaCcDiscover, FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { f as formatDate } from "./helpers-isL4n3oi.js";
import axios from "axios";
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import "react/jsx-runtime";
import "react-hot-toast";
async function loadTransactions({ setTransactions, search, cardType, dates, price, sortOrder, page }) {
  var _a;
  try {
    const queryParams = { page };
    if (search) {
      queryParams.search = search;
    }
    if (cardType) {
      queryParams.card_type = cardType;
    }
    if (dates && dates.length === 2) {
      queryParams.from_date = dates[0].toISOString();
      queryParams.to_date = dates[1].toISOString();
    } else if (dates && dates.length === 1) {
      queryParams.from_date = dates[0].toISOString();
    }
    if (price) {
      queryParams.price = price;
    }
    if (sortOrder) {
      queryParams.sort_order = sortOrder;
    }
    const response = await axios.get("/api/get/transactions", { params: queryParams });
    if ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.success) {
      setTransactions(response.data.data);
    } else {
      setTransactions([]);
    }
  } catch (error) {
    console.error("Error:", error);
    setTransactions([]);
  }
}
const { Option } = Select;
const TransactionHeader = ({ searchTerm, handleSearchChange, handleCardTypeChange, handleSortChange }) => {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  console.log("search term", searchTerm);
  const filterMenu = /* @__PURE__ */ jsx(Space, { direction: "vertical", size: 16, children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("strong", { children: "Card Type" }),
    /* @__PURE__ */ jsxs(Select, { placeholder: "Select Card Type", style: { width: "100%" }, onChange: handleCardTypeChange, children: [
      /* @__PURE__ */ jsx(Option, { value: "visa", children: "Visa" }),
      /* @__PURE__ */ jsx(Option, { value: "mastercard", children: "Mastercard" }),
      /* @__PURE__ */ jsx(Option, { value: "amex", children: "American Express" }),
      /* @__PURE__ */ jsx(Option, { value: "discover", children: "Discover" }),
      /* @__PURE__ */ jsx(Option, { value: "dinersclub", children: "Diners Club" }),
      /* @__PURE__ */ jsx(Option, { value: "jcb", children: "JCB" })
    ] })
  ] }) });
  const sortMenu = /* @__PURE__ */ jsxs(Space, { direction: "vertical", size: 16, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Price" }),
      /* @__PURE__ */ jsxs(Select, { placeholder: "Select Price", style: { width: "100%" }, onChange: handleSortChange, children: [
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
      /* @__PURE__ */ jsx("strong", { children: "Sort Order" }),
      /* @__PURE__ */ jsxs(Select, { defaultValue: "desc", style: { width: "100%" }, onChange: handleSortChange, children: [
        /* @__PURE__ */ jsxs(Option, { value: "desc", children: [
          /* @__PURE__ */ jsx(SortDescendingOutlined, {}),
          " Sort Desc"
        ] }),
        /* @__PURE__ */ jsxs(Option, { value: "asc", children: [
          /* @__PURE__ */ jsx(SortAscendingOutlined, {}),
          " Sort Asc"
        ] })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(Row, { style: { justifyContent: "space-between" }, gutter: [16, 16], justify: "space-between", align: "middle", className: "mb-4 table-header", children: [
    /* @__PURE__ */ jsx(Col, { xs: 24, sm: 24, md: 12, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Search by user or card holder name",
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
const paymentMethods = {
  visa: { name: "Visa", icon: /* @__PURE__ */ jsx(FaCcVisa, { size: 35, color: "#1A1F71" }) },
  mastercard: { name: "Mastercard", icon: /* @__PURE__ */ jsx(FaCcMastercard, { size: 35, color: "orangered" }) },
  amex: { name: "American Express", icon: /* @__PURE__ */ jsx(FaCcAmex, {}) },
  discover: { name: "Discover", icon: /* @__PURE__ */ jsx(FaCcDiscover, {}) },
  dinersclub: { name: "Diners Club", icon: /* @__PURE__ */ jsx(FaCcDinersClub, {}) },
  jcb: { name: "JCB", icon: /* @__PURE__ */ jsx(FaCcJcb, {}) }
};
const Transactions = () => {
  var _a;
  const [transactions, setTransactions] = useState({ data: [], current_page: 1, last_page: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");
  const [price, setPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const debouncedLoadTransactions = useCallback(
    debounce((search, cardType, dates, price2, sortOrder2, page) => {
      setLoading(true);
      loadTransactions({ setTransactions, search, cardType, dates, price: price2, sortOrder: sortOrder2, page }).finally(() => setLoading(false));
    }, 600),
    []
  );
  useEffect(() => {
    setCurrentPage(1);
    debouncedLoadTransactions(searchTerm, selectedCardType, null, price, sortOrder, 1);
  }, [searchTerm, selectedCardType, price, sortOrder]);
  useEffect(() => {
    setCurrentPage(transactions.current_page);
    setTotalPages(transactions.last_page);
  }, [transactions]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleCardTypeChange = (value) => {
    setSelectedCardType(value);
  };
  const handleSortChange = (value) => {
    if (value === "lowToHigh" || value === "highToLow") {
      setPrice(value);
    } else {
      setSortOrder(value);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    debouncedLoadTransactions(searchTerm, selectedCardType, null, price, sortOrder, newPage);
  };
  const columns = [
    { title: "#", dataIndex: "index", key: "index" },
    { title: "Stripe ID", dataIndex: "transaction_id", key: "transaction_id" },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text, record) => {
        console.log("record", record);
        return `${record.user}`;
      }
    },
    { title: "Card Holder", dataIndex: "card_holder", key: "card_holder", render: (text, record) => JSON.parse(record.description).card_holder },
    { title: "Status", dataIndex: "payment_status", key: "payment_status", render: (status) => /* @__PURE__ */ jsx(Tag, { color: status === "completed" ? "green" : status === "pending" ? "orange" : "red", children: status }) },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (text, record) => {
        var _a2;
        const description = JSON.parse(record.description);
        return /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "15px" }, children: [
          (_a2 = paymentMethods[description.brand]) == null ? void 0 : _a2.icon,
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
            /* @__PURE__ */ jsx("span", { children: record.last4 }),
            /* @__PURE__ */ jsxs("span", { children: [
              record.exp_month,
              "/",
              record.exp_year
            ] })
          ] })
        ] });
      }
    },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (amount) => `$${(amount / 100).toFixed(2)}` },
    { title: "Date", dataIndex: "created_at", key: "created_at", render: (date) => formatDate(date) }
  ];
  const data = (_a = transactions == null ? void 0 : transactions.data) == null ? void 0 : _a.map((trans, index) => ({
    ...trans,
    index: index + 1,
    user: `${trans.user.first_name} ${trans.user.last_name}`,
    card_holder: JSON.parse(trans.description).card_holder,
    payment_method: JSON.parse(trans.description).brand
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      TransactionHeader,
      {
        searchTerm,
        handleSearchChange,
        handleCardTypeChange,
        handleSortChange
      }
    ),
    loading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: data,
        rowKey: "transaction_id",
        pagination: {
          current: currentPage,
          total: totalPages * 10,
          onChange: handlePageChange
        }
      }
    )
  ] });
};
function ProductsApp() {
  return /* @__PURE__ */ jsx(Transactions, {});
}
export {
  ProductsApp as default
};
