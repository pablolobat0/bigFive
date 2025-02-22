import Login from '@react-login-page/page3';
import defaultBannerImage from '@react-login-page/page3/bg.jpeg';
import { Link } from "react-router-dom";

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

const LoginPage = () => (
  <Login style={{ height: '100vh', width: '100vw', ...css }}>
    {/* Imagen de fondo en el banner */}
    <Login.Banner style={{ backgroundImage: `url(${defaultBannerImage})` }} />
    
    {/* Personalización del formulario */}
    <Login.Title>Iniciar sesión</Login.Title>
    <Login.Welcome>Por favor, inicia sesión para continuar</Login.Welcome>

    <Login.Logo> </Login.Logo>

    {/* Campos de entrada */}
    <Login.Email placeholder="Correo electrónico" />
    <Login.Password placeholder="Contraseña" />

    {/* Botón de acceso */}
    <Login.Submit>Iniciar sesión</Login.Submit>

    <Login.ButtonAfter>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
    </Login.ButtonAfter>
    
  </Login>
);

export default LoginPage;
