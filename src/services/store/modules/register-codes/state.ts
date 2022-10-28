import { RegisterCode } from '../../../../models/RegisterCode'
import { Role } from '../../../../models/Role'

export type RegisterCodesState = {
    registerCodes: RegisterCode[],
    isCreatingRegisterCode: boolean,
    roles: Role[]
}

export const registerCodesState: RegisterCodesState = {
    registerCodes: [],
    isCreatingRegisterCode: false,
    roles: [],
}