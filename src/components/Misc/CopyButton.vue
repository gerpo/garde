<template>
    <button class="p-1 border border-gray-600 rounded hover:bg-gray-400" @click="copyValue(value)" :title="!copied ? 'Copy code' : 'Code copied'">
        <transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out transform"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-100 ease-in transform"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <clipboard-copy-icon class="w-5 h-5" v-if="!copied" />
            <clipboard-check-icon class="w-5 h-5" v-else />
        </transition>
    </button>
</template>
<script setup lang=ts>
import { ClipboardCopyIcon, ClipboardCheckIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
import { useTimeoutFn } from '@vueuse/core'

defineProps<{ value: any }>()

const copied = ref(false);

function copyValue(code: any) {
    navigator.clipboard.writeText(code)
    copied.value = true
    useTimeoutFn(() => copied.value = false, 700);
}


</script>