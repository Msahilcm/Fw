import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { logout } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Track Order', href: '/track-order' },
    ...(isAuthenticated ? [{ name: 'Profile', href: '/profile' }] : []),
    { name: isAuthenticated ? 'Logout' : 'Login', href: isAuthenticated ? '#' : '/login' },
  ];

  // Skip to main content functionality
  const skipToMain = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg" role="navigation" aria-label="Main navigation">
      {/* Skip to main content link - visible on keyboard focus */}
      <a
        href="#main"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-indigo-600"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Home">
              <Logo />
            </Link>
          </div>

          {/* Desktop navigation - centered */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <React.Fragment key={item.name}>
                  {item.name === 'Logout' ? (
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                      aria-current={window.location.pathname === item.href ? 'page' : undefined}
                    >
                      {item.name === 'Profile' && <UserCircleIcon className="h-5 w-5 mr-1" />}
                      {item.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex sm:items-center flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          {/* Cart link */}
          <div className="flex items-center">
            <Link
              to="/cart"
              className="group -m-2 p-2 flex items-center"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCartIcon
                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}
        id="mobile-menu"
        role="menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          {/* Mobile Search */}
          <div className="px-4 pb-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          {navigation.map((item) => (
            <React.Fragment key={item.name}>
              {item.name === 'Logout' ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    {item.name}
                  </div>
                </button>
              ) : (
                <Link
                  to={item.href}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={window.location.pathname === item.href ? 'page' : undefined}
                >
                  <div className="flex items-center">
                    {item.name === 'Profile' && <UserCircleIcon className="h-5 w-5 mr-2" />}
                    {item.name}
                  </div>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 