import React, { useReducer } from "react";

import { rootReducer } from "./reducerFunction";
import { deleteBlog, deleteFaqs, deleteReview, deleteSlides, loadBlogs, loadFaqs, loadHomeSettings, loadReviews, loadSlides, saveAboutText, saveBlogs, saveContactText, saveFaqs, saveReviews, saveSlides } from "./methods";

export const PageContext = React.createContext();

function PageContextProvider({ children }) {


  const initState = {
    loading: true,
  };

  const [state, dispatch] = useReducer(rootReducer, initState);

  const methods = {

    loadSlides: loadSlides.bind({ state, dispatch }),
    loadBlogs: loadBlogs.bind({ state, dispatch }),
    saveSlides: saveSlides.bind({ state, dispatch }),
    deleteSlides: deleteSlides.bind({ state, dispatch }),
    saveContactText: saveContactText.bind({ state, dispatch }),
    saveAboutText: saveAboutText.bind({ state, dispatch }),
    loadHomeSettings: loadHomeSettings.bind({ state, dispatch }),
    loadReviews: loadReviews.bind({ state, dispatch }),
    saveReviews: saveReviews.bind({ state, dispatch }),
    deleteReview: deleteReview.bind({ state, dispatch }),
    loadFaqs: loadFaqs.bind({ state, dispatch }),
    saveFaqs: saveFaqs.bind({ state, dispatch }),
    saveBlogs: saveBlogs.bind({ state, dispatch }),
    deleteFaqs: deleteFaqs.bind({ state, dispatch }),
    deleteBlog: deleteBlog.bind({ state, dispatch }),


  };

  return (
    <PageContext.Provider value={{ state, methods, dispatch }}>
      {children}
    </PageContext.Provider>
  );
}

export default PageContextProvider;
