import { ActionContext, ActionTree } from 'vuex'
import { Appointment, AppointmentStatus, NewAppointment } from '../../models/Appointment'
import { MutationType, Mutations } from './mutations'
import { useRoute, useRouter } from 'vue-router';

import { AxiosError } from 'axios';
import { State } from './state'
import { User } from '../../models/User'
import axios from '../../utils/axios'
import { useToast } from 'vue-toastification';

//import {router} from '../../main';


export enum ActionTypes {
    Login = 'LOGIN',
    Logout = 'LOGOUT',
    RegisterUser = 'REGISTER_USER',
    LoadUser = 'LOAD_USER',

    LoadAppointments = 'LOAD_APPOINTMENTS',
    ConfirmAppointment = 'CONFIRM_APPOINTMENTS',
    DeclineAppointment = 'DECLINE_APPOINTMENTS',
    IdleAppointment = 'IDLE_APPOINTMENTS',
    CreateAppointment = 'CREATE_APPOINTMENT',
    EditAppointment = 'EDIT_APPOINTMENT',
    DeleteAppointment = 'DELETE_APPOINTMENT',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}
export type Actions = {
    [ActionTypes.Login](context: ActionAugments, credentials: { email: string, password: string, remember: boolean }): void
    [ActionTypes.Logout](context: ActionAugments): void
    [ActionTypes.RegisterUser](context: ActionAugments, data: { email: string, password: string, 'password_confirmation': string, code: string }): void
    [ActionTypes.LoadUser](context: ActionAugments): void
    
    [ActionTypes.LoadAppointments](context: ActionAugments): void
    [ActionTypes.ConfirmAppointment](context: ActionAugments, appointment: Appointment): void
    [ActionTypes.DeclineAppointment](context: ActionAugments, appointment: Appointment): void
    [ActionTypes.IdleAppointment](context: ActionAugments, appointment: Appointment): void
    [ActionTypes.CreateAppointment](context: ActionAugments, newAppointment: NewAppointment): void
    [ActionTypes.EditAppointment](context: ActionAugments, appointment: Appointment): void
    [ActionTypes.DeleteAppointment](context: ActionAugments, appointment: Appointment): void
}

//const router = useRouter();
//const route = useRoute();
const toast = useToast();

export const actions: ActionTree<State, State> & Actions = {
    // User
    async [ActionTypes.Login]({ commit, dispatch }, credentials: { email: string, password: string, remember: boolean }) {
        axios.get('/sanctum/csrf-cookie').then(_ =>
            axios.post('/login', credentials)
                .then(response => {
                    commit(MutationType.SetLoginStatus, true)
                    commit(MutationType.SetLoginValidationErrors, null)
                    dispatch(ActionTypes.LoadUser)
                })
                .catch(error => {
                    let msg = 'Sorry, there was an error.'
                    if (error.response) {
                        const { status } = error.response
                        switch (true) {
                            case (status === 422):
                                msg = 'Invalid Login Credentials.'
                                commit(MutationType.SetLoginValidationErrors, error.response.data.errors)
                                break;
                            case (status > 400 && status < 500):
                                msg = 'There is an error on your end.'
                                break;
                            case (status > 500):
                                msg = 'There is a server error. Please try again later.'
                                break;
                        }
                    }
                    toast.error(msg)
                }));
    },

    async [ActionTypes.Logout]({ commit }) {
        await axios.post<{ data: User }>('/api/logout')
            .then(() => {
                commit(MutationType.SetLoginStatus, false)
                commit(MutationType.LoadUser, undefined)
            })
    },

    async [ActionTypes.RegisterUser]({ commit, dispatch }, data: { email: string, password: string, 'password_confirmation': string, code: string }) {
        await axios.post('/register', data).then(response => {
            commit(MutationType.SetLoginStatus, true)
            commit(MutationType.SetLoginValidationErrors, null)
            dispatch(ActionTypes.LoadUser)
        })
            .catch(error => {
                let msg = 'Sorry, there was an error.'
                if (error.response) {
                    const { status } = error.response
                    switch (true) {
                        case (status === 422):
                            msg = 'Invalid Login Credentials.'
                            commit(MutationType.SetLoginValidationErrors, error.response.data.errors)
                            break;
                        case (status > 400 && status < 500):
                            msg = 'There is an error on your end.'
                            break;
                        case (status > 500):
                            msg = 'There is a server error. Please try again later.'
                            break;
                    }
                }
            },
            )
    },

    async[ActionTypes.LoadUser]({ commit }) {
        await axios.get<{ data: User }>('/api/user').then(response => commit(MutationType.LoadUser, response.data.data))
    },


    // Appointments
    async[ActionTypes.LoadAppointments]({ commit }) {
        await axios.get<{ data: Appointment[] }>('/api/appointments')
            .then(response => commit(MutationType.LoadAppointments, response.data.data))
    },
    async[ActionTypes.ConfirmAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.confirmed });
        await axios.post(`/api/appointments/${appointment.id}/confirm`)
            .catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [ActionTypes.DeclineAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.declined });
        await axios.post(`/api/appointments/${appointment.id}/decline`)
            .catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [ActionTypes.IdleAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.idle });
        await axios.post(`/api/appointments/${appointment.id}/reset`)
            .catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [ActionTypes.CreateAppointment]({ commit }, newAppointment: NewAppointment) {
        await axios.post<{ data: Appointment }>(`/api/appointments`, newAppointment)
            .then(response => commit(MutationType.AddAppointment, response.data.data));
    },
    async [ActionTypes.EditAppointment]({ commit }, appointment: Appointment) {
        const oldStatus = appointment.status;
        commit(MutationType.SetAppointmentStatus, { appointment, status: AppointmentStatus.idle });
        await axios.post(`/api/appointments/${appointment.id}/reset`)
            .catch(() => commit(MutationType.SetAppointmentStatus, { appointment, status: oldStatus }))
    },
    async [ActionTypes.DeleteAppointment]({ commit }, appointment: Appointment) {
        commit(MutationType.RemoveAppointment, appointment);
        await axios.delete<{ data: Appointment }>(`/api/appointments/${appointment.id}`)
            .catch(() => commit(MutationType.AddAppointment, appointment));
    },
}