<template>
    <div v-for="groupAppointments, groupKey in orderedAppointments">
        <div
            :key="groupKey"
            class="w-full my-2 text-sm text-center text-gray-400 sm:text-left"
        >{{ createMonthString(groupKey.toString()) }}</div>
        <div
            v-for="groupAppointment in  groupAppointments"
            class="w-full p-2 mb-2 bg-gray-100 rounded cursor-pointer last:mb-0"
            :key="groupAppointment.id"
            @click="showAppointmentDetails(groupAppointment)"
        >
            <div class="flex items-center">
                <calendar-icon
                    class="flex-none inline-block w-8 h-8 text-gray-300 transition-colors duration-500 fill-current"
                    :class="{
                        'text-green-500': groupAppointment.status == AppointmentStatus.confirmed,
                        'text-red-500': groupAppointment.status == AppointmentStatus.declined
                    }"
                />
                <div class="h-8 mx-3 border rounded-full"></div>
                <div class="flex flex-col w-4/5 mr-4 sm:flex-wrap sm:flex-row">
                    <h3 class="w-full text-lg">{{ groupAppointment.title }}</h3>
                    <div class="flex items-center text-sm text-gray-500">
                        <clock-icon class="inline-block w-3 h-3 fill-current" />
                        <span>{{ formatDate(groupAppointment.datetime) }}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-500 sm:ml-2">
                        <location-marker-icon class="inline-block w-3 h-3 fill-current" />
                        <span>{{ groupAppointment.location }}</span>
                    </div>
                </div>
                <div class="hidden ml-auto sm:block">
                    <transition name="slide-fade">
                        <confirmation-button
                            :appointment="groupAppointment"
                            v-if="groupAppointment.status !== AppointmentStatus.confirmed"
                        />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDate, createMonthString, groupByMonth } from '../../utils/helpers';
import { ClockIcon, CalendarIcon, LocationMarkerIcon } from '@heroicons/vue/solid';
import { Appointment, AppointmentStatus } from '../../models/Appointment';
import { computed, ComputedRef } from 'vue';
import ConfirmationButton from './ConfirmationButton.vue'

const props = defineProps<{ appointments: Appointment[] }>();
//const emit = defineEmits<{ (event: 'openDetails', appointment: Appointment): void }>();
const emit = defineEmits(['openDetails'])

function showAppointmentDetails(appointment: Appointment) {
    emit('openDetails', appointment)
}

const orderedAppointments: ComputedRef<{ [key: string]: Appointment[] }> = computed(() => groupByMonth(props.appointments, 'datetime'));
</script>