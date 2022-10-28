<template>
    <button
        class="flex items-center justify-center p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 hover:text-current disabled:cursor-not-allowed"
        @click.stop="confirm()"
        :title="t('confirmAppointment')"
        :disabled="!ready || appointment.status === AppointmentStatus.confirmed"
    >
        <Spinner class="absolute w-5 h-5 mx-auto text-green-600 animate-spin" v-if="!ready" />
        <span :class="{ 'text-transparent': !ready }">{{ t('confirmAppointment') }}</span>
    </button>
</template>

<script setup lang="ts">
import Spinner from '../../assets/spinner.svg?component';

import { useI18n } from 'vue-i18n';
import { useStore } from '../../services/store/store';
import { useTimeout } from '@vueuse/core';
import { Appointment, AppointmentStatus } from '../../models/Appointment';
import { AppointmentActionTypes } from '../../services/store/modules/appointments/actions';

const props = defineProps<{ appointment: Appointment }>()

const { t } = useI18n();
const store = useStore();
const { ready, start } = useTimeout(300, { controls: true, immediate: false })


function confirm() {
    start()
    store.dispatch(AppointmentActionTypes.ConfirmAppointment, props.appointment);
}
</script>