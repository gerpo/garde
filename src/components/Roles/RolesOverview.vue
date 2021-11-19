<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center justify-end gap-1">
            <h3 class="mr-auto">{{ $t('roles.overview_headline') }}</h3>
            <button
                class="p-1 text-sm bg-green-200 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-green-600"
                @click="showCreateRoleDialog = true"
                :title="$t('roles.create_role')"
                v-if="$can(Rights.RolesCreate)"
            >
                <plus-icon class="w-5 h-5 fill-current" />
            </button>
            <button
                class="p-1 text-sm bg-red-200 border-2 border-red-400 rounded hover:bg-red-400 hover:tex t-white hover:border-red-600"
                @click="deleteRole"
                :title="$t('roles.delete_role')"
                v-if="$can(Rights.RolesDelete)"
            >
                <trash-icon class="w-5 h-5 fill-current" />
            </button>
        </div>
        <data-table
            :value="roles"
            stripedRows
            v-model:selection="selectedRole"
            selectionMode="single"
            data-key="id"
            responsiveLayout="scroll"
            class="p-datatable-sm"
            @row-select="emit('update:selectedRole', props.selectedRole)"
        >
            <column field="id" header="ID" :sortable="true" :header-style="{ 'width': '1px' }" />
            <column field="name" :header="$t('user.name_header')" :sortable="true" />
            <column
                field="members_count"
                :header="$t('roles.members_header')"
                :sortable="true"
                :header-style="{ 'width': '1px' }"
            />
        </data-table>
    </div>

    <modal v-model:show="showCreateRoleDialog">
        <create-role @user-created="showCreateRoleDialog = false" />
    </modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import Column from 'primevue/column';
import { Role } from '../../models/Role';
import CreateRole from './CreateRole.vue';
import DataTable from 'primevue/datatable';
import { Rights } from '../../models/Rights';
import { useStore } from '../../services/store/store';
import { RoleActionTypes } from '../../services/store/modules/roles/actions';
import { PlusIcon, TrashIcon } from '@heroicons/vue/solid';

const props = defineProps<{ selectedRole: Role | null }>();
const emit = defineEmits(['update:selectedRole']);

const store = useStore();

const showCreateRoleDialog = ref(false);
const roles = computed(() => store.state.roleModule.roles);

function deleteRole() {
    store.dispatch(RoleActionTypes.DeleteRole, props.selectedRole);
}
</script>