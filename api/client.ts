import Axios, { AxiosPromise } from 'axios';

export function executeGetRequest<R>(url: string): AxiosPromise<R> {
    return Axios.get(url);
}
