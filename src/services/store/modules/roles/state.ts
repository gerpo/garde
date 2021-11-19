import { Permission } from '../../../../models/Permission'
import { Role } from '../../../../models/Role'
import { User } from '../../../../models/User'

export type RoleState = {
    roles: Role[],
    permissions: Permission[],
    users: User[],
}

export const roleState: RoleState = {
    roles: [],
    permissions: [],
    users: [],
}