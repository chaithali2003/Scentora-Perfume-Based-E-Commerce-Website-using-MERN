import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';

function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Unable to load products', err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <div className="container mx-auto px-4 py-24">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-gray-800 mb-8 text-center">All Perfumes</motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ProductListing;
