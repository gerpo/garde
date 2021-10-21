<template>
    <div
        class="flex items-center justify-center min-h-screen px-4 py-12 from-gray-200 bg-gradient-to-br to-red-100 sm:px-6 lg:px-8"
    >
        <div class="w-full max-w-md space-y-4">
            <transition
                enter-active-class="transition duration-300 ease-out transform"
                enter-from-class="scale-x-75 scale-y-0"
                enter-to-class="scale-x-100 scale-y-100"
                leave-active-class="transition duration-300 ease-in transform"
                leave-from-class="scale-x-100 scale-y-100"
                leave-to-class="scale-x-75 scale-y-0"
                mode="out-in"
            >
                <keep-alive>
                    <component :is="currentComponent" />
                </keep-alive>
            </transition>

            <button
                v-if="mode === MODES.Login"
                type="submit"
                class="relative flex justify-center px-4 mx-auto my-2 text-sm font-medium text-red-600 border rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:text-red-500"
                @click="mode = MODES.Register"
            >Register</button>
            <button
                v-else
                type="submit"
                class="relative flex justify-center px-4 mx-auto my-2 text-sm font-medium text-red-600 border rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:text-red-500"
                @click="mode = MODES.Login"
            >Log In</button>
        </div>
    </div>
</template>

<script lang=ts>
enum MODES {
    Login,
    Register,
};
</script>

<script setup lang="ts">
import { shallowRef, ref, watch } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';
const mode = ref(MODES.Login);
const currentComponent = shallowRef(Login);

watch(mode, () => {
    switch (mode.value) {
        case MODES.Login:
            currentComponent.value = Login;
            break;
        case MODES.Register:
            currentComponent.value = Register;
            break;
        default:
            currentComponent.value = Login;
    }
})
</script>