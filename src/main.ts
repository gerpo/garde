import './index.css'
import "vue-toastification/dist/index.css";
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';

import Toast, { PluginOptions } from "vue-toastification";
import { loadLocaleMessages, setupI18n } from './services/i18n/i18n'

import App from './App.vue'
import PrimeVue from 'primevue/config';
import { Rights } from './models/Rights';
import { createApp } from 'vue';
import router from './services/router'
import { store } from './services/store/store';

if (process.env.NODE_ENV === 'development') {
    //    const { worker } = await import('./mocks/browser')
    //    worker.start()
}

const locale = navigator.language.split('-')[0];
const i18n = setupI18n({
    locale: locale,
    fallbackLocale: 'en',
})

loadLocaleMessages(i18n, locale);

const toastOptions: PluginOptions = {
    // You can set your default options here
};

const app = createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .use(Toast, toastOptions)
    .use(PrimeVue);

app.config.globalProperties.$can = (permission: Rights) => store.getters.userCan(permission);
app.config.globalProperties.$canAny = (permission: Rights) => store.getters.userCanAny(permission);

app.mount('#app');
