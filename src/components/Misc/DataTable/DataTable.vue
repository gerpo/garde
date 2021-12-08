<template>
    <div>
        <table class="w-full border border-separate rounded">
            <thead class="overflow-hidden text-left">
                <tr>
                    <slot></slot>
                </tr>
            </thead>
            <tbody v-if="values.length > 0">
                <tr
                    v-for="row, i in values"
                    class="p-2 hover:bg-muted hover:text-white"
                    :class="{ 'bg-green-200': selectedRows[i] }"
                >
                    <td
                        class="px-2 py-1 -mr-1 border-b border-r last:border-r-0"
                        v-for="col in $slots.default()"
                        @click="toggleRowSelection(i)"
                        v-html="createBody(row, col)"
                    ></td>
                </tr>
            </tbody>
            <tfoot>
                <slot name="empty" v-if="values.length === 0">No Elements</slot>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue';

const props = defineProps<{ values: any[], singleSelection?: boolean }>()

const selectedRows = ref<boolean[]>([]);

onMounted(() => {
    selectedRows.value.fill(false, 0, props.values.length)
})

function toggleRowSelection(index: number) {
    if (!props.singleSelection) return;
    selectedRows.value = selectedRows.value.map((value, i) => i === index ? value : false);
    selectedRows.value[index] = !selectedRows.value[index];
}

function createBody(row: any, col: any) {
    if (col.props?.["selection-mode"] === 'single'){
        return `<input type="radio"  v-model="selectedRows[i]" />`
    }
    if (col.props?.["selection-mode"]  === 'multi'){
        return `<input type="checkbox" v-model="selectedRows[i]" />`
    }

    return row[col.props?.field]
}
</script>

<style scoped>
table {
    border-spacing: 0;
}
tr:last-child td {
    @apply border-b-0;
}
</style>