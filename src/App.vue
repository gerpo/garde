<template>
  <router-view />
  <reload-prompt />
</template>


<script setup lang="ts">
import { watch, computed } from 'vue';
import { useStore } from './services/store/store';
import ReloadPrompt from './components/ReloadPrompt.vue';
import { useRouter } from 'vue-router';
import { RouteNames } from './services/router';
import { ActionTypes } from './services/store/actions';

const store = useStore()
const router = useRouter();

const loggedIn = computed(() => store.state.loggedIn);
const user = computed(() => store.state.user);

watch(loggedIn, value => {
  if (value) router.push({ name: RouteNames.Home });
  if (!value) router.push({ name: RouteNames.Login });
})

watch(user, value => {
  if (!value) {
    store.dispatch(ActionTypes.LoadUser);
  }
}, { immediate: true })
</script>

