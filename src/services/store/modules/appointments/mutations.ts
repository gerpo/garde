import { Appointment, AppointmentStatus } from '../../../../models/Appointment';

import { AppointmentState } from './state';
import { MutationTree } from 'vuex';

export enum AppointmentMutationType {
    LoadAppointments = 'LOAD_APPOINTMENTS',
    SetAppointmentStatus = 'SET_APPOINTMENT_STATUS',
    AddAppointment = 'ADD_APPOINTMENT',
    RemoveAppointment = 'REMOVE_APPOINTMENT',
}

export type AppointmentMutations = {
    [AppointmentMutationType.LoadAppointments](state: AppointmentState, appointments: Appointment[]): void
    [AppointmentMutationType.SetAppointmentStatus](state: AppointmentState, payload: { appointment: Appointment, status: AppointmentStatus }): void
    [AppointmentMutationType.AddAppointment](state: AppointmentState, appointment: Appointment): void
    [AppointmentMutationType.RemoveAppointment](state: AppointmentState, appointment: Appointment): void
}

export const appointmentMutations: MutationTree<AppointmentState> & AppointmentMutations = {

    [AppointmentMutationType.LoadAppointments](state, appointments) {
        state.appointments = appointments;
    },
    [AppointmentMutationType.SetAppointmentStatus](state, { appointment, status }) {
        const task = state.appointments?.findIndex(element => element.id === appointment.id)
        if (!task || task === -1) return
        state.appointments![task].status = status;
    },
    [AppointmentMutationType.AddAppointment](state, appointment) {
        state.appointments?.push(appointment);
    },
    [AppointmentMutationType.RemoveAppointment](state, appointment) {
        const task = state.appointments?.findIndex(element => element.id === appointment.id)
        if (!task || task === -1) return
        state.appointments!.splice(task, 1)
    },
}