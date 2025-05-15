import React, { useState } from 'react';
import styles from './Login.module.css';
import fondoLogin from "../../../assets/img/fondoLogin1.png";
import HeaderAuth from "../Header/HeaderAuth";
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const {login, getJwtToken} = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('user1@gmail.com');
  const [password, setPassword] = useState('Abc@1234');
  const [errors, setErrors] = useState("");
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

      // inicio de sesion
      try {

        const response = await fetch('/api/v1/public/client/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
    
        const data = await response.json();
        
        if (response.ok) {
          // Store JWT in localStorage
          login(data.data.jwt);
          
          // console.log('Login successful:', data);

  
          toast.success('Login succesful')
          // console.log(getJwtToken());
          //Navegar a la primera ruta protegida
          navigate('/user')
        } else {
          // console.error('Login failed:', data.message);
          validationErrors.login = data.message
          toast.error(data.message)
        }
      } catch (error) {
       
       toast.error(error)
      }

    }
  };

  return (
    <>
      {/* <HeaderAuth /> */}
      <div className={styles["login-container"]}>
        <div className={styles["form-section"]}>
        {/* {errors.login && <p className={styles.error}>{errors.login}</p>} */}
          <h2>Bienvenido</h2>
          <h3>Iniciar Sesión</h3>

         <div> {error}</div>
          <form onSubmit={handleSubmit}>
            <div className={styles["input-group"]}>
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresar Correo Electrónico"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles["input-group"]}>
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresar Contraseña"
              />
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
    </>
  );
};

export default Login;
