import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './components/navbar/Navbar';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import AppointmentSchedule from './views/appointmentSchedule/AppointmentSchedule';
import Appointment from './components/appointment/Appointment';
import Config from './views/Config/Config';
import styles from './App.module.css';

function ProtectedRoute({ children }) {
  const userId = Cookies.get('userId');
  return userId ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const userId = Cookies.get('userId');
  return !userId ? children : <Navigate to="/appointments" />;
}

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><AppointmentSchedule /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
          <Route path="/config" element={<ProtectedRoute><Config /></ProtectedRoute>} /> {/* Nueva ruta */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;