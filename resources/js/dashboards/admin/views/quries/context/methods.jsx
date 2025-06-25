import { ShowToast, ajaxRequest } from "@/utils/helpers";
import { SmileOutlined } from '@ant-design/icons';
import { message } from "antd";
import { MdCheck } from "react-icons/md";




export async function loadQuries({ search = '', sort = '', status, page }) {

    try {

        const queryParams = { page };

        if (search) {
            queryParams.search_term = search;
        }

        if (sort) {
            queryParams.sort_order = sort;
        }
        if (page) {
            queryParams.page = page;
        }
        if (status) {
            queryParams.status = status;
        }

        const response = await axios.get('/api/queries', { params: queryParams });

        if (response.data.success) {

            this.dispatch({ payload: { queries: response?.data.queries, total: response?.data.total, currentPage: response?.data.current_page, lastPage: response?.data.last_page } });
        }
    } catch (error) {

        console.error('Error:', error);

    } finally {

        this.dispatch({ payload: { loading: false } });

    }
}



export async function deleteQuery(id) {

    try {

        const method = 'delete';
        let api = `/api/queries/${id}`;
        const config = {};
        const response = await ajaxRequest(method, api, {}, config);
        console.log('respnonse', response)
        if (response?.message) {

            ShowToast({ message: response.message, icon: <MdCheck size={20} /> })
        }

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        loadQuries.call(this, { search: '', sort: '', status: 0, page: 1 });

    }
}


export async function updateQuery({ status, id = null }) {

    this.dispatch({ payload: { loading: true } });

    try {

        const formValues = new FormData();

        if (id) {

            formValues.append('status', status);
        }

        const method = 'post';
        let api = `/api/queries/${id}/status`;
        const config = {};

        const response = await ajaxRequest(method, api, formValues, config);


    } catch (error) {

        console.error('Error:', error);

    }

    finally {

        loadQuries.call(this, { search: '', sort: '', status: 0, page: 1 });

    }

}



export async function sendReply(id, values) {

    this.dispatch({ payload: { loading: true } });

    try {

        const method = 'post';
        let api = `/api/queries/${id}/reply`;
        const config = {};
        const response = await ajaxRequest(method, api, values, config);

        ShowToast({ message: 'Reply Sent Successfully', icon: <MdCheck size={20} /> })
        

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

        this.dispatch({ payload: { category_modal: false, loading: false } });
        loadCategories.call(this);
        
    }

}