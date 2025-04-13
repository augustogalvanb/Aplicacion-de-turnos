import { useState } from 'react';
import styles from './Register.module.css';

function Register() {
  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    nDni: '', // Cambiado de dni a nDni
    username: '',
    password: '',
  });

  // Estado para los errores
  const [errors, setErrors] = useState({});
  // Estado para mensajes de éxito o error del backend
  const [serverMessage, setServerMessage] = useState('');

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar el error del campo al empezar a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    // Limpiar mensaje del servidor al modificar el formulario
    setServerMessage('');
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar cada campo localmente
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    if (!formData.nDni) newErrors.nDni = 'DNI is required'; // Cambiado a nDni
    else if (isNaN(Number(formData.nDni))) newErrors.nDni = 'DNI must be a number';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';

    // Si hay errores locales, actualizar el estado
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convertir nDni a número para el backend
    const dataToSend = {
      ...formData,
      nDni: Number(formData.nDni), // Cambiado a nDni
    };

    // Enviar al backend
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
    
      const data = await response.json();
      if (response.ok) {
        // Registro exitoso
        setServerMessage('Registration successful!');
        setFormData({
          name: '',
          email: '',
          birthdate: '',
          nDni: '', // Cambiado a nDni
          username: '',
          password: '',
        });
      } else {
        // Error del backend (ej. usuario ya existe)
        setServerMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      // Error de red o servidor no responde
      setServerMessage('Something went wrong. Please try again later.');
      console.error('Fetch error:', error)
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
          {errors.birthdate && (
            <span className={styles.error}>{errors.birthdate}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="nDni">DNI</label> {/* Cambiado a nDni */}
          <input
            type="number"
            id="nDni" // Cambiado a nDni
            name="nDni" // Cambiado a nDni
            value={formData.nDni}
            onChange={handleChange}
          />
          {errors.nDni && <span className={styles.error}>{errors.nDni}</span>} {/* Cambiado a nDni */}
        </div>

        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      {serverMessage && (
        <p
          className={
            serverMessage.includes('successful') ? styles.success : styles.error
          }
        >
          {serverMessage}
        </p>
      )}
    </div>
  );
}

export default Register;