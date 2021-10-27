<template>
  <router-view />
  <reload-prompt />
</template>


<script setup lang="ts">
import { UserSettings } from './models/UserSettings';
import { provide, reactive } from 'vue';
import ReloadPrompt from './components/ReloadPrompt.vue';
import { useGlobalState } from './utils/store';
import { useIntervalFn } from '@vueuse/core';
import axios from './utils/axios';

const settings = reactive(new UserSettings);
provide('settings', settings);

const state = useGlobalState();

useIntervalFn(() => {
  if (!window.localStorage.getItem('loggedIn')) return;
  axios.get<{ user: object }>('/api/user')
    .then(response => state.value['user'] = response.data)
}, 1000 * 60 * 5) // 5 Minutes

</script>

<style>
</style>
