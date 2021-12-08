import { Permission } from '../../../../models/Permission'
import { Role } from '../../../../models/Role'
import { User } from '../../../../models/User'

export type UsersState = {
    users: User[],
}

export const usersState: UsersState = {
    users: [],
}