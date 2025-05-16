import { useContext, useState } from 'react';
import Layout from '../../Components/Layout';
import { AuthenticationContext } from '../../Context';

function MyAccount() {
  const context = useContext(AuthenticationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: context.accountData.name || '',
    lastName: context.accountData.lastName || '',
    email: context.accountData.email || '',
    password: context.accountData.password || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setIsEditing(false);
    context.handleUpdateAccount(formData.name, formData.lastName, formData.email, formData.password);
  };

  const renderView = () => {
    if (isEditing) {
      return (
        <div className="flex flex-col items-center justify-center mt-8 ">
          <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex flex-col items-start justify-center gap-3">
              <div className="flex flex-col items-start justify-center">
                <label htmlFor="nameEditing" className="text-sm text-gray-500">
                  Nombre
                </label>
                <input
                  id="nameEditing"
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <label htmlFor="lastNameEditing" className="text-sm text-gray-500">
                  Apellido
                </label>
                <input
                  id="lastNameEditing"
                  type="text"
                  placeholder="Apellido"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="emailEditing" className="text-sm text-gray-500">
                Email
              </label>
              <input
                id="emailEditing"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="passwordEditing" className="text-sm text-gray-500">
                Contraseña
              </label>
              <input
                id="passwordEditing"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="flex items-center justify-center mt-4 bg-black border border-black w-80 p-4 mb-4 focus:outline-none hover:bg-gray-900 transition-all duration-300 rounded-2xl"
          >
            <span className="text-lg font-medium text-white">Actualizar</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center mt-8 ">
        <div className="flex flex-col items-start justify-center gap-3">
          <span className="text-lg font-bold text-gray-700">
            Nombre completo:
            <span className="font-normal text-gray-500">
              {(formData.name + ' ' + formData.lastName).trim()}
            </span>
          </span>
          <span className="text-lg font-bold text-gray-700">
            Correo electrónico: <span className="font-normal text-gray-500">{formData.email}</span>
          </span>
          <span className="text-lg font-bold text-gray-700">
            Contraseña:
            <span className="font-normal text-gray-500"> {'*'.repeat(formData.password.length)}</span>
          </span>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center mt-4 bg-black border border-black w-80 p-4 mb-4 focus:outline-none hover:bg-gray-900 transition-all duration-300 rounded-2xl"
        >
          <span className="text-lg font-medium text-white">Editar</span>
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-50px)] flex items-start justify-center">
        <div className="flex flex-col items-center justify-center p-20 rounded-2xl">
          <h1 className="font-medium text-xl">My Account</h1>
          {renderView()}
        </div>
      </div>
    </Layout>
  );
}

export default MyAccount;
