import { Request, Response } from "express"
import { appointmentCancelService, getAppointmentsService, scheduleAppointmentService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";

export const getAppointments = async (req: Request, res: Response) => {
    const {userId} = req.params
    try {
        const appointments: Appointment[] = await getAppointmentsService(Number(userId))
        res.status(200).json(appointments)
    } catch (error) {
        res.status(404).send(error)
    }
}

export const scheduleAppointment = async (req: Request, res:Response) => {
    const {date, time, userId} = req.body
    try {
        const newAppointment: Appointment = await scheduleAppointmentService({date, time, userId})
        res.status(201).json(newAppointment)
    } catch (error) {
        res.status(400).send("No se ha podido agendar un turno");
    }
}

export const appointmentCancel = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const cancelledAppointment: Appointment = await appointmentCancelService(Number(id))
        res.status(200).json(cancelledAppointment)
    } catch (error) {
        res.status(404).send(error)
    }
}