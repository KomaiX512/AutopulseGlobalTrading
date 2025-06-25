// import React, { useReducer } from "react";

// import { rootReducer } from "./reducerFunction";
// import { deleteCategory, loadCategories, loadCategory, saveCategory } from "./methods";


// export const CategoriesContext = React.createContext();

// function CategoriesContextProvider({ children }) {

//     const initState = {

//         loading: false,
//         category_modal: false,
//         categories: [],
//         isEdit: false,
//         SelectedCategory: {}
//     }

//     const [state, dispatch] = useReducer(rootReducer, initState);

//     const methods = {

//         loadCategories: loadCategories.bind({ state, dispatch }),
//         loadCategory: loadCategory.bind({ state, dispatch }),
//         saveCategory: saveCategory.bind({ state, dispatch }),
//         deleteCategory: deleteCategory.bind({ state, dispatch }),

//     }

//     return <CategoriesContext.Provider value={{ state, methods, dispatch }}>
//         {children}
//     </CategoriesContext.Provider>

// }


// export default CategoriesContextProvider;




import React, { useReducer } from "react";
import { notification } from 'antd';

import { rootReducer } from "./reducerFunction";
import { deleteCategory, loadCategories, loadCategory, saveCategory } from "./methods";

export const CategoriesContext = React.createContext();

function CategoriesContextProvider({ children, business }) {

  const [api, contextHolder] = notification.useNotification();

  const initState = {
    loading: true,
    category_modal: false,
    categories: [],
    isEdit: false,
    SelectedCategory: {},
    business,
    contextHolder,
  };

  const [state, dispatch] = useReducer(rootReducer, initState);

  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      showProgress: true,
      pauseOnHover,
    });
  };

  const methods = {
    loadCategories: loadCategories.bind({ state, dispatch }),
    loadCategory: loadCategory.bind({ state, dispatch }),
    saveCategory: saveCategory.bind({ state, dispatch }),
    deleteCategory: deleteCategory.bind({ state, dispatch }),
    openNotification
  };

  return (
    <CategoriesContext.Provider value={{ state, methods, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContextProvider;
