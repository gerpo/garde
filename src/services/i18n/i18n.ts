import { I18n, I18nOptions, createI18n } from 'vue-i18n';
import { WritableComputedRef, nextTick } from 'vue';

import de_messages from './translations/de/de';
import en_messages from './translations/en/en';

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

    i18n.global.setLocaleMessage(locale, de_messages);

    return nextTick();
}