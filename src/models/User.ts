export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    points: number,
    isAdmin?: boolean,
    roles: Array<string>,
    permissions: Array<string>,
}

export function userCan(user: User, permission: string) {
    return permission in user.permissions;
}

export function userIs(user: User, role: string) {
    return role in user.roles;
}
