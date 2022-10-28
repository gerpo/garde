import { AppointmentState, appointmentState } from './state'

import { Module } from 'vuex'
import { State } from '../../state'
import { appointmentActions } from './actions'
import { appointmentGetters } from './getters'
import { appointmentMutations } from './mutations'

export const appointmentModule: Module<AppointmentState, State> = {
    state: appointmentState,
    mutations: appointmentMutations,
    actions: appointmentActions,
    getters: appointmentGetters,
}