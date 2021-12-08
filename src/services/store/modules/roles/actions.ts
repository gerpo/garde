import { ActionContext, ActionTree } from 'vuex'
import { RoleMutationType, RoleMutations, } from './mutations'

import { Permission } from '../../../../models/Permission'
import { Role } from '../../../../models/Role'
import { RoleState } from './state'
import { State } from '../../state'
import { User } from '../../../../models/User'
import axios from '../../../../utils/axios'

export enum RoleActionTypes {
    LoadRoles = 'LOAD_ROLES',
    LoadPermissions = 'LOAD_PERMISSIONS',
    LoadUsers = 'LOAD_USERS',
    CreateRole = 'CREATE_ROLE',
    DeleteRole = 'DELETE_ROLE',
    AddMembers = 'ADD_MEMBERS',
    RemoveMembers = 'REMOVE_MEMBERS',
    AttachPermissions = 'ATTACH_PERMISSIONS',
    DetachPermissions = 'DETACH_PERMISSUONS',
}

type ActionAugments = Omit<ActionContext<RoleState, State>, 'commit'> & {
    commit<K extends keyof RoleMutations>(
        key: K,
        payload: Parameters<RoleMutations[K]>[1]
    ): ReturnType<RoleMutations[K]>
}

export type RoleActions = {
    [RoleActionTypes.LoadRoles](context: ActionAugments): void
    [RoleActionTypes.LoadPermissions](context: ActionAugments): void
    [RoleActionTypes.LoadUsers](context: ActionAugments): void
    [RoleActionTypes.CreateRole](context: ActionAugments, role: { name: string }): void
    [RoleActionTypes.DeleteRole](context: ActionAugments, role: Role): void
    [RoleActionTypes.AddMembers](context: ActionAugments, payload: { role: Role, members: User[] }): void
    [RoleActionTypes.RemoveMembers](context: ActionAugments, payload: { role: Role, members: User[] }): void
    [RoleActionTypes.AttachPermissions](context: ActionAugments, payload: { role: Role, permissions: Permission[] }): void
    [RoleActionTypes.DetachPermissions](context: ActionAugments, payload: { role: Role, permissions: Permission[] }): void
}

export const roleActions: ActionTree<RoleState, State> & RoleActions = {
    async[RoleActionTypes.LoadRoles]({ commit }) {
        await axios.get<{ data: Role[] }>('/api/roles')
            .then(response => commit(RoleMutationType.LoadRoles, response.data.data))
    },

    async[RoleActionTypes.LoadPermissions]({ commit }) {
        await axios.get<{ data: Permission[] }>('/api/permissions')
            .then(response => commit(RoleMutationType.LoadPermissions, response.data.data))
    },

    async[RoleActionTypes.LoadUsers]({ commit }) {
        await axios.get<{ data: User[] }>('/api/users')
            .then(response => commit(RoleMutationType.LoadUsers, response.data.data))
    },


    async[RoleActionTypes.CreateRole]({ commit }, role) {
        await axios.post<{ data: Role }>('/api/roles', role)
            .then(response => commit(RoleMutationType.AddRole, response.data.data))
    },

    async[RoleActionTypes.DeleteRole]({ commit }, role) {
        commit(RoleMutationType.RemoveRole, role)
        await axios.delete(`/api/roles/${role.id}`)
            .catch(response => commit(RoleMutationType.AddRole, role))
    },

    async[RoleActionTypes.AddMembers]({ commit }, payload) {
        commit(RoleMutationType.AddMembers, payload)
        await axios.post(`/api/roles/${payload.role.id}/users/attach`, { users: payload.members })
            .catch(_ => commit(RoleMutationType.RemoveMembers, payload))
    },

    async[RoleActionTypes.RemoveMembers]({ commit }, payload) {
        commit(RoleMutationType.RemoveMembers, payload)
        await axios.post(`/api/roles/${payload.role.id}/users/detach`, { users: payload.members })
            .catch(_ => commit(RoleMutationType.AddMembers, payload))
    },

    async[RoleActionTypes.AttachPermissions]({ commit }, payload) {
        commit(RoleMutationType.AttachPermissions, payload)
        await axios.post(`/api/roles/${payload.role.id}/permissions/attach`, { permissions: payload.permissions })
            .catch(_ => commit(RoleMutationType.DetachPermissions, payload))
    },

    async[RoleActionTypes.DetachPermissions]({ commit }, payload) {
        commit(RoleMutationType.DetachPermissions, payload)
        await axios.post(`/api/roles/${payload.role.id}/permissions/detach`, { permissions: payload.permissions })
            .catch(_ => commit(RoleMutationType.AttachPermissions, payload))
    },
}
