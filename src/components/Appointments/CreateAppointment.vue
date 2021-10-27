<template>
    <div class="flex flex-col gap-2">
        <h3>Create New Appointment</h3>
        <div class="w-full">
            <label for="title" class="sr-only" />
            <input
                type="text"
                id="title"
                v-model="title"
                class="w-full rounded"
                placeholder="Title"
            />
        </div>
        <div class="flex gap-2">
            <input type="date" name="date" id="date" v-model="date" class="flex-1 rounded" />
            <input type="time" name="date" id="date" v-model="time" class="rounded flex-2" />
        </div>
        <div class="w-full">
            <input type="text" name="date" id="date" class="w-full rounded" placeholder="Location" />
        </div>
        <div class="w-full mx-auto my-2 text-justify">
            <label for="description" class="sr-only" />
            <textarea
                id="description"
                v-model="description"
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
            class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white disabled:bg-transparent disabled:hover:bg-gray-100 disabled:cursor-not-allowed"
        >Save</button>

        <!-- <div class="flex justify-end gap-2 text-sm">
            <reset-button :appointment="appointment" class="mr-auto" />
            <decline-button :appointment="appointment" />
            <confirmation-button :appointment="appointment" class="w-1/3" />
        </div>-->
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

import { useAppointmentService } from '../../services/api/useDataService';

const { data, loading, error, getData: saveAppointment } = useAppointmentService('create')

const title = ref('');
const description = ref('');
const date = ref('');
const time = ref('');
const datetime = ref('');
const location = ref('');
const confirmationRequired = ref(false)
const deadline = ref('')

function createAppointment() {

}
</script>
