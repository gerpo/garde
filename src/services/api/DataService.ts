import { AxiosResponse } from 'axios';
import axios from '../../utils/axios'

type ServiceData<T> = { state: 'success', data: T } | { state: 'failure', message: string } | { state: 'loading' }

export abstract class DataService<T>  {
    abstract PATH: string;

    getAll() {
        return axios.get<T[]>(`${this.PATH}`);
    }

    get({ id }: { id: number | string }) {
        return axios.get<T>(`${this.PATH}/${id}`);
    }

    create({ data }: { data: object }) {
        return axios.post<T>(`${this.PATH}`, data);
    }

    update({ id, data }: { id: number | string, data: object }) {
        return axios.put<T>(`${this.PATH}/${id}`, data);
    }

    delete({ id }: { id: number | string }) {
        return axios.delete<T>(`${this.PATH}/${id}`);
    }
}