import { ActionContext, ActionTree } from 'vuex'
import { UsersMutationType, UsersMutations, } from './mutations'

import { Permission } from '../../../../models/Permission'
import { Role } from '../../../../models/Role'
import { State } from '../../state'
import { User } from '../../../../models/User'
import { UsersState } from './state'
import axios from '../../../../utils/axios'

export enum UsersActionTypes {
    UpdateUser = 'UPDATE_USER',
}

type ActionAugments = Omit<ActionContext<UsersState, State>, 'commit'> & {
    commit<K extends keyof UsersMutations>(
        key: K,
        payload: Parameters<UsersMutations[K]>[1]
    ): ReturnType<UsersMutations[K]>
}

export type UsersActions = {
    [UsersActionTypes.UpdateUser](context: ActionAugments, user: User): void
}

export const usersActions: ActionTree<UsersState, State> & UsersActions = {
    async[UsersActionTypes.UpdateUser]({ commit }, user) {
        await axios.get<{ data: User }>(`/api/users/${user.id}`)
            .then(response => commit(UsersMutationType.UpdateUser, response.data.data))
    },
}
