import React, { useState } from 'react';
import styles from '../UpdatePassword/UpdatePassword.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'react-feather';
import iconUpdate from '../../../assets/img/icons8-actualizar.png';
import Clock from '../../../utils/components/Clock';
import useAuth from '../../../hooks/useAuth';

const UpdatePassword = () => {
  const { getJwtToken } = useAuth();
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
    
    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('La nueva contraseña no puede ser igual a la actual');
      return;
    }

    setIsLoading(true);
    
    try {
      const token = getJwtToken();
      if (!token) {
        throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente');
      }

      const response = await fetch('/api/v1/client/user/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: currentPassword,  // Asegúrate que coincida con lo que espera tu backend
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar la contraseña');
      }

      // Éxito
      toast.success('Contraseña actualizada correctamente');
      
      // Limpiar formulario
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirigir después de éxito
      setTimeout(() => navigate('/login'), 1500);

    } catch (error) {
      console.error('Error en actualización de contraseña:', error);
      
      // Mensajes de error específicos
      if (error.message.includes('current password')) {
        toast.error('La contraseña actual es incorrecta');
      } else {
        toast.error(error.message || 'Error al actualizar la contraseña');
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <span>Actualizar Contraseña</span>
        <Clock />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campo Contraseña Actual */}
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
              placeholder="Ingrese su contraseña actual"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              aria-label={showCurrentPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* Campo Nueva Contraseña */}
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
              minLength="8"
              placeholder="Ingrese su nueva contraseña"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <p className={styles.passwordHint}>Mínimo 8 caracteres</p>
        </div>

        {/* Campo Confirmar Contraseña */}
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
              placeholder="Confirme su nueva contraseña"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* Botón de Envío */}
        <div className={styles.actionButtons}>
          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <img src={iconUpdate} alt="Actualizar" className={styles.iconButton} />
            {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;