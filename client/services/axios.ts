import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const normalizeURL = (url: string | undefined): string => {
    if (!url) return '';
    return url.replace(/\/+$/, '');  // Remove trailing slashes
};

const baseURL = normalizeURL(process.env.NEXT_PUBLIC_API_URL)

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
        return requestConfig
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => { return response },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)

export default axiosInstance