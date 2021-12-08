<template>
    <div class="flex flex-col gap-2">
        <h2 class="w-full pt-2 pb-1 text-lg border-b-2">
            {{ $t('roles.role_detail_headline') }}
            <span
                v-if="selectedRole"
                class="ml-1"
            >({{ selectedRole.name }})</span>
        </h2>
        <div
            class="p-2 text-center bg-gray-100 rounded bg-grey-200"
            v-if="!selectedRole"
        >{{ $t('roles.select_role') }}</div>

        <accordion :multiple="true" v-if="selectedRole" :activeIndex="[0]">
            <accordion-tab v-if="$can(Rights.RolesMembers)">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <h3 class>{{ $t('roles.members_header') }}</h3>
                        <span class="p-1 bg-gray-200 rounded">{{ selectedRole.members.length }}</span>
                    </div>
                </template>
                <role-members :selected-role="selectedRole" />
            </accordion-tab>
            <accordion-tab v-if="$can(Rights.RolesPermisssions)">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <h3 class>{{ $t('roles.permissions_header') }}</h3>
                        <span class="p-1 bg-gray-200 rounded">{{ selectedRole.permissions.length }}</span>
                    </div>
                </template>
                <role-permissions :selected-role="selectedRole" />
            </accordion-tab>
        </accordion>
    </div>
</template>

<script setup lang="ts">
import { Role } from '../../models/Role';
import { Rights } from '../../models/Rights';
import Accordion from 'primevue/accordion';
import RoleMembers from './RoleMembers.vue';
import AccordionTab from 'primevue/accordiontab';
import RolePermissions from './RolePermissions.vue';

defineProps<{ selectedRole: Role | null }>();
</script>