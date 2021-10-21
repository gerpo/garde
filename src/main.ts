import { createApp } from 'vue';
import { setupI18n, loadLocaleMessages } from './services/i18n/i18n'
import router from './services/router'

import App from './App.vue'
import './index.css'

import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    worker.start()
}

const locale = navigator.language.split('-')[0];
const i18n = setupI18n({
    locale: locale,
    fallbackLocale: 'en',
})

loadLocaleMessages(i18n, locale);

const options: PluginOptions = {
    // You can set your default options here
};

createApp(App)
    .use(router)
    .use(i18n)
    .use(Toast, options)
    .mount('#app')
