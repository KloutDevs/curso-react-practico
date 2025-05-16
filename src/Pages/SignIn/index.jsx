import { useContext, useRef, useState } from 'react';
import Layout from '../../Components/Layout';
import { AuthenticationContext } from '../../Context';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const context = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let email = formData.get('email');
    let password = formData.get('password');
    if (email.length === 0 || password.length === 0)
      return setErrorMessage('Debes rellenar los campos para iniciar sesión');
    if (!email.includes('@')) return setErrorMessage('El correo electrónico ingresado no es valido');
    if (password.length < 6) return setErrorMessage('La contraseña debe tener al menos 6 caracteres');
    const response = context.handleLogin(email, password);
    if (response == 'Invalid credentials') return setErrorMessage('Correo electrónico o contraseña incorrectos');
    navigate('/my-account');
  };

  const handleKeyDown = (event) => {
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-50px)] flex items-center justify-center">
        <form
          onSubmit={handleSignIn}
          ref={formRef}
          className="flex flex-col items-center justify-center mt-[70px] p-5 md:p-20 rounded-2xl w-full max-w-md"
        >
          <h1 className="font-medium text-xl">Sign In</h1>
          <div className="flex flex-col items-center justify-center mt-4 gap-3">
            <div className="flex flex-col w-full items-start justify-center">
              <label htmlFor="emailSignIn" className="text-sm text-gray-500">
                Correo electrónico
              </label>
              <input
                id="emailSignIn"
                type="text"
                placeholder="Email"
                name="email"
                onKeyDown={handleKeyDown}
                className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-full items-start justify-center">
              <label htmlFor="passwordSignIn" className="text-sm text-gray-500">
                Contraseña
              </label>
              <input
                id="passwordSignIn"
                type="password"
                placeholder="Contraseña"
                name="password"
                onKeyDown={handleKeyDown}
                className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSignIn}
              className="rounded-lg bg-black text-white border border-black w-full md:w-80 p-4 mb-4 focus:outline-none hover:bg-gray-900 transition-all duration-300"
            >
              Iniciar sesión
            </button>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className="flex items-start justify-center mt-4">
              <p className="text-sm text-gray-500">
                No tienes una cuenta?
                <a href="/sign-up" className="text-slate-900 hover:text-black transition-colors duration-300">
                  Haz click para registrarte
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default SignIn;
