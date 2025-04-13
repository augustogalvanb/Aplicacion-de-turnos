import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Profile from '../../views/profile/Profile';
import styles from './Navbar.module.css';

function Navbar() {
  const [userId, setUserId] = useState(Cookies.get('userId')); // Estado inicial con el userId

  useEffect(() => {
    // Actualizar el estado cuando cambie la cookie (esto es más bien manual, pero funciona para este caso)
    const checkUserId = () => {
      const currentUserId = Cookies.get('userId');
      if (currentUserId !== userId) {
        setUserId(currentUserId);
      }
    };
    checkUserId(); // Chequear inmediatamente
    const interval = setInterval(checkUserId, 1000); // Chequear cada segundo (ajustable)
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [userId]);

  console.log('Navbar - userId:', userId);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        App
      </NavLink>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        {/* Opciones solo para usuarios NO logueados */}
        {!userId && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {/* Opciones solo para usuarios logueados */}
        {userId && (
          <>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <Profile />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;