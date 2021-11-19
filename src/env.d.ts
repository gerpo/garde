/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
import { ComponentCustomProperties } from 'vue';
import { Rights } from './models/Rights';

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $can: (permission: Rights) => boolean;
    $canAny: (permissions: Rights[]) => boolean;
  }
}