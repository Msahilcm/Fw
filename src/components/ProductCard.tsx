import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Product } from '../store/slices/productsSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.description}</p>
          
          {/* Furniture-specific details */}
          <div className="space-y-1 mb-3">
            {product.material && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Material:</span> {product.material}
              </p>
            )}
            {product.dimensions && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Dimensions:</span> {product.dimensions}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
            <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 ${
            !product.inStock ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
          }`}
        >
          <motion.div
            animate={isAnimating ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: isAnimating ? 1 : 0,
              repeatType: "reverse"
            }}
            className="flex items-center"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            <span>{isAnimating ? 'Added!' : 'Add to Cart'}</span>
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard; 