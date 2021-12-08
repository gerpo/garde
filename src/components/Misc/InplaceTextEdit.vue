<template>
    <div class="container">
        <p
            class="w-full px-1 py-1 border border-transparent rounded"
            v-if="!editMode"
            v-html="modelValue"
        ></p>
        <input
            :type="type"
            :name="name"
            :id="id"
            class="w-full px-1 py-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
            v-if="editMode"
            :value="modelValue"
            @input="emitChanges"
        />
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: string, editMode: boolean, name?: string, id?: string, type: 'text' | 'tel' | 'email' | 'password' | 'datetime-local' }>(), { type: 'text' });
const emit = defineEmits(['update:modelValue', 'update:editMode'])

function emitChanges(event: Event) {
    emit('update:modelValue', (<HTMLInputElement>event.target).value);
}
</script>