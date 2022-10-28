import { RoleState, roleState } from './state'

import { Module } from 'vuex'
import { State } from '../../state'
import { roleActions } from './actions'
import { roleMutations } from './mutations'

export const roleModule: Module<RoleState, State> = {
    state: roleState,
    mutations: roleMutations,
    actions: roleActions,
}                                           