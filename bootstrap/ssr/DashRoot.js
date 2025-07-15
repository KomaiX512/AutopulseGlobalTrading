import { j as jsx, F as Fragment } from "./assets/jsx-runtime-B5WjVc0P.js";
import React, { useEffect, Suspense } from "react";
import { useSelector, Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useColorModes, CSpinner } from "@coreui/react";
import { legacy_createStore } from "redux";
import "react/jsx-runtime";
const DefaultLayout = React.lazy(() => import("./assets/DefaultLayout-CdjuhZAb.js").then((n) => n.c));
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes("coreui-free-react-admin-template-theme");
  const storedTheme = useSelector((state) => state.theme);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme = urlParams.get("theme") && urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }
    if (isColorModeSet()) {
      return;
    }
    setColorMode(storedTheme);
  }, []);
  return /* @__PURE__ */ jsx(BrowserRouter, { basename: "/dashboard", children: /* @__PURE__ */ jsx(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx("div", { className: "pt-3 text-center", children: /* @__PURE__ */ jsx(CSpinner, { color: "primary", variant: "grow" }) }),
      children: /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(Route, { path: "*", name: "Home", element: /* @__PURE__ */ jsx(DefaultLayout, {}) }) })
    }
  ) });
};
const initialState = {
  sidebarShow: true,
  theme: "light"
};
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};
const store = legacy_createStore(changeState);
function Dashboard({ auth, laravelVersion, phpVersion }) {
  var _a;
  if (((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.email) === "admin@autopulse.com")
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(App, {}) }) });
  return /* @__PURE__ */ jsx("h4", { children: "You are unauthorized to access this route." });
}
export {
  Dashboard as default
};
