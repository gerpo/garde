import { UserSettings, userSettings } from '../../models/UserSettings';

import { Appointment } from '../../models/Appointment';
import { User } from '../../models/User';

export type State = {
    loggedIn: boolean,
    loginValidationErrors: {email: string[]} | null,
    registerValidationErrors: {email: string[]} | null,
    user: User | undefined,
    settings: UserSettings
    appointments: Appointment[] | undefined
}

export const state: State = {
    loggedIn: (localStorage.getItem('loggedIn') === 'true'),
    loginValidationErrors: null,
    registerValidationErrors: null,
    user: undefined,
    settings: userSettings,
    appointments: undefined,
}