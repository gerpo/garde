<template>
    <appointment-list :appointments="data" v-if="!loading && data" @open-details="showAppointmentDetails" />
    <modal v-model:show="modalVisible">
        <appointment-details :appointment="selectedAppointment" />
    </modal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Appointment, DummyAppointment } from '../../models/Appointment';
import Modal from '../Modal.vue';
import AppointmentDetails from './AppointmentDetails.vue';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '../../services/router';
import { useAppointmentService } from '../../services/api/useDataService';
import AppointmentList from './AppointmentList.vue';

const modalVisible = ref(false);
const selectedAppointment = ref<Appointment>(new DummyAppointment());
const { params } = useRoute();
const router = useRouter();

const { data, loading, error, getData: getAllAppointments } = useAppointmentService('getAll')

function showAppointmentDetails(item: Appointment) {
    selectedAppointment.value = item;
    modalVisible.value = true;
}

watch(() => parseInt(params.id as string), (value: number) => {
    if (!value) return;
    //showAppointmentDetails(data.value[value]);
})

watch(() => modalVisible.value, (value, oldValue) => {
    if (value) router.replace({ name: RouteNames.ShowAppointment, params: { id: selectedAppointment.value.id } })
    if (!value) router.replace({ name: RouteNames.Appointments })
})

onMounted(async () => {
    await getAllAppointments();
    if (params.id) {
        const it = (data.value as Appointment[]).find(item => item.id === parseInt(params.id as string));
        if (it !== undefined) showAppointmentDetails(it);
    }
})


</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>