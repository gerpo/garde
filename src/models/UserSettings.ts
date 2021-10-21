export enum MenuSide {
    'LEFT',
    'RIGHT',
}

export interface IUserSettings {
    menuSide: MenuSide,
}

export class UserSettings implements IUserSettings {
    menuSide: MenuSide = MenuSide.LEFT;
}
