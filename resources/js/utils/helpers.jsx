import axios from "axios";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";

export async function ajaxRequest(method, api, formValues, config) {
    try {
        return await new Promise(function (resolve, reject) {
            switch (method) {
                case 'post': {
                    return axios.post(api, formValues, config)
                        .then((response) => resolve(response.data))
                        .catch(error => reject(error));
                }
                case 'get': {
                    return axios.get(api, config)
                        .then((response) => resolve(response.data))
                        .catch(error => reject(error));
                }
                case 'put': {
                    return axios.put(api, formValues, config)
                        .then((response) => resolve(response.data))
                        .catch(error => reject(error));
                }
                case 'delete': {
                    return axios.delete(api, config)
                        .then((response) => resolve(response.data))
                        .catch(error => reject(error));
                }
                default: {
                    reject(new Error('Invalid HTTP method'));
                }
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // This will format the time in 12-hour AM/PM format
    };
    return date.toLocaleDateString('en-US', dateOptions) + ' at ' + date.toLocaleTimeString('en-US', timeOptions);
}


export function ShowToast({ message, icon }) {

    let config = {
        icon: icon,
        style: {
            padding: '16px',
            color: '#713200',
            borderRadius: '0px',
            border: '1px solid'

        },
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },

        duration: 4000,
        iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
        },
    }
    return toast(message, config)

}