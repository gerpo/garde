import { AppointmentState, appointmentState } from './modules/appointments/state';
import { RoleState, roleState } from './modules/roles/state';
import { UserSettings, userSettings } from '../../models/UserSettings';

import { User } from '../../models/User';

export type State = {
    loggedIn: boolean,
    loginValidationErrors: { email: string[] } | null,
    registerValidationErrors: { email: string[] } | null,
    user: User | undefined,
    settings: UserSettings,

    appointmentModule: AppointmentState,
    roleModule: RoleState,
}

export const state: State = {
    loggedIn: (localStorage.getItem('loggedIn') === 'true'),
    loginValidationErrors: null,
    registerValidationErrors: null,
    user: undefined,
    settings: userSettings,

    appointmentModule: appointmentState,
    roleModule: roleState,
}