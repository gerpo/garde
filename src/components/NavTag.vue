<template>
    <div
        class="flex items-center justify-center px-3 py-1 text-xs text-gray-500 bg-gray-700 rounded"
    >{{ count }}</div>
</template>

<script setup lang="ts">
defineProps<{ count: number }>();
</script>