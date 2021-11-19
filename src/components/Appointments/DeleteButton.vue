<template>
    <button
        @click="showConfirmation = true"
        ref="btn"
        class="px-2 text-sm border border-red-600 rounded hover:bg-red-400 hover:text-white"
    >{{ t('deleteAppointment') }}</button>
    <div
        ref="confirmation"
        v-show="showConfirmation"
        class="flex flex-col items-center gap-2 p-2 bg-white border-2 shadow"
    >
        <div>Really?</div>
        <div class="flex gap-2">
            <button
                @click="deleteAppointment"
                class="px-1 text-sm bg-red-100 border border-red-600 rounded hover:text-white hover:bg-red-400 border-1"
            >Yes</button>
            <button
                @click="closeConfirmation"
                class="px-1 text-sm rounded hover:bg-gray-100 border-1"
            >No</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from '../../services/store/store';
import { Appointment } from '../../models/Appointment';
import { createPopper, Instance } from '@popperjs/core';
import { ref, onMounted, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { AppointmentActionTypes } from '../../services/store/modules/appointments/actions';

const props = defineProps<{ appointment: Appointment }>();

const { t } = useI18n();
const store = useStore();

const btn = ref<HTMLElement>();
const confirmation = ref<HTMLElement>();
const confirmationState = ref<Instance>();
const showConfirmation = ref(false);

onMounted(() => {
    if (!btn.value || !confirmation.value) return
    confirmationState.value = createPopper(btn.value, confirmation.value)
})

watch(showConfirmation, () => confirmationState.value?.update());

function closeConfirmation() {
    showConfirmation.value = false;
}

onClickOutside(confirmation, closeConfirmation)

function deleteAppointment() {
    store.dispatch(AppointmentActionTypes.DeleteAppointment, props.appointment)
    closeConfirmation();
}
</script>