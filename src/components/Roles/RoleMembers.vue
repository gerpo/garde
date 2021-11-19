<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center justify-end gap-1">
            <button
                class="p-1 text-sm bg-green-200 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-green-600"
                @click="showAddUsersDialog = true"
                :title="$t('roles.add_permissions')"
            >
                <plus-icon class="w-5 h-5 fill-current" />
            </button>
            <button
                class="p-1 text-sm bg-red-200 border-2 border-red-400 rounded hover:bg-red-400 hover:text-white hover:border-red-600"
                @click="removeUsers"
                :title="$t('roles.remove_permissions')"
            >
                <trash-icon class="w-5 h-5 fill-current" />
            </button>
        </div>
        <data-table
            :value="selectedRole?.members"
            v-if="selectedRole"
            stripedRows
            v-model:selection="usersToRemove"
            data-key="id"
            responsiveLayout="scroll"
            class="p-datatable-sm"
        >
            <column selectionMode="multiple" :header-style="{ 'width': '1px' }" />
            <column field="lastName" :header="$t('user.lastname_header')" :sortable="true" />
            <column field="firstName" :header="$t('user.firstname_header')" :sortable="true" />
            <column field="email" :header="$t('user.email_header')" :sortable="true" />

            <template #empty>
                <div
                    class="p-2 text-center bg-gray-100 rounded bg-grey-200"
                >{{ $t('roles.no_member_role') }}</div>
            </template>
        </data-table>
    </div>

    <modal v-model:show="showAddUsersDialog">
        <div class="flex flex-col gap-2">
            <h2 class="w-full pb-1 text-lg border-b-2">Add New Users</h2>
            <data-table
                :value="users"
                v-model:selection="usersToAdd"
                stripedRows
                autoLayout
                class="border rounded p-datatable-sm"
            >
                <column selectionMode="multiple" :header-style="{ 'width': '1px' }" />
                <column field="lastName" header="Lastname" :sortable="true" />
                <column field="firstName" header="Firstname" :sortable="true" />
                <column field="email" header="Email" :sortable="true" />
            </data-table>
            <button
                class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white"
                @click="true"
            >Add</button>
        </div>
    </modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import Column from 'primevue/column';
import { Role } from '../../models/Role';
import { User } from '../../models/User';
import DataTable from 'primevue/datatable';
import { useStore } from '../../services/store/store';

defineProps<{ selectedRole: Role | null }>()

const store = useStore();

const showAddUsersDialog = ref(false);
const usersToAdd = ref<User[]>([])
const usersToRemove = ref<User[]>([])
const users = computed(() => store.state.roleModule.users);

function removeUsers() { }
</script> 