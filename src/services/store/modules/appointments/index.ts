import { AppointmentState, appointmentState } from './state'

import { Module } from 'vuex'
import { appointmentActions } from './actions'
import { appointmentMutations } from './mutations'

export const appointmentModule: Module<AppointmentState, AppointmentState> = {
    state: appointmentState,
    mutations: appointmentMutations,
    actions: appointmentActions
}