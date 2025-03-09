import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterPage, { Email, Password, Banner, Submit, ButtonAfter, Input } from '@react-login-page/page3';
import { FaUser } from 'react-icons/fa';
import defaultBannerImage from '@react-login-page/page3/bg.jpeg';

const css = {
    '--login-bg': '#f3f2f2',
    '--login-color': '#333',
    '--login-logo': '#fff',
    '--login-inner-bg': '#fff',
    '--login-banner-bg': '#fbfbfb',
    '--login-input': '#333',
    '--login-input-icon': '#dddddd',
    '--login-input-bg': 'transparent',
    '--login-input-border': 'rgba(0, 0, 0, 0.13)',
    '--login-input-placeholder': '#999999',
    '--login-btn': '#fff',
    '--login-btn-bg': '#b08bf8',
    '--login-btn-bg-focus': '#b08bf8',
    '--login-btn-bg-hover': '#b08bf8',
    '--login-btn-bg-active': '#b08bf8',
};

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al registrar');
            }

            const { access_token } = await response.json();
            localStorage.setItem('token', access_token); // Guardar token en localStorage
            navigate('/'); // Redirigir a la página inicial
            console.log('Registro exitoso');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        }
    };

    return (
        <RegisterPage style={{ height: '100vh', width: '100vw', ...css }}>
            {/* Imagen de fondo en el banner */}
            <Banner style={{ backgroundImage: `url(${defaultBannerImage})` }} />

            {/* Personalización del formulario */}
            <RegisterPage.Title>Crear una cuenta</RegisterPage.Title>
            <RegisterPage.Welcome>Regístrate para comenzar</RegisterPage.Welcome>

            <RegisterPage.Logo> </RegisterPage.Logo>

            {/* Campo de Nombre completo */}
            <Input
                name="name"
                placeholder="Nombre completo"
                index={1}
                value={name}
                onChange={(e) => setName(e.target.value)}
            >
                <div className="flex items-center justify-center w-6 h-6 text-gray-400">
                    <FaUser className="text-lg" />
                </div>
            </Input>

            {/* Campos de entrada */}
            <Email
                index={2}
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Password
                index={3}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Botón de registro */}
            <Submit onClick={handleSubmit}>Registrarse</Submit>

            {/* Mostrar errores */}
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

            {/* Enlace para iniciar sesión */}
            <ButtonAfter>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                </div>
            </ButtonAfter>
        </RegisterPage>
    );
};

export default Register;
