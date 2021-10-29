<template>
    <button
        class="p-2 text-red-600 bg-red-100 border-2 border-red-600 rounded hover:bg-red-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 hover:text-current disabled:cursor-not-allowed"
        @click="decline"
        :title="t('declineAppointment')"
        :disabled="!ready || appointment.status === AppointmentStatus.declined"
    >
        <Spinner class="w-5 h-5 mx-auto text-red-600 animate-spin" v-if="!ready" />
        <ban-icon class="w-5 h-5 fill-current" v-else />
    </button>
</template>

<script setup lang="ts">
import Spinner from '../../assets/spinner.svg?component';
import { BanIcon } from '@heroicons/vue/solid';

import { useI18n } from 'vue-i18n';
import { useStore } from '../../services/store/store';
import { useTimeout } from '@vueuse/core';
import { ActionTypes } from '../../services/store/actions';
import { Appointment, AppointmentStatus } from '../../models/Appointment';

const props = defineProps<{ appointment: Appointment }>()

const store = useStore();
const { t } = useI18n();
const { ready, start } = useTimeout(300, { controls: true, immediate: false })

function decline() {
    start()
    store.dispatch(ActionTypes.DeclineAppointment, props.appointment);
}
</script>