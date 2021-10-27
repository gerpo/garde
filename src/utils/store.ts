import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
    () => useStorage('app-state', {}),
)