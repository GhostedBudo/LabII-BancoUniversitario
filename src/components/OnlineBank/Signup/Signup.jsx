import React, { useState } from 'react';
import styles from '../Login/Login.module.css';
import fondoLogin from "../../../assets/img/fondoLogin1.png";
import HeaderAuth from "../Header/HeaderAuth";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

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

    if (password !== repeatPassword) {
        validationErrors.repeatPassword = 'Las contraseñas no coinciden.';
        console.error('Las contraseñas no coinciden.')
    }



    setErrors(validationErrors);

  

    if (Object.keys(validationErrors).length === 0) {

      //alert('Inicio de sesión exitoso (simulado)');
      // inicio de sesion
      try {

        const response = await fetch('/api/v1/public/client/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            first_name: "usuario",
            last_name: "prueba",
            document_number: "213123123",
            birth_date: "2020-05-18T14:40:04.341364Z",
            phone_number: "+584245186631",

          })
        });
    
        const data = await response.json();
        
        if (response.ok) {
         
          console.log('Login successful:', data);

        } else {
          console.error('Login failed:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }

    } 
  };

  return (
    <>
      <HeaderAuth />
      <div className={styles["login-container"]}>
        <div className={styles["form-section"]}>
          <h2>Bienvenido</h2>
          <h3>Registrarse</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles["input-group"]}>
                {/* CORREO */}
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div className={styles["input-group"]}>
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>

            {/* REPETIR PASSWORD */}

            <div className={styles["input-group"]}>
              <label>Repetir Contraseña</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Repetir Contraseña"
              />
              {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
            </div>

            <button type="submit" className={styles["btn-login"]}>Registrarse</button>
          </form>

          <p className={styles["register-text"]}>
            ¿Ya tienes cuenta?
            <br />
            <Link to="/login">Iniciar Sesion</Link>
          </p>
        </div>
        <div className={styles["image-section"]}>
          <img src={fondoLogin} alt="Login" />
        </div>
      </div>
    </>
  );
};

export default Signup;
