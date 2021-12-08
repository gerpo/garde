import { UsersState, usersState } from './state'

import { Module } from 'vuex'
import { State } from '../../state'
import { usersActions } from './actions'
import { usersMutations } from './mutations'

export const usersModule: Module<UsersState, State> = {
    state: usersState,
    mutations: usersMutations,
    actions: usersActions,
}                                           