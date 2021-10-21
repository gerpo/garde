<template>
    <div class="flex justify-end w-full -mb-2">
        <button
            class="p-2 bg-gray-100 rounded-l hover:bg-gray-300"
            :class="{ 'bg-gray-300 shadow-inner': selectedViewMode === ViewMode.LIST }"
            :disabled="selectedViewMode === ViewMode.LIST"
            @click="selectedViewMode = ViewMode.LIST"
        >
            <view-list-icon class="w-5 h-5 fill-current" />
        </button>
        <button
            class="p-2 bg-gray-100 rounded-r hover:bg-gray-300"
            :class="{ 'bg-gray-300 shadow-inner': selectedViewMode === ViewMode.CALENDAR }"
            :disabled="selectedViewMode === ViewMode.CALENDAR"
            @click="selectedViewMode = ViewMode.CALENDAR"
        >
            <view-boards-icon class="w-5 h-5 fill-current" />
        </button>
    </div>
    <div v-if="selectedViewMode === ViewMode.LIST">
        <appointment-list
            :appointments="data"
            v-if="!loading && data"
            @open-details="showAppointmentDetails"
        />
    </div>
    <div v-else-if="selectedViewMode === ViewMode.CALENDAR">
        <appointment-calendar
            :appointments="data"
            v-if="!loading && data"
            @open-details="showAppointmentDetails"
        />
    </div>

    <modal v-model:show="modalVisible">
        <appointment-details :appointment="selectedAppointment" />
    </modal>
</template>



<script setup lang="ts">
import { ref, watch, onMounted, inject } from 'vue';
import { Appointment, DummyAppointment } from '../../models/Appointment';
import Modal from '../Modal.vue';
import AppointmentDetails from './AppointmentDetails.vue';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '../../services/router';
import { useAppointmentService } from '../../services/api/useDataService';
import AppointmentList from './AppointmentList.vue';
import { ViewBoardsIcon, ViewListIcon } from '@heroicons/vue/solid';
import AppointmentCalendar from './AppointmentCalendar.vue';
import { UserSettings, ViewMode } from '../../models/UserSettings'

const settings = inject('settings') as UserSettings;

const selectedViewMode = ref(settings.appointmentViewMode);
const modalVisible = ref(false);
const selectedAppointment = ref<Appointment>(new DummyAppointment());
const { params } = useRoute();
const router = useRouter();

const { data, loading, error, getData: getAllAppointments } = useAppointmentService('getAll')

function showAppointmentDetails(item: Appointment) {
    selectedAppointment.value = item;
    modalVisible.value = true;
}

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