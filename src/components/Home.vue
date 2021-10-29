<template>
    <h1>Home</h1>
    <div v-if="user">
        <h2>{{ `Hello ${user.firstName} ${user.lastName}` }}</h2>
        <p>{{ user.email }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { store } from '../services/store/store';

const user = computed(() => store.state.user);

</script>