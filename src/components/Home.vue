<template>
    <h1>Home</h1>
    <div v-if="user">
        <h2>{{ `Hello ${user.firstName} ${user.lastName}` }}</h2>
        <p>{{ user.email }}</p>
    </div>
    <data-table :values="[{ id: 1, name: 'Adam' }, { id: 2 }, { id: 3 }]">
        <data-column selection-mode="multi" :header-style="{ width: '1px' }" />
        <data-column header="Nein" field="id" :header-style="{ width: '1px' }" />
        <data-column header="hallo" field="name" />
    </data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { store } from '../services/store/store';
import DataTable from './Misc/DataTable/DataTable'
import DataColumn from './Misc/DataTable/DataColumn.vue'

const user = computed(() => store.state.user);

</script>