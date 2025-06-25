import { j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useState, useEffect } from "react";
import "react/jsx-runtime";
const Preloader = ({ svg, transitionDuration = 500 }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => setIsLoading(false), transitionDuration);
    };
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, [transitionDuration]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed inset-0 bg-white flex z-[1000] items-center justify-center transition-opacity duration-${transitionDuration} ${!isLoading && "opacity-0 pointer-events-none"}`,
      children: /* @__PURE__ */ jsx("img", { src: "/images/Settings.gif", alt: "" })
    }
  );
};
export {
  Preloader as default
};
