import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationProvider, initializeLocalStorage, ShoppingCartProvider } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Navbar from '../../Components/Navbar';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';
import './App.css';
import { useContext } from 'react';

const AppRoutes = () => {
  const context = useContext(AuthenticationContext);

  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  const isSignOut = localStorage.getItem('sign-out');
  const parsedIsSignOut = JSON.parse(isSignOut);

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.accountData ? Object.keys(context.accountData).length === 0 : true;
  const noSignOutInLocalStorage = Object.keys(parsedIsSignOut).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = context.isSignoutData || !noSignOutInLocalStorage;

  let routes = useRoutes([
    { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to='/sign-in' /> },
    { path: '/clothes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to='/sign-in' />},
    { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to='/sign-in' />},
    { path: '/furnitures', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to='/sign-in' /> },
    { path: '/toys', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to='/sign-in' /> },
    { path: '/others', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to='/sign-in' /> },
    { path: '/my-account', element: hasUserAnAccount && !isUserSignOut ? <MyAccount /> : <Navigate replace to='/sign-in' /> },
    { path: '/my-order', element: hasUserAnAccount && !isUserSignOut ? <MyOrder /> : <Navigate replace to='/sign-in' /> },
    { path: '/my-orders', element: hasUserAnAccount && !isUserSignOut ? <MyOrders /> : <Navigate replace to='/sign-in' /> },
    { path: '/my-orders/last', element: hasUserAnAccount && !isUserSignOut ? <MyOrder /> : <Navigate replace to='/sign-in' /> },
    { path: '/my-orders/:id', element: hasUserAnAccount && !isUserSignOut ? <MyOrder /> : <Navigate replace to='/sign-in' /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  initializeLocalStorage();

  return (
    <AuthenticationProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <AppRoutes />
          <Navbar />
          <CheckoutSideMenu />
        </BrowserRouter>
      </ShoppingCartProvider>
    </AuthenticationProvider>
  );
};

export default App;
