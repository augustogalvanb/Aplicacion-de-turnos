import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState(''); // Cambiado de email a username
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Cambiado email por username
      });

      const data = await response.json();

      if (response.ok && data.login) {
        Cookies.set('userId', data.login.id);
        Cookies.set('imgUrl', data.login.imgUrl || ''); // Guardar imgUrl
        setMessage(data.message);
        setTimeout(() => navigate('/appointments'), 1500);
      } else {
        setMessage(data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      setMessage('Error al intentar iniciar sesión');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="username">Username</label> {/* Cambiado label */}
          <input
            type="text" // Cambiado de email a text (username no requiere formato de email)
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
      {message && (
        <p
          className={
            message.includes('éxito') ? styles.success : styles.error
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;