import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
    getPermissions(state: State): string[] | undefined
}

export const getters: GetterTree<State, State> & Getters = {
    getPermissions(state) {
        return state.user?.permissions;
    }
}