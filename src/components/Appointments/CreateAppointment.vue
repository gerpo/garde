<template>
    <div class="flex flex-col gap-2">
        <h3>Create New Appointment</h3>
        <div class="w-full">
            <label for="title" class="sr-only" />
            <input
                type="text"
                id="title"
                v-model="newAppointment.title"
                class="w-full rounded"
                placeholder="Title"
            />
        </div>
        <div class="flex gap-2">
            <input
                type="datetime-local"
                name="date"
                id="date"
                v-model="newAppointment.datetime"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                class="flex-1 rounded"
            />
        </div>
        <div class="w-full">
            <input
                type="text"
                name="date"
                id="date"
                v-model="newAppointment.location"
                class="w-full rounded"
                placeholder="Location"
            />
        </div>
        <div class="w-full mx-auto my-2 text-justify">
            <label for="description" class="sr-only" />
            <textarea
                id="description"
                v-model="newAppointment.description"
                class="w-full rounded"
                placeholder="Description"
            />
        </div>

        <div class="flex items-center w-full mx-auto text-justify">
            <input
                id="confirmation-required"
                type="checkbox"
                v-model="confirmationRequired"
                class="mr-2 rounded"
                placeholder="Description"
            />
            <label for="confirmation-required" class>Confirmation required</label>
        </div>

        <div class="flex items-center w-full mx-auto text-justify" v-if="confirmationRequired">
            <label for="deadline" class="sr-only" />
            <input
                id="deadline"
                type="date"
                v-model="deadline"
                class="mr-2 rounded"
                placeholder="Deadline"
            />
        </div>

        <button
            @click="createAppointment"
            class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 disabled:cursor-not-allowed"
        >Save</button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NewAppointment } from '../../models/Appointment';
import { AppointmentActionTypes } from '../../services/store/modules/appointments/actions';
import { useStore } from '../../services/store/store';

const store = useStore()
const confirmationRequired = ref(false)
const deadline = ref('')

const newAppointment = reactive({} as NewAppointment);

function createAppointment() {
    store.dispatch(AppointmentActionTypes.CreateAppointment, newAppointment)
}
</script>
