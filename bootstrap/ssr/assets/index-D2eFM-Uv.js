import { j as jsx, a as jsxs, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import React, { useReducer, useState, useContext, useCallback, useEffect } from "react";
import { MdCheck, MdOutlineReply, MdDelete } from "react-icons/md";
import { C as Confirm } from "./DefaultLayout-CQKz9vmn.js";
import { notification, Row, Col, Input, Space, Select, Dropdown, Button, Form, Skeleton, Table, Modal, Tag, Tooltip } from "antd";
import { debounce } from "lodash";
import { a as ajaxRequest, S as ShowToast, f as formatDate } from "./helpers-isL4n3oi.js";
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { IoIosMailOpen } from "react-icons/io";
import "react/jsx-runtime";
import "react-router-dom";
import "@coreui/react";
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
import "./AppLoader-ZfOck8L3.js";
import "./UpdateProfileInformationForm-D0u1QRLJ.js";
import "./TextInput-B6lQlW2Q.js";
import "./InputLabel-BbJGG6HL.js";
import "./PrimaryButton-BkETuGhS.js";
import "@inertiajs/react";
import "@headlessui/react";
import "@coreui/icons-react";
import "react-hot-toast";
import "react-redux";
import "simplebar-react";
import "@coreui/icons";
import "axios";
function rootReducer(state, { type, payload }) {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
  }
}
async function loadQuries({ search = "", sort = "", status, page }) {
  try {
    const queryParams = { page };
    if (search) {
      queryParams.search_term = search;
    }
    if (sort) {
      queryParams.sort_order = sort;
    }
    if (page) {
      queryParams.page = page;
    }
    if (status) {
      queryParams.status = status;
    }
    const response = await axios.get("/api/queries", { params: queryParams });
    if (response.data.success) {
      this.dispatch({ payload: { queries: response == null ? void 0 : response.data.queries, total: response == null ? void 0 : response.data.total, currentPage: response == null ? void 0 : response.data.current_page, lastPage: response == null ? void 0 : response.data.last_page } });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { loading: false } });
  }
}
async function deleteQuery(id) {
  try {
    const method = "delete";
    let api = `/api/queries/${id}`;
    const config = {};
    const response = await ajaxRequest(method, api, {}, config);
    console.log("respnonse", response);
    if (response == null ? void 0 : response.message) {
      ShowToast({ message: response.message, icon: /* @__PURE__ */ jsx(MdCheck, { size: 20 }) });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadQuries.call(this, { search: "", sort: "", status: 0, page: 1 });
  }
}
async function updateQuery({ status, id = null }) {
  this.dispatch({ payload: { loading: true } });
  try {
    const formValues = new FormData();
    if (id) {
      formValues.append("status", status);
    }
    const method = "post";
    let api = `/api/queries/${id}/status`;
    const config = {};
    const response = await ajaxRequest(method, api, formValues, config);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadQuries.call(this, { search: "", sort: "", status: 0, page: 1 });
  }
}
async function sendReply(id, values) {
  this.dispatch({ payload: { loading: true } });
  try {
    const method = "post";
    let api = `/api/queries/${id}/reply`;
    const config = {};
    const response = await ajaxRequest(method, api, values, config);
    ShowToast({ message: "Reply Sent Successfully", icon: /* @__PURE__ */ jsx(MdCheck, { size: 20 }) });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    this.dispatch({ payload: { category_modal: false, loading: false } });
    loadCategories.call(this);
  }
}
const QuriesContext = React.createContext();
function QuriesContextProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();
  const initState = {
    loading: true,
    category_modal: false,
    queries: [],
    contextHolder
  };
  const [state, dispatch] = useReducer(rootReducer, initState);
  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Notification Title",
      description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      showProgress: true,
      pauseOnHover
    });
  };
  const methods = {
    loadQuries: loadQuries.bind({ state, dispatch }),
    updateQuery: updateQuery.bind({ state, dispatch }),
    deleteQuery: deleteQuery.bind({ state, dispatch }),
    sendReply: sendReply.bind({ state, dispatch }),
    openNotification
  };
  return /* @__PURE__ */ jsx(QuriesContext.Provider, { value: { state, methods, dispatch }, children });
}
const { Option } = Select;
const QueryHeader = ({ searchTerm, handleSearchChange, handleSortChange, handleStatusChange }) => {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
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
      /* @__PURE__ */ jsxs(
        Select,
        {
          placeholder: "Select Status",
          onChange: handleStatusChange,
          style: { width: 120 },
          children: [
            /* @__PURE__ */ jsx(Option, { value: "0", children: "Pending" }),
            /* @__PURE__ */ jsx(Option, { value: "1", children: "Read" }),
            /* @__PURE__ */ jsx(Option, { value: "2", children: "Replied" })
          ]
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
function QuriesList() {
  var _a;
  const context = useContext(QuriesContext);
  const { state, methods, dispatch } = context;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const debouncedLoadQuries = useCallback(
    debounce(({ search: search2, sort: sort2, page: page2 }) => {
      methods.loadQuries({ search: search2, sort: sort2, status, page: page2 });
    }, 600),
    []
  );
  useEffect(() => {
    dispatch({ payload: { loading: true } });
    debouncedLoadQuries({ search, status, sort, page });
  }, [sort, page, status]);
  useEffect(() => {
    debouncedLoadQuries({ search, status, sort, page });
  }, [search]);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSortChange = (value) => {
    setSort(value);
  };
  const handlePageChange = (page2) => {
    setPage(page2);
  };
  const handleStatusChange = (e) => {
    console.log("status", e);
    setStatus(e);
  };
  const handleReplyClick = (record) => {
    if (record.status == 2) return;
    setCurrentRecord(record);
    setIsReplyModalVisible(true);
    form.setFieldsValue({
      subject: record.subject,
      reply: ""
    });
  };
  const handleViewClick = (record) => {
    if (record.status == 0) methods.updateQuery({ status: 1, id: record.id });
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const handleReplyModalCancel = () => {
    setIsReplyModalVisible(false);
    setCurrentRecord(null);
  };
  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };
  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      methods.sendReply(currentRecord.id, values);
      setIsReplyModalVisible(false);
      setCurrentRecord(null);
      form.resetFields();
    });
  };
  const columns = [
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      responsive: ["sm", "md"]
    },
    {
      title: "User Email",
      dataIndex: "user_email",
      key: "user_email",
      responsive: ["md"]
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      responsive: ["md"]
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => /* @__PURE__ */ jsx(Fragment, { children: formatDate(record.created_at) }),
      responsive: ["md"]
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        if (record.status == 0) {
          return /* @__PURE__ */ jsx(Tag, { color: "orange", children: "Pending" });
        }
        if (record.status == 1) {
          return /* @__PURE__ */ jsx(Tag, { color: "green", children: "Read" });
        }
        if (record.status == 2) {
          return /* @__PURE__ */ jsx(Tag, { color: "purple", children: "Replied" });
        }
      },
      responsive: ["md"]
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text, record) => /* @__PURE__ */ jsxs("div", { className: "action-column flex  gap-3", children: [
        /* @__PURE__ */ jsx(Tooltip, { title: record.status == 2 ? "Already Replied" : "Send Reply", children: /* @__PURE__ */ jsx(MdOutlineReply, { "aria-disabled": (record == null ? void 0 : record.status) == 2, className: "h-4 w-4 cursor-pointer", onClick: () => handleReplyClick(record) }) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "View Query", children: /* @__PURE__ */ jsx(IoIosMailOpen, { className: "h-4 w-4 cursor-pointer", onClick: () => handleViewClick(record) }) }),
        /* @__PURE__ */ jsx(Confirm, { title: "Deleted Query", onConfirm: () => methods.deleteQuery(record.id), description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(MdDelete, { className: "h-4 w-4" }) })
      ] }),
      responsive: ["xs", "sm", "md"]
    }
  ];
  const data = (_a = state == null ? void 0 : state.queries) == null ? void 0 : _a.map((item, index) => ({
    ...item,
    key: index
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      QueryHeader,
      {
        searchTerm: search,
        handleSortChange,
        handleSearchChange,
        handleStatusChange
      }
    ),
    state.loading ? /* @__PURE__ */ jsx(Skeleton, { active: true, paragraph: { rows: 5 } }) : /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: data,
        pagination: {
          current: state.currentPage,
          total: state.total,
          pageSize: 15,
          onChange: handlePageChange
        }
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Send Reply",
        visible: isReplyModalVisible,
        onCancel: handleReplyModalCancel,
        footer: null,
        children: /* @__PURE__ */ jsxs(Form, { form, layout: "vertical", onFinish: handleFormSubmit, children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Subject",
              name: "subject",
              rules: [{ required: true, message: "Please enter a subject" }],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Message",
              name: "reply",
              rules: [{ required: true, message: "Please enter a message" }],
              children: /* @__PURE__ */ jsx(Input.TextArea, { rows: 4 })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Send Reply" }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Query Details",
        visible: isViewModalVisible,
        onCancel: handleViewModalCancel,
        footer: null,
        children: currentRecord && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "User Name:" }),
            " ",
            currentRecord.user_name
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "User Email:" }),
            " ",
            currentRecord.user_email
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Subject:" }),
            " ",
            currentRecord.subject
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Date:" }),
            " ",
            formatDate(currentRecord.created_at)
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Status:" }),
            " ",
            currentRecord.status === 0 ? "Pending" : currentRecord.status === 1 ? "Read" : "Replied"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Message:" }),
            " ",
            currentRecord.message
          ] }),
          (currentRecord == null ? void 0 : currentRecord.reply) && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Replied:" }),
            " ",
            currentRecord.reply
          ] })
        ] })
      }
    )
  ] });
}
function QueryIndex() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(QuriesContextProvider, { children: /* @__PURE__ */ jsx(QuriesList, {}) }) });
}
export {
  QueryIndex as default
};
