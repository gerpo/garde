import { MutationTree } from 'vuex';
import { Permission } from '../../../../models/Permission';
import { Role } from '../../../../models/Role';
import { User } from '../../../../models/User';
import { UsersState } from './state';

export enum UsersMutationType {
    UpdateUser = 'UPDATE_USER',
}

export type UsersMutations = {
    [UsersMutationType.UpdateUser](state: UsersState, user: User): void
}

export const usersMutations: MutationTree<UsersState> & UsersMutations = {
    [UsersMutationType.UpdateUser](state, roles) {
        state.users = roles;
    },
}