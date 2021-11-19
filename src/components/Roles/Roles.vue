<template>
    <div class="flex flex-col gap-2">
        <h1 class="w-full pt-2 pb-1 text-lg border-b-2">{{ $t('roles.roles_headline') }}</h1>
        <roles-overview v-model:selected-role="selectedRole" />

        <h2 class="w-full pt-2 pb-1 text-lg border-b-2">{{ $t('roles.role_detail_headline') }}</h2>
        <div
            class="p-2 text-center bg-gray-100 rounded bg-grey-200"
            v-if="!selectedRole"
        >{{ $t('roles.select_role') }}</div>

        <accordion :multiple="true" v-if="selectedRole" :activeIndex="[0]">
            <accordion-tab :header="$t('roles.members_header')" v-if="$can(Rights.RolesMembers)">
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
                            @click="detachPermissions"
                            :title="$t('roles.remove_permissions')"
                        >
                            <trash-icon class="w-5 h-5 fill-current" />
                        </button>
                    </div>
                    <data-table
                        :value="selectedRole?.members"
                        v-if="selectedRole"
                        stripedRows
                        v-model:selection="permisssionsToDetach"
                        data-key="id"
                        responsiveLayout="scroll"
                        class="p-datatable-sm"
                    >
                        <column selectionMode="multiple" :header-style="{ 'width': '1px' }" />
                        <column
                            field="lastName"
                            :header="$t('user.lastname_header')"
                            :sortable="true"
                        />
                        <column
                            field="firstName"
                            :header="$t('user.firstname_header')"
                            :sortable="true"
                        />
                        <column field="email" :header="$t('user.email_header')" :sortable="true" />

                        <template #empty>
                            <div
                                class="p-2 text-center bg-gray-100 rounded bg-grey-200"
                            >{{ $t('roles.no_member_role') }}</div>
                        </template>
                    </data-table>
                </div>
            </accordion-tab>
            <accordion-tab
                :header="$t('roles.permissions_header')"
                v-if="$can(Rights.RolesPermisssions)"
            >
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-end gap-1">
                        <button
                            class="p-1 text-sm bg-green-200 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-green-600"
                            @click="showAddPermissionDialog = true"
                            title="Add Permissions"
                        >
                            <plus-icon class="w-5 h-5 fill-current" />
                        </button>
                        <button
                            class="p-1 text-sm bg-red-200 border-2 border-red-400 rounded hover:bg-red-400 hover:text-white hover:border-red-600"
                            @click="detachPermissions"
                            title="Remove Permissions"
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
                        <column field="name" header="Name" :sortable="true" />

                        <template #empty>
                            <div
                                class="p-2 text-center bg-gray-100 rounded bg-grey-200"
                            >Role has no permissions.</div>
                        </template>
                    </data-table>
                </div>
            </accordion-tab>
        </accordion>
    </div>

    <modal v-model:show="showAddPermissionDialog">
        <div class="flex flex-col gap-2">
            <h2 class="w-full pb-1 text-lg border-b-2">Permissions</h2>
            <data-table
                :value="assignablePermissions"
                v-model:selection="permisssionsToAttach"
                stripedRows
                autoLayout
                class="border rounded p-datatable-sm"
            >
                <column selection-mode="multiple" :header-style="{ width: '3em' }" />
                <column field="name" header="Name" />
            </data-table>
            <button
                class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white"
                @click="attachPermissions"
            >Add</button>
        </div>
    </modal>
    <modal v-model:show="showAddUsersDialog">
        <div class="flex flex-col gap-2">
            <h2 class="w-full pb-1 text-lg border-b-2">Add New Users</h2>
            <data-table
                :value="users"
                v-model:selection="permisssionsToAttach"
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
import { Rights } from '../../models/Rights';
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../../services/store/store';
import { RoleActionTypes } from '../../services/store/modules/roles/actions';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import RolesOverview from './RolesOverview.vue';
import Modal from '../Modal.vue';
import { Role } from '../../models/Role';
import { PlusIcon, TrashIcon } from '@heroicons/vue/solid';

const store = useStore();

const selectedRole = ref<Role | null>(null);
const permisssionsToDetach = ref<Permissions[]>([]);
const permisssionsToAttach = ref<Permissions[]>([]);
const showAddPermissionDialog = ref(false);
const showAddUsersDialog = ref(false);



const permissions = computed(() => store.state.roleModule.permissions);
const assignablePermissions = computed(() => permissions.value.filter(value => !selectedRole.value?.permissions.map(p => p.name).includes(value.name)));
const users = computed(() => store.state.roleModule.users);


onMounted(() => {
    store.dispatch(RoleActionTypes.LoadRoles);
    store.dispatch(RoleActionTypes.LoadPermissions);
    store.dispatch(RoleActionTypes.LoadUsers)
})



function attachPermissions() {
    store.dispatch(RoleActionTypes.AttachPermissions, { role: selectedRole.value, permissions: permisssionsToAttach.value })
    showAddPermissionDialog.value = false;
    permisssionsToAttach.value = [];
}
function detachPermissions() {
    store.dispatch(RoleActionTypes.DetachPermissions, { role: selectedRole.value, permissions: permisssionsToDetach.value })
    permisssionsToDetach.value = [];
}
</script>