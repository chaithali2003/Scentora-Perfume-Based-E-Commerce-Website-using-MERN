
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { Cart, Heart, ChevronDown } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import './Navbar.css';

function NavigationBar() {
  const { getItemCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-xl border-b border-gray-700/60 shadow-lg' : 'bg-black border-b border-gray-700 shadow-lg'}`}
      >
        <Container>
          <div className="flex flex-wrap justify-between items-center py-3 gap-3">
          <LinkContainer to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white cursor-pointer"
            >
              SCENTORA
            </motion.div>
          </LinkContainer>

          <div className="hidden md:flex space-x-8 items-center">
            {[
              { to: '/', label: 'Home' },
              { to: '/all-perfumes', label: 'All Perfumes' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' }
            ].map((item) => (
              <LinkContainer key={item.to} to={item.to}>
                <motion.div
                  whileHover={{ scale: 1.1, color: '#666666' }}
                  className="text-white hover:text-gray-300 font-medium cursor-pointer transition-colors duration-300"
                >
                  {item.label}
                </motion.div>
              </LinkContainer>
            ))}

            {user?.role === 'seller' && (
              <LinkContainer to="/add-product">
                <motion.div
                  whileHover={{ scale: 1.1, color: '#666666' }}
                  className="text-white font-semibold cursor-pointer"
                >
                  Add Product
                </motion.div>
              </LinkContainer>
            )}

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleProfileMenu}
                  className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-all"
                >
                  <img
                    src={user.profileImage || 'https://i.pravatar.cc/150?img=32'}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-white font-medium">{user.name}</span>
                  <ChevronDown size={16} className="text-white" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
                    <LinkContainer to="/profile">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                    </LinkContainer>
                    <LinkContainer to="/wishlist">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Wishlist</div>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</div>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cart</div>
                    </LinkContainer>
                    <div
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LinkContainer to="/login">
                <motion.div
                  whileHover={{ scale: 1.1, color: '#666666' }}
                  className="text-white hover:text-gray-300 font-medium cursor-pointer transition-colors duration-300"
                >
                  Login
                </motion.div>
              </LinkContainer>
            )}
          </div>

          <div className="flex gap-4">
            <LinkContainer to="/wishlist">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative cursor-pointer"
              >
                <Heart size={24} className="text-white hover:text-gray-300 transition-colors duration-300" />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.div>
            </LinkContainer>

            <LinkContainer to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative cursor-pointer"
              >
                <Cart size={24} className="text-white hover:text-gray-300 transition-colors duration-300" />
                {getItemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </motion.div>
            </LinkContainer>
          </div>
        </div>
      </Container>
    </motion.nav>
    <div className="h-20 w-full" />
    </>
  );
}



export default NavigationBar;






