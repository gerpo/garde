
import { ComponentCustomProperties } from 'vue';
import { Rights } from './models/Rights';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $can: (permission: Rights) => boolean;
        $canAny: (permissions: Rights[]) => boolean;
    }
}

declare module 'vue-router' {
    interface RouteMeta {
        permissions?: Rights[]
    }
}