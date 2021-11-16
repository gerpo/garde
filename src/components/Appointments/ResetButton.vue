<template>
    <button
        class="p-2 text-gray-400 bg-gray-100 rounded hover:bg-gray-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 hover:text-current disabled:cursor-not-allowed"
        @click="reset"
        :title="t('resetAppointment')"
        :disabled="!ready || appointment.status === AppointmentStatus.idle"
    >
        <Spinner class="w-5 h-5 mx-auto animate-spin" v-if="!ready" />
        <reply-icon class="w-5 h-5 fill-current" v-else />
    </button>
</template>

<script setup lang="ts">
import Spinner from '../../assets/spinner.svg?component';
import { ReplyIcon } from '@heroicons/vue/solid';

import { useI18n } from 'vue-i18n';
import { useStore } from '../../services/store/store';
import { useTimeout } from '@vueuse/core';
import { ActionTypes } from '../../services/store/actions';
import { Appointment, AppointmentStatus } from '../../models/Appointment';

const props = defineProps<{ appointment: Appointment }>()

const { t } = useI18n();
const store = useStore();
const { ready, start } = useTimeout(300, { controls: true, immediate: false })


function reset() {
    start()
    store.dispatch(ActionTypes.IdleAppointment, props.appointment);
}
</script>