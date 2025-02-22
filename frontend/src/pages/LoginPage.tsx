import React from 'react';
import Login from '@react-login-page/page3';
import defaultBannerImage from '@react-login-page/page3/bg.jpeg';

const LoginPage = () => (
  <Login style={{ height: '100vh', width: '100vw' }}>
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
        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
    </Login.ButtonAfter>
    
  </Login>
);

export default LoginPage;
