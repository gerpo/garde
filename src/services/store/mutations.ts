import { Appointment, AppointmentStatus } from '../../models/Appointment'

import { MutationTree } from 'vuex'
import { State } from './state'
import { User } from '../../models/User'

export enum MutationType {
    SetLoginStatus = 'SET_LOGIN_STATUS',
    SetLoginValidationErrors = 'SET_LOGIN_VALIDATION_ERRORS',
    SetRegisterValidationErrors = 'SET_REGISTER_VALIDATION_ERRORS',
    LoadUser = `LOAD_USER`,
}

export type Mutations = {
    [MutationType.SetLoginStatus](state: State, status: boolean): void
    [MutationType.SetLoginValidationErrors](state: State, errors: { email: string[] } | null): void
    [MutationType.SetRegisterValidationErrors](state: State, errors: { email: string[] } | null): void
    [MutationType.LoadUser](state: State, user: User | undefined): void,
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
}