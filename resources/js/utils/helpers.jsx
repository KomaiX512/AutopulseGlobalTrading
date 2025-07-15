import axios from "axios";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";

// Helper to get CSRF token with better error handling
const getCsrfToken = () => {
  try {
    // First try: meta tag
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
      return decodeURIComponent(metaToken);
    }

    // Second try: XSRF-TOKEN cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const xsrfCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));
    if (xsrfCookie) {
      return decodeURIComponent(xsrfCookie.split('=')[1]);
    }

    // Third try: Laravel session cookie
    const laravelCookie = cookies.find(cookie => cookie.startsWith('laravel_session='));
    if (laravelCookie) {
      return decodeURIComponent(laravelCookie.split('=')[1]);
    }

    console.warn('CSRF token not found in any expected location');
    return null;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return null;
  }
};

// Helper to refresh session and get new CSRF token
const refreshSession = async () => {
  try {
    // First try: Sanctum CSRF endpoint
    let response = await fetch('/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      // Second try: Custom refresh endpoint
      response = await fetch('/api/refresh-csrf', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
        }
      });
    }

    if (response.ok) {
      // Wait a moment for cookies to be set
      await new Promise(resolve => setTimeout(resolve, 100));
      return getCsrfToken();
    }
  } catch (error) {
    console.error('Failed to refresh session:', error);
  }
  return null;
};

export async function ajaxRequest(method, api, formValues, config) {
    try {
        // Get CSRF token
        let csrfToken = getCsrfToken();
        
        // Prepare headers
        const headers = {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...config?.headers
        };

        // Remove Content-Type header if we're sending FormData
        if (formValues instanceof FormData) {
            delete headers['Content-Type'];
        }

        // Prepare axios config
        const axiosConfig = {
            ...config,
            headers,
            withCredentials: true
        };

        return await new Promise(function (resolve, reject) {
            switch (method) {
                case 'post': {
                    return axios.post(api, formValues, axiosConfig)
                        .then((response) => resolve(response.data))
                        .catch(async (error) => {
                            // Handle 419 CSRF token mismatch
                            if (error.response?.status === 419) {
                                try {
                                    // Try to refresh session and retry once
                                    const newToken = await refreshSession();
                                    if (newToken) {
                                        headers['X-CSRF-TOKEN'] = newToken;
                                        const retryConfig = { ...axiosConfig, headers };
                                        const retryResponse = await axios.post(api, formValues, retryConfig);
                                        resolve(retryResponse.data);
                                        return;
                                    }
                                } catch (retryError) {
                                    console.error('CSRF retry failed:', retryError);
                                }
                            }
                            reject(error);
                        });
                }
                case 'get': {
                    return axios.get(api, axiosConfig)
                        .then((response) => resolve(response.data))
                        .catch(async (error) => {
                            // Handle 419 CSRF token mismatch
                            if (error.response?.status === 419) {
                                try {
                                    // Try to refresh session and retry once
                                    const newToken = await refreshSession();
                                    if (newToken) {
                                        headers['X-CSRF-TOKEN'] = newToken;
                                        const retryConfig = { ...axiosConfig, headers };
                                        const retryResponse = await axios.get(api, retryConfig);
                                        resolve(retryResponse.data);
                                        return;
                                    }
                                } catch (retryError) {
                                    console.error('CSRF retry failed:', retryError);
                                }
                            }
                            reject(error);
                        });
                }
                case 'put': {
                    return axios.put(api, formValues, axiosConfig)
                        .then((response) => resolve(response.data))
                        .catch(async (error) => {
                            // Handle 419 CSRF token mismatch
                            if (error.response?.status === 419) {
                                try {
                                    // Try to refresh session and retry once
                                    const newToken = await refreshSession();
                                    if (newToken) {
                                        headers['X-CSRF-TOKEN'] = newToken;
                                        const retryConfig = { ...axiosConfig, headers };
                                        const retryResponse = await axios.put(api, formValues, retryConfig);
                                        resolve(retryResponse.data);
                                        return;
                                    }
                                } catch (retryError) {
                                    console.error('CSRF retry failed:', retryError);
                                }
                            }
                            reject(error);
                        });
                }
                case 'delete': {
                    return axios.delete(api, axiosConfig)
                        .then((response) => resolve(response.data))
                        .catch(async (error) => {
                            // Handle 419 CSRF token mismatch
                            if (error.response?.status === 419) {
                                try {
                                    // Try to refresh session and retry once
                                    const newToken = await refreshSession();
                                    if (newToken) {
                                        headers['X-CSRF-TOKEN'] = newToken;
                                        const retryConfig = { ...axiosConfig, headers };
                                        const retryResponse = await axios.delete(api, retryConfig);
                                        resolve(retryResponse.data);
                                        return;
                                    }
                                } catch (retryError) {
                                    console.error('CSRF retry failed:', retryError);
                                }
                            }
                            reject(error);
                        });
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