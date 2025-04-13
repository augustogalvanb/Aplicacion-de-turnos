import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(Cookies.get('imgUrl') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateProfilePhoto = () => {
      const newImgUrl = Cookies.get('imgUrl');
      console.log('Cookie imgUrl:', newImgUrl);
      setProfilePhoto(newImgUrl || null);
    };
    updateProfilePhoto();
    const interval = setInterval(updateProfilePhoto, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('imgUrl');
    setIsOpen(false);
    navigate('/home');
  };

  const handleConfig = () => {
    setIsOpen(false);
    navigate('/config');
  };

  console.log('Rendering profilePhoto:', profilePhoto);

  const isValidImageUrl = (url) => {
    return url && typeof url === 'string' && url !== '' && url !== 'https://example.com/default-image.jpg';
  };

  return (
    <div className={styles.profileContainer}>
      <button onClick={handleToggle} className={styles.profileButton}>
        {isValidImageUrl(profilePhoto) ? (
          <img
src={profilePhoto}
            alt="Profile"
            className={styles.profileImage}
          />
        ) : (
          <FaUser />
        )}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <button onClick={handleConfig} className={styles.dropdownItem}>
            Config
          </button>
          <button onClick={handleLogout} className={styles.dropdownItem}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;