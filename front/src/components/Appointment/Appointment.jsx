import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './Appointment.module.css';

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const userId = Cookies.get('userId');

  // Obtener los turnos al montar el componente
  useEffect(() => {
    if (!userId) {
      setError('Please log in to view your appointments.');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/appointments/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError('Error loading appointments. Please try again later.');
        console.error(err);
      }
    };

    fetchAppointments();
  }, [userId]);

  // Función para cancelar un turno
  const handleCancel = async (id) => {
    if (!userId) {
      setError('Please log in to cancel an appointment.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/appointments/cancel/${id}`, {
        method: 'PATCH', // Usamos PATCH para actualizar parcialmente el turno
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar el estado local para reflejar la cancelación
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
          )
        );
        alert('Appointment cancelled successfully!');
      } else {
        setError(data.message || 'Failed to cancel appointment. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Error:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Your Appointments</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!error && appointments.length === 0 ? (
        <p>No appointments scheduled yet.</p>
      ) : (
        <ul className={styles.appointmentList}>
          {appointments.map((appointment) => (
            <li key={appointment.id} className={styles.appointmentItem}>
              <div className={styles.appointmentInfo}>
                <span>Date: {appointment.date}</span>
                <span>Time: {appointment.time}</span>
                <span>Status: {appointment.status}</span>
              </div>
              {appointment.status === 'active' && (
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Appointment;