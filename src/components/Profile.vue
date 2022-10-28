<template>
    <div class="flex flex-col gap-2">
        <h1 class="text-lg border-b-2">Your Profile</h1>
        <div class="flex flex-wrap gap-8 mt-4 lg:flex-nowrap">
            <div class="flex flex-col items-center gap-2">
                <div
                    class="relative flex-grow-0 flex-shrink-0 w-48 h-48 mx-auto overflow-hidden border-2 border-red-600 rounded-full lg:self-auto group"
                >
                    <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        class="hidden"
                        ref="profilePicture"
                        @change="test"
                        accept="image/png, image/gif, image/jpeg"
                    />
                    <img
                        :src="`https://eu.ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&size=192&background=ee2c27`"
                        alt="profile image"
                        class="absolute"
                    />
                    <button
                        @click="profilePicture?.click"
                        class="absolute items-center justify-center hidden w-full h-full text-white transition-opacity bg-black bg-opacity-30 group-hover:flex"
                    >Change</button>
                </div>
                <div class="flex flex-col items-center">
                    <h3>Points</h3>
                    <div class="p-2 text-2xl border-2 border-green-200 rounded bg-green-50">45</div>
                </div>
                <div class="flex flex-col items-center">
                    <h3>Punishments</h3>
                    <div class="p-2 text-2xl border-2 border-red-200 rounded bg-red-50">10,45 €</div>
                </div>
            </div>
            <div class="flex flex-col w-full gap-2" v-if="user">
                <div class="flex justify-end">
                    <h2 class="mr-auto">General Info</h2>
                    <button
                        @click="generalInfoEditMode = !generalInfoEditMode"
                        class="p-1 rounded"
                        :class="{ 'bg-green-400': generalInfoEditMode }"
                    >
                        <transition mode="out-in">
                            <pencil-icon class="w-5 h-5 fill-current" v-if="!generalInfoEditMode" />
                            <div class="flex items-center gap-1 text-sm" v-else>
                                <check-icon class="w-5 h-5 fill-current" />
                            </div>
                        </transition>
                    </button>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="firstName" class="ml-1 -mb-1 text-xs text-gray-600">First Name</label>
                    <inplace-text-edit
                        v-model="user.firstName"
                        v-model:editMode="generalInfoEditMode"
                        id="firstName"
                        name="firstName"
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="lastName" class="ml-1 -mb-1 text-xs text-gray-600">Last Name</label>
                    <inplace-text-edit
                        v-model="user.lastName"
                        v-model:editMode="generalInfoEditMode"
                        id="lastName"
                        name="lastName"
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="phone" class="ml-1 -mb-1 text-xs text-gray-600">Telephone</label>
                    <inplace-text-edit
                        v-model="user.phone"
                        v-model:editMode="generalInfoEditMode"
                        id="phone"
                        name="phone"
                        type="tel"
                    />
                </div>
                <div class="flex items-center justify-end">
                    <h2 class="mr-auto">Email</h2>
                    <button
                        @click="emailEditMode = !emailEditMode"
                        class="p-1 rounded disabled:bg-red-400 disabled:cursor-not-allowed"
                        :class="{ 'bg-green-400': emailEditMode }"
                        :disabled="emailEditMode && emailConfirmation !== user.email"
                    >
                        <transition mode="out-in">
                            <pencil-icon class="w-5 h-5 fill-current" v-if="!emailEditMode" />
                            <div class="flex items-center gap-1 text-sm" v-else>
                                <check-icon class="w-5 h-5 fill-current" />
                            </div>
                        </transition>
                    </button>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email" class="ml-1 -mb-1 text-xs text-gray-600">Email</label>
                    <inplace-text-edit
                        v-model="user.email"
                        v-model:editMode="emailEditMode"
                        id="email"
                        name="email"
                        type="email"
                    />
                </div>
                <div class="flex flex-col gap-1" v-if="emailEditMode">
                    <label for="email" class="ml-1 -mb-1 text-xs text-gray-600">Email Confirmation</label>
                    <inplace-text-edit
                        v-model="emailConfirmation"
                        v-model:editMode="emailEditMode"
                        id="email_confirmation"
                        name="email_confirmation"
                        type="email"
                    />
                </div>
                <div class="flex items-center justify-end">
                    <h2 class="mr-auto">Password</h2>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-col gap-1">
                        <label
                            for="email"
                            class="ml-1 -mb-1 text-xs text-gray-600 sr-only"
                        >Current Password</label>
                        <input
                            class="w-full px-1 py-1 mb-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded focus:z-10 focus:ring-red-500 focus:border-red-500"
                            v-model="passwordUpdate.current_password"
                            id="email_confirmation"
                            name="email_confirmation"
                            type="password"
                            placeholder="Current Password"
                        />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label
                            for="email"
                            class="ml-1 -mb-1 text-xs text-gray-600 sr-only"
                        >New Password</label>
                        <input
                            class="w-full px-1 py-1 -mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t focus:z-10 focus:ring-red-500 focus:border-red-500"
                            v-model="passwordUpdate.password"
                            id="email_confirmation"
                            name="email_confirmation"
                            type="password"
                            placeholder="New Password"
                        />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label
                            for="email"
                            class="ml-1 -mb-1 text-xs text-gray-600 sr-only"
                        >New Password Confirmation</label>
                        <input
                            class="w-full px-1 py-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b focus:z-10 focus:ring-red-500 focus:border-red-500"
                            v-model="passwordUpdate.password_confirmation"
                            id="email_confirmation"
                            name="email_confirmation"
                            type="password"
                            placeholder="Confirm New Password"
                        />
                    </div>
                </div>
                <button
                    class="self-end p-2 text-sm bg-green-100 border-2 border-green-600 rounded"
                    @click="test"
                >Change Password</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from '../services/store/store'
import { PencilIcon, CheckIcon } from '@heroicons/vue/solid';
import InplaceTextEdit from './Misc/InplaceTextEdit.vue';
import { User } from '../models/User';
import { ActionTypes } from '../services/store/actions';
const store = useStore()

const storeUser = computed(() => store.state.user)
const user = ref<User & { email_confirmation?: string } | null>(null)
const generalInfoEditMode = ref(false)
const emailEditMode = ref(false)
const profilePicture = ref<HTMLInputElement | null>(null);
const emailConfirmation = ref('')
const passwordUpdate = reactive({ current_password: '', password: '', password_confirmation: '' });

watch(storeUser, (value) => {
    if (value) { user.value = JSON.parse(JSON.stringify(value)) }
})

watch(generalInfoEditMode, (value, oldValue) => {
    if (value != oldValue && !value) { store.dispatch(ActionTypes.UpdateProfile, user.value) }
})

watch(emailEditMode, (value, oldValue) => {
    if (value != oldValue && !value && user.value) {
        user.value.email_confirmation = emailConfirmation.value
        store.dispatch(ActionTypes.UpdateProfile, user.value)
    }
})

onMounted(() => {
    store.dispatch(ActionTypes.LoadUser)
})

function test(event: any) {
    store.dispatch(ActionTypes.UpdatePassword, passwordUpdate)
}


</script>