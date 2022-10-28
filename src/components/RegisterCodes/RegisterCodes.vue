<template>
    <div class="flex flex-col gap-2">
        <h1 class="w-full pb-1 text-lg border-b-2">{{ $t('registerCodes.register_codes_headline') }}</h1>
        <div class="flex items-center justify-end w-full gap-1">
            <h2 class="mr-auto">{{ $t('registerCodes.overview_headline') }}</h2>
            <button
                class="p-1 text-sm bg-green-200 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                :title="$t('registerCodes.create_code')"
                @click="createRegisterCode"
                v-if="$can(Rights.RegisterCodesCreate)"
                :disabled="isCreatingRegisterCode"
            >
                <transition mode="out-in">
                    <spinner
                        class="w-5 h-5 fill-current animate-spin"
                        v-if="isCreatingRegisterCode"
                    />
                    <plus-icon class="w-5 h-5 fill-current" v-else />
                </transition>
            </button>
            <button
                class="p-1 text-sm bg-red-200 border-2 border-red-400 rounded hover:bg-red-400 hover:tex t-white hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                :title="$t('registerCodes.delete_code')"
                @click="deleteRegisterCode"
                :disabled="!selectedCode"
                v-if="$can(Rights.RegisterCodesDelete)"
            >
                <trash-icon class="w-5 h-5 fill-current" />
            </button>
        </div>
        <data-table
            :value="codes"
            selectionMode="single"
            v-model:selection="selectedCode"
            responsiveLayout="scroll"
            class="p-datatable-sm"
        >
            <template #empty>
                <div
                    class="p-2 text-center bg-gray-100 rounded"
                >{{ $t('registerCodes.no_current_codes') }}</div>
            </template>

            <column field="code" :header="$t('registerCodes.code_header')" body-class="font-mono" />
            <column header="Roles" :header-style="{ width: '1px' }">
                <template #body="slotProps">{{ slotProps.data.roles.length }}</template>
            </column>
            <column :header-style="{ width: '1px' }">
                <template #body="slotProps">
                    <copy-button :value="slotProps.data.code" />
                </template>
            </column>
        </data-table>

        <h2 class="w-full pt-2 pb-1 text-lg border-b-2">
            {{ $t('registerCodes.code_details_headline') }}
            <span
                v-if="selectedCode"
                class="ml-1"
            >({{ selectedCode.code }})</span>
        </h2>
        <div
            class="p-2 text-center bg-gray-100 rounded bg-grey-200"
            v-if="!selectedCode"
        >{{ $t('registerCodes.select_code') }}</div>

        <div class="flex items-center justify-end w-full gap-1" v-if="selectedCode">
            <h3 class="mr-auto">{{ $t('registerCodes.roles_headline') }}</h3>
            <button
                class="p-1 text-sm bg-green-200 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-green-600"
                :title="$t('registerCodes.add_roles')"
                @click="showAddRolesDialog = true"
                v-if="$can(Rights.RegisterCodesRoles)"
            >
                <plus-icon class="w-5 h-5 fill-current" />
            </button>
            <button
                class="p-1 text-sm bg-red-200 border-2 border-red-400 rounded hover:bg-red-400 hover:tex t-white hover:border-red-600"
                :title="$t('registerCodes.remove_roles')"
                @click="detachPermissions"
                v-if="$can(Rights.RegisterCodesRoles)"
            >
                <trash-icon class="w-5 h-5 fill-current" />
            </button>
        </div>

        <data-table
            v-if="selectedCode"
            :value="selectedCode.roles"
            selectionMode="single"
            v-model:selection="selectedRoles"
            responsiveLayout="scroll"
            class="p-datatable-sm"
        >
            <template #empty>
                <div
                    class="p-2 text-center bg-gray-100 rounded"
                >{{ $t('registerCodes.no_roles_assigned') }}</div>
            </template>
            <column selection-mode="multiple" :header-style="{ width: '1px' }" />
            <column field="name" :header="$t('registerCodes.role_name')" />
        </data-table>
    </div>

    <modal v-model:show="showAddRolesDialog">
        <div class="flex flex-col gap-2">
            <h2 class="w-full pb-1 text-lg border-b-2">{{ $t('registerCodes.roles_headline') }}</h2>
            <data-table
                :value="assignableRoles"
                v-model:selection="rolesToAttach"
                stripedRows
                autoLayout
                class="border rounded p-datatable-sm"
            >
                <column selection-mode="multiple" :header-style="{ width: '3em' }" />
                <column field="name" :header="$t('registerCodes.role_name')" />
            </data-table>
            <button
                class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white"
                @click="attachRoles"
            >{{ $t('registerCodes.add_roles_btn') }}</button>
        </div>
    </modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RegisterCodesActionTypes } from '../../services/store/modules/register-codes/actions';
import { useStore } from '../../services/store/store';
import { Rights } from '../../models/Rights';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { PlusIcon, TrashIcon } from '@heroicons/vue/solid';
import CopyButton from '../Misc/CopyButton.vue';
import { RegisterCode } from '../../models/RegisterCode';
import Spinner from '../../assets/spinner.svg?component';
import { Role } from '../../models/Role';
import Modal from '../Modal.vue';

const store = useStore();
const codes = computed(() => store.state.registerCodesModule.registerCodes);
const roles = computed(() => store.state.registerCodesModule.roles);
const assignableRoles = computed(() => roles.value);
const isCreatingRegisterCode = computed(() => store.state.registerCodesModule.isCreatingRegisterCode);
const rolesToAttach = ref<Role[]>();
const selectedCode = ref<RegisterCode | null>(null);
const selectedRoles = ref<Role[]>([]);
const showAddRolesDialog = ref(false);

onMounted(() => {
    store.dispatch(RegisterCodesActionTypes.LoadRegisterCodesRoles);
})

function createRegisterCode() {
    store.dispatch(RegisterCodesActionTypes.CreateRegisterCode)
}

function deleteRegisterCode() {
    store.dispatch(RegisterCodesActionTypes.DeleteRegisterCode, selectedCode.value)
    selectedCode.value = null;
}
function attachRoles() {
    store.dispatch(RegisterCodesActionTypes.AttachRoles, { registerCode: selectedCode.value, roles: rolesToAttach.value })
    showAddRolesDialog.value = false;
    rolesToAttach.value = [];
}
function detachPermissions() {
    store.dispatch(RegisterCodesActionTypes.DetachRoles, { registerCode: selectedCode.value, roles: selectedRoles.value })
    selectedRoles.value = [];
}
</script>