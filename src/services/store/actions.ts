import { ActionContext, ActionTree } from 'vuex'
import { Appointment, AppointmentStatus } from '../../models/Appointment'
import { MutationType, Mutations } from './mutations'

import { State } from './state'
import { User } from '../../models/User'
import axios from '../../utils/axios'

export enum ActionTypes {
    LoadUser = 'LOAD_USER',
    LoadAppointments = 'LOAD_APPOINTMENTS',
    ConfirmAppointment = 'CONFIRM_APPOINTMENTS',
    DeclineAppointment = 'DECLINE_APPOINTMENTS',
    IdleAppointment = 'IDLE_APPOINTMENTS',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}
export type Actions = {
    [ActionTypes.LoadUser](context: ActionAugments): void
    [ActionTypes.LoadAppointments](context: ActionAugments): void
    [ActionTypes.ConfirmAppointment](context: ActionAugments, appointment: Appointment): void
    [ActionTypes.DeclineAppointment](context: ActionAugments, appointment: Appointment): void
    [ActionTypes.IdleAppointment](context: ActionAugments, appointment: Appointment): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.LoadUser]({ commit }) {
        await axios.get<{ data: User }>('/api/user').then(response => commit(MutationType.LoadUser, response.data.data))
    },


    async [ActionTypes.LoadAppointments]({ commit }) {
        await axios.get<{ data: Appointment[] }>('/api/appointments').then(response => commit(MutationType.LoadAppointments, response.data.data))
    },
    async [ActionTypes.ConfirmAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.confirmed });
        await axios.post(`/api/appointments/${appointment.id}/confirm`).catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [ActionTypes.DeclineAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.declined });
        await axios.post(`/api/appointments/${appointment.id}/decline`).catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [ActionTypes.IdleAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.idle });
        await axios.post(`/api/appointments/${appointment.id}/reset`).catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
}