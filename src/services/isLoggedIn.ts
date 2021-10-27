import { createGlobalState, useIntervalFn, useStorage } from '@vueuse/core';

export const isLoggedIn = createGlobalState(
    () => useStorage('login-status', false),
)