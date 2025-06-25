// import React, { useReducer } from "react";

// import { rootReducer } from "./reducerFunction";
// import { deleteBrand, loadBrands, loadBrand, saveBrand } from "./methods";


// export const BrandsContext = React.createContext();

// function BrandsContextProvider({ children }) {

//     const initState = {

//         loading: false,
//         Brand_modal: false,
//         Brands: [],
//         isEdit: false,
//         SelectedBrand: {}
//     }

//     const [state, dispatch] = useReducer(rootReducer, initState);

//     const methods = {

//         loadBrands: loadBrands.bind({ state, dispatch }),
//         loadBrand: loadBrand.bind({ state, dispatch }),
//         saveBrand: saveBrand.bind({ state, dispatch }),
//         deleteBrand: deleteBrand.bind({ state, dispatch }),

//     }

//     return <BrandsContext.Provider value={{ state, methods, dispatch }}>
//         {children}
//     </BrandsContext.Provider>

// }


// export default BrandsContextProvider;




import React, { useReducer } from "react";
import { notification } from 'antd';

import { rootReducer } from "./reducerFunction";
import { deleteBrand, loadBrands, loadBrand, saveBrand } from "./methods";

export const BrandsContext = React.createContext();

function BrandsContextProvider({ children, business }) {

  const [api, contextHolder] = notification.useNotification();

  const initState = {
    loading: true,
    Brand_modal: false,
    Brands: [],
    isEdit: false,
    SelectedBrand: {},
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
    loadBrands: loadBrands.bind({ state, dispatch }),
    loadBrand: loadBrand.bind({ state, dispatch }),
    saveBrand: saveBrand.bind({ state, dispatch }),
    deleteBrand: deleteBrand.bind({ state, dispatch }),
    openNotification
  };

  return (
    <BrandsContext.Provider value={{ state, methods, dispatch }}>
      {children}
    </BrandsContext.Provider>
  );
}

export default BrandsContextProvider;
