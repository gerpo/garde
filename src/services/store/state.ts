import { AppointmentState, appointmentState } from './modules/appointments/state';
import { RegisterCodesState, registerCodesState } from './modules/register-codes/state';
import { RoleState, roleState } from './modules/roles/state';
import { UserSettings, userSettings } from '../../models/UserSettings';

import { User } from '../../models/User';
import { UsersState } from './modules/users/state';

export type State = {
    loggedIn: boolean,
    loginValidationErrors: { email: string[] } | null,
    registerValidationErrors: { email: string[] } | null,
    user: User | undefined,
    settings: UserSettings,

    appointmentModule: AppointmentState,
    roleModule: RoleState,
    registerCodesModule: RegisterCodesState,
    usersModule: UsersState,
}

export const state: Omit<State, 'appointmentModule' | 'roleModule' | 'registerCodesModule' | 'usersModule'> = {
    loggedIn: (localStorage.getItem('loggedIn') === 'true'),
    loginValidationErrors: null,
    registerValidationErrors: null,
    user: undefined,
    settings: userSettings,

}