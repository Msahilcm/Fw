import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    dispatch(addToCart({ product, quantity: 1 }));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleViewDetails = () => {
    console.log('Navigating to product:', product.id); // Add this line for debugging
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover object-center"
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

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Details
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
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
      </div>
    </motion.div>
  );
};

export default ProductCard; 