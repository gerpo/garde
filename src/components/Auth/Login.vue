<template>
  <div>
    <div>
      <Logo class="w-auto h-16 mx-auto" />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
    </div>

    <form class="mt-8 space-y-4" action="#" method="POST">
      <div
        v-if="loginErrors"
        class="w-full p-2 mx-auto text-white bg-red-400 border-red-600 rounded"
      >
        <ul class="text-sm">
          <template v-for="errors, field in loginErrors">
            <li v-for="error in errors">{{ error }}</li>
          </template>
        </ul>
      </div>
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
            v-model="email"
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            :class="{ 'border-red-500': loginErrors?.email }"
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
            v-model="password"
            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            :class="{ 'border-red-500': loginErrors?.email }"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            v-model="remember"
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
          class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md disabled:cursor-not-allowed disabled:bg-red-200 group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          @click.prevent="logIn"
          :disabled="!email || !password"
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
import { ref, computed } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { useStore } from '../../services/store/store';
import { ActionTypes } from '../../services/store/actions';
import Logo from '../../assets/logo.svg?component';

const store = useStore();

const loginErrors = computed(() => store.state.loginValidationErrors);
const email = ref('');
const password = ref('');
const remember = ref(false);

function logIn() {
  store.dispatch(ActionTypes.Login, {email: email.value, password: password.value, remember: remember.value});
}
</script>