import { createGlobalState, useIntervalFn, useStorage } from '@vueuse/core';

export const useAuthState = createGlobalState(
    () => useStorage('login-status', false),
)