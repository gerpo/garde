import { User } from '../../models/User';

export type State = {
    user: User | undefined
}

export const state: State = {
    user: undefined,
}