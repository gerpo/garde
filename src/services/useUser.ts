import { RemoveableRef, createGlobalState, useIntervalFn, useStorage } from '@vueuse/core';

import { User } from '../models/User';
import axios from '../utils/axios';
import { isLoggedIn } from './isLoggedIn';
import { watch } from 'vue';

const logInState = isLoggedIn();

const userState = createGlobalState(
    () => useStorage('app-user', {}),
)()

async function fetchUser() {
    if (!logInState.value) return;
    await axios.get<{data: User}>('/api/user')
        .then(response => {
            userState.value = response.data.data
        })
}

export const periodicUserFetch = () => {
    useIntervalFn(async () => {
        if (Object.keys(logInState.value).length === 0) return;
        await fetchUser()
    }, 1000 * 60 *5)
}

export const useUser = () => {
    if (Object.keys(logInState.value).length === 0) fetchUser();

    watch(logInState, (value) => {if (!value) userState.value = null});

    return userState as RemoveableRef<User>
}