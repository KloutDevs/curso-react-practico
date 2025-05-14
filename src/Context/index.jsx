import { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext();
export const AuthenticationContext = createContext();

export const initializeLocalStorage = () => {
  const localStorage = window.localStorage;
  const account = localStorage.getItem('account');
  const isSignOut = localStorage.getItem('sign-out');
  let parsedAccount;
  let parsedIsSignOut;

  if (!account) {
    localStorage.setItem('account', JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(account);
  }

  if (!isSignOut) {
    localStorage.setItem('sign-out', JSON.stringify(true));
    parsedIsSignOut = true;
  } else {
    parsedIsSignOut = JSON.parse(isSignOut);
  }

  return {
    account: parsedAccount,
    isSignOut: parsedIsSignOut,
  };
};

export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0);

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart · Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) => item.category.toLowerCase().includes(searchByCategory.toLowerCase()));
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle);
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory);
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));
    if (searchByTitle && !searchByCategory)
      setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
    if (!searchByTitle && searchByCategory)
      setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const AuthenticationProvider = ({ children }) => {
  // Initialize local storage
  const { account, isSignOut } = initializeLocalStorage();

  // Account
  const [accountData, setAccountData] = useState(account);
  const [isSignOutData, setIsSignOutData] = useState(isSignOut);

  const handleSignOut = () => {
    if (isSignOutData) return;
    setIsSignOutData(true);
    localStorage.setItem('sign-out', JSON.stringify(isSignOutData));
  };

  const handleLogin = (email, password) => {
    if (!isSignOutData) return;
    if(email !== 'user@example.com' || password !== '123456') return 'Invalid credentials';
    setIsSignOutData(false);
    localStorage.setItem('sign-out', JSON.stringify(false));
    localStorage.setItem('account', JSON.stringify({ name: 'Usuario 1', lastName: 'Platzi', email, password }));
  };

  const handleSignUp = (name, lastName, email, password) => {
    if (!isSignOutData) return;
    if(email == 'user@example.com') return 'User already exists';
    setIsSignOutData(false);
    localStorage.setItem('sign-out', JSON.stringify(isSignOutData));
    localStorage.setItem('account', JSON.stringify({ name, lastName, email, password }));
  };

  return (
    <AuthenticationContext.Provider
      value={{
        account,
        setAccountData,
        handleSignOut,
        handleLogin,
        handleSignUp
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
