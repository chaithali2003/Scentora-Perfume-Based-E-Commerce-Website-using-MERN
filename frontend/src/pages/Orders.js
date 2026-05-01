import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import API_URL from '../config';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { convertDriveLink, noImagePlaceholder } from '../utils/imageUtils';

function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return;

    const url = user?.role === 'seller' ? `${API_URL}/orders` : `${API_URL}/orders/my`;

    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [token, user]);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        className="container mx-auto px-4 py-24"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{user?.role === 'seller' ? 'All Orders' : 'My Orders'}</h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Order #{order._id.slice(-6)}</span>
                <span>Status: {order.status}</span>
              </div>
              <div className="text-sm text-gray-700 mb-3">Total: ₹{(order.total * 83).toFixed(2)} | Placed: {new Date(order.createdAt).toLocaleString()}</div>
              <ul className="space-y-2">
                {order.items.map((item) => {
                const productId = item.product?._id || item.product;
                const productImage = item.product?.images?.[0]
                  ? convertDriveLink(item.product.images[0])
                  : item.product?.image
                    ? item.product.image
                    : noImagePlaceholder;
                return (
                  <li key={item._id} className="border-t pt-2 flex items-center gap-3">
                    <img src={productImage} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      {productId ? (
                        <Link
                          to={`/products/${productId}`}
                          className="font-semibold text-black hover:text-gray-800"
                        >
                          {item.name} x{item.quantity}
                        </Link>
                      ) : (
                        <div className="font-semibold">{item.name} x{item.quantity}</div>
                      )}
                      <div className="text-sm text-gray-600">{item.size ? `Size: ${item.size} • ` : ''}₹{(item.price * 83).toFixed(2)} each</div>
                    </div>
                  </li>
                );
              })}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Orders;
