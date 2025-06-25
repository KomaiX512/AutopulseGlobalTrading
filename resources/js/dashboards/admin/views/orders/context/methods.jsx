import { ajaxRequest } from "@/utils/helpers";


export async function loadOrders({ setOrders, id = null, selectedStatus, search, dates, price, sortOrder, page }) {

    try {

        const queryParams = { page };

        if (search) {
            queryParams.search = search;
        }
        if (selectedStatus) {

            queryParams.status = selectedStatus;
        }
        if (dates && dates.length === 2) {

            queryParams.from_date = dates[0].toISOString();
            queryParams.to_date = dates[1].toISOString();

        } else if (dates && dates.length === 1) {

            queryParams.from_date = dates[0].toISOString();
        }
        if (price) {

            queryParams.price = price;

        }

        if (sortOrder) {

            queryParams.sort_order = sortOrder;

        }

        const method = 'get';

        let api = id ? `/api/get/all/orders/${id}` : `/api/get/all/orders`;

        const response = await ajaxRequest(method, api, {}, { params: queryParams });

        setOrders(response);

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}
export async function updateOrderStatus({ order_id, status }) {

    try {
        const method = 'post';
        let api = '/api/update/order/status';
        const config = {};


        let formValues = new FormData();

        formValues.append('status', status)
        formValues.append('order_id', order_id)
        const response = await ajaxRequest(method, api, formValues, config);
        return response

    } catch (error) {

        console.error('Error:', error);
    }

    finally {

    }
}




