import React, { useReducer } from "react";
import { rootReducer } from "./reducerFunction";
import {
    addToCart, changeCartQuantity, filterProducts, getProductDetails, loadAttachments, loadAttachmentCategories, filterAttachments, loadBlogs, loadBrandsAndCats, loadBusinessprods,
    loadCart, loadCategories, loadFaqs, loadProduct, loadProducts, loadProductsWithCategories, loadProductsWithTypes,
    loadReviews, loadSlides, loadUserOrders, loadUserReviews, proceedCart, removeFromCart, updateUserProfile, loadSolutions
}
    from "./methods";


export const HomeContext = React.createContext();

function HomeContextProvider({ children, auth }) {


    const initState = {

        loading: false,
        loadingProds: true,
        loadingAttachments: true,
        categories: [],
        products: [],
        attachments: [],
        attachmentCategories: [],
        filterAttachments: { attachments: [], total: 0, current_page: 1 },
        selectedAttachment: null,
        relatedAttachments: [],
        isEdit: false,
        auth: auth,
        solutions: [],
    }

    const [state, dispatch] = useReducer(rootReducer, initState);
    
    // Define attachment methods first
    const getAttachmentDetails = async (slug) => {
        try {
            const response = await fetch(`/api/attachment/details/${slug}`);
            const data = await response.json();
            
            if (data.success) {
                dispatch({ 
                    type: 'SET_SELECTED_ATTACHMENT', 
                    payload: data.attachment 
                });
            }
        } catch (error) {
            console.error('Error fetching attachment details:', error);
        }
    };

    const loadRelatedAttachments = async (slug) => {
        try {
            const response = await fetch(`/api/attachment/related/${slug}`);
            const data = await response.json();
            
            if (data.success) {
                dispatch({ 
                    type: 'SET_RELATED_ATTACHMENTS', 
                    payload: data.relatedAttachments 
                });
            }
        } catch (error) {
            console.error('Error loading related attachments:', error);
        }
    };

    // Now define methods object
    const methods = {
        loadCategories: loadCategories.bind({ state, dispatch }),
        loadProductsWithTypes: loadProductsWithTypes.bind({ state, dispatch }),
        loadSlides: loadSlides.bind({ state, dispatch }),
        loadBlogs: loadBlogs.bind({ state, dispatch }),
        loadReviews: loadReviews.bind({ state, dispatch }),
        loadUserReviews: loadUserReviews.bind({ state, dispatch }),
        loadFaqs: loadFaqs.bind({ state, dispatch }),
        loadBrandsAndCats: loadBrandsAndCats.bind({ state, dispatch }),
        loadProducts: loadProducts.bind({ state, dispatch }),
        loadBusinessprods: loadBusinessprods.bind({ state, dispatch }),
        loadProductsWithCategories: loadProductsWithCategories.bind({ state, dispatch }),
        loadUserOrders: loadUserOrders.bind({ state, dispatch }),
        loadProduct: loadProduct.bind({ state, dispatch }),
        getProductDetails: getProductDetails.bind({ state, dispatch }),
        filterProducts: filterProducts.bind({ state, dispatch }),
        loadCart: loadCart.bind({ state, dispatch }),
        addToCart: addToCart.bind({ state, dispatch }),
        removeFromCart: removeFromCart.bind({ state, dispatch }),
        changeCartQuantity: changeCartQuantity.bind({ state, dispatch }),
        proceedCart: proceedCart.bind({ state, dispatch }),
        updateUserProfile: updateUserProfile.bind({ state, dispatch }),
        loadAttachments: loadAttachments.bind({ state, dispatch }),
        loadAttachmentCategories: loadAttachmentCategories.bind({ state, dispatch }),
        filterAttachments: filterAttachments.bind({ state, dispatch }),
        getAttachmentDetails,
        loadRelatedAttachments,
        loadSolutions: loadSolutions.bind({ state, dispatch }),
    }



    return <HomeContext.Provider value={{ state, methods, dispatch }}>
        {children}
    </HomeContext.Provider>

}


export default HomeContextProvider;