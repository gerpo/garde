import axios, { AxiosError } from 'axios';
import { createGlobalState, useStorage } from '@vueuse/core';

import { Appointment } from '../models/Appointment';
import { ref } from 'vue';

const appointmentState = createGlobalState(
    () => useStorage('user-appointments', [] as Appointment[]),
)()

export const useAppointments = () => {


    const status = ref<'loading' | 'refreshing' | 'success' | 'error'>('loading');
    const error = ref('');
    const fetchAppointments = async () => {
        status.value = (appointmentState.value.length === 0) ? 'loading' : 'refreshing';

        await axios.get<{ data: Appointment[] }>('/api/appointments')
            .then(response => {
                status.value = 'success'
                appointmentState.value = response.data.data
            }).catch((err: Error | AxiosError) => {
                status.value = 'error';
                error.value = err.message;
            })
    }

    fetchAppointments()

    return { status, appointmentState, error, fetchAppointments }
}