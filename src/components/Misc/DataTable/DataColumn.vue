<template>
    <th
        class="p-2 border-b border-r last:border-r-0"
        :style="dynamicClasses"
        v-if="selectionMode === 'single'"
    >
    </th>
    <th
        class="p-2 border-b border-r last:border-r-0"
        :style="dynamicClasses"
        v-else-if="selectionMode === 'multi'"
    >
        <input type="checkbox" class="rounded" />
    </th>
    <th class="p-2 border-b border-r last:border-r-0" :style="dynamicClasses" v-else>{{ header }}</th>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ header?: string, field?: string, selectionMode?: "single" | "multi", headerStyle?: { [key: string]: string } }>();

const dynamicClasses = computed(() => {
    if (!props.headerStyle) return '';
    return Object.keys(props.headerStyle)
        .reduce<string[]>((prev, curr) =>
            [...prev, `${curr}: ${props.headerStyle![curr]}`]
            , [])
        .join(' ');
})
</script>
