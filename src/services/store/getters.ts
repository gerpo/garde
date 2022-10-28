import { GetterTree } from 'vuex'
import { Rights } from '../../models/Rights';
import { State } from './state'

export type Getters = {
    getPermissions(state: State): string[] | undefined
    userCan(state: State): (permission:Rights) => boolean
    userCanAny(state: State, getters: any): (permissions:Rights[]) => boolean
}

export const getters: GetterTree<State, State> & Getters = {
    getPermissions(state) {
        return state.user?.permissions;
    },

    userCan: (state) => (permission: Rights) => {
        if (state.user?.isAdmin) return true;

        return state.user?.permissions.includes(permission) ?? false
    },

    userCanAny: (state, getters) => (permissions: Rights[]) => {
        return permissions.some(permission => getters.userCan(permission))
    },
}