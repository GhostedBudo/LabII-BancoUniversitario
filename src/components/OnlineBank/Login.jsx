import React, { useState } from 'react';
import './Login.css';
import fondoLogin from "../../assets/img/fondoLogin1.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
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
      alert('Inicio de sesión exitoso (simulado)');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Bienvenido</h2>
        <h3>Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-login">Ingresar</button>
        </form>

        <p className="register-text">
          ¿No tienes cuenta?
          <br />
           <a href="#">Regístrate</a>
        </p>
      </div>
      <div className="image-section">
      <img src={fondoLogin} alt="Login" />
      </div>
    </div>
  );
};

export default Login;
