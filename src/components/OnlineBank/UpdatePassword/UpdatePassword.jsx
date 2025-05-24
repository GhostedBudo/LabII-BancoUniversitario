import React, { useState } from 'react';
import styles from '../UpdatePassword/UpdatePassword.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'react-feather';
import iconUpdate from '../../../assets/img/icons8-actualizar.png';
import Clock from '../../../utils/components/Clock';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);
    
    try {
      // Obtener el token JWT del almacenamiento local
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const response = await fetch('/v1/client/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar la contraseña');
      }

      toast.success('Contraseña actualizada correctamente');
      
      // Limpiar los campos después de una actualización exitosa
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirigir después de éxito
      navigate('/perfil');

    } catch (error) {
      toast.error(error.message || 'Error al actualizar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Actualizar Contraseña
        <div className={styles.clockPassword}>
          <Clock /> 
        </div>
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword" className={styles.label}>
            Contraseña Actual
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.input}
              required
              placeholder="Ingresar Contraseña"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            Nueva Contraseña
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
              required
              placeholder="Ingresar la Nueva Contraseña"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirmar Nueva Contraseña
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
              placeholder="Ingresar Nuevamente la Contraseña"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
        >
          <img src={iconUpdate} className={styles.iconUpdate} alt="icono actualizar" />
          {isLoading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;