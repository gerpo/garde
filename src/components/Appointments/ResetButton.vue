<template>
    <button
        class="p-2 text-gray-400 bg-gray-100 rounded hover:bg-gray-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 hover:text-current disabled:cursor-not-allowed"
        @click="reset"
        :title="t('resetAppointment')"
        :disabled="loading || appointment.status === AppointmentStatus.idle"
    >
        <Spinner class="w-5 h-5 mx-auto animate-spin" v-if="deouncedLoading" />
        <scale-icon class="w-5 h-5 fill-current" v-else />
    </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { Appointment, AppointmentStatus } from '../../models/Appointment';
import { useAppointmentService } from '../../services/api/useDataService';
import { useThrottle } from '@vueuse/core';
import { ScaleIcon } from '@heroicons/vue/solid';
import Spinner from '../../assets/spinner.svg?component';

const props = defineProps<{ appointment: Appointment }>()

const { t } = useI18n();
const toast = useToast();
const { loading, error, getData: resetAppointment } = useAppointmentService('reset')
const deouncedLoading = useThrottle(loading, 500)
const oldStatus = ref(AppointmentStatus.idle);

onMounted(() => oldStatus.value = props.appointment.status)

watch(error, (value) => {
    if (value) {
        props.appointment.status = oldStatus.value;
        toast.error(value);
    }
})

async function reset() {
    oldStatus.value = props.appointment.status;
    props.appointment.status = AppointmentStatus.idle;
    await resetAppointment({ id: props.appointment.id });
}
</script>