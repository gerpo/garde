<template>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    See
    <code>README.md</code> for more information.
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <button @click="showModal = true">Testo</button>
  <Modal v-model:show="showModal">
    <h1>Hallo {{ user }}</h1>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Modal from './Modal.vue';
import axios from '../utils/axios'

const user = ref('')

onMounted(() => axios.get<{ email: string }>('/api/user').then(response => user.value = response.data.email))
const count = ref(0);
const showModal = ref(false);
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
