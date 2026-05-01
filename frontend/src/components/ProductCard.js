// src/components/ProductCard.js
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import './ProductCard.css';
import { convertDriveLink, noImagePlaceholder } from '../utils/imageUtils';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : '');

  const imageArray = Array.isArray(product.images)
    ? product.images
    : typeof product.images === 'string'
      ? product.images.split(',').map((url) => url.trim()).filter(Boolean)
      : [];

  const imageUrl = imageArray.length > 0
    ? convertDriveLink(imageArray[0])
    : noImagePlaceholder;

  // Calculate price based on size
  const getSizeMultiplier = (size) => {
    if (size === '100ml') return 1.75;
    return 1;
  };

  const priceForSize = product.price * getSizeMultiplier(selectedSize);

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (selectedSize) {
      addToCart(product, selectedSize, 1);
      alert('Added to cart!');
    } else {
      alert('Please select a size');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative overflow-hidden group cursor-pointer" onClick={handleClick}>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = noImagePlaceholder;
          }}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <motion.h5
            className="text-xl font-bold text-black flex-1"
            whileHover={{ color: '#666666' }}
          >
            {product.name}
          </motion.h5>
          {product.gender && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold whitespace-nowrap">
              {product.gender}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-black">₹{(priceForSize * 83).toFixed(2)}</span>
        </div>

        {/* Display Available Sizes as Badges */}
        {product.availableSizes && product.availableSizes.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Sizes:</p>
            <div className="flex gap-2 flex-wrap">
              {product.availableSizes.map(size => (
                <span
                  key={size}
                  className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Form.Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {product.availableSizes && product.availableSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </Form.Select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
