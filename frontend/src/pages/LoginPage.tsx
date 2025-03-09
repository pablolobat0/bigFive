import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '@react-login-page/page3';
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

const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al iniciar sesión');
            }
            const { access_token } = await response.json();
            localStorage.setItem('token', access_token); // Guardar token en localStorage
            console.log('Inicio de sesión exitoso');
            navigate('/'); // Redirigir a la página inicial
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        }
    };

    return (
        <Login style={{ height: '100vh', width: '100vw', ...css }}>
            {/* Imagen de fondo en el banner */}
            <Login.Banner style={{ backgroundImage: `url(${defaultBannerImage})` }} />

            {/* Personalización del formulario */}
            <Login.Title>Iniciar sesión</Login.Title>
            <Login.Welcome>Por favor, inicia sesión para continuar</Login.Welcome>

            <Login.Logo> </Login.Logo>

            {/* Campos de entrada */}
            <Login.Email
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Login.Password
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Botón de acceso */}
            <Login.Submit onClick={handleSubmit}>Iniciar sesión</Login.Submit>

            {/* Mostrar errores */}
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

            {/* Enlace para registrarse */}
            <Login.ButtonAfter>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                </div>
            </Login.ButtonAfter>
        </Login>
    );
};

export default LoginPage;
