<template>
  <router-view />
  <reload-prompt />
</template>


<script setup lang="ts">
import { UserSettings } from './models/UserSettings';
import { provide, reactive } from 'vue';
import ReloadPrompt from './components/ReloadPrompt.vue';
import { periodicUserFetch } from './services/useUser';

const settings = reactive(new UserSettings);
provide('settings', settings);

</script>

<style>
</style>
