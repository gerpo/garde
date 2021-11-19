import { Actions, actions } from './actions'
import {
    CommitOptions,
    DispatchOptions,
    Store as VuexStore,
    createLogger,
    createStore
} from 'vuex'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { State, state } from './state'

import VuexPersistence from 'vuex-persist'
import { appointmentModule } from './modules/appointments'
import { roleModule } from './modules/roles'

const vuexLocal = new VuexPersistence<State>({
    storage: window.localStorage
})

export const store = createStore<State>({
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [vuexLocal.plugin],
    state,
    mutations,
    actions,
    getters,
    modules: { appointmentModule, roleModule }
})

export function useStore() {
    return store as Store
}

export type Store = Omit<
    VuexStore<State>,
    'getters' | 'commit'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}