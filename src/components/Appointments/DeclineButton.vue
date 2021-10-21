<template>
    <button
        class="p-2 text-red-600 bg-red-100 border-2 border-red-600 rounded hover:bg-red-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 hover:text-current disabled:cursor-not-allowed"
        @click="decline"
        :title="t('declineAppointment')"
        :disabled="loading || appointment.status === AppointmentStatus.declined"
    >
        <Spinner class="w-5 h-5 mx-auto text-red-600 animate-spin" v-if="deouncedLoading" />
        <ban-icon class="w-5 h-5 fill-current" v-else />
    </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { Appointment, AppointmentStatus } from '../../models/Appointment';
import { useAppointmentService } from '../../services/api/useDataService';
import { useThrottle } from '@vueuse/core';
import { BanIcon } from '@heroicons/vue/solid';
import Spinner from '../../assets/spinner.svg?component';

const props = defineProps<{ appointment: Appointment }>()
const { t } = useI18n();
const toast = useToast();
const { loading, error, getData: declineAppointment } = useAppointmentService('decline')
const deouncedLoading = useThrottle(loading, 500)
const oldStatus = ref(AppointmentStatus.idle);

onMounted(() => oldStatus.value = props.appointment.status)

watch(error, (value) => {
    if (value) {
        props.appointment.status = oldStatus.value;
        toast.error(value);
    }
})

async function decline() {
    oldStatus.value = props.appointment.status
    props.appointment.status = AppointmentStatus.declined;
    await declineAppointment({ id: props.appointment.id });
}
</script>