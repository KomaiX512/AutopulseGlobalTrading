import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import { T as TextInput, I as InputError } from "./TextInput-B6lQlW2Q.js";
import { I as InputLabel } from "./InputLabel-BbJGG6HL.js";
import { Button } from "antd";
import "react/jsx-runtime";
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs("div", { className: "login-section container md:flex-col sm:flex-col flex-col b-white p-3 flex  lg:flex-row h-screen", style: { background: "white" }, children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsx("div", { className: "col-left xl:w-50 lg:w-50 md:50 lg:flex  items-center justify-center bg-white text-black", children: /* @__PURE__ */ jsx("img", { loading: "lazy", className: "login-img w-full", src: "/images/signup.png", alt: "Signup" }) }),
    /* @__PURE__ */ jsx("div", { className: " col-right w-full bg-gray-100 flex  items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full p-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold mb-6 text-black text-center", children: "Sign Up" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
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
              onChange: (e) => setData("email", e.target.value),
              required: true
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
              autoComplete: "new-password",
              onChange: (e) => setData("password", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password_confirmation",
              type: "password",
              name: "password_confirmation",
              value: data.password_confirmation,
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              onChange: (e) => setData("password_confirmation", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex  items-center justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { className: "btn btn-primary btn-home-primary py-3", disabled: processing, children: "Sign Up" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
        "Already registered ? ",
        /* @__PURE__ */ jsx("a", { href: "/login", className: "text-black hover:underline", children: "Login" })
      ] }) })
    ] }) })
  ] });
}
export {
  Register as default
};
