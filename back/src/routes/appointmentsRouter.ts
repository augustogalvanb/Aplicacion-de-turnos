import { Router } from "express"
import { appointmentCancel, getAppointments, scheduleAppointment } from "../controllers/appointmentsController";

const appointmentRouter: Router = Router()

appointmentRouter.get("/:userId?", getAppointments);
appointmentRouter.post("/schedule", scheduleAppointment);
appointmentRouter.patch("/cancel/:id", appointmentCancel);
export default appointmentRouter