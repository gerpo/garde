<template>
    <button
        class="flex items-center justify-center p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 hover:text-current disabled:cursor-not-allowed"
        @click.stop="confirm()"
        :title="t('confirmAppointment')"
        :disabled="loading || appointment.status === AppointmentStatus.confirmed"
    >
        <Spinner
            class="absolute w-5 h-5 mx-auto text-green-600 animate-spin"
            v-if="deouncedLoading"
        />
        <span :class="{ 'text-transparent': deouncedLoading }">{{ t('confirmAppointment') }}</span>
    </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { Appointment, AppointmentStatus } from '../../models/Appointment';
import { useAppointmentService } from '../../services/api/useDataService';
import Spinner from '../../assets/spinner.svg?component';
import { useThrottle } from '@vueuse/core';

const props = defineProps<{ appointment: Appointment }>()

const { t } = useI18n();
const toast = useToast();
const { loading, error, getData: confirmAppointment } = useAppointmentService('confirm')
const deouncedLoading = useThrottle(loading, 500)
const oldStatus = ref(AppointmentStatus.idle);

onMounted(() => oldStatus.value = props.appointment.status)

watch(error, (value) => {
    if (value) {
        props.appointment.status = oldStatus.value;
        toast.error(value);
    }
})

async function confirm() {
    oldStatus.value = props.appointment.status;
    props.appointment.status = AppointmentStatus.confirmed;
    await confirmAppointment({ id: props.appointment.id });
}
</script>