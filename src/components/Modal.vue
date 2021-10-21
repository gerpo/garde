<template>
    <teleport to="body">
        <transition
            enter-active-class="transition duration-200 ease-out transform"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in transform"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                ref="modal-backdrop"
                class="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
                v-show="show"
            >
                <div class="flex items-start justify-center min-h-screen pt-4 text-center sm:pt-24">
                    <transition
                        enter-active-class="transition duration-300 ease-out transform "
                        enter-from-class="scale-95 translate-y-10 opacity-0"
                        enter-to-class="scale-100 translate-y-0 opacity-100"
                        leave-active-class="duration-200 ease-in"
                        leave-from-class="scale-100 translate-y-0 opacity-100"
                        leave-to-class="scale-95 translate-y-0 translate-y-10 opacity-0"
                    >
                        <div
                            class="relative w-11/12 p-4 overflow-hidden text-left bg-white rounded-lg shadow-xl sm:p-8 md:max-w-prose"
                            role="dialog"
                            ref="modal"
                            aria-modal="true"
                            v-show="show"
                            aria-labelledby="modal-headline"
                        >
                            <div class="absolute top-0 right-0 m-2">
                                <button @click="closeModal">
                                    <x-icon class="w-5 h-5 fill-current" />
                                </button>
                            </div>
                            <slot></slot>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { onClickOutside, onKeyDown } from '@vueuse/core';
import { XIcon } from '@heroicons/vue/solid'

const props = withDefaults(defineProps<{ show: boolean }>(), { show: false });
const emit = defineEmits(['update:show'])

const modal = ref(null);

function closeModal() {
    return emit('update:show', false)
};

function scrollBarWidth(){
    return window.innerWidth - document.documentElement.clientWidth;
}

watch(() => props.show, (value) => {
    if (value) {
        document.body.style.paddingRight = `${scrollBarWidth()}px`;
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'initial'
        document.body.style.paddingRight = '0';
    };
})

onClickOutside(modal, closeModal)
onKeyDown('Escape', closeModal);
</script>