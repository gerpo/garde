export enum MenuSide {
    'LEFT',
    'RIGHT',
}
export enum ViewMode { 
    'LIST', 
    'CALENDAR' };

export interface IUserSettings {
    menuSide: MenuSide,
    appointmentViewMode: ViewMode
}

export class UserSettings implements IUserSettings {
    menuSide: MenuSide = MenuSide.LEFT;
    appointmentViewMode = ViewMode.CALENDAR
}
