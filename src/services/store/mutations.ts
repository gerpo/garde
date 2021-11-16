import { Appointment, AppointmentStatus } from '../../models/Appointment'

import { MutationTree } from 'vuex'
import { State } from './state'
import { User } from '../../models/User'

export enum MutationType {
    SetLoginStatus = 'SET_LOGIN_STATUS',
    SetLoginValidationErrors = 'SET_LOGIN_VALIDATION_ERRORS',
    SetRegisterValidationErrors = 'SET_REGISTER_VALIDATION_ERRORS',
    LoadUser = `LOAD_USER`,

    LoadAppointments = 'LOAD_APPOINTMENTS',
    SetAppointmentStatus = 'SET_APPOINTMENT_STATUS',
    AddAppointment = 'ADD_APPOINTMENT',
    RemoveAppointment = 'REMOVE_APPOINTMENT',
}

export type Mutations = {
    [MutationType.SetLoginStatus](state: State, status: boolean): void
    [MutationType.SetLoginValidationErrors](state: State, errors: {email: string[]}| null): void
    [MutationType.SetRegisterValidationErrors](state: State, errors: {email: string[]}| null): void
    [MutationType.LoadUser](state: State, user: User | undefined): void
    [MutationType.LoadAppointments](state: State, appointments: Appointment[]): void
    [MutationType.SetAppointmentStatus](state: State, payload: { appointment: Appointment, status: AppointmentStatus }): void
    [MutationType.AddAppointment](state: State, appointment: Appointment): void
    [MutationType.RemoveAppointment](state: State, appointment: Appointment): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetLoginStatus](state, status) {
        state.loggedIn = status;
        localStorage.setItem('loggedIn', status.toString())
    },

    [MutationType.SetLoginValidationErrors](state, errors) {
        state.loginValidationErrors = errors;
    },

    [MutationType.SetRegisterValidationErrors](state, errors) {
        state.registerValidationErrors = errors;
    },

    [MutationType.LoadUser](state, user) {
        state.user = user;
    },

    [MutationType.LoadAppointments](state, appointments) {
        state.appointments = appointments;
    },
    [MutationType.SetAppointmentStatus](state, { appointment, status }) {
        const task = state.appointments?.findIndex(element => element.id === appointment.id)
        if (!task || task === -1) return
        state.appointments![task].status = status;
    },
    [MutationType.AddAppointment](state, appointment) {
        state.appointments?.push(appointment);
    },
    [MutationType.RemoveAppointment](state, appointment) {
        const task = state.appointments?.findIndex(element => element.id === appointment.id)
        if (!task || task === -1) return
        state.appointments!.splice(task, 1)
    },
}