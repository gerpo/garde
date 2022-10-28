import { ActionContext, ActionTree } from 'vuex'
import { MutationType, Mutations } from './mutations'

import { AppointmentActions } from './modules/appointments/actions'
import { State } from './state'
import { User } from '../../models/User'
import axios from '../../utils/axios'
import { useToast } from 'vue-toastification';

export enum ActionTypes {
    Login = 'LOGIN',
    Logout = 'LOGOUT',
    RegisterUser = 'REGISTER_USER',
    LoadUser = 'LOAD_USER',
    UpdateProfile = 'UPDATE_PROFILE',
    UpdatePassword = 'UPDATE_PASSWORD',
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
    [ActionTypes.LoadUser](context: ActionAugments): void,
    [ActionTypes.UpdateProfile](context: ActionAugments, user: User): void,
    [ActionTypes.UpdatePassword](context: ActionAugments, user: User): void,
}

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
            commit(MutationType.SetRegisterValidationErrors, null)
            dispatch(ActionTypes.LoadUser)
        })
            .catch(error => {
                let msg = 'Sorry, there was an error.'
                if (error.response) {
                    const { status } = error.response
                    switch (true) {
                        case (status === 422):
                            msg = 'Invalid Login Credentials.'
                            commit(MutationType.SetRegisterValidationErrors, error.response.data.errors)
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
        await axios.get<{ data: User }>('/api/profile').then(response => commit(MutationType.LoadUser, response.data.data))
    },
    async[ActionTypes.UpdateProfile]({ commit }, user) {
        await axios.put<{ data: User }>(`/user/profile-information`, user).then(response => commit(MutationType.LoadUser, response.data.data))
    },
    async[ActionTypes.UpdatePassword]({ commit }, user) {
        await axios.put<{ data: User }>(`/user/password`, user).then(response => commit(MutationType.LoadUser, response.data.data))
    },
}