import { MutationTree } from 'vuex';
import { RegisterCode } from '../../../../models/RegisterCode';
import { RegisterCodesState } from './state';
import { Role } from '../../../../models/Role';

export enum RegisterCodesMutationType {
    LoadRegisterCodes = 'LOAD_REGISTER_CODES',
    LoadRegisterCodesRoles = 'LOAD_REGISTER_CODES_ROLES',
    AddRegisterCode = 'ADD_REGISTER_CODE',
    RemoveRegisterCode = 'REMOVE_REGISTER_CODE',
    SetIsCreatingRegisterCode = 'SET_IS_CREATING_REGISTER_CODE',
    AttachRoles = 'ATTACH_ROLES',
    DetachRoles = 'DETACH_ROLES',
}

export type RegisterCodesMutations = {
    [RegisterCodesMutationType.LoadRegisterCodes](state: RegisterCodesState, registerCodes: RegisterCode[]): void
    [RegisterCodesMutationType.LoadRegisterCodesRoles](state: RegisterCodesState, roles: Role[]): void
    [RegisterCodesMutationType.AddRegisterCode](state: RegisterCodesState, registerCode: RegisterCode): void
    [RegisterCodesMutationType.RemoveRegisterCode](state: RegisterCodesState, registerCode: RegisterCode): void
    [RegisterCodesMutationType.SetIsCreatingRegisterCode](state: RegisterCodesState, value: boolean): void
    [RegisterCodesMutationType.AttachRoles](state: RegisterCodesState, payload: { registerCode: RegisterCode, roles: Role[] }): void
    [RegisterCodesMutationType.DetachRoles](state: RegisterCodesState, payload: { registerCode: RegisterCode, roles: Role[] }): void
}

export const registerCodesMutations: MutationTree<RegisterCodesState> & RegisterCodesMutations = {

    [RegisterCodesMutationType.LoadRegisterCodes](state, registerCodes) {
        state.registerCodes = registerCodes;
    },
    [RegisterCodesMutationType.LoadRegisterCodesRoles](state, roles) {
        state.roles = roles;
    },
    [RegisterCodesMutationType.AddRegisterCode](state, registerCode) {
        state.registerCodes.push(registerCode);
    },
    [RegisterCodesMutationType.RemoveRegisterCode](state, registerCode) {
        state.registerCodes.splice(state.registerCodes.indexOf(registerCode), 1);
    },
    [RegisterCodesMutationType.SetIsCreatingRegisterCode](state, value) {
        state.isCreatingRegisterCode = value;
    },
    [RegisterCodesMutationType.AttachRoles](state, payload) {
        const registerCode = state.registerCodes.find(code => code.id === payload.registerCode.id)
        registerCode?.roles.push(...payload.roles)
    },
    [RegisterCodesMutationType.DetachRoles](state, payload) {
        const registerCode = state.registerCodes.find(code => code.id === payload.registerCode.id)
        if (!registerCode) return;
        registerCode.roles = registerCode.roles.filter(value => !payload.roles.map(p => p.name).includes(value.name))
    },
}