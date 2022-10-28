<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
            <h2 class="text-lg">{{ appointment.title }}</h2>
            <delete-button :appointment="appointment" />
        </div>
        <div class="flex flex-wrap gap-3 p-2 bg-gray-100 rounded">
            <div class="flex items-center">
                <calendar-icon class="inline-block w-5 h-5 text-gray-600 fill-current" />
                <span>{{ formatDate(appointment.datetime, true, false) }}</span>
            </div>
            <div class="flex items-center">
                <clock-icon class="inline-block w-5 h-5 text-gray-600 fill-current" />
                <span>{{ formatDate(appointment.datetime, false, true) }}</span>
            </div>
            <div class="flex items-center">
                <location-marker-icon class="inline-block w-5 h-5 text-gray-600 fill-current" />
                <span>{{ appointment.location }}</span>
            </div>
        </div>
        <div
            class="p-2 bg-gray-100 rounded"
            :class="{ 'bg-yellow-200': appointment.confirmationRequired }"
        >Keine Zusage erforderlich</div>
        <div class="w-full mx-auto my-2 text-justify">
            <p v-if="appointment.description">{{ appointment.description }}</p>
            <p v-else>{{ t('noDescription') }}</p>
        </div>

        <div class="flex justify-end gap-2 text-sm">
            <reset-button :appointment="appointment" class="mr-auto" />
            <decline-button :appointment="appointment" />
            <confirmation-button :appointment="appointment" class="w-1/3" />
        </div>
    </div>
</template>

<script setup lang="ts">
import ResetButton from './ResetButton.vue';
import DeleteButton from './DeleteButton.vue';
import DeclineButton from './DeclineButton.vue';
import ConfirmationButton from './ConfirmationButton.vue';

import { CalendarIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/vue/solid';
import { useI18n } from 'vue-i18n';
import { formatDate } from '../../utils/helpers';
import { Appointment } from '../../models/Appointment';

defineProps<{ appointment: Appointment }>();
const { t } = useI18n();
</script>