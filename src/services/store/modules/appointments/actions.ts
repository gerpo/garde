import { ActionContext, ActionTree } from 'vuex'
import { Appointment, AppointmentStatus, NewAppointment } from '../../../../models/Appointment'
import { AppointmentMutationType, AppointmentMutations } from './mutations'

import { AppointmentState } from './state'
import { State } from '../../state'
import axios from '../../../../utils/axios'

export enum AppointmentActionTypes {
    LoadAppointments = 'LOAD_APPOINTMENTS',
    ConfirmAppointment = 'CONFIRM_APPOINTMENTS',
    DeclineAppointment = 'DECLINE_APPOINTMENTS',
    IdleAppointment = 'IDLE_APPOINTMENTS',
    CreateAppointment = 'CREATE_APPOINTMENT',
    EditAppointment = 'EDIT_APPOINTMENT',
    DeleteAppointment = 'DELETE_APPOINTMENT',
}

type ActionAugments = Omit<ActionContext<AppointmentState, State>, 'commit'> & {
    commit<K extends keyof AppointmentMutations>(
        key: K,
        payload: Parameters<AppointmentMutations[K]>[1]
    ): ReturnType<AppointmentMutations[K]>
}

export type AppointmentActions = {
    [AppointmentActionTypes.LoadAppointments](context: ActionAugments): void
    [AppointmentActionTypes.ConfirmAppointment](context: ActionAugments, appointment: Appointment): void
    [AppointmentActionTypes.DeclineAppointment](context: ActionAugments, appointment: Appointment): void
    [AppointmentActionTypes.IdleAppointment](context: ActionAugments, appointment: Appointment): void
    [AppointmentActionTypes.CreateAppointment](context: ActionAugments, newAppointment: NewAppointment): void
    [AppointmentActionTypes.EditAppointment](context: ActionAugments, appointment: Appointment): void
    [AppointmentActionTypes.DeleteAppointment](context: ActionAugments, appointment: Appointment): void
}

export const appointmentActions: ActionTree<AppointmentState, State> & AppointmentActions = {
    async[AppointmentActionTypes.LoadAppointments]({ commit }) {
        await axios.get<{ data: Appointment[] }>('/api/appointments')
            .then(response => commit(AppointmentMutationType.LoadAppointments, response.data.data))
    },
    async[AppointmentActionTypes.ConfirmAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.confirmed });
        await axios.post(`/api/appointments/${appointment.id}/confirm`)
            .catch(() => commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [AppointmentActionTypes.DeclineAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.declined });
        await axios.post(`/api/appointments/${appointment.id}/decline`)
            .catch(() => commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [AppointmentActionTypes.IdleAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.idle });
        await axios.post(`/api/appointments/${appointment.id}/reset`)
            .catch(() => commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [AppointmentActionTypes.CreateAppointment]({ commit }, newAppointment: NewAppointment) {
        await axios.post<{ data: Appointment }>(`/api/appointments`, newAppointment)
            .then(response => commit(AppointmentMutationType.AddAppointment, response.data.data));
    },
    async [AppointmentActionTypes.EditAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.idle });
        await axios.post(`/api/appointments/${appointment.id}/reset`)
            .catch(() => commit(AppointmentMutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [AppointmentActionTypes.DeleteAppointment]({ commit }, appointment: Appointment) {
        commit(AppointmentMutationType.RemoveAppointment, appointment);
        await axios.delete<{ data: Appointment }>(`/api/appointments/${appointment.id}`)
            .catch(() => commit(AppointmentMutationType.AddAppointment, appointment));
    },
}
