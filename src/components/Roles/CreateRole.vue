<template>
    <div class="flex flex-col gap-2">
        <h2 class="w-full pb-1 text-lg border-b-2">{{ $t('roles.create_role') }}</h2>
        <input
            type="text"
            v-model="newRole.name"
            class="w-full rounded"
            :placeholder="$t('roles.new_role_name')"
        />
        <button
            class="p-2 text-sm bg-green-100 border-2 border-green-600 rounded hover:bg-green-400 hover:text-white"
            @click="createNewRole"
        >{{ $t('roles.create_role_btn') }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';  
import { RoleActionTypes } from '../../services/store/modules/roles/actions';
import { useStore } from '../../services/store/store';

const emit = defineEmits(['userCreated']);

const store = useStore();

const newRole = ref({ name: '' });

function createNewRole() {
    store.dispatch(RoleActionTypes.CreateRole, newRole.value);
    newRole.value.name = '';
    emit('userCreated', true)
}
</script>