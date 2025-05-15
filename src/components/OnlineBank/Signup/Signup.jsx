import React, { useState } from 'react';
import styles from '../Signup/Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';

import iconUsuario from '../../../assets/img/icons8-usuario.png';
import iconCedula from '../../../assets/img/icons8-tarjeta-de-identificación.png';
import iconFecha from '../../../assets/img/icons8-fecha.png';
import iconTelefono from '../../../assets/img/icons8-teléfono-celular.png';
import iconEmail from '../../../assets/img/icons8-nuevo-post.png';
import iconPassword from '../../../assets/img/icons8-contraseña.png';
import iconRepeat from '../../../assets/img/icons8-contraseña.png';
import toast from 'react-hot-toast';

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
       const iso = new Date().toISOString(value);
    //    console.log(iso); 
       return iso; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!firstName) validationErrors.firstName = 'El nombre es obligatorio.';
        if (!lastName) validationErrors.lastName = 'El apellido es obligatorio.';
        if (!documentNumber) validationErrors.documentNumber = 'La cédula es obligatoria.';
        if (!birthDate) validationErrors.birthDate = 'La fecha de nacimiento es obligatoria.';
        /*if (!phoneNumber) validationErrors.phoneNumber = 'El teléfono es obligatorio.';*/
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

            const user = {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                document_number: documentNumber,
                birth_date: formatDate(birthDate),
                phone_number: phoneNumber,
            }

            // console.log(user)
            try {
                const response = await fetch('/api/v1/public/client/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });


                const data = await response.json();

                if (response.ok) {
                    toast.success('Registro Exitoso')
                    // console.log('Registro exitoso:', data);
                    navigate('/login');
                } else {
                    toast.error('Fallo el registro')
                    // console.error('Fallo en el registro:', data.message);
                }
            } catch (error) {
                toast.error('Error de red')
                // console.error('Error de red:', error);
            }
        }
    };

    return (
        <div className={styles["signup-container"]}>
            <div className={styles["form-section"]}>
                <h3>Registro</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles["input-group"]}>
                        <label>Nombre</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconUsuario} alt="icono nombre" />
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Ingresar Nombre"
                            />
                        </div>
                        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Apellido</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconUsuario} alt="icono apellido" />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Ingresar Apellido"
                            />
                        </div>
                        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Cédula</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconCedula} alt="icono cedula" />
                            <input
                                type="text"
                                value={documentNumber}
                                onChange={(e) => setDocumentNumber(e.target.value)}
                                placeholder="Ingresar Cédula"
                            />
                        </div>
                        {errors.documentNumber && <p className={styles.error}>{errors.documentNumber}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Fecha de nacimiento</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconFecha} alt="icono fecha" />
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => {
                                    setBirthDate(e.target.value); 
                                    
                                }}
                                placeholder="DD/MM/AAAA"
                                maxLength={10}
                            />
                        </div>
                        {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Teléfono</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconTelefono} alt="icono telefono" />
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Ingresar Teléfono"
                            />
                        </div>
                        {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Correo Electrónico</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconEmail} alt="icono correo" />
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
                        <div className={styles["input-icon"]}>
                            <img src={iconPassword} alt="icono password" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="ingresar Contraseña"
                            />
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    <div className={styles["input-group"]}>
                        <label>Confirmar Contraseña</label>
                        <div className={styles["input-icon"]}>
                            <img src={iconRepeat} alt="icono repetir" />
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                placeholder="Ingresar de nuevo la Contraseña"
                            />
                        </div>
                        {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
                    </div>

                    <button type="submit" className={styles["btn-login"]}>Registrarse</button>
                </form>

                <p className={styles["register-text"]}>
                    ¿Ya tienes cuenta?
                    <Link to="/login">Iniciar Sesión</Link>
                </p>
            </div>
            <div className={styles["image-section"]}></div>
        </div>
    );
};

export default Signup;
