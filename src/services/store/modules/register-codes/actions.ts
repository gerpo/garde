import { ActionContext, ActionTree } from 'vuex'
import { RegisterCodesMutationType, RegisterCodesMutations } from './mutations'

import { RegisterCode } from '../../../../models/RegisterCode'
import { RegisterCodesState } from './state'
import { Role } from '../../../../models/Role'
import { State } from '../../state'
import axios from '../../../../utils/axios'

export enum RegisterCodesActionTypes {
    LoadRegisterCodes = 'LOAD_REGISTER_CODES',
    LoadRegisterCodesRoles = 'LOAD_REGISTER_CODES_ROLES',
    CreateRegisterCode = 'CREATE_REGISTER_CODE',
    DeleteRegisterCode = 'DELETE_REGISTER_CODE',
    AttachRoles = 'ATTACH_ROLES',
    DetachRoles = 'DETACH_ROLES',
}

type ActionAugments = Omit<ActionContext<RegisterCodesState, State>, 'commit'> & {
    commit<K extends keyof RegisterCodesMutations>(
        key: K,
        payload: Parameters<RegisterCodesMutations[K]>[1]
    ): ReturnType<RegisterCodesMutations[K]>
}

export type RegisterCodesActions = {
    [RegisterCodesActionTypes.LoadRegisterCodes](context: ActionAugments): void
    [RegisterCodesActionTypes.LoadRegisterCodesRoles](context: ActionAugments): void
    [RegisterCodesActionTypes.CreateRegisterCode](context: ActionAugments): void
    [RegisterCodesActionTypes.DeleteRegisterCode](context: ActionAugments, registerCode: RegisterCode): void
    [RegisterCodesActionTypes.AttachRoles](context: ActionAugments, payload: {registerCode: RegisterCode, roles: Role[]}): void
    [RegisterCodesActionTypes.DetachRoles](context: ActionAugments, payload: {registerCode: RegisterCode, roles: Role[]}): void
}

export const registerCodesActions: ActionTree<RegisterCodesState, State> & RegisterCodesActions = {
    async[RegisterCodesActionTypes.LoadRegisterCodes]({ commit }) {
        await axios.get<{ data: RegisterCode[] }>('/api/register-codes')
            .then(response => commit(RegisterCodesMutationType.LoadRegisterCodes, response.data.data));
    },
    async[RegisterCodesActionTypes.LoadRegisterCodesRoles]({ commit }) {
        await axios.get<{ data: Role[] }>('/api/register-codes/roles')
            .then(response => commit(RegisterCodesMutationType.LoadRegisterCodesRoles, response.data.data));
    },
    async[RegisterCodesActionTypes.CreateRegisterCode]({ commit }) {
        commit(RegisterCodesMutationType.SetIsCreatingRegisterCode, true);
        await axios.post<{data: RegisterCode}>(`/api/register-codes`)
            .then(response => commit(RegisterCodesMutationType.AddRegisterCode, response.data.data))
            .finally(() => commit(RegisterCodesMutationType.SetIsCreatingRegisterCode, false));
    },
    async[RegisterCodesActionTypes.DeleteRegisterCode]({ commit }, registerCode) {
        commit(RegisterCodesMutationType.RemoveRegisterCode, registerCode)
        await axios.delete(`/api/register-codes/${registerCode.id}`)
            .catch(response => commit(RegisterCodesMutationType.AddRegisterCode, registerCode));
    },

    async[RegisterCodesActionTypes.AttachRoles]({ commit }, payload) {
        commit(RegisterCodesMutationType.AttachRoles, payload)
        await axios.post(`/api/register-codes/${payload.registerCode.id}/roles/attach`, { roles: payload.roles })
            .catch(_ => commit(RegisterCodesMutationType.DetachRoles, payload))
    },

    async[RegisterCodesActionTypes.DetachRoles]({ commit }, payload) {
        commit(RegisterCodesMutationType.DetachRoles, payload)
        await axios.post(`/api/register-codes/${payload.registerCode.id}/roles/detach`, { roles: payload.roles })
            .catch(_ => commit(RegisterCodesMutationType.AttachRoles, payload))
    },
}
