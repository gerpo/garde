import { MutationTree } from 'vuex'
import { State } from './state'
import { User } from '../../models/User'

export enum MutationType {
    LoadUser = `LOAD_USER`,
}

export type Mutations = {
    [MutationType.LoadUser](state: State, user: User): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.LoadUser](state, user) {
        state.user = user;
    },
}