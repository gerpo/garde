<template>
    <h1>Home</h1>
    <h2>{{ `Hello ${user.firstName} ${user.lastName}` }}</h2>
    <p>{{ user.email }}</p>
</template>

<script setup lang="ts">import { useUser } from '../services/useUser';
const user = useUser()

</script>