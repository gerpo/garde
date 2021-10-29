import { Appointment, AppointmentStatus } from '../../models/Appointment';

import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
    getPermissions(state: State): string[] | undefined
    getIdleAppointmentsCount(state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
    getPermissions(state) {
        return state.user?.permissions;
    },

    getIdleAppointmentsCount(state) {
        return state.appointments.filter(appointment => appointment.status === AppointmentStatus.idle).length
    },
}