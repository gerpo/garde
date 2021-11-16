import { Appointment } from '../../../../models/Appointment'

export type AppointmentState = {
    appointments: Appointment[] | undefined
}

export const appointmentState : AppointmentState = {
    appointments:  undefined

}