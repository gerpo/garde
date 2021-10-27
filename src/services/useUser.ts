import { RemoveableRef, createGlobalState, useIntervalFn, useStorage } from '@vueuse/core';
import { ref, watch } from 'vue';

import { AxiosError } from 'axios';
import { User } from '../models/User';
import axios from '../utils/axios';
import { useAuthState } from './isLoggedIn';

const isLoggedIn = useAuthState();

const userState = createGlobalState(
    () => useStorage('app-user', {} as User),
)()

async function fetchUser() {
    await axios.get<{ data: User }>('/api/user')
        .then(response => {
            userState.value = response.data.data
        })
}



export const periodicUserFetch = () => {
    watch(isLoggedIn, (value) => { if (!value) userState.value = {} as User });

    useIntervalFn(async () => {
        if (!isLoggedIn.value) return;
        await fetchUser()
    }, 1000 * 60 * 5)
}

export const useUser = () => {


    const status = ref<'loading' | 'refreshing' | 'success' | 'error'>('loading');
    const error = ref('');
    const fetchUser = async () => {
        status.value = (Object.keys(userState.value).length === 0) ? 'loading' : 'refreshing';
        await axios.get<{ data: User }>('/api/user')
            .then(response => {
                status.value = 'success'
                userState.value = response.data.data
            }).catch((err: Error | AxiosError) => {
                status.value = 'error';
                error.value = err.message;
            })
    }

    fetchUser()

    return { status, userState, error, fetchUser }
}