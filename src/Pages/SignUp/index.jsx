import { useContext, useRef, useState } from 'react';
import Layout from '../../Components/Layout';
import { AuthenticationContext } from '../../Context';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const context = useContext(AuthenticationContext);
  const navigate = useNavigate()
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSignUp = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    if(email.length === 0 || password.length === 0) return setErrorMessage('Debes rellenar los campos para iniciar sesión');
    if(!email.includes('@')) return setErrorMessage('El correo electrónico ingresado no es valido');
    const response = context.handleSignUp(email, password);
    if(response == 'User already exists') return setErrorMessage('El usuario ya se encuentra registrado');
    navigate('/');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignUp();
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
              ref={nameRef}
              type="text"
              placeholder="Nombre"
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
            />
            <input
              ref={lastNameRef}
              type="text"
              placeholder="Apellido"
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
            />
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
            <input
              ref={passwordRef}
              type="password"
              placeholder="Confirma tu contraseña"
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
            />
            <button onClick={handleSignUp} className="rounded-lg bg-black text-white border border-black w-80 p-4 mb-4 focus:outline-none hover:bg-gray-900 transition-all duration-300">
              Registrarme
            </button>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className='flex items-start justify-center mt-4'>
              <p className='text-sm text-gray-500'>Ya tienes una cuenta? <a href='/sign-in' className='text-slate-900 hover:text-black transition-colors duration-300'>Haz click para iniciar sesión</a></p> 
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
