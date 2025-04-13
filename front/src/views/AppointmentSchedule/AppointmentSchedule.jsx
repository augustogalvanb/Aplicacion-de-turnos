import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Para redirigir tras éxito
import styles from './AppointmentSchedule.module.css';

function AppointmentSchedule() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();
  const userId = Cookies.get('userId'); // Obtener userId de la cookie

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    setServerMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!userId) newErrors.auth = 'You must be logged in to schedule an appointment';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = {
      date: formData.date,
      time: formData.time,
      userId: Number(userId), // Convertir a número para el backend
    };

    try {
      const response = await fetch('http://localhost:3000/appointments/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage('Appointment scheduled successfully!');
        setFormData({ date: '', time: '' });
        setTimeout(() => navigate('/appointments'), 1000); // Redirigir a la lista de turnos
      } else {
        setServerMessage(data.message || 'Failed to schedule appointment. Please try again.');
      }
    } catch (error) {
      setServerMessage('Something went wrong. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Schedule an Appointment</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <span className={styles.error}>{errors.time}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Schedule
        </button>
      </form>
      {serverMessage && (
        <p
          className={
            serverMessage.includes('successfully') ? styles.success : styles.error
          }
        >
          {serverMessage}
        </p>
      )}
      {errors.auth && <p className={styles.error}>{errors.auth}</p>}
    </div>
  );
}

export default AppointmentSchedule;