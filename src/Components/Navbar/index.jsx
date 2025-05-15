import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { AuthenticationContext, ShoppingCartContext } from '../../Context';

const Navbar = () => {
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
          <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={authContext.handleSignOut}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sign Out
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => cartContext.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => cartContext.setSearchByCategory('clothes')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => cartContext.setSearchByCategory('electronics')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furnitures"
            onClick={() => cartContext.setSearchByCategory('furnitures')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={() => cartContext.setSearchByCategory('toys')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            onClick={() => cartContext.setSearchByCategory('others')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black"></ShoppingBagIcon>
          <div>{cartContext.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
