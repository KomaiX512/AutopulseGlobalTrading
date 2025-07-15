import { a as jsxs, j as jsx } from "./jsx-runtime-B5WjVc0P.js";
import { useContext, useState, useEffect } from "react";
import { Collapse, Form, Input, Row, Col, Button, Flex } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { U as UploadImage, C as Confirm } from "./DefaultLayout-CdjuhZAb.js";
import { GrTrash } from "react-icons/gr";
import { P as PageContext, a as PageContextProvider } from "./PageContext-DXogRDn-.js";
import { S as Slider } from "./Slider-D_k0UNaj.js";
import "react/jsx-runtime";
import "react-router-dom";
import "@coreui/react";
import "./helpers-D56oASBL.js";
import "axios";
import "react-hot-toast";
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
import "./VideoPlayer-uOeot7yT.js";
import "react-player";
import "framer-motion";
const { Panel: Panel$1 } = Collapse;
const { TextArea } = Input;
const HomeSettings = () => {
  const { state, methods, dispatch } = useContext(PageContext);
  const [slides, setSlides] = useState([]);
  const [saving, setSaving] = useState(false);
  const isObject = (value) => typeof value === "object" && value !== null;
  async function fetchSlides() {
    setSaving(true);
    let slides2 = await methods.loadSlides("home_slider");
    if (slides2) {
      const processedSlides = slides2.map((slide) => {
        let metadata = {};
        try {
          if (slide.metadata) {
            metadata = JSON.parse(slide.metadata);
          }
        } catch (e) {
          console.error("Error parsing metadata:", e);
        }
        return {
          ...slide,
          title: metadata.title || slide.title || "",
          subtitle: metadata.subtitle || slide.subtitle || "",
          description: metadata.description || slide.description || ""
        };
      });
      setSaving(false);
      setSlides(processedSlides);
    }
  }
  useEffect(() => {
    fetchSlides();
  }, []);
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: null,
        image: {},
        url: "",
        title: "",
        subtitle: "",
        description: "",
        view_type: "home_slider"
      }
    ]);
  };
  const handleInputChange = (index, field, value) => {
    const newSlides = [...slides];
    newSlides[index][field] = value;
    setSlides(newSlides);
  };
  const saveSlides = () => {
    methods == null ? void 0 : methods.saveSlides(slides);
  };
  const deleteSlide = (index) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
  };
  const genExtra = (index, slide) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    Confirm,
    {
      onConfirm: () => {
        methods.deleteSlides(slide.id).then(() => {
          deleteSlide(index);
        }).catch((error) => {
          console.error("Error deleting slide:", error);
        });
      },
      description: "Are you sure you want to delete?",
      children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" })
    }
  ) });
  return /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "Homepage Slider" }) }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: slides && (slides == null ? void 0 : slides.map((slide, index) => {
      var _a;
      return /* @__PURE__ */ jsx(Panel$1, { header: `Slide ${index + 1}`, extra: genExtra(index, slide), children: /* @__PURE__ */ jsxs(Form, { layout: "vertical", children: [
        /* @__PURE__ */ jsx(Form.Item, { className: "", label: "Slide Image", children: /* @__PURE__ */ jsx(
          UploadImage,
          {
            defaultValue: (slide == null ? void 0 : slide.id) && !isObject(slide == null ? void 0 : slide.image) && typeof (slide == null ? void 0 : slide.image) === "string" ? (_a = slide == null ? void 0 : slide.image) == null ? void 0 : _a.replace("public", "/storage") : "",
            setSelectedFile: (file) => handleInputChange(index, "image", file == null ? void 0 : file.originFileObj)
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Slide URL", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: slide == null ? void 0 : slide.url,
            onChange: (e) => handleInputChange(index, "url", e.target.value),
            placeholder: "Enter URL for this slide"
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { label: "Title", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: slide == null ? void 0 : slide.title,
            onChange: (e) => handleInputChange(index, "title", e.target.value),
            placeholder: "Enter slide title"
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { label: "Subtitle", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: slide == null ? void 0 : slide.subtitle,
            onChange: (e) => handleInputChange(index, "subtitle", e.target.value),
            placeholder: "Enter slide subtitle"
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { label: "Description", children: /* @__PURE__ */ jsx(
          TextArea,
          {
            value: slide == null ? void 0 : slide.description,
            onChange: (e) => handleInputChange(index, "description", e.target.value),
            placeholder: "Enter slide description",
            rows: 4
          }
        ) })
      ] }) }, index);
    })) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addSlide, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { disabled: saving, type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveSlides, children: saving ? "Saving Slides..." : "Save All Slides" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "Slides Preview" }) }),
    /* @__PURE__ */ jsx(Slider, { slides })
  ] });
};
const { Panel } = Collapse;
const AboutSettings = () => {
  const { state, methods, dispatch } = useContext(PageContext);
  const [slides, setslides] = useState([]);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  let isObject = (value) => {
    let result = typeof value === "object";
    return result;
  };
  async function fetchslides() {
    setSaving(true);
    let slides2 = await methods.loadSlides("about_slider");
    if (slides2) {
      setSaving(false);
      setslides(slides2);
    }
  }
  useEffect(() => {
    fetchslides();
  }, []);
  const addslide = () => {
    setslides([...slides, {
      image: "",
      url: "",
      view_type: "about_slider"
    }]);
  };
  useEffect(() => {
  }, [selectedImage]);
  const handleInputChange = (index, field, value) => {
    const newslides = [...slides];
    newslides[index][field] = value;
    setslides(newslides);
    console.log(field, value);
  };
  const saveSlides = () => {
    methods == null ? void 0 : methods.saveSlides(slides);
  };
  const deleteSlides = (index) => {
    const newslides = slides.filter((_, i) => i !== index);
    setslides(newslides);
  };
  const genExtra = (index, slide) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Confirm, { onConfirm: (e) => {
    methods.deleteSlides(slide.id).then(() => {
      deleteSlides(index);
    }).catch((error) => {
      console.error("Error deleting slide:", error);
    });
  }, description: "Are you sure you want to delete?", children: /* @__PURE__ */ jsx(GrTrash, { className: "h-4 w-4" }) }) });
  return /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white my-10", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "About Us Settings" }) }),
    "            ",
    /* @__PURE__ */ jsx(Collapse, { accordion: true, children: slides && (slides == null ? void 0 : slides.map((slide, index) => {
      var _a;
      return /* @__PURE__ */ jsx(Panel, { header: `About Slide ${index + 1}`, extra: genExtra(index, slide), children: /* @__PURE__ */ jsx(Form, { layout: "vertical", children: /* @__PURE__ */ jsxs(Flex, { gap: 10, children: [
        /* @__PURE__ */ jsx(Form.Item, { className: "", label: "Slide Image", children: /* @__PURE__ */ jsx(
          UploadImage,
          {
            defaultValue: (slide == null ? void 0 : slide.id) && !isObject(slide == null ? void 0 : slide.image) ? (_a = slide == null ? void 0 : slide.image) == null ? void 0 : _a.replace("public", "/storage") : "",
            setSelectedFile: (file) => {
              handleInputChange(index, "image", file == null ? void 0 : file.originFileObj);
            }
          }
        ) }),
        /* @__PURE__ */ jsx(Form.Item, { className: "w-1/2", label: "Slide URL", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: slide == null ? void 0 : slide.url,
            onChange: (e) => handleInputChange(index, "url", e.target.value)
          }
        ) })
      ] }) }) }, index);
    })) }),
    /* @__PURE__ */ jsxs(Row, { gutter: 16, style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { type: "dashed", icon: /* @__PURE__ */ jsx(PlusOutlined, {}), onClick: addslide, children: "Add New" }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(Button, { disabled: saving, type: "primary", icon: /* @__PURE__ */ jsx(SaveOutlined, {}), onClick: saveSlides, children: saving ? "Saving Slides..." : "Save All Slides" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-primary text-left text-2xl font-semibold", children: "Slides Preview" }) }),
    "            ",
    /* @__PURE__ */ jsx(Slider, { slides })
  ] });
};
function HomeSettingApp() {
  return /* @__PURE__ */ jsxs(PageContextProvider, { children: [
    /* @__PURE__ */ jsx(HomeSettings, {}),
    /* @__PURE__ */ jsx(AboutSettings, {})
  ] });
}
export {
  HomeSettingApp as default
};
