import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthenticationContext, ShoppingCartContext } from '../../Context';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartContext = useContext(ShoppingCartContext);
  const authContext = useContext(AuthenticationContext);
  const activeStyle = 'underline underline-offset-4';

  const renderView = () => {
    if (authContext.isSignOutData)
      return (
        <li>
          <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Sign In
          </NavLink>
        </li>
      );
    return (
      <>
        <li className="text-black/60">
          <span>
            Hola, <span className="font-semibold">{authContext.accountData.name}</span>
          </span>
        </li>
        <li>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/my-account"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => {
              setIsMenuOpen(false);
              authContext.handleSignOut();
            }}
          >
            Sign Out
          </NavLink>
        </li>
      </>
    );
  };

  const categories = [
    { path: '/', name: 'All', category: null },
    { path: '/clothes', name: 'Clothes', category: 'clothes' },
    { path: '/electronics', name: 'Electronics', category: 'electronics' },
    { path: '/furnitures', name: 'Furnitures', category: 'furnitures' },
    { path: '/toys', name: 'Toys', category: 'toys' },
    { path: '/others', name: 'Others', category: 'others' },
  ];

  return (
    <nav className="bg-white fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <div className="flex justify-between items-center">
        {/* Logo y Botón de menú */}
        <div className="flex items-center gap-4">
          <NavLink to="/" className="font-semibold text-lg">
            Shopi
          </NavLink>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Menú de categorías - Escritorio */}
        <ul className="hidden md:flex items-center gap-3">
          {categories.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => cartContext.setSearchByCategory(item.category)}
                className={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Carrito y cuenta - Escritorio */}
        <ul className="hidden md:flex items-center gap-3">
          {renderView()}
          <li className="flex items-center">
            <ShoppingBagIcon className="h-6 w-6 text-black" />
            <div>{cartContext.cartProducts.length}</div>
          </li>
        </ul>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {categories.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => {
                    cartContext.setSearchByCategory(item.category);
                    setIsMenuOpen(false);
                  }}
                  className={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <div className="border-t border-gray-200 my-2" />
            {renderView()}
            <li className="flex items-center">
              <ShoppingBagIcon className="h-6 w-6 text-black" />
              <div>{cartContext.cartProducts.length}</div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
