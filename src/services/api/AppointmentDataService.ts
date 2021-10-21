
import axios from '../../utils/axios';
import { AxiosResponse } from 'axios';
import { Appointment } from '../../models/Appointment';
import { DataService } from './DataService';

export class AppointmentDataService extends DataService<Appointment> {
    PATH = '/api/appointments';

    confirm({ id }: { id: number | string }) {
        return axios.post<Appointment>(`${this.PATH}/${id}/confirm`)
    }

    decline({ id }: { id: number | string }) {
        return axios.post<Appointment>(`${this.PATH}/${id}/decline`)
    }

    reset({ id }: { id: number | string }) {
        return axios.post<Appointment>(`${this.PATH}/${id}/reset`)
    }
}
