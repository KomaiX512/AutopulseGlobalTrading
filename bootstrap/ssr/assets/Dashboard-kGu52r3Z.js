import { j as jsx, F as Fragment, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import "react";
import "classnames";
import { CRow, CCol, CWidgetStatsF } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilChartPie } from "@coreui/icons";
import { GrDeliver } from "react-icons/gr";
import { Card, Flex } from "antd";
import "react/jsx-runtime";
const Dashboard = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(Flex, { gap: 20, align: "center", children: /* @__PURE__ */ jsx("h5", { children: " Customer Analytics" }) }),
    /* @__PURE__ */ jsxs(CRow, { className: "py-2", children: [
      /* @__PURE__ */ jsx(CCol, { xs: 3, children: /* @__PURE__ */ jsx(
        CWidgetStatsF,
        {
          className: "mb-3",
          color: "primary",
          icon: /* @__PURE__ */ jsx(CIcon, { icon: cilChartPie, height: 24 }),
          padding: false,
          title: "Widget title",
          value: "89.9%"
        }
      ) }),
      /* @__PURE__ */ jsx(CCol, { xs: 3, children: /* @__PURE__ */ jsx(
        CWidgetStatsF,
        {
          className: "mb-3",
          color: "primary",
          icon: /* @__PURE__ */ jsx(GrDeliver, { height: 24, size: 24, color: "white" }),
          padding: false,
          title: "Widget title",
          value: "89.9%"
        }
      ) }),
      /* @__PURE__ */ jsx(CCol, { xs: 3, children: /* @__PURE__ */ jsx(
        CWidgetStatsF,
        {
          className: "mb-3",
          color: "primary",
          icon: /* @__PURE__ */ jsx(CIcon, { icon: cilChartPie, height: 24 }),
          padding: false,
          title: "Business  Products",
          value: "40"
        }
      ) }),
      /* @__PURE__ */ jsx(CCol, { xs: 3, children: /* @__PURE__ */ jsx(
        CWidgetStatsF,
        {
          className: "mb-3",
          color: "primary",
          icon: /* @__PURE__ */ jsx(CIcon, { icon: cilChartPie, height: 24 }),
          padding: false,
          title: "Widget title",
          value: "89.9%"
        }
      ) })
    ] })
  ] }) });
};
export {
  Dashboard as default
};
