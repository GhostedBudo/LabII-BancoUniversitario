import React, { useState } from 'react';
import styles from '../Signup/Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';

// Importación de íconos
import iconUsuario from '../../../assets/img/icons8-usuario.png';
import iconCedula from '../../../assets/img/icons8-tarjeta-de-identificación.png'
import iconFecha from '../../../assets/img/icons8-fecha.png'
import iconTelefono from '../../../assets/img/icons8-teléfono-celular.png'
import iconEmail from '../../../assets/img/icons8-nuevo-post.png'
import iconPassword from '../../../assets/img/icons8-contraseña.png'
import iconRepeat from '../../../assets/img/icons8-contraseña.png'

const Signup = () => {
    const navigate = useNavigate(); 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});

    const formatDate = (value) => {
        const digits = value.replace(/\D/g, '');
        const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
        return parts.join('/');
    };

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
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('/api/v1/public/client/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        first_name: firstName,
                        last_name: lastName,
                        document_number: documentNumber,
                        birth_date: birthDate,
                        phone_number: phoneNumber,
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Login successful:', data);
                    navigate('/login');
                } else {
                    console.error('Login failed:', data.message);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        }
    };

    return (
        <div className={styles["signup-container"]}>
            <div className={styles["form-section"]}>
                <h3>REGISTRO</h3>
                <form onSubmit={handleSubmit}>
                    
                    <div className={styles["input-group"]}>
                        <label>Nombre</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconUsuario} alt="icono nombre" />
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Nombre"
                            />
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Apellido</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconUsuario} alt="icono apellido" />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Apellido"
                            />
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Cédula</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconCedula} alt="icono cedula" />
                            <input
                                type="text"
                                value={documentNumber}
                                onChange={(e) => setDocumentNumber(e.target.value)}
                                placeholder="Cédula"
                            />
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Fecha de nacimiento</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconFecha} alt="icono fecha" />
                            <input
                                type="text"
                                value={birthDate}
                                onChange={(e) => setBirthDate(formatDate(e.target.value))}
                                placeholder="DD/MM/AAAA"
                                maxLength={10}
                            />
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Teléfono</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconTelefono} alt="icono telefono" />
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Teléfono"
                            />
                        </div>
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Correo Electrónico</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconEmail} alt="icono correo" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo Electrónico"
                            />
                        </div>
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Contraseña</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconPassword} alt="icono password" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                            />
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Repetir Contraseña</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconRepeat} alt="icono repetir" />
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                placeholder="Repetir Contraseña"
                            />
                        </div>
                        {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
                    </div>

                    <button type="submit" className={styles["btn-login"]}>Registrarse</button>
                </form>

                <p className={styles["register-text"]}>
                    ¿Ya tienes cuenta?<br />
                    <Link to="/login">Iniciar Sesión</Link>
                </p>
            </div>
            <div className={styles["image-section"]}></div>
        </div>
    );
    
};

export default Signup;
