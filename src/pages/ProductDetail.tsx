import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { Product, ProductsState } from '../store/slices/productsSlice';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state: RootState) => 
    (state.products as ProductsState).items.find((p: Product) => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:grid lg:grid-cols-2 lg:gap-x-8"
        >
          <div className="lg:max-w-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-center object-cover rounded-lg"
            />
          </div>
          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-4">
              <p className="text-2xl font-medium text-gray-900">${product.price}</p>
            </div>
            <div className="mt-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>
            <div className="mt-8">
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-t border-b border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 