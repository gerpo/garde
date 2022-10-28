<template>
    <div>
        <div>
            <Logo class="w-auto h-16 mx-auto" />
            <h2
                class="mt-6 text-3xl font-extrabold text-center text-gray-900"
            >Register a new account</h2>
        </div>
        <form class="mt-8 space-y-4" action="#" method="POST">
            <div
                v-if="registerErrors"
                class="w-full p-2 mx-auto text-white bg-red-400 border-red-600 rounded"
            >
                <ul class="text-sm list-disc list-inside">
                    <template v-for="errors, field in registerErrors">
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
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autocomplete="new-password"
                        v-model="password"
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        required
                        autocomplete="new-password"
                        v-model="passwordConfirm"
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            <div>
                <div>
                    <label for="sign-up-code" class="sr-only">Sign Up Code</label>
                    <input
                        id="sign-up-code"
                        name="code"
                        type="text"
                        autocomplete="one-time-code"
                        required
                        v-model="code"
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Code"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    @click.prevent="register"
                >
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <lock-closed-icon
                            class="w-5 h-5 text-red-500 group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </span>
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { useStore } from '../../services/store/store';
import { ActionTypes } from '../../services/store/actions';
import Logo from '../../assets/logo.svg?component';

const store = useStore();

const registerErrors = computed(() => store.state.registerValidationErrors);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('')
const code = ref('');

function register() {
    store.dispatch(ActionTypes.RegisterUser, { email: email.value, password: password.value, 'password_confirmation': passwordConfirm.value, code: code.value });
}
</script>