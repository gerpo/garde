<template>
    <div class="flex flex-col gap-2">
        <h1 class="w-full pb-1 text-lg border-b-2">{{ $t('roles.roles_headline') }}</h1>
        <roles-overview v-model:selected-role="selectedRole" />
        <role-details :selected-role="selectedRole" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Role } from '../../models/Role';
import RoleDetails from './RoleDetails.vue';
import RolesOverview from './RolesOverview.vue';
import { useStore } from '../../services/store/store';
import { RoleActionTypes } from '../../services/store/modules/roles/actions';

const store = useStore();

const selectedRole = ref<Role | null>(null);

onMounted(() => {
    store.dispatch(RoleActionTypes.LoadRoles);
    store.dispatch(RoleActionTypes.LoadPermissions);
    store.dispatch(RoleActionTypes.LoadUsers)
})

</script>