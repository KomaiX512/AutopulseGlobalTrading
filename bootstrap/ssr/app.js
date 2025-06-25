import { j as jsx } from "./assets/jsx-runtime-B5WjVc0P.js";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import "react/jsx-runtime";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
var define_import_meta_env_default = {};
const appName = define_import_meta_env_default.VITE_APP_NAME || "Autopulse";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/AttachmentProduct.jsx": () => import("./assets/AttachmentProduct-DQ8sgMsc.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-BHi5fMh_.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-CjqYBZUd.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-ByymQ-tp.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-DuQZAZXo.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-D6J5Gkg2.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-BNtMdtLr.js"), "./Pages/DashRoot.jsx": () => import("./DashRoot.js"), "./Pages/OrderSuccess.jsx": () => import("./assets/OrderSuccess-D7h7KWwO.js").then((n) => n.b), "./Pages/Preloader.jsx": () => import("./assets/Preloader-BAWYcVLb.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-DzxD5Btn.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-C6Pv9Vuy.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-BTSFSyRP.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-D0u1QRLJ.js"), "./Pages/SpareParts.jsx": () => import("./assets/SpareParts-BMMhpOQM.js"), "./Pages/Table.jsx": () => import("./assets/Table-Bazmr4qz.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-D4cKMHcy.js") })),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(/* @__PURE__ */ jsx(App, { ...props }));
  },
  progress: {
    color: "#4B5563"
  }
});
