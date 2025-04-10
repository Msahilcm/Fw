import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

// Lazy load components
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));

function App() {
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('cookieConsent') === 'true';
  });

  const handleCookieConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    setCookieConsent(true);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />

          {/* Cookie Consent Banner */}
          {!cookieConsent && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
              <p className="text-sm">
                We use cookies to improve your experience. By continuing to use our site, you agree to our{' '}
                <Link to="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </Link>
                .
              </p>
              <button
                onClick={handleCookieConsent}
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Accept
              </button>
            </div>
          )}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
