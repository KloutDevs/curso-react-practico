import { useContext, useRef, useState } from 'react';
import Layout from '../../Components/Layout';
import { AuthenticationContext } from '../../Context';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const context = useContext(AuthenticationContext);
  const navigate = useNavigate()
  const formRef = useRef()
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current)
    let name = formData.get('name');
    let lastName = formData.get('lastName');
    let email = formData.get('email');
    let password = formData.get('password');
    let confirmPassword = formData.get('confirmPassword');
    if(name.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) return setErrorMessage('Debes rellenar todos los campos para registrarte');
    if(password !== confirmPassword) return setErrorMessage('Las contraseñas no coinciden');
    if(!email.includes('@')) return setErrorMessage('El correo electrónico ingresado no es valido');
    const response = context.handleSignUp(name, lastName, email, password);
    if(response == 'User already exists') return setErrorMessage('El usuario ya se encuentra registrado');
    navigate('/my-account');
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
        <form className="flex flex-col items-center justify-center mt-[70px] p-5 md:p-20 rounded-2xl w-full max-w-md">
          <h1 className="font-medium text-xl">Sign In</h1>
          <div className="flex flex-col items-center justify-center mt-4">
            <input
              type="text"
              placeholder="Nombre"
              name='name'
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Apellido"
              name='lastName'
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Email"
              name='email'
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name='password'
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              name='confirmPassword'
              onKeyDown={handleKeyDown}
              className="rounded-lg border border-black w-full md:w-80 p-4 mb-4 focus:outline-none"
            />
            <button onClick={handleSignUp} className="rounded-lg bg-black text-white border border-black w-full md:w-80 p-4 mb-4 focus:outline-none hover:bg-gray-900 transition-all duration-300">
              Registrarme
            </button>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className='flex items-start justify-center mt-4'>
              <p className='text-sm text-gray-500'>Ya tienes una cuenta? <a href='/sign-in' className='text-slate-900 hover:text-black transition-colors duration-300'>Haz click para iniciar sesión</a></p> 
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default SignUp;
