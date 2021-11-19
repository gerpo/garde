import { Appointment, AppointmentStatus } from '../../../../models/Appointment';

import { AppointmentState } from './state';
import { GetterTree } from 'vuex';
import { State } from '../../state';
import { groupByMonth } from '../../../../utils/helpers';

export type AppointmentGetters = {
    getIdleAppointmentsCount(state: AppointmentState): number
    getOrderedAppointments(state: AppointmentState): { [key: string]: Appointment[] } | undefined
}

export const appointmentGetters: GetterTree<AppointmentState, State> & AppointmentGetters = {

    getIdleAppointmentsCount(state) {
        return state.appointments?.filter(appointment => appointment.status === AppointmentStatus.idle).length || 0
    },
    getOrderedAppointments(state) {
        if (!state.appointments) return state.appointments
        return groupByMonth(state.appointments, 'datetime')
    }
}