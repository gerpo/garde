import { RegisterCodesState, registerCodesState } from './state'

import { Module } from 'vuex'
import { State } from '../../state'
import { registerCodesActions } from './actions'
import { registerCodesMutations } from './mutations'

export const registerCodesModule: Module<RegisterCodesState, State> = {
    state: registerCodesState,
    mutations: registerCodesMutations,
    actions: registerCodesActions,
}