import { ShowToast, ajaxRequest } from "@/utils/helpers";
import { SmileOutlined } from '@ant-design/icons';




export async function loadCategories(searchTerm = '', sortOrder = '') {

    try {
        const method = 'get';
        let api = `/api/get/categories?search_term=${searchTerm}&sort_order=${sortOrder}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {
            this.dispatch({ payload: { categories: response?.categories, selectedCategory: {} } });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loading: false } });
    }
}



export async function loadCategory(id) {

    try {

        const method = 'get';
        let api = `/api/get/category/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            this.dispatch({ payload: { selectedCategory: response?.data } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        this.dispatch({ payload: { loading: false } });

    }
}



export async function saveCategory(formValues, id = null) {

    this.dispatch({ payload: { loading: true } });

    try {

        if (id) {
            formValues.append('id', id);
        }

        const method = 'post';
        let api = id ? `/api/update/category` : '/api/save/category';
        const config = {};
        const response = await ajaxRequest(method, api, formValues, config);

        if (response.success) {
            ShowToast({ message: id ? 'Category updated successfully' : 'New category added', icon: <SmileOutlined color="green" /> })
            return true;
        } else {
            // Show validation errors if available
            if (response.errors) {
                const errorMessages = Object.values(response.errors).flat().join(', ');
                ShowToast({ message: 'Validation errors: ' + errorMessages });
            } else {
                ShowToast({ message: response.message || 'Failed to save category' });
        }
            return false;
        }

    } catch (error) {

        console.error('Error:', error);

        // Show specific error message if available
        if (error.response && error.response.data) {
            if (error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
                ShowToast({ message: 'Validation errors: ' + errorMessages });
            } else if (error.response.data.message) {
                ShowToast({ message: error.response.data.message });
            } else {
                ShowToast({ message: 'Sorry, There was an error creating category' });
            }
        } else {
            ShowToast({ message: 'Sorry, There was an error creating category' });
        }

        return false;

    }

    finally {

        this.dispatch({ payload: { loading: false } });

    }

}


export async function deleteCategory(id) {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'delete';
        let api = `/api/delete/category/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);

        if (response.success) {
            // console.log('response', response)
        }
        else {

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {
        this.dispatch({ payload: { category_modal: false, loading: false } });
        loadCategories.call(this);
    }

}