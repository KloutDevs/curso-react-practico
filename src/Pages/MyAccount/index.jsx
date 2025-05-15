import { useContext, useState } from 'react';
import Layout from '../../Components/Layout';
import { AuthenticationContext } from '../../Context';

function MyAccount() {
  const context = useContext(AuthenticationContext);

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-50px)] flex items-start justify-center">
        <div className="flex flex-col items-center justify-center p-20 rounded-2xl">
          <h1 className="font-medium text-xl">My Account</h1>
          <div className="flex flex-col items-center justify-center mt-8 ">
            <div className="flex flex-col items-start justify-center gap-3">
              <span className="text-lg font-bold text-gray-700">
                Nombre completo:
                <span className="font-normal text-gray-500">
                  {(context.accountData.name + ' ' + context.accountData.lastName).trim()}
                </span>
              </span>
              <span className="text-lg font-bold text-gray-700">
                Correo electrónico: <span className="font-normal text-gray-500">{context.accountData.email}</span>
              </span>
              <span className="text-lg font-bold text-gray-700">
                Contraseña:
                <span className="font-normal text-gray-500"> {'*'.repeat(context.accountData.password.length)}</span>
              </span>
            </div>
            <div className="flex mt-4">
              <span className="text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer">Olvidé mi contraseña</span> 
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyAccount;
