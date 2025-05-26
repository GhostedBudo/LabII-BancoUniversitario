import React, { useState } from 'react';
import styles from './Login.module.css';
import fondoLogin from "../../../assets/img/fondoLogin1.png";
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import correoimg from "../../../assets/img/icons8-usuario.png";
import contraseniaimg from "../../../assets/img/icons8-contraseña.png";
import { Eye, EyeOff } from 'react-feather'; // 👈 íconos de React Feather

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 estado para mostrar/ocultar
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Correo no válido.';
    }

    if (!password) {
      validationErrors.password = 'La contraseña es obligatoria.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/v1/public/client/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          login(data.data.jwt);
          toast.success('Login exitoso');
          navigate('/user');
        } else {
          validationErrors.login = data.message;
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["form-section"]}>
        <h2>Bienvenido</h2>
        <h3>Iniciar Sesión</h3>

        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <label>Correo Electrónico</label>
            <div className={styles["input-wrapper"]}>
              <img src={correoimg} alt="Correo" className={styles["input-icon"]} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresar Correo Electrónico"
              />
            </div>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles["input-group"]}>
            <label>Contraseña</label>
            <div className={styles["input-wrapper"]}>
              <img src={contraseniaimg} alt="Contraseña" className={styles["input-icon"]} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresar Contraseña"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <button type="submit" className={styles["btn-login"]}>Ingresar</button>
        </form>

        <p className={styles["register-text"]}>
          ¿No tienes cuenta?
          <br />
          <Link to="/signup">Regístrate</Link>
        </p>
      </div>

      <div className={styles["image-section"]}>
        <img src={fondoLogin} alt="Login" />
      </div>
    </div>
  );
};

export default Login;
