import { UserSettings, userSettings } from '../../models/UserSettings';

import { Appointment } from '../../models/Appointment';
import { User } from '../../models/User';

export type State = {
    user: User | undefined,
    settings: UserSettings
    appointments: Appointment[]
}

export const state: State = {
    user: undefined,
    settings: userSettings,
    appointments: [],
}