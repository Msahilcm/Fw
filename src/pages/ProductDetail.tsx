import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../store/slices/productsSlice';
import { HeartIcon as HeartIconSolid, HeartIcon as HeartIconOutline, ShareIcon } from '@heroicons/react/24/solid';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const product = useSelector((state: RootState) => 
    state.products.items.find((p: Product) => p.id === Number(id))
  );

  const relatedProducts = useSelector((state: RootState) =>
    state.products.items
      .filter((p: Product) => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4)
  );

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (product.inStock && typeof product.quantity === 'number') {
      if (newQuantity <= product.quantity && newQuantity >= 1) {
        setQuantity(newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        product,
        quantity
      }));
      navigate('/cart');
    }
  };

  const handleIncrement = () => {
    if (product.inStock && typeof product.quantity === 'number' && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // Implement wishlist logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <div>
              <span className="font-semibold">Material:</span> {product.material}
            </div>
            <div>
              <span className="font-semibold">Dimensions:</span> {product.dimensions}
            </div>
            <div>
              <span className="font-semibold">Category:</span> {product.category}
            </div>
            <div>
              <span className="font-semibold">Availability:</span>{' '}
              <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 border rounded-md"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 border rounded-md"
              disabled={!product.inStock || typeof product.quantity !== 'number' || quantity >= product.quantity}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
            <button
              onClick={toggleWishlist}
              className="p-2 border rounded-md hover:bg-gray-100"
            >
              {isInWishlist ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIconOutline className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-2 border rounded-md hover:bg-gray-100"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-semibold">{relatedProduct.name}</h3>
                <p className="text-blue-600">${relatedProduct.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 