<template>
    <div class="flex justify-end w-full -mb-2">
        <div class="flex mr-auto">
            <button
                @click="createModalVisible = true"
                class="h-full p-2 border border-green-600 hover:bg-green-400 not:first:-ml-1 hover:text-white bg-green-50 first:rounded-l hover:shadow-inner last:rounded-r"
            >
                <plus-icon class="w-5 h-5 fill-current" />
            </button>
        </div>

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
            :appointments="appointments"
            v-if="appointments"
            @open-details="showAppointmentDetails"
        />
    </div>
    <div v-else-if="selectedViewMode === ViewMode.CALENDAR">
        <appointment-calendar
            :appointments="appointments"
            v-if="appointments"
            @open-details="showAppointmentDetails"
        />
    </div>

    <div v-if="!appointments" class="flex flex-col items-center justify-center w-full h-full">
        <floating class="overflow-visible h-36 sm:h-48" />
        <h3 class="sm:text-xl">
            Looking for all the appointments
            <span class="animate-pulse">...</span>
        </h3>
    </div>

    <div
        v-if="appointments?.length === 0"
        class="flex flex-col items-center justify-center w-full h-full"
    >
        <not-found class="overflow-visible h-36 sm:h-48" />
        <h3 class="sm:text-xl">No appointments found for you.</h3>
    </div>

    <div v-if="!appointments" class="flex flex-col items-center justify-center w-full h-full">
        <error-image class="overflow-visible h-36 sm:h-48" />
        <h3 class="sm:text-xl">Error jo</h3>
    </div>

    <modal v-model:show="detailModalVisible" v-if="selectedAppointment">
        <appointment-details :appointment="selectedAppointment" />
    </modal>
    <modal v-model:show="createModalVisible">
        <create-appointment />
    </modal>
</template>



<script setup lang="ts">
import Modal from '../Modal.vue';
import AppointmentList from './AppointmentList.vue';
import AppointmentCalendar from './AppointmentCalendar.vue';
import AppointmentDetails from './AppointmentDetails.vue';
import CreateAppointment from './CreateAppointment.vue';
import Floating from '../../assets/floating.svg?component';
import ErrorImage from '../../assets/error.svg?component';
import NotFound from '../../assets/not_found.svg?component';
import { ViewBoardsIcon, ViewListIcon, PlusIcon } from '@heroicons/vue/solid';

import { useStore } from '../../services/store/store';
import { ViewMode } from '../../models/UserSettings'
import { RouteNames } from '../../services/router';
import { Appointment } from '../../models/Appointment';
import { ActionTypes } from '../../services/store/actions';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue';
import { AppointmentActionTypes } from '../../services/store/modules/appointments/actions';


const selectedAppointment = ref<Appointment | null>(null);
const { params } = useRoute();
const router = useRouter();
const store = useStore();

const selectedViewMode = ref(store.state.settings.appointmentViewMode);

const appointments = computed(() => store.state.appointmentModule.appointments)

const createModalVisible = ref(false);

const detailModalVisible = ref(false);
function showAppointmentDetails(item: Appointment) {
    selectedAppointment.value = item;
    detailModalVisible.value = true;
}
watch(() => detailModalVisible.value, (value) => {
    if (value && selectedAppointment.value) router.replace({ name: RouteNames.ShowAppointment, params: { id: selectedAppointment.value.id } })
    if (!value) router.replace({ name: RouteNames.Appointments })
})

onMounted(() => {
    store.dispatch(AppointmentActionTypes.LoadAppointments);
    if (params.id) {
        const it = (appointments.value as Appointment[])?.find(item => item.id === parseInt(params.id as string));
        if (it !== undefined) showAppointmentDetails(it);
    }
})


</script>

