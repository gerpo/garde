import { nextTick, WritableComputedRef } from 'vue';
import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import en_messages from './translations/en.json';
import de_messages from './translations/de.json';

export const SUPPORT_LOCALES = ['en', 'de'];

export function setupI18n(options: I18nOptions = { locale: 'en', legacy: false }) {
    const i18n = createI18n(options);
    setI18nLanguage(i18n, options.locale!)
    i18n.global.setLocaleMessage('en', en_messages)
    i18n.global.setLocaleMessage('de', de_messages)
    //loadLocaleMessages(i18n, 'en');
    return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: string) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        (i18n.global.locale as WritableComputedRef<string>).value = locale;
    }
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
    const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./translations/${locale}.json`
    );

    i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick();
}