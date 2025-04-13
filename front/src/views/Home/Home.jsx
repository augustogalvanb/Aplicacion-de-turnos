import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Appointments</h1>
      <p>Please log in or register to schedule an appointment.</p>
    </div>
  );
}

export default Home;