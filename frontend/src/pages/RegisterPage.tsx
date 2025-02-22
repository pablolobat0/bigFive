import { Link } from 'react-router-dom';
import RegisterPage, { Email, Password, Banner, Submit, ButtonAfter, Input } from '@react-login-page/page3';
import { FaUser } from 'react-icons/fa'; // Importamos el icono de usuario
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

const Register = () => (
  <RegisterPage style={{ height: '100vh', width: '100vw', ...css }}>
    {/* Imagen de fondo en el banner */}
    <Banner style={{ backgroundImage: `url(${defaultBannerImage})` }} />

    {/* Personalización del formulario */}
    <RegisterPage.Title>Crear una cuenta</RegisterPage.Title>
    <RegisterPage.Welcome>Regístrate para comenzar</RegisterPage.Welcome>

    <RegisterPage.Logo> </RegisterPage.Logo>

    {/* Campo de Nombre completo correctamente alineado */}
    <Input name="fullname" placeholder="Nombre completo" index={1}>
        <div className="flex items-center justify-center w-6 h-6 text-gray-400">
            <FaUser className="text-lg" />
        </div>
    </Input>



    {/* Campos de entrada */}
    <Email index={2} placeholder="Correo electrónico" />
    <Password index={3} placeholder="Contraseña" />

    {/* Botón de registro */}
    <Submit>Registrarse</Submit>

    {/* Enlace para iniciar sesión */}
    <ButtonAfter>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </ButtonAfter>
  </RegisterPage>
);

export default Register;
