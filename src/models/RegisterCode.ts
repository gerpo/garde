import { Role } from './Role';

export type RegisterCode = {
    id: number,
    code: string,
    roles: Role[],
}