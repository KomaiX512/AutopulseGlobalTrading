import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import { CChartBar, CChartLine, CChartDoughnut, CChartPie, CChartPolarArea, CChartRadar } from "@coreui/react-chartjs";
import { D as DocsCallout } from "./DefaultLayout-CdjuhZAb.js";
import "@coreui/icons-react";
import "react-hot-toast";
import "react/jsx-runtime";
import "react-router-dom";
import "antd";
import "./helpers-D56oASBL.js";
import "axios";
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
import "react-redux";
import "simplebar-react";
import "@coreui/icons";
const Charts = () => {
  const random = () => Math.round(Math.random() * 100);
  return /* @__PURE__ */ jsxs(CRow, { children: [
    /* @__PURE__ */ jsx(CCol, { xs: 12, children: /* @__PURE__ */ jsx(
      DocsCallout,
      {
        name: "Chart",
        href: "components/chart",
        content: "React wrapper component for Chart.js 3.0, the most popular charting library."
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { xs: 6, children: /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
      /* @__PURE__ */ jsx(CCardHeader, { children: "Bar Chart" }),
      /* @__PURE__ */ jsx(CCardBody, { children: /* @__PURE__ */ jsx(
        CChartBar,
        {
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "GitHub Commits",
                backgroundColor: "#f87979",
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          labels: "months"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(CCol, { xs: 6, children: /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
      /* @__PURE__ */ jsx(CCardHeader, { children: "Line Chart" }),
      /* @__PURE__ */ jsx(CCardBody, { children: /* @__PURE__ */ jsx(
        CChartLine,
        {
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: [random(), random(), random(), random(), random(), random(), random()]
              },
              {
                label: "My Second dataset",
                backgroundColor: "rgba(151, 187, 205, 0.2)",
                borderColor: "rgba(151, 187, 205, 1)",
                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                pointBorderColor: "#fff",
                data: [random(), random(), random(), random(), random(), random(), random()]
              }
            ]
          }
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(CCol, { xs: 6, children: /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
      /* @__PURE__ */ jsx(CCardHeader, { children: "Doughnut Chart" }),
      /* @__PURE__ */ jsx(CCardBody, { children: /* @__PURE__ */ jsx(
        CChartDoughnut,
        {
          data: {
            labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
            datasets: [
              {
                backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                data: [40, 20, 80, 10]
              }
            ]
          }
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(CCol, { xs: 6, children: /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
      /* @__PURE__ */ jsx(CCardHeader, { children: "Pie Chart" }),
      /* @__PURE__ */ jsx(CCardBody, { children: /* @__PURE__ */ jsx(
        CChartPie,
        {
          data: {
            labels: ["Red", "Green", "Yellow"],
            datasets: [
              {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
              }
            ]
          }
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(CCol, { xs: 6, children: /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
      /* @__PURE__ */ jsx(CCardHeader, { children: "Polar Area Chart" }),
      /* @__PURE__ */ jsx(CCardBody, { children: /* @__PURE__ */ jsx(
        CChartPolarArea,
        {
          data: {
            labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
            datasets: [
              {
                data: [11, 16, 7, 3, 14],
                backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"]
              }
            ]
          }
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(CCol, { xs: 6, children: /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
      /* @__PURE__ */ jsx(CCardHeader, { children: "Radar Chart" }),
      /* @__PURE__ */ jsx(CCardBody, { children: /* @__PURE__ */ jsx(
        CChartRadar,
        {
          data: {
            labels: [
              "Eating",
              "Drinking",
              "Sleeping",
              "Designing",
              "Coding",
              "Cycling",
              "Running"
            ],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220, 220, 220, 1)",
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: "My Second dataset",
                backgroundColor: "rgba(151, 187, 205, 0.2)",
                borderColor: "rgba(151, 187, 205, 1)",
                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                pointBorderColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151, 187, 205, 1)",
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]
          }
        }
      ) })
    ] }) })
  ] });
};
export {
  Charts as default
};
