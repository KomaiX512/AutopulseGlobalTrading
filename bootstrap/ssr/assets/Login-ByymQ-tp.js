import { j as jsx, a as jsxs } from "./jsx-runtime-B5WjVc0P.js";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { T as TextInput, I as InputError } from "./TextInput-B6lQlW2Q.js";
import { I as InputLabel } from "./InputLabel-BbJGG6HL.js";
import "react/jsx-runtime";
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return (
    // < >
    /* @__PURE__ */ jsxs("div", { className: "login-section container b-white p-3 flex  lg:flex-flexh-screen", style: { background: "rgb(254, 248, 245)" }, children: [
      /* @__PURE__ */ jsx(Head, { title: "Log in" }),
      status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
      /* @__PURE__ */ jsx("div", { className: " col-left lg:flex-1  lg:flex  items-center justify-center bg-white text-black", children: /* @__PURE__ */ jsx("img", { loading: "lazy", className: "login-img w-full h-full", src: "/images/login.svg", alt: "Login" }) }),
      /* @__PURE__ */ jsx("div", { className: " col-right w-full bg-gray-100 flex  items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full p-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold mb-6 text-black text-center", children: "Sign In" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "mt-1 block w-full",
                autoComplete: "username",
                isFocused: true,
                onChange: (e) => setData("email", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "mt-1 block w-full",
                autoComplete: "current-password",
                onChange: (e) => setData("password", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxs("label", { className: "flex  items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                className: "m-0",
                name: "remember",
                checked: data.remember,
                onChange: (e) => setData("remember", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex  flex-col items-center justify-end", children: [
            canResetPassword && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("password.request"),
                className: "my-3",
                children: "Forgot your password?"
              }
            ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary btn-home-primary text-center", disabled: processing, children: "Log in" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
          "Don't have an account? ",
          /* @__PURE__ */ jsx("a", { href: "/register", className: "text-black hover:underline", children: "Sign Up" })
        ] }) })
      ] }) })
    ] })
  );
}
export {
  Login as default
};
