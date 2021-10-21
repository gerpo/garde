<template>
    <calendar
        class="h-full max-w-full mt-4 custom-calendar"
        :masks="masks"
        :attributes="attributes"
        is-expanded
    >
        <template v-slot:day-content="{ day, attributes }">
            <div class="flex flex-col h-full overflow-hidden">
                <span class="px-1 mx-1 text-sm text-gray-900 bg-gray-100 day-label">{{ day.day }}</span>
                <div class="flex-grow p-1 overflow-x-auto overflow-y-auto">
                    <button
                        v-for="attr in attributes"
                        :key="attr.key"
                        class="w-full text-left"
                        @click="showAppointmentDetails(attr.customData)"
                    >
                        <p class="p-1 mt-0 mb-1 text-xs leading-tight bg-red-200 rounded hover:bg-red-400 hover:text-white line-clamp-2"
                        >{{ attr.customData.title }}</p>
                    </button>
                </div>
            </div>
        </template>
    </calendar>
</template>

<script setup lang="ts">
import { Calendar } from 'v-calendar';
import { computed } from 'vue';
import { Appointment } from '../../models/Appointment';

const props = defineProps<{ appointments: Appointment[] }>()
const emit = defineEmits(['openDetails'])

const masks = { weekdays: 'WWW' }

type attribute = { key: number, dates: Date, customData: object };
const attributes = computed(() => props.appointments.reduce((result, currentItem) => {
    result.push({ key: currentItem.id, dates: currentItem.datetime, customData: currentItem })

    return result;
}, <attribute[]>[]))

function showAppointmentDetails(appointment: Appointment) {
    emit('openDetails', appointment)
}

</script>

<style>
.vc-day {
    min-height: 3rem;
}
</style>