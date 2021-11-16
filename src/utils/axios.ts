import axios, { AxiosError } from 'axios';

import { MutationType } from '../services/store/mutations';
import { RouteNames } from '../services/router';
import router from '../services/router'
import { store } from '../services/store/store';
import { useToast } from 'vue-toastification';

const toast = useToast();
//const store = useStore();

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.defaults.baseURL = 'http://localhost:8000';

axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if (!error.response) {
            toast.error('There was a network error. Please try again later or conntact an admin.')
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(response => response, async error => {
    const { status } = error.response!;

    if (status === 419) {
        // Refresh our session token
        await axios.get('/sanctum/csrf-cookie')

        // Return a new request using the original request's configuration
        return axios(error.response.config)
    }

    return Promise.reject(error)
})

axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        const { status } = error.response!;
        if (status === 401) {
            store.commit(MutationType.SetLoginStatus, false)
            router.push({ name: RouteNames.Login })
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if (response && response.data)
            handleDates(response.data);
        return response;
    },
    error => Promise.reject(error));
const isoDateFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
}
export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) body[key] = new Date(value);
        else if (typeof value === "object") handleDates(value);
    }
}

export default axios