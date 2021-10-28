import { ActionContext, ActionTree } from 'vuex'
import { MutationType, Mutations } from './mutations'

import { State } from './state'
import useSWR from '../useSWR'

export enum ActionTypes {
    LoadUser = 'LOAD_USER',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}
export type Actions = {
    [ActionTypes.LoadUser](context: ActionAugments): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.LoadUser]({ commit }) {
        const { data, error } = await useSWR('/api/user')
        console.log(data)
        commit(MutationType.LoadUser, data.value.data)
    },
}