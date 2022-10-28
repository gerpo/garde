export enum MenuSide {
    'LEFT',
    'RIGHT',
}
export enum ViewMode {
    'LIST',
    'CALENDAR'
};

export type UserSettings = {
    menuSide: MenuSide,
    appointmentViewMode: ViewMode
}

export const userSettings: UserSettings = {
    menuSide: MenuSide.LEFT,
    appointmentViewMode: ViewMode.LIST
}
