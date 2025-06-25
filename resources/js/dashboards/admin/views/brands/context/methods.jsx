import { ShowToast, ajaxRequest } from "@/utils/helpers";
import { SmileOutlined } from '@ant-design/icons';




export async function loadBrands(searchTerm = '', sortOrder = '') {

    try {
        const method = 'get';
        let api = `/api/get/brands?search_term=${searchTerm}&sort_order=${sortOrder}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {
            this.dispatch({ payload: { brands: response?.brands, selectedBrand: {} } });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.dispatch({ payload: { loading: false } });
    }
}



export async function loadBrand(id) {

    try {

        const method = 'get';
        let api = `/api/get/brands/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        if (response.success) {

            console.log('response', response)
            this.dispatch({ payload: { selectedBrand: response?.data } });

        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        this.dispatch({ payload: { loading: false } });

    }
}



export async function saveBrand(formValues, id = null) {

    this.dispatch({ payload: { loading: true } });

    try {

        if (id) {

            formValues.append('id', id);

        }

        const method = 'post';
        let api = id ? `/api/update/brand` : '/api/save/brand';
        const config = {};
        const response = await ajaxRequest(method, api, formValues, config);

        if (response.success) {

            ShowToast({ message: id ? 'Brand updated successfully' : 'New brand added', icon: <SmileOutlined color="green" /> })

            return true
        }

        return false

    } catch (error) {

        console.error('Error:', error);

        ShowToast({ message: 'Sorry, There was an error creating Brand' })

        return false

    }

    finally {

        this.dispatch({ payload: { loading: false } });

    }

}


export async function deleteBrand(id) {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'delete';
        let api = `/api/delete/brand/${id}`;
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
        this.dispatch({ payload: { Brand_modal: false, loading: false } });
        loadBrands.call(this);
    }

}