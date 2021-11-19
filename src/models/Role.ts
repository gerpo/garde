import { Permission } from './Permission';
import { User } from './User';

export type Role = {
    id: number,
    name: string,
    permissions: Permission[],
    members_count: number,
    members: User[],
}