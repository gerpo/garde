<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center justify-end gap-1">
            <button
                class="p-1 text-sm bg-green-200 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-green-600"
                @click="showAddPermissionDialog = true"
                :title="$t('roles.add_permissions')"
            >
                <plus-icon class="w-5 h-5 fill-current" />
            </button>
            <button
                class="p-1 text-sm bg-red-200 border-2 border-red-400 rounded hover:bg-red-400 hover:text-white hover:border-red-600"
                @click="detachPermissions"
                :title="$t('roles.remove_permissions')"
            >
                <trash-icon class="w-5 h-5 fill-current" />
            </button>
        </div>
        <data-table
            :value="selectedRole?.permissions"
            v-if="selectedRole"
            stripedRows
            v-model:selection="permisssionsToDetach"
            data-key="id"
            responsiveLayout="scroll"
            class="p-datatable-sm"
        >
            <column selectionMode="multiple" :header-style="{ 'width': '1px' }" />
            <column field="name" :header="$t('roles.permission_name')" :sortable="true" />

            <template #empty>
                <div
                    class="p-2 text-center bg-gray-100 rounded bg-grey-200"
                >{{ $t('roles.no_permissions_role') }}</div>
            </template>
        </data-table>
    </div>

    <modal v-model:show="showAddPermissionDialog">
        <div class="flex flex-col gap-2">
            <h2 class="w-full pb-1 text-lg border-b-2">{{ $t('roles.permissions_header')}}</h2>
            <data-table
                :value="assignablePermissions"
                v-model:selection="permisssionsToAttach"
                stripedRows
                autoLayout
                class="border rounded p-datatable-sm"
            >
                <column selection-mode="multiple" :header-style="{ width: '3em' }" />
                <column field="name" :header="$t('roles.permission_name')" />
            </data-table>
            <button
                class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white"
                @click="attachPermissions"
            >{{ $t('roles.add_permissions_btn') }}</button>
        </div>
    </modal>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import Column from 'primevue/column';
import { Role } from '../../models/Role';
import DataTable from 'primevue/datatable';
import { useStore } from '../../services/store/store';
import { PlusIcon, TrashIcon } from '@heroicons/vue/solid';
import { RoleActionTypes } from '../../services/store/modules/roles/actions';

const props = defineProps<{ selectedRole: Role | null }>()

const store = useStore();


const permisssionsToDetach = ref<Permissions[]>([]);
const permisssionsToAttach = ref<Permissions[]>([]);
const showAddPermissionDialog = ref(false);
const permissions = computed(() => store.state.roleModule.permissions);
const assignablePermissions = computed(() => permissions.value.filter(value => !props.selectedRole?.permissions.map(p => p.name).includes(value.name)));

function attachPermissions() {
    store.dispatch(RoleActionTypes.AttachPermissions, { role: props.selectedRole, permissions: permisssionsToAttach.value })
    showAddPermissionDialog.value = false;
    permisssionsToAttach.value = [];
}
function detachPermissions() {
    store.dispatch(RoleActionTypes.DetachPermissions, { role: props.selectedRole, permissions: permisssionsToDetach.value })
    permisssionsToDetach.value = [];
}
</script>