export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    points: number, 
    roles: Array<string>,
    permissions: Array<string>,
}

export function userCan(user: User, permission: string) {
    return permission in user.permissions;
}

export function userIs(user: User, role: string) {
    return role in user.roles;
}
