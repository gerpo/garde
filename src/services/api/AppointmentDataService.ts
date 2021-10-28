import { Appointment } from '../../models/Appointment';
import { DataService } from './DataService';
import axios from '../../utils/axios';

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
