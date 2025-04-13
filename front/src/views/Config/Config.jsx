import { useState } from 'react';
import Cookies from 'js-cookie';
import styles from './Config.module.css';

function Config() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const userId = Cookies.get('userId');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    if (!userId) {
      setMessage('User not logged in. Please log in to upload a photo.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch(`http://localhost:3000/users/uploadPhoto/${userId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('imgUrl', data.photoUrl); // Actualizar la cookie con el nuevo photoUrl
        setMessage('Photo uploaded successfully!');
        setFile(null);
      } else {
        setMessage(data.message || 'Failed to upload photo. Please try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Profile Configuration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="photo">Profile Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Upload Photo
        </button>
      </form>
      {message && (
        <p
          className={message.includes('successfully') ? styles.success : styles.error}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Config;