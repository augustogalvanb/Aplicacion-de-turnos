import { appointmentRepository, userRepository } from "../config/data-source"
import IAppointmentDto from "../dtos/appointmentDto";
import { Appointment } from "../entities/Appointment"
import { sendEmail } from "../utils/emailService";

export const getAppointmentsService = async (userId?: number): Promise<Appointment[]> => {
    // Validar que se haya proporcionado un userId
    if (!userId || isNaN(userId)) {
        throw new Error('Invalid user ID');
    }

    // Buscar los turnos asociados al usuario
    const appointments = await appointmentRepository.find({
        where: {
            user: { id: userId }, // Asumiendo que Appointment tiene una relación con User
        },
    });

    // Si no se encuentran turnos, devolvemos un array vacío (o podrías lanzar un error, según prefieras)
    if (appointments.length === 0) {
        return [];
    }

    return appointments;
}

export const scheduleAppointmentService = async (appointmentData: IAppointmentDto): Promise<Appointment> => {
    const { date, time, userId } = appointmentData;

    // Validar datos de entrada
    if (!date || !time || !userId) {
        throw new Error('Date, time, and userId are required');
    }
    if (isNaN(Number(userId))) {
        throw new Error('Invalid userId');
    }

    // Verificar que el usuario exista
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }

    // Crear una nueva instancia de Appointment
    const newAppointment = appointmentRepository.create({
        date,
        time,
        status: 'active', // Estado por defecto
        user, // Asociar el turno al usuario
    });

    // Guardar el turno en la base de datos
    const savedAppointment = await appointmentRepository.save(newAppointment);

    // Enviar correo de confirmación
    const subject = 'Confirmación de turno';
    const text = `Hola ${user.name},\n\nTu turno ha sido agendado con éxito para el ${date} a las ${time}.\n\nGracias por elegirnos!`;
    await sendEmail(user.email, subject, text);

    return savedAppointment;
}

export const appointmentCancelService = async (id: number): Promise<Appointment> => {
    // Validar que el id sea un número válido
    if (!id || isNaN(id)) {
        throw new Error('Invalid appointment ID');
    }

    // Buscar el turno por ID
    const appointment = await appointmentRepository.findOne({
        where: { id },
        relations: ['user'], // Incluimos la relación con User si necesitas devolverla
    });

    // Verificar que el turno exista
    if (!appointment) {
        throw new Error('Appointment not found');
    }

    // Verificar que el turno no esté ya cancelado
    if (appointment.status === 'cancelled') {
        throw new Error('Appointment is already cancelled');
    }

    // Actualizar el estado a "cancelled"
    appointment.status = 'cancelled';
    const updatedAppointment = await appointmentRepository.save(appointment);

    // Enviar correo de cancelación
    const subject = 'Cancelación de turno';
    const text = `Hola ${appointment.user.name},\n\nTu turno del ${appointment.date} a las ${appointment.time} ha sido cancelado.\n\nSi tenés alguna duda, contáctanos.`;
    await sendEmail(appointment.user.email, subject, text);

    return updatedAppointment;
}