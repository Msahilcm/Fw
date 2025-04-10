import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProducts } from '../store/slices/productsSlice';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TruckIcon, CreditCardIcon, PhoneIcon } from '@heroicons/react/24/outline';

const heroImages = [
  {
    id: 1,
    image: '/images/modern-interior-composition-modular-sofa-260nw-2273970983.webp',
    title: 'Modern Living Room',
    description: 'Discover our collection of modern sofas'
  },
  {
    id: 2,
    image: '/images/white-and-beige-scaled.jpg',
    title: 'Elegant Furniture',
    description: 'Timeless pieces for your home'
  },
  {
    id: 3,
    image: '/images/dining table.jpg',
    title: 'Dining Collection',
    description: 'Create memorable dining experiences'
  }
];

const categories = ['All', 'Chair', 'Table', 'Bed', 'Desk', 'Sofa', 'Storage'];

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredItems = selectedCategory === 'All'
    ? products
    : products.filter(item => item.category === selectedCategory);

  // Get only first 4 items
  const displayedItems = filteredItems.slice(0, 4);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-white">
        <Slider {...sliderSettings} className="h-full">
          {heroImages.map((slide) => (
            <div key={slide.id} className="relative h-[600px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-serif mb-4">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
                <Link 
                  to="/products" 
                  className="mt-6 px-8 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <TruckIcon className="h-12 w-12 mx-auto text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium">Free Shipping</h3>
              <p className="mt-2 text-gray-600">On all orders over $100</p>
            </div>
            <div className="text-center">
              <CreditCardIcon className="h-12 w-12 mx-auto text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium">Secure Payment</h3>
              <p className="mt-2 text-gray-600">100% secure payment</p>
            </div>
            <div className="text-center">
              <PhoneIcon className="h-12 w-12 mx-auto text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium">24/7 Support</h3>
              <p className="mt-2 text-gray-600">Dedicated support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-center mb-8">This Week Featured Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="prose">
              <p className="text-gray-600">
                Add elegance and sophistication to your space with this beautifully crafted furniture collection. 
                Its sleek design and natural finesse blend seamlessly with any decor, while the detailed finish 
                lends each piece some extra character and charm. Perfect for those looking to create a sophisticated 
                yet cozy atmosphere in your home or office.
              </p>
            </div>
            <div>
              <img
                src="/images/white-and-beige-scaled.jpg"
                alt="Featured Product"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-center mb-8">A Huge Collection of Furniture</h2>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filtered Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {displayedItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center">
            <Link
              to={`/products?category=${selectedCategory.toLowerCase()}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              See More {selectedCategory !== 'All' ? selectedCategory : 'Products'}
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Discount Notice */}
      <section className="py-8 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          *10% off will be applied to your first order once you have registered an account, and will apply to full price items only.
          <Link to="/terms" className="ml-2 text-gray-800 underline">
            T&Cs apply
          </Link>
        </p>
      </section>

      {/* Social Networks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Our Social Networks</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <img src="/images/icons8-instagram-64.png" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Pinterest</span>
              <img src="/images/icons8-pinterest-50.png" alt="Pinterest" className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <img src="/images/icons8-facebook-50.png" alt="Facebook" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">HOW CAN WE HELP</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900">Frequently Asked Questions</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link to="/track" className="text-sm text-gray-600 hover:text-gray-900">Track My Order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">ABOUT US</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About ARTLAB</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">SHOP BY DEPARTMENT</h4>
              <ul className="space-y-2">
                <li><Link to="/category/seating" className="text-sm text-gray-600 hover:text-gray-900">Seating</Link></li>
                <li><Link to="/category/tables" className="text-sm text-gray-600 hover:text-gray-900">Tables</Link></li>
                <li><Link to="/category/storage" className="text-sm text-gray-600 hover:text-gray-900">Storage</Link></li>
                <li><Link to="/category/lounge" className="text-sm text-gray-600 hover:text-gray-900">Lounge</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 