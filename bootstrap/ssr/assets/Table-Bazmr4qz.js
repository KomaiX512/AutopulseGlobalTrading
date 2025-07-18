import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import { CTable, CCollapse, CCardBody, CBadge } from "@coreui/react";
import { useState } from "react";
import "react/jsx-runtime";
function Table() {
  const usersData = [
    { id: 0, name: "John Doe", registered: "2018/01/01", role: "Guest", status: "Pending" },
    { id: 1, name: "Samppa Nori", registered: "2018/01/01", role: "Member", status: "Active" },
    { id: 2, name: "Estavan Lykos", registered: "2018/02/01", role: "Staff", status: "Banned" },
    { id: 3, name: "Chetan Mohamed", registered: "2018/02/01", role: "Admin", status: "Inactive" },
    { id: 4, name: "Derick Maximinus", registered: "2018/03/01", role: "Member", status: "Pending" },
    { id: 5, name: "Friderik Dávid", registered: "2018/01/21", role: "Staff", status: "Active" },
    { id: 6, name: "Yiorgos Avraamu", registered: "2018/01/01", role: "Member", status: "Active" },
    { id: 7, name: "Avram Tarasios", registered: "2018/02/01", role: "Staff", status: "Banned" },
    { id: 8, name: "Quintin Ed", registered: "2018/02/01", role: "Admin", status: "Inactive" },
    { id: 9, name: "Enéas Kwadwo", registered: "2018/03/01", role: "Member", status: "Pending" },
    { id: 10, name: "Agapetus Tadeáš", registered: "2018/01/21", role: "Staff", status: "Active" },
    { id: 11, name: "Carwyn Fachtna", registered: "2018/01/01", role: "Member", status: "Active" },
    { id: 12, name: "Nehemiah Tatius", registered: "2018/02/01", role: "Staff", status: "Banned" },
    { id: 13, name: "Ebbe Gemariah", registered: "2018/02/01", role: "Admin", status: "Inactive" },
    { id: 14, name: "Eustorgios Amulius", registered: "2018/03/01", role: "Member", status: "Pending" },
    { id: 15, name: "Leopold Gáspár", registered: "2018/01/21", role: "Staff", status: "Active" },
    { id: 16, name: "Pompeius René", registered: "2018/01/01", role: "Member", status: "Active" },
    { id: 17, name: "Paĉjo Jadon", registered: "2018/02/01", role: "Staff", status: "Banned" },
    { id: 18, name: "Micheal Mercurius", registered: "2018/02/01", role: "Admin", status: "Inactive" },
    { id: 19, name: "Ganesha Dubhghall", registered: "2018/03/01", role: "Member", status: "Pending" },
    { id: 20, name: "Hiroto Šimun", registered: "2018/01/21", role: "Staff", status: "Active" },
    { id: 21, name: "Vishnu Serghei", registered: "2018/01/01", role: "Member", status: "Active" },
    { id: 22, name: "Zbyněk Phoibos", registered: "2018/02/01", role: "Staff", status: "Banned" },
    { id: 23, name: "Aulus Agmundr", registered: "2018/01/01", role: "Member", status: "Pending" },
    { id: 42, name: "Ford Prefect", registered: "2001/05/25", role: "Alien", status: "Don't panic!" }
  ];
  const [details, setDetails] = useState([]);
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  const fields = [
    { key: "name", _style: { width: "40%" } },
    "registered",
    { key: "role", _style: { width: "20%" } },
    { key: "status", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false
    }
  ];
  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };
  return /* @__PURE__ */ jsx(
    CTable,
    {
      items: usersData,
      fields,
      columnFilter: true,
      tableFilter: true,
      footer: true,
      itemsPerPageSelect: true,
      itemsPerPage: 5,
      hover: true,
      sorter: true,
      pagination: true,
      scopedSlots: {
        "status": (item) => /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(CBadge, { color: getBadge(item.status), children: item.status }) }),
        "show_details": (item, index) => {
          return /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsx(
            CButton,
            {
              color: "primary",
              variant: "outline",
              shape: "square",
              size: "sm",
              onClick: () => {
                toggleDetails(index);
              },
              children: details.includes(index) ? "Hide" : "Show"
            }
          ) });
        },
        "details": (item, index) => {
          return /* @__PURE__ */ jsx(CCollapse, { show: details.includes(index), children: /* @__PURE__ */ jsxs(CCardBody, { children: [
            /* @__PURE__ */ jsx("h4", { children: item.username }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted", children: [
              "User since: ",
              item.registered
            ] }),
            /* @__PURE__ */ jsx(CButton, { size: "sm", color: "info", children: "User Settings" }),
            /* @__PURE__ */ jsx(CButton, { size: "sm", color: "danger", className: "ml-1", children: "Delete" })
          ] }) });
        }
      }
    }
  );
}
export {
  Table as default
};
