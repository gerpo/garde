import { defineComponent, h, onMounted, ref, toRef } from 'vue';

export default defineComponent({
    name: 'DataTable',
    props: {
        values: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const selectedRows = ref<boolean[]>([]);
        const values = toRef(props, 'values');

        onMounted(() => {
            selectedRows.value = values.value.map((value, i) => false);
        })

        function toggleRowSelection(index: number) {
            console.log(index);
            selectedRows.value = selectedRows.value.map((value, i) => i === index ? value : false);
            selectedRows.value[index] = !selectedRows.value[index];
        }

        return { selectedRows, toggleRowSelection };
    },
    render() {

        if (!this.$slots.default || this.$slots.default().length === 0) return h('p', 'Error')

        const footerContent = this.$slots.empty ? this.$slots.empty() : ['No Elements']
        const footer = this.values.length === 0 ? h('tfoot', {}, footerContent) : null


        const tbody = h('tbody',
            {},
            this.values.map((row, i) =>
                h('tr',
                    {
                        class: 'hover:bg-green-50',
                    },
                    this.$slots.default!().map(col =>
                        h('td',
                            { onClick: () => { console.log('click click'); this.toggleRowSelection(i) }},
                            row[col.props?.field])))))

        return h('div',
            h('table', { 'class': 'w-full border border-separate rounded' }, [
                h('thead',
                    h('tr', {}, this.$slots.default())
                ),
                tbody,
                footer
            ])
        )
    }
})



function buildCellContent(row: any, col: any, i: number, $this: any) {
    if (!col.props['selection-mode']) return row[col.props?.field];

    if (col.props['selection-mode'] === 'single') {
        console.log('radio')
        return h('input',
            {
                type: 'radio',
                name: 'selection',
                class: 'rounded',
                modelValue: $this.selectedRows[i],
                'onUpdate:modelValue': value => $this.$emit('update:modelValue', value)
            });
    }

    if (col.props['selection-mode'] === 'multi') {
        console.log('check')
        return h('input',
            {
                type: 'checkbox',
                class: 'rounded',
                modelValue: $this.selectedRows[i],
                'onUpdate:modelValue': value => $this.$emit('update:modelValue', value)
            });
    }
}