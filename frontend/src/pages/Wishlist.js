import React from 'react';
import NavigationBar from '../components/Navbar';
import { motion } from 'framer-motion';
import { useWishlist } from '../contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { convertDriveLink, noImagePlaceholder } from '../utils/imageUtils';
import { Heart } from 'react-bootstrap-icons';

function Wishlist() {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (product.availableSizes && product.availableSizes.length > 0) {
      addToCart(product, product.availableSizes[0], 1);
      alert('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-24"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          My Wishlist
        </motion.h2>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8">Add your favorite fragrances to your wishlist!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {wishlist.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden group cursor-pointer h-64">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={convertDriveLink(product.images?.[0] || noImagePlaceholder)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = noImagePlaceholder;
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <Heart size={20} fill="white" />
                  </motion.button>
                </div>

                <div className="p-6">
                  <motion.h5
                    className="text-xl font-bold text-black mb-2"
                    whileHover={{ color: '#666666' }}
                  >
                    {product.name}
                  </motion.h5>
                  <p className="text-gray-600 mb-2 line-clamp-2">{product.shortDescription}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-black">₹{(product.price * 83).toFixed(2)}</span>
                    {product.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-600">{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Wishlist;
