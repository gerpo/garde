import { MutationTree } from 'vuex';
import { Permission } from '../../../../models/Permission';
import { Role } from '../../../../models/Role';
import { RoleState } from './state';
import { User } from '../../../../models/User';

export enum RoleMutationType {
    LoadRoles = 'LOAD_ROLES',
    LoadPermissions = 'LOAD_PERMISSIONS',
    LoadUsers = 'LOAD_USERS',
    AddRole = 'ADD_ROLE',
    RemoveRole = 'REMOVE_ROLE',
    AddMembers = 'ADD_MEMBERS',
    RemoveMembers = 'REMOVE_MEMBERS',
    AttachPermissions = 'ATTACH_PERMISSIONS',
    DetachPermissions = 'DETACH_PERMISSIONS',
}

export type RoleMutations = {
    [RoleMutationType.LoadRoles](state: RoleState, roles: Role[]): void
    [RoleMutationType.LoadPermissions](state: RoleState, permissions: Permission[]): void
    [RoleMutationType.LoadUsers](state: RoleState, users: User[]): void
    [RoleMutationType.AddRole](state: RoleState, role: Role): void
    [RoleMutationType.RemoveRole](state: RoleState, role: Role): void
    [RoleMutationType.AddMembers](state: RoleState, payload: { role: Role, members: User[] }): void
    [RoleMutationType.RemoveMembers](state: RoleState, payload: { role: Role, members: User[] }): void
    [RoleMutationType.AttachPermissions](state: RoleState, payload: { role: Role, permissions: Permission[] }): void
    [RoleMutationType.DetachPermissions](state: RoleState, payload: { role: Role, permissions: Permission[] }): void
}

export const roleMutations: MutationTree<RoleState> & RoleMutations = {
    [RoleMutationType.LoadRoles](state, roles) {
        state.roles = roles;
    },
    [RoleMutationType.LoadPermissions](state, permissions) {
        state.permissions = permissions;
    },
    [RoleMutationType.LoadUsers](state, users) {
        state.users = users;
    },
    [RoleMutationType.AddRole](state, role) {
        state.roles.push(role);
    },
    [RoleMutationType.RemoveRole](state, role) {
        state.roles.splice(state.roles.indexOf(role), 1);
    },
    [RoleMutationType.AddMembers](state, payload) {
        const role = state.roles.find(role => role.id === payload.role.id)
        role?.members.push(...payload.members)
    },
    [RoleMutationType.RemoveMembers](state, payload) {
        const role = state.roles.find(role => role.id === payload.role.id)
        if (!role) return;
        role.members = role.members.filter(value => !payload.members.map(p => p.id).includes(value.id))
    },
    [RoleMutationType.AttachPermissions](state, payload) {
        const role = state.roles.find(role => role.id === payload.role.id)
        role?.permissions.push(...payload.permissions)
    },
    [RoleMutationType.DetachPermissions](state, payload) {
        const role = state.roles.find(role => role.id === payload.role.id)
        if (!role) return;
        role.permissions = role.permissions.filter(value => !payload.permissions.map(p => p.name).includes(value.name))
    },
}