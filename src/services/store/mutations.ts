import { Appointment, AppointmentStatus } from '../../models/Appointment'

import { MutationTree } from 'vuex'
import { State } from './state'
import { User } from '../../models/User'
import { reactive } from 'vue'

export enum MutationType {
    LoadUser = `LOAD_USER`,
    LoadAppointments = 'LOAD_APPOINTMENTS',
    SetAppointmentStatus = 'SET_APPOINTMENT_STATUS',
}

export type Mutations = {
    [MutationType.LoadUser](state: State, user: User): void
    [MutationType.LoadAppointments](state: State, appointments: Appointment[]): void
    [MutationType.SetAppointmentStatus](state: State, payload: { appointment: Appointment, status: AppointmentStatus }): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.LoadUser](state, user) {
        state.user = user;
    },

    [MutationType.LoadAppointments](state, appointments) {
        state.appointments = appointments;
    },
    [MutationType.SetAppointmentStatus](state, { appointment, status }) {
        const task = state.appointments.findIndex(element => element.id === appointment.id)
        if (task === -1) return
        state.appointments[task].status = status;
    },
}