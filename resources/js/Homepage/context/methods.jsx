import { ShowToast, ajaxRequest } from "@/utils/helpers";
import { CiShoppingCart } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";




export async function loadBlogs(id = null) {

    try {


        const method = 'get';

        let api = `/api/get/blogs${id ? `/${id}` : ''}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {

            return response.data;
        }
        else {

            return false;

        }

    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

        // loadProduct.call(this, this?.selectedProduct?.id)
    }

}


export async function loadReviews(id) {

    try {

        const method = 'get';

        let api = `/api/get/reviews/${id}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {

            return response.data;
        }
        else {

            return false;

        }

    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

        // loadProduct.call(this, this?.selectedProduct?.id)
    }

}
export async function loadUserReviews() {

    try {

        const method = 'get';

        let api = `/api/user/get/reviews`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {

            return response.data;
        }
        else {

            return false;

        }

    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

        // loadProduct.call(this, this?.selectedProduct?.id)
    }

}



export async function loadSlides(view) {

    try {

        const method = 'get';

        let api = `/api/get/slides/${view}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {

            return response.data;
        }
        else {

            return false;

        }

    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

    }

}

export async function loadFaqs() {

    try {


        const method = 'get';

        let api = `/api/user/get/faqs`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {

            return response.data;
        }
        else {

            return false;

        }

    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

        // loadProduct.call(this, this?.selectedProduct?.id)
    }

}


export async function filterProducts({ prod_type, selectedCategories = [], selectedBrands = [], selectedPrice = '', page = 1, selectedWeights = [], selectedYears = [] }) {
    try {
        this.dispatch({ payload: { loading: true } });

        const queryParams = { page };

        if (selectedPrice) {
            queryParams.price = selectedPrice;
        }

        if (prod_type) {
            queryParams.prod_type_slug = prod_type;
        }

        if (selectedWeights.length > 0) {
            queryParams.weights = selectedWeights.join(',');
        }
        if (selectedBrands?.length > 0) {
            queryParams.brands = selectedBrands.join(',');
        }
        if (selectedCategories.length > 0) {
            queryParams.categories = selectedCategories.join(',');
        }

        if (selectedYears.length > 0) {
            queryParams.years = selectedYears.join(',');
        }

        const response = await axios.get(`/api/filter/product/type/${prod_type}`, { params: queryParams });

        if (response?.data?.success) {
            this.dispatch({ payload: { filterProducts: response?.data } });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loading: false } });
    }
}


export async function loadCategories() {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'get';
        let api = '/api/get/categories';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { categories: response?.categories } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        this.dispatch({ payload: { category_modal: false, loading: false } });
    }
}




async function makeCall(type) {

    const queryParams = { page: 1, prod_type_slug: type };


    try {

        const response = await axios.get(`/api/filter/product/type/${type}`, { params: queryParams });
        console.log('res', response)


        if (response?.data?.success) {
            // this.dispatch({ payload: { filterProducts: response?.data } });
            return response.data.products
        }


    } catch (error) {

        console.error('Error:', error);

    }


}


export async function loadProductsWithTypes() {
    let home_prods = {};
    let machines = [];

    const request_page_type = location.pathname.split('/')[1];

    const productMap = {
        parts: {
            machines: 'machine-parts',
        },
        '': {
            machines: 'machine',
        },
    };

    try {
        if (productMap[request_page_type]) {
            const { machines: machineType } = productMap[request_page_type];

            machines = await makeCall(machineType);
            if (machines) {
                home_prods = { machines };
                this.dispatch({ payload: { home_prods } });
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loadingProds: false } });
    }
}


export async function loadBrandsAndCats({ slug }) {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'get';
        let api = `/api/get/product-type/cats-brands/${slug}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);

        console.log('response', response)
        if (response.success) {

            this.dispatch({ payload: { brands: response?.data?.brands, categories: response?.data?.categories ?? [] } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        this.dispatch({ payload: { category_modal: false, loading: false } });
    }
}



export async function loadProductsWithCategories() {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'get';
        let api = '/api/get/home/categories';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { viewableCategories: response?.categories } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        this.dispatch({ payload: { category_modal: false, loading: false } });
    }
}

export async function loadAttachments() {
    this.dispatch({ payload: { loadingAttachments: true } });

    try {
        const method = 'get';
        let api = '/api/get/home/attachments';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {
            this.dispatch({ payload: { attachments: response?.attachments } });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loadingAttachments: false } });
    }
}

export async function loadAttachmentCategories() {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'get';
        let api = '/api/get/attachment/categories/fixed';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response) {

            this.dispatch({ payload: { attachmentCategories: response } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        this.dispatch({ payload: { loading: false } });
    }
}

export async function filterAttachments({ selectedPrice = '', sort = 'desc', type = '', selectedCategories = [], page = 1 }) {
    try {
        this.dispatch({ payload: { loading: true } });

        const queryParams = { page };

        if (selectedPrice) {
            queryParams.price = selectedPrice;
        }

        if (sort) {
            queryParams.sort_order = sort;
        }

        if (type) {
            queryParams.type = type;
        }

        if (selectedCategories.length > 0) {
            queryParams.categories = selectedCategories.join(',');
        }

        const response = await axios.get('/api/filter/attachments', { params: queryParams });

        if (response?.data?.success) {
            this.dispatch({ payload: { filterAttachments: response?.data } });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loading: false } });
    }
}


export async function loadBusinessprods() {

    try {


        const response = await axios.get('/api/filter/products?page=1&sort_order=desc&type=business');
        console.log('business', response)
        if (response.data.success) {

            this.dispatch({ payload: { business_products: response?.data?.products } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}

export async function loadProducts() {

    try {

        const method = 'get';
        let api = '/api/get/home/products';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            console.log('prodcuts', response)
            this.dispatch({ payload: { products: response?.prodcuts } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}

export async function loadUserOrders() {

    try {

        const method = 'get';
        let api = '/api/get/home/orders';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {

            this.dispatch({ payload: { orders: response?.orders } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}

export async function loadProduct(id) {

    try {

        const method = 'get';
        let api = `/api/get/products/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}

export async function getRelatedProducs(slug) {

    try {

        const method = 'get';
        let api = `/api/products/related/${slug}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { relatedProducts: response?.data } });


        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
} export async function getProductDetails(slug) {

    try {

        const method = 'get';
        let api = `/api/get/product/${slug}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts[0] } });
            getRelatedProducs.call(this, slug);

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}

export async function loadCart() {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'get';
        let api = '/api/cart/items';
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response) {
            console.log('response', response)
            this.dispatch({ payload: { cart: response.data } })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        this.dispatch({ payload: { loading: true } });
    }
}

export async function addToCart(id) {

    try {

        const method = 'post';
        let api = `/api/cart/add`;
        const config = {};
        let formValues = new FormData();
        formValues.append('product_id', id);
        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success) {
            ShowToast({ message: 'Item added to cart', icon: <FaCheck /> });
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        loadCart.call(this);
        this.dispatch({ payload: { loading: true } });
    }
}

export async function removeFromCart(id) {

    try {

        const method = 'post';
        let api = `/api/cart/remove`;
        const config = {};
        let formValues = new FormData();
        formValues.append('product_id', id);
        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        loadCart.call(this);
    }
}


export async function changeCartQuantity(value, id) {

    try {

        const method = 'post';
        let api = `/api/cart/change/quantity`;
        const config = {};
        let formValues = new FormData();
        formValues.append('id', id);
        formValues.append('quantity', value);
        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        loadCart.call(this);
    }
}
export async function proceedCart(step) {

    try {

        const method = 'post';
        let api = `/api/update/checkout_step`;
        const config = {};
        let formValues = new FormData();
        formValues.append('checkout_step', step);

        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        loadCart.call(this);
    }
}



export async function updateUserProfile(formValues) {

    try {

        const method = 'post';
        let api = `/api/update/user/details`;
        const config = {};

        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts } });

            return true;

        }

        return false;

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        loadCart.call(this);
    }
}

export async function loadSolutions() {
    try {
        const method = 'get';
        let api = '/api/get/home/solutions';
        const response = await ajaxRequest(method, api, {}, {});
        if (response.success) {
            this.dispatch({ payload: { solutions: response.solutions } });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
