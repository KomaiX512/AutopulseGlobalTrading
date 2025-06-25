import { a as jsxs, j as jsx, F as Fragment } from "./jsx-runtime-B5WjVc0P.js";
import { useRef, useEffect } from "react";
import { CRow, CCol, CWidgetStatsD, CWidgetStatsA, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CCard, CCardHeader, CCardBody, CWidgetStatsB, CWidgetStatsE, CWidgetStatsF, CLink, CCardGroup, CWidgetStatsC } from "@coreui/react";
import { getStyle } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cibFacebook, cibTwitter, cibLinkedin, cilCalendar, cilOptions, cilArrowBottom, cilArrowTop, cilSettings, cilUser, cilMoon, cilBell, cilArrowRight, cilLaptop, cilPeople, cilUserFollow, cilBasket, cilChartPie, cilSpeedometer, cilSpeech } from "@coreui/icons";
import { CChart, CChartLine, CChartBar } from "@coreui/react-chartjs";
import { a as DocsExample } from "./DefaultLayout-CQKz9vmn.js";
import "react-hot-toast";
import PropTypes from "prop-types";
import "react/jsx-runtime";
import "react-router-dom";
import "antd";
import "./helpers-isL4n3oi.js";
import "axios";
import "@ant-design/icons";
import "react-icons/fa";
import "react-quill";
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
const WidgetsBrand = (props) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  return /* @__PURE__ */ jsxs(CRow, { className: props.className, xs: { gutter: 4 }, children: [
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsD,
      {
        ...props.withCharts && {
          chart: /* @__PURE__ */ jsx(
            CChart,
            {
              className: "position-absolute w-100 h-100",
              type: "line",
              data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    backgroundColor: "rgba(255,255,255,.1)",
                    borderColor: "rgba(255,255,255,.55)",
                    pointHoverBackgroundColor: "#fff",
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true
                  }
                ]
              },
              options: chartOptions
            }
          )
        },
        icon: /* @__PURE__ */ jsx(CIcon, { icon: cibFacebook, height: 52, className: "my-4 text-white" }),
        values: [
          { title: "friends", value: "89K" },
          { title: "feeds", value: "459" }
        ],
        style: {
          "--cui-card-cap-bg": "#3b5998"
        }
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsD,
      {
        ...props.withCharts && {
          chart: /* @__PURE__ */ jsx(
            CChart,
            {
              className: "position-absolute w-100 h-100",
              type: "line",
              data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    backgroundColor: "rgba(255,255,255,.1)",
                    borderColor: "rgba(255,255,255,.55)",
                    pointHoverBackgroundColor: "#fff",
                    borderWidth: 2,
                    data: [1, 13, 9, 17, 34, 41, 38],
                    fill: true
                  }
                ]
              },
              options: chartOptions
            }
          )
        },
        icon: /* @__PURE__ */ jsx(CIcon, { icon: cibTwitter, height: 52, className: "my-4 text-white" }),
        values: [
          { title: "followers", value: "973k" },
          { title: "tweets", value: "1.792" }
        ],
        style: {
          "--cui-card-cap-bg": "#00aced"
        }
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsD,
      {
        ...props.withCharts && {
          chart: /* @__PURE__ */ jsx(
            CChart,
            {
              className: "position-absolute w-100 h-100",
              type: "line",
              data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    backgroundColor: "rgba(255,255,255,.1)",
                    borderColor: "rgba(255,255,255,.55)",
                    pointHoverBackgroundColor: "#fff",
                    borderWidth: 2,
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true
                  }
                ]
              },
              options: chartOptions
            }
          )
        },
        icon: /* @__PURE__ */ jsx(CIcon, { icon: cibLinkedin, height: 52, className: "my-4 text-white" }),
        values: [
          { title: "contacts", value: "500" },
          { title: "feeds", value: "1.292" }
        ],
        style: {
          "--cui-card-cap-bg": "#4875b4"
        }
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsD,
      {
        color: "warning",
        ...props.withCharts && {
          chart: /* @__PURE__ */ jsx(
            CChart,
            {
              className: "position-absolute w-100 h-100",
              type: "line",
              data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    backgroundColor: "rgba(255,255,255,.1)",
                    borderColor: "rgba(255,255,255,.55)",
                    pointHoverBackgroundColor: "#fff",
                    borderWidth: 2,
                    data: [35, 23, 56, 22, 97, 23, 64],
                    fill: true
                  }
                ]
              },
              options: chartOptions
            }
          )
        },
        icon: /* @__PURE__ */ jsx(CIcon, { icon: cilCalendar, height: 52, className: "my-4 text-white" }),
        values: [
          { title: "events", value: "12+" },
          { title: "meetings", value: "4" }
        ]
      }
    ) })
  ] });
};
WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool
};
const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle("--cui-primary");
          widgetChartRef1.current.update();
        });
      }
      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle("--cui-info");
          widgetChartRef2.current.update();
        });
      }
    });
  }, [widgetChartRef1, widgetChartRef2]);
  return /* @__PURE__ */ jsxs(CRow, { className: props.className, xs: { gutter: 4 }, children: [
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsA,
      {
        color: "primary",
        value: /* @__PURE__ */ jsxs(Fragment, { children: [
          "26K",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "fs-6 fw-normal", children: [
            "(-12.4% ",
            /* @__PURE__ */ jsx(CIcon, { icon: cilArrowBottom }),
            ")"
          ] })
        ] }),
        title: "Users",
        action: /* @__PURE__ */ jsxs(CDropdown, { alignment: "end", children: [
          /* @__PURE__ */ jsx(CDropdownToggle, { color: "transparent", caret: false, className: "text-white p-0", children: /* @__PURE__ */ jsx(CIcon, { icon: cilOptions }) }),
          /* @__PURE__ */ jsxs(CDropdownMenu, { children: [
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Another action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Something else here..." }),
            /* @__PURE__ */ jsx(CDropdownItem, { disabled: true, children: "Disabled action" })
          ] })
        ] }),
        chart: /* @__PURE__ */ jsx(
          CChartLine,
          {
            ref: widgetChartRef1,
            className: "mt-3 mx-3",
            style: { height: "70px" },
            data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,.55)",
                  pointBackgroundColor: getStyle("--cui-primary"),
                  data: [65, 59, 84, 84, 51, 55, 40]
                }
              ]
            },
            options: {
              plugins: {
                legend: {
                  display: false
                }
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  border: {
                    display: false
                  },
                  grid: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    display: false
                  }
                },
                y: {
                  min: 30,
                  max: 89,
                  display: false,
                  grid: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              },
              elements: {
                line: {
                  borderWidth: 1,
                  tension: 0.4
                },
                point: {
                  radius: 4,
                  hitRadius: 10,
                  hoverRadius: 4
                }
              }
            }
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsA,
      {
        color: "info",
        value: /* @__PURE__ */ jsxs(Fragment, { children: [
          "$6.200",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "fs-6 fw-normal", children: [
            "(40.9% ",
            /* @__PURE__ */ jsx(CIcon, { icon: cilArrowTop }),
            ")"
          ] })
        ] }),
        title: "Income",
        action: /* @__PURE__ */ jsxs(CDropdown, { alignment: "end", children: [
          /* @__PURE__ */ jsx(CDropdownToggle, { color: "transparent", caret: false, className: "text-white p-0", children: /* @__PURE__ */ jsx(CIcon, { icon: cilOptions }) }),
          /* @__PURE__ */ jsxs(CDropdownMenu, { children: [
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Another action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Something else here..." }),
            /* @__PURE__ */ jsx(CDropdownItem, { disabled: true, children: "Disabled action" })
          ] })
        ] }),
        chart: /* @__PURE__ */ jsx(
          CChartLine,
          {
            ref: widgetChartRef2,
            className: "mt-3 mx-3",
            style: { height: "70px" },
            data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,.55)",
                  pointBackgroundColor: getStyle("--cui-info"),
                  data: [1, 18, 9, 17, 34, 22, 11]
                }
              ]
            },
            options: {
              plugins: {
                legend: {
                  display: false
                }
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  border: {
                    display: false
                  },
                  grid: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    display: false
                  }
                },
                y: {
                  min: -9,
                  max: 39,
                  display: false,
                  grid: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              },
              elements: {
                line: {
                  borderWidth: 1
                },
                point: {
                  radius: 4,
                  hitRadius: 10,
                  hoverRadius: 4
                }
              }
            }
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsA,
      {
        color: "warning",
        value: /* @__PURE__ */ jsxs(Fragment, { children: [
          "2.49%",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "fs-6 fw-normal", children: [
            "(84.7% ",
            /* @__PURE__ */ jsx(CIcon, { icon: cilArrowTop }),
            ")"
          ] })
        ] }),
        title: "Conversion Rate",
        action: /* @__PURE__ */ jsxs(CDropdown, { alignment: "end", children: [
          /* @__PURE__ */ jsx(CDropdownToggle, { color: "transparent", caret: false, className: "text-white p-0", children: /* @__PURE__ */ jsx(CIcon, { icon: cilOptions }) }),
          /* @__PURE__ */ jsxs(CDropdownMenu, { children: [
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Another action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Something else here..." }),
            /* @__PURE__ */ jsx(CDropdownItem, { disabled: true, children: "Disabled action" })
          ] })
        ] }),
        chart: /* @__PURE__ */ jsx(
          CChartLine,
          {
            className: "mt-3",
            style: { height: "70px" },
            data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgba(255,255,255,.2)",
                  borderColor: "rgba(255,255,255,.55)",
                  data: [78, 81, 80, 45, 34, 12, 40],
                  fill: true
                }
              ]
            },
            options: {
              plugins: {
                legend: {
                  display: false
                }
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: false
                },
                y: {
                  display: false
                }
              },
              elements: {
                line: {
                  borderWidth: 2,
                  tension: 0.4
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4
                }
              }
            }
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(CCol, { sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
      CWidgetStatsA,
      {
        color: "danger",
        value: /* @__PURE__ */ jsxs(Fragment, { children: [
          "44K",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "fs-6 fw-normal", children: [
            "(-23.6% ",
            /* @__PURE__ */ jsx(CIcon, { icon: cilArrowBottom }),
            ")"
          ] })
        ] }),
        title: "Sessions",
        action: /* @__PURE__ */ jsxs(CDropdown, { alignment: "end", children: [
          /* @__PURE__ */ jsx(CDropdownToggle, { color: "transparent", caret: false, className: "text-white p-0", children: /* @__PURE__ */ jsx(CIcon, { icon: cilOptions }) }),
          /* @__PURE__ */ jsxs(CDropdownMenu, { children: [
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Another action" }),
            /* @__PURE__ */ jsx(CDropdownItem, { children: "Something else here..." }),
            /* @__PURE__ */ jsx(CDropdownItem, { disabled: true, children: "Disabled action" })
          ] })
        ] }),
        chart: /* @__PURE__ */ jsx(
          CChartBar,
          {
            className: "mt-3 mx-3",
            style: { height: "70px" },
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
                "January",
                "February",
                "March",
                "April"
              ],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgba(255,255,255,.2)",
                  borderColor: "rgba(255,255,255,.55)",
                  data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                  barPercentage: 0.6
                }
              ]
            },
            options: {
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawTicks: false
                  },
                  ticks: {
                    display: false
                  }
                },
                y: {
                  border: {
                    display: false
                  },
                  grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false
                  },
                  ticks: {
                    display: false
                  }
                }
              }
            }
          }
        )
      }
    ) })
  ] });
};
WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool
};
const Widgets = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  return /* @__PURE__ */ jsxs(CCard, { className: "mb-4", children: [
    /* @__PURE__ */ jsx(CCardHeader, { children: "Widgets" }),
    /* @__PURE__ */ jsxs(CCardBody, { children: [
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsa", children: /* @__PURE__ */ jsx(WidgetsDropdown, {}) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsb", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            progress: { color: "success", value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim.",
            title: "Widget title",
            value: "89.9%"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            value: "12.124",
            title: "Widget title",
            progress: { color: "info", value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            value: "$98.111,00",
            title: "Widget title",
            progress: { color: "warning", value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            value: "2 TB",
            title: "Widget title",
            progress: { color: "primary", value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsb", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            color: "success",
            inverse: true,
            value: "89.9%",
            title: "Widget title",
            progress: { value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            color: "info",
            inverse: true,
            value: "12.124",
            title: "Widget title",
            progress: { value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            color: "warning",
            inverse: true,
            value: "$98.111,00",
            title: "Widget title",
            progress: { value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsB,
          {
            color: "primary",
            inverse: true,
            value: "2 TB",
            title: "Widget title",
            progress: { value: 89.9 },
            text: "Lorem ipsum dolor sit amet enim."
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatse", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { sm: 4, md: 3, xl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsE,
          {
            chart: /* @__PURE__ */ jsx(
              CChartBar,
              {
                className: "mx-auto",
                style: { height: "40px", width: "80px" },
                data: {
                  labels: [
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M"
                  ],
                  datasets: [
                    {
                      backgroundColor: getStyle("--cui-danger"),
                      borderColor: "transparent",
                      borderWidth: 1,
                      data: [
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100)
                      ]
                    }
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      display: false
                    },
                    y: {
                      display: false
                    }
                  }
                }
              }
            ),
            title: "title",
            value: "1,123"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { sm: 4, md: 3, xl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsE,
          {
            chart: /* @__PURE__ */ jsx(
              CChartBar,
              {
                className: "mx-auto",
                style: { height: "40px", width: "80px" },
                data: {
                  labels: [
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M"
                  ],
                  datasets: [
                    {
                      backgroundColor: getStyle("--cui-primary"),
                      borderColor: "transparent",
                      borderWidth: 1,
                      data: [
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100)
                      ]
                    }
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      display: false
                    },
                    y: {
                      display: false
                    }
                  }
                }
              }
            ),
            title: "title",
            value: "1,123"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { sm: 4, md: 3, xl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsE,
          {
            chart: /* @__PURE__ */ jsx(
              CChartBar,
              {
                className: "mx-auto",
                style: { height: "40px", width: "80px" },
                data: {
                  labels: [
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M"
                  ],
                  datasets: [
                    {
                      backgroundColor: getStyle("--cui-success"),
                      borderColor: "transparent",
                      borderWidth: 1,
                      data: [
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100)
                      ]
                    }
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      display: false
                    },
                    y: {
                      display: false
                    }
                  }
                }
              }
            ),
            title: "title",
            value: "1,123"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { sm: 4, md: 3, xl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsE,
          {
            chart: /* @__PURE__ */ jsx(
              CChartLine,
              {
                className: "mx-auto",
                style: { height: "40px", width: "80px" },
                data: {
                  labels: [
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M"
                  ],
                  datasets: [
                    {
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-danger"),
                      borderWidth: 2,
                      data: [
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100)
                      ]
                    }
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  elements: {
                    line: {
                      tension: 0.4
                    },
                    point: {
                      radius: 0
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      display: false
                    },
                    y: {
                      display: false
                    }
                  }
                }
              }
            ),
            title: "title",
            value: "1,123"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { sm: 4, md: 3, xl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsE,
          {
            chart: /* @__PURE__ */ jsx(
              CChartLine,
              {
                className: "mx-auto",
                style: { height: "40px", width: "80px" },
                data: {
                  labels: [
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M"
                  ],
                  datasets: [
                    {
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-success"),
                      borderWidth: 2,
                      data: [
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100)
                      ]
                    }
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  elements: {
                    line: {
                      tension: 0.4
                    },
                    point: {
                      radius: 0
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      display: false
                    },
                    y: {
                      display: false
                    }
                  }
                }
              }
            ),
            title: "title",
            value: "1,123"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { sm: 4, md: 3, xl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsE,
          {
            chart: /* @__PURE__ */ jsx(
              CChartLine,
              {
                className: "mx-auto",
                style: { height: "40px", width: "80px" },
                data: {
                  labels: [
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "M"
                  ],
                  datasets: [
                    {
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100),
                        random(40, 100)
                      ]
                    }
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  elements: {
                    line: {
                      tension: 0.4
                    },
                    point: {
                      radius: 0
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      display: false
                    },
                    y: {
                      display: false
                    }
                  }
                }
              }
            ),
            title: "title",
            value: "1,123"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsf", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilSettings, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "primary"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilUser, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "info"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilMoon, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "warning"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilBell, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "danger"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsf", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilSettings, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "primary",
            footer: /* @__PURE__ */ jsxs(
              CLink,
              {
                className: "font-weight-bold font-xs text-body-secondary",
                href: "https://coreui.io/",
                rel: "noopener norefferer",
                target: "_blank",
                children: [
                  "View more",
                  /* @__PURE__ */ jsx(CIcon, { icon: cilArrowRight, className: "float-end", width: 16 })
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilLaptop, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "info",
            footer: /* @__PURE__ */ jsxs(
              CLink,
              {
                className: "font-weight-bold font-xs text-body-secondary",
                href: "https://coreui.io/",
                rel: "noopener norefferer",
                target: "_blank",
                children: [
                  "View more",
                  /* @__PURE__ */ jsx(CIcon, { icon: cilArrowRight, className: "float-end", width: 16 })
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilMoon, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "warning",
            footer: /* @__PURE__ */ jsxs(
              CLink,
              {
                className: "font-weight-bold font-xs text-body-secondary",
                href: "https://coreui.io/",
                rel: "noopener norefferer",
                target: "_blank",
                children: [
                  "View more",
                  /* @__PURE__ */ jsx(CIcon, { icon: cilArrowRight, className: "float-end", width: 16 })
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilBell, size: "xl" }),
            title: "income",
            value: "$1.999,50",
            color: "danger",
            footer: /* @__PURE__ */ jsxs(
              CLink,
              {
                className: "font-weight-bold font-xs text-body-secondary",
                href: "https://coreui.io/",
                rel: "noopener norefferer",
                target: "_blank",
                children: [
                  "View more",
                  /* @__PURE__ */ jsx(CIcon, { icon: cilArrowRight, className: "float-end", width: 16 })
                ]
              }
            )
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsf", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilSettings, size: "xl" }),
            padding: false,
            title: "income",
            value: "$1.999,50",
            color: "primary"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilUser, size: "xl" }),
            padding: false,
            title: "income",
            value: "$1.999,50",
            color: "info"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilMoon, size: "xl" }),
            padding: false,
            title: "income",
            value: "$1.999,50",
            color: "warning"
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 12, sm: 6, xl: 4, xxl: 3, children: /* @__PURE__ */ jsx(
          CWidgetStatsF,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { width: 24, icon: cilBell, size: "xl" }),
            padding: false,
            title: "income",
            value: "$1.999,50",
            color: "danger"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsd", children: /* @__PURE__ */ jsx(WidgetsBrand, {}) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsd", children: /* @__PURE__ */ jsx(WidgetsBrand, { withCharts: true }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsc", children: /* @__PURE__ */ jsxs(CCardGroup, { className: "mb-4", children: [
        /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilPeople, height: 36 }),
            value: "87.500",
            title: "Visitors",
            progress: { color: "info", value: 75 }
          }
        ),
        /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilUserFollow, height: 36 }),
            value: "385",
            title: "New Clients",
            progress: { color: "success", value: 75 }
          }
        ),
        /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilBasket, height: 36 }),
            value: "1238",
            title: "Products sold",
            progress: { color: "warning", value: 75 }
          }
        ),
        /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilChartPie, height: 36 }),
            value: "28%",
            title: "Returning Visitors",
            progress: { color: "primary", value: 75 }
          }
        ),
        /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilSpeedometer, height: 36 }),
            value: "5:34:11",
            title: "Avg. Time",
            progress: { color: "danger", value: 75 }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsc", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilPeople, height: 36 }),
            value: "87.500",
            title: "Visitors",
            progress: { color: "info", value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilUserFollow, height: 36 }),
            value: "385",
            title: "New Clients",
            progress: { color: "success", value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilBasket, height: 36 }),
            value: "1238",
            title: "Products sold",
            progress: { color: "warning", value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilChartPie, height: 36 }),
            value: "28%",
            title: "Returning Visitors",
            progress: { color: "primary", value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilSpeedometer, height: 36 }),
            value: "5:34:11",
            title: "Avg. Time",
            progress: { color: "danger", value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilSpeech, height: 36 }),
            value: "972",
            title: "Comments",
            progress: { color: "info", value: 75 }
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(DocsExample, { href: "components/widgets/#cwidgetstatsc", children: /* @__PURE__ */ jsxs(CRow, { xs: { gutter: 4 }, children: [
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            color: "info",
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilPeople, height: 36 }),
            value: "87.500",
            title: "Visitors",
            inverse: true,
            progress: { value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            color: "success",
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilUserFollow, height: 36 }),
            value: "385",
            title: "New Clients",
            inverse: true,
            progress: { value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            color: "warning",
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilBasket, height: 36 }),
            value: "1238",
            title: "Products sold",
            inverse: true,
            progress: { value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            color: "primary",
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilChartPie, height: 36 }),
            value: "28%",
            title: "Returning Visitors",
            inverse: true,
            progress: { value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            color: "danger",
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilSpeedometer, height: 36 }),
            value: "5:34:11",
            title: "Avg. Time",
            inverse: true,
            progress: { value: 75 }
          }
        ) }),
        /* @__PURE__ */ jsx(CCol, { xs: 6, lg: 4, xxl: 2, children: /* @__PURE__ */ jsx(
          CWidgetStatsC,
          {
            color: "info",
            icon: /* @__PURE__ */ jsx(CIcon, { icon: cilSpeech, height: 36 }),
            value: "972",
            title: "Comments",
            inverse: true,
            progress: { value: 75 }
          }
        ) })
      ] }) })
    ] })
  ] });
};
export {
  Widgets as default
};
