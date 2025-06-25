import { ShowToast, ajaxRequest } from "@/utils/helpers";
import { SmileOutlined } from '@ant-design/icons';
import { FaSmile } from "react-icons/fa";


export async function loadProducts({ search, price, categories, brands, sort, type, page = 1, perPage = 15 }) {

    this.dispatch({ payload: { loading: true } });

    try {

        const queryParams = { page };

        if (search) {
            queryParams.search_term = search;
        }
        if (price) {
            queryParams.price = price;
        }
        if (categories) {
            queryParams.categories = categories;
        }
        if (brands) {
            queryParams.brands = brands;
        }
        if (sort) {
            queryParams.sort_order = sort;
        }
        if (page) {
            queryParams.page = page;
        }
   

        const response = await axios.get('/api/filter/products', { params: queryParams });
        console.log('response', response)

        if (response.data.success) {

            this.dispatch({ payload: { products: response?.data.products, total: response?.data.total, currentPage: response?.data.current_page, lastPage: response?.data.last_page } });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loading: false } });
    }
}

export async function loadProduct(id) {

    try {

        const method = 'get';
        let api = `/api/get/products/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { selectedProduct: response?.prodcuts[0] } });
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        this.dispatch({ payload: { loading: false } });


    }
}

export async function loadCategories() {

    try {

        const method = 'get';
        let api = '/api/get/categories';
        const config = {};
        const categories_res = await ajaxRequest(method, api, {}, config);
        const brands_res = await ajaxRequest(method, '/api/get/brands', {}, config);


        if (categories_res.success && brands_res.success) {

            let response = {
                categories: categories_res?.categories,
                brands: brands_res?.brands,
            };

            return response
        }

    } catch (error) {

        console.error('Error:', error);
        return [];

    }

    finally {

    }
}

export async function saveProduct({ id = null, formValues, navigate }) {

    try {

        if (id) {
            formValues.append('id', id)
        }

        const method = 'post';
        let api = id ? '/api/update/product' : '/api/save/product';
        const config = {};
        const response = await ajaxRequest(method, api, formValues, config);


        if (response.success) {

            ShowToast({ message: `Product ${id ? 'Updated' : 'Created'}`, icon: <SmileOutlined color="green" /> })

            return true
        }

        return false


    } catch (error) {

        ShowToast({ message: 'Sorry, There was an error creating category' })

        return false
    }

    finally {

        this.dispatch({ payload: { loading: false } })

    }
}

export async function deleteProduct(id) {

    try {

        const method = 'delete';
        let api = `/api/delete/product/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {
        }
        else {

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        loadProducts.call(this);
    }

}

export async function uploadProductImages(files, product) {

    this.dispatch({ payload: { loading: true } });

    try {
        const formValues = new FormData();

        formValues.append('id', product.id);

        for (let i = 0; i < files.length; i++) {

            formValues.append('files[]', files[i].file);

        }

        const response = await axios.post('/api/save/product/images', formValues, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success) {

            ShowToast({ message: `Product images uploaded`, icon: <SmileOutlined color="green" /> })

            return true;

        } else {

            return false;
        }

    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

        loadProduct.call(this, product.id);
        this.dispatch({ payload: { loading: false } });

    }
}

export async function deleteProductImage(id) {

    try {

        const method = 'delete';
        let api = `/api/product/images/delete/${id}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {
            return true;
        }
        else {
            return false;

        }

    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally {

        loadProduct.call(this, this?.selectedProduct?.id)
    }

}

export async function loadReviews() {

    try {

        let selectedProductId = this?.state?.selectedProduct?.id

        const method = 'get';

        let api = `/api/get/reviews/${selectedProductId}`;

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

export async function saveReviews(formValues) {


    try {


        let selectedProductId = this?.state?.selectedProduct?.id;

        if (!selectedProductId) {
            return ShowToast({ message: 'Kindly save the product first, before saving reviews' });
        }

        const method = 'post';
        const saveApi = `/api/save/review/${selectedProductId}`;
        const config = {};

        const promises = formValues?.map(review => {

            if (review.id) {

                this.dispatch({ payload: { loading: true } });

                return ajaxRequest(method, `/api/update/review/${review?.id}`, review, config);

            }

            this.dispatch({ payload: { loading: true } });

            return ajaxRequest(method, saveApi, review, config);
        });

        const responses = await Promise.all(promises);

        const allSuccessful = responses.every(response => response.success);

        if (allSuccessful) {

            return ShowToast({ message: 'All reviews saved successfully', icon: <FaSmile /> })

        } else {

            return false;
        }

    } catch (error) {

        console.error('Error:', error);
        return false;

    } finally {

        this.dispatch({ payload: { loading: true } });

    }
}

export async function deleteReview(id) {

    try {

        const method = 'delete';
        let api = `/api/delete/review/${id}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);
        return ShowToast({ message: 'Review Deleted Successfully' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally {

    }

}

export async function saveContactText({ formValues, setLoadingState }) {

    try {

        const method = 'delete';
        let api = `/api/save/contact/text`;

        const config = {};

        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success)
            return ShowToast({ message: 'Review Deleted Successfully' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally {

        setLoadingState(false)

    }

}
