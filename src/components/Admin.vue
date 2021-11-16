<template>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Memebers</th>
            </tr>
        </thead>
    </table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../services/store/store';
import { ActionTypes } from '../services/store/actions';
const store = useStore()

onMounted(async () => {
    store.dispatch(ActionTypes.LoadAppointments);
})
</script>