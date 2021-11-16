import { Appointment, AppointmentStatus } from '../../models/Appointment';

import { GetterTree } from 'vuex'
import { State } from './state'
import { groupByMonth } from '../../utils/helpers';

export type Getters = {
    getPermissions(state: State): string[] | undefined

    getIdleAppointmentsCount(state: State): number
    getOrderedAppointments(state: State): { [key: string]: Appointment[] } | undefined
}

export const getters: GetterTree<State, State> & Getters = {
    getPermissions(state) {
        return state.user?.permissions;
    },

    getIdleAppointmentsCount(state) {
        return state.appointments?.filter(appointment => appointment.status === AppointmentStatus.idle).length || 0
    },
    getOrderedAppointments(state) {
        if (!state.appointments) return state.appointments
        return groupByMonth(state.appointments, 'datetime')
    }
}