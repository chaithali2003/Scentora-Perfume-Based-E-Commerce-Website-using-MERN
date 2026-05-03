import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import ReviewsSection from '../components/ReviewsSection';
import ImageGallery from '../components/ImageGallery';
import { useCart } from '../contexts/CartContext';
import { Facebook, Twitter, Instagram, Star, StarFill } from 'react-bootstrap-icons';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`)
      .then(response => {
        setProduct(response.data);
        if (response.data.availableSizes && response.data.availableSizes.length > 0) {
          setSelectedSize(response.data.availableSizes[0]);
        }
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, quantity);
      alert('Added to cart!');
    } else {
      alert('Please select a size');
    }
  };

  // Calculate price based on size
  const getSizeMultiplier = (size) => {
    if (size === '100ml') return 1.75;
    if (size === '200ml') return 2.5;
    return 1;
  };

  const priceForSize = product ? product.price * getSizeMultiplier(selectedSize) : 0;

  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
      ></motion.div>
    </div>
  );

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <ImageGallery images={product.images} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  {product.gender && (
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                      {product.gender}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {i < Math.floor(averageRating) ? (
                        <StarFill className="text-yellow-400 w-5 h-5" />
                      ) : (
                        <Star className="text-gray-300 w-5 h-5" />
                      )}
                    </motion.div>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews ? product.reviews.length : 0} reviews)</span>
              </div>
              <p className="text-2xl font-bold text-black mb-6">₹{(priceForSize * 83).toFixed(2)}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                {product.availableSizes && product.availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold transition-colors duration-300"
                >
                  -
                </motion.button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold transition-colors duration-300"
                >
                  +
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg mb-6"
            >
              Add to Cart - ₹{((priceForSize * quantity) * 83).toFixed(2)}
            </motion.button>

            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Share this fragrance</h4>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <ReviewsSection productId={product._id} reviews={product.reviews} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProductPage;
