<template>
    <div v-if="status !== 'loading' && status !== 'error'">
        <h1>Home</h1>
        <h2>{{ `Hello ${user.firstName} ${user.lastName}` }}</h2>
        <p>{{ user.email }}</p>
    </div>
    <p class="bg-red">{{ status }}</p>
    <button @click="fetchUser">hh</button>
</template>

<script setup lang="ts">
import { useUser } from '../services/useUser';
const { userState: user, fetchUser, status } = useUser()
</script>