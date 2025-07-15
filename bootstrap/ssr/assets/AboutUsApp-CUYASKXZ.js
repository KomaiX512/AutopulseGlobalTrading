import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useContext, useState, useEffect } from "react";
import { M as MyEditor } from "./DefaultLayout-CdjuhZAb.js";
import { Button } from "antd";
import { GrSave } from "react-icons/gr";
import { P as PageContext, a as PageContextProvider } from "./PageContext-DXogRDn-.js";
import "react/jsx-runtime";
import "react-router-dom";
import "@coreui/react";
import "./helpers-D56oASBL.js";
import "axios";
import "react-hot-toast";
import "@ant-design/icons";
import "react-icons/fa";
import "react-quill";
import "prop-types";
import "quill";
import "quill-table-ui";
import "antd/es/grid/col.js";
import "react-dropzone";
import "moment";
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
function AboutUs() {
  const { state, methods, dispatch } = useContext(PageContext);
  const [description, setDescription] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const saveContactUsText = () => {
    let formValues = new FormData();
    formValues.append("about_us_html", description);
    methods.saveAboutText({ formValues, setLoadingState });
    console.log("methods", methods);
  };
  useEffect(() => {
    methods.loadHomeSettings();
  }, []);
  useEffect(() => {
    var _a;
    setDescription((_a = state == null ? void 0 : state.home_settings) == null ? void 0 : _a.about_us_html);
  }, [state == null ? void 0 : state.home_settings]);
  return /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "About Us Settings" }) }),
    /* @__PURE__ */ jsx(
      MyEditor,
      {
        name: "description",
        defaultValue: description,
        onChange: (value) => setDescription(value)
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: saveContactUsText,
        className: "ml-auto mt-2",
        icon: /* @__PURE__ */ jsx(GrSave, {}),
        children: "Save"
      }
    )
  ] });
}
function AboutUsApp() {
  return /* @__PURE__ */ jsx(PageContextProvider, { children: /* @__PURE__ */ jsx(AboutUs, {}) });
}
export {
  AboutUsApp as default
};
