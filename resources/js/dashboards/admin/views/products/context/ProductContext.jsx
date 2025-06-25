import React, { useReducer } from "react";

import { rootReducer } from "./reducerFunction";
import { deleteProduct, deleteProductImage, deleteReview, loadCategories, loadProduct, loadProducts, loadReviews, saveProduct, saveReviews, uploadProductImages } from "./methods";


export const ProductContext = React.createContext();

function ProductContextProvider({ children }) {

    const initState = {

        loading: true,
        prodcts: [],
    }

    const [state, dispatch] = useReducer(rootReducer, initState);

    const methods = {

        loadProducts: loadProducts.bind({ state, dispatch }),
        loadProduct: loadProduct.bind({ state, dispatch }),
        loadCategories: loadCategories.bind({ state, dispatch }),
        saveProduct: saveProduct.bind({ state, dispatch }),
        deleteProduct: deleteProduct.bind({ state, dispatch }),
        uploadProductImages: uploadProductImages.bind({ state, dispatch }),
        deleteProductImage: deleteProductImage.bind({ state, dispatch }),
        loadReviews: loadReviews.bind({ state, dispatch }),
        saveReviews: saveReviews.bind({ state, dispatch }),
        deleteReview: deleteReview.bind({ state, dispatch }),
    }

    return <ProductContext.Provider value={{ state, methods, dispatch }}>
        {children}
    </ProductContext.Provider>

}


export default ProductContextProvider;