import { IModel } from './IModel';

export enum AppointmentStatus {
    'idle',
    'confirmed',
    'declined',
}

export interface Appointment extends IModel {
    id: number,
    title: string,
    description?: string,
    datetime: Date,
    location: string,
    status: AppointmentStatus
    confirmationRequired?: boolean
    confirmationDeadline?: Date
}

export class DummyAppointment implements Appointment {
    id: number = 0;
    title: string = 'Dummy Appointment';
    description?: string | undefined;
    datetime: Date = new Date();
    location: string = "At Home";
    status: AppointmentStatus = AppointmentStatus.idle;

}