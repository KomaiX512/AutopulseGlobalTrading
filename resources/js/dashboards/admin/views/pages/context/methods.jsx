import { ShowToast, ajaxRequest } from "@/utils/helpers";
import { FaSmile } from "react-icons/fa";


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
export async function loadHomeSettings() {

    try {

        const method = 'get';

        let api = `/api/get/all/settings`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);

        console.log('resp', response)
        if (response.success) {

            this.dispatch({ payload: { home_settings: response.data } });
        }


    } catch (error) {

        console.error('Error:', error);

        return false;
    }

    finally {

    }

}

export async function saveSlides(formValues) {


    try {

        const method = 'post';
        const saveApi = `/api/save/slide`;
        const config = {};

        this.dispatch({ payload: { loading: true } });


        const promises = formValues?.map(slide => {

            let formValues = new FormData();

            for (const i in slide) {

                formValues.append(i, slide[i]);

            }

            if (slide?.id) {

                return ajaxRequest(method, `/api/update/slide/${slide?.id}`, formValues, config);

            }

            return ajaxRequest(method, saveApi, formValues, config);

        });

        const responses = await Promise.all(promises);
        const allSuccessful = responses.every(response => response?.success);

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



export async function deleteSlides(id) {

    try {

        const method = 'delete';
        let api = `/api/delete/slide/${id}`;

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
export async function deleteBlog(id) {

    try {

        const method = 'delete';
        let api = `/api/delete/blog/${id}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);
        return ShowToast({ message: 'Blog Deleted Successfully' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally {

    }

}




export async function saveAboutText({ formValues, setLoadingState }) {

    try {

        const method = 'post';
        let api = `/api/save/about/content`;

        const config = {};

        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success)
            return ShowToast({ message: 'About us content updated' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally { }


}


export async function saveContactText({ formValues, setLoadingState }) {

    try {

        const method = 'post';
        let api = `/api/save/contact/content`;

        const config = {};

        const response = await ajaxRequest(method, api, formValues, config);
        if (response.success)
            return ShowToast({ message: 'Contact us content updated' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally { }


}

export async function loadReviews() {

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

export async function saveReviews(formValues) {


    try {

        const method = 'post';
        const saveApi = `/api/user/save/review`;
        const config = {};

        const promises = formValues?.map(review => {

            if (review.id) {

                this.dispatch({ payload: { loading: true } });

                return ajaxRequest(method, `/api/user/update/review`, review, config);

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
        let api = `/api/user/delete/review/${id}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);
        return ShowToast({ message: 'Review Deleted Successfully' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally {

        // loadProduct.call(this, this?.selectedProduct?.id)
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
export async function loadBlogs() {

    try {


        const method = 'get';

        let api = `/api/get/blogs`;

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

export async function saveFaqs(formValues) {


    try {

        const method = 'post';
        const saveApi = `/api/user/save/faqs`;
        const config = {};

        const promises = formValues?.map(review => {

            if (review.id) {

                this.dispatch({ payload: { loading: true } });

                return ajaxRequest(method, `/api/user/update/faqs`, review, config);

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

export async function saveBlogs(formValues) {


    try {

        const method = 'post';
        const saveApi = `/api/save/blogs`;
        const config = {};

        const promises = formValues?.map(blog => {

            // if (blog.id) {

            //     this.dispatch({ payload: { loading: true } });

            //     return ajaxRequest(method, `/api/update/blogs`, blog, config);

            // }

            // this.dispatch({ payload: { loading: true } });

            // return ajaxRequest(method, saveApi, blog, config);

            let formValues = new FormData();

            for (const i in blog) {

                formValues.append(i, blog[i]);

            }

            if (blog?.id) {

                return ajaxRequest(method, `/api/update/blog`, formValues, config);

            }

            return ajaxRequest(method, saveApi, formValues, config);
        });

        const responses = await Promise.all(promises);

        const allSuccessful = responses.every(response => response.success);

        if (allSuccessful) {

            return ShowToast({ message: 'All blogs saved successfully', icon: <FaSmile /> })

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

export async function deleteFaqs(id) {

    try {

        const method = 'delete';
        let api = `/api/user/delete/faqs/${id}`;

        const config = {};

        const response = await ajaxRequest(method, api, {}, config);
        return ShowToast({ message: 'Review Deleted Successfully' });


    } catch (error) {

        console.error('Error:', error);
        return false;
    }

    finally {

        // loadProduct.call(this, this?.selectedProduct?.id)
    }

}