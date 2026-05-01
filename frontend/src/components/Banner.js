// src/components/Banner.js
import React from 'react';
import { motion } from 'framer-motion';
import './Banner.css'; // Custom CSS styles

function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="banner"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-10 left-10 w-24 h-24 bg-gray-500/20 rounded-full blur-lg"
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="banner-title"
        >
          Discover Your Signature Scent
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
        >
          Explore our latest collections and special offers crafted for the discerning fragrance enthusiast.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
        >
          Shop Now
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Banner;
