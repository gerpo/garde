<template>
  <div>
    <div>
      <img
        class="w-auto h-12 mx-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
    </div>
    <form class="mt-8 space-y-4" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            :class="{ 'rounded-b-md': mode === MODES.Login }"
            placeholder="Password"
          />
        </div>
        <div v-if="mode === MODES.Register" class="overflow-hidden">
          <label for="password" class="sr-only">Password</label>
          <input
            id="password-confirm"
            name="password-confirm"
            type="password"
            required
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            :placeholder="mode === MODES.Register ? 'Confirm Password' : ''"
          />
        </div>
      </div>

      <div class="flex items-center justify-between" v-if="mode === MODES.Login">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label for="remember-me" class="block ml-2 text-sm text-gray-900">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-red-600 hover:text-red-500">Forgot your password?</a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          @click="logIn"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <lock-closed-icon
              class="w-5 h-5 text-red-500 group-hover:text-red-400"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script lang=ts>
enum MODES {
  Login,
  Register,
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { useRouter, useRoute } from 'vue-router';
import axios from '../../utils/axios';
import { useToast } from "vue-toastification";
import { useAuthState } from '../../services/isLoggedIn';
import { useStore } from '../../services/store/store';
import { ActionTypes } from '../../services/store/actions';

const router = useRouter();
const store = useStore();
const route = useRoute();
const toast = useToast();

const mode = ref(MODES.Login);
const isLoggedIn = useAuthState()

function logIn() {
  axios.get('/sanctum/csrf-cookie').then(_ =>
    axios.post('/login', { email: 'test@example.com', password: 'password' })
      .then(_ => {
        isLoggedIn.value = true;
        router.push({ path: route.query.redirect?.toString() ?? '/' })
        store.dispatch(ActionTypes.LoadUser)
      }).catch(error => toast.error(error.message)));

}
</script>