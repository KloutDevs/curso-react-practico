import { useContext, useRef, useState } from 'react';
import Layout from '../../Components/Layout';
import { AuthenticationContext } from '../../Context';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const context = useContext(AuthenticationContext);
  const navigate = useNavigate()
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSignIn = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    if(email.length === 0 || password.length === 0) return setErrorMessage('Debes rellenar los campos para iniciar sesión');
    if(!email.includes('@')) return setErrorMessage('El correo electrónico ingresado no es valido');
    if(password.length < 6) return setErrorMessage('La contraseña debe tener al menos 6 caracteres');
    const response = context.handleLogin(email, password);
    if(response == 'Invalid credentials') return setErrorMessage('Correo electrónico o contraseña incorrectos');
    navigate('/');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }else {
      setErrorMessage(null);
    }
  };

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-slate-50 shadow-xl p-20 border border-black rounded-2xl">
          <h1 className="font-medium text-xl">Sign In</h1>
          <div className="flex flex-col items-center justify-center mt-4">
            <input
              ref={emailRef}
              type="text"
              placeholder="Email"
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Contraseña"
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
            />
            <button onClick={handleSignIn} className="rounded-lg bg-black text-white border border-black w-80 p-4 mb-4 focus:outline-none hover:bg-gray-900 transition-all duration-300">
              Iniciar sesión
            </button>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className='flex items-start justify-center mt-4'>
              <p className='text-sm text-gray-500'>No tienes una cuenta? <a href='/sign-up' className='text-slate-900 hover:text-black transition-colors duration-300'>Haz click para registrarte</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignIn;
