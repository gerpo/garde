<template>
    <div class="flex flex-col gap-2">
        <h2 class="w-full pt-2 pb-1 text-lg border-b-2">{{ $t('roles.role_detail_headline') }}</h2>
        <div
            class="p-2 text-center bg-gray-100 rounded bg-grey-200"
            v-if="!selectedRole"
        >{{ $t('roles.select_role') }}</div>

        <accordion :multiple="true" v-if="selectedRole" :activeIndex="[0]">
            <accordion-tab :header="$t('roles.members_header')" v-if="$can(Rights.RolesMembers)">
                <role-members :selected-role="selectedRole" />
            </accordion-tab>
            <accordion-tab
                :header="$t('roles.permissions_header')"
                v-if="$can(Rights.RolesPermisssions)"
            ></accordion-tab>
        </accordion>
    </div>
</template>

<script setup lang="ts">
import { Role } from '../../models/Role';
import { Rights } from '../../models/Rights';
import Accordion from 'primevue/accordion';
import RoleMembers from './RoleMembers.vue';
import AccordionTab from 'primevue/accordiontab';

defineProps<{ selectedRole: Role | null }>();
</script>