import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import API_URL from '../config';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { convertDriveLink, noImagePlaceholder } from '../utils/imageUtils';

function Profile() {
  const { token, user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', profileImage: '', password: '', confirmPassword: '' });
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({ name: user.name, email: user.email, profileImage: user.profileImage || '', password: '', confirmPassword: '' });

    const getOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders/my`, { headers: { Authorization: `Bearer ${token}` } });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.password && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateProfile({
        name: form.name,
        email: form.email,
        profileImage: form.profileImage,
        password: form.password || undefined
      });
      setMessage('Profile updated successfully.');
      setForm((prev) => ({
        ...prev,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
        password: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-24"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile & Settings</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={form.profileImage || 'https://i.pravatar.cc/150?img=32'}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-black object-cover"
              />
              <h3 className="text-2xl font-semibold mt-4">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">Role: {user?.role}</p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>

            <div className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                value={form.profileImage}
                onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                placeholder="Profile Image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="New password (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />

              {error && <div className="text-red-700 bg-red-100 p-3 rounded">{error}</div>}
              {message && <div className="text-green-700 bg-green-100 p-3 rounded">{message}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </motion.form>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-2xl font-semibold mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No recent orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Order #{order._id.slice(-6)}</span>
                    <span>Status: {order.status}</span>
                  </div>
                  <div className="text-gray-700 mb-2">Total: ₹{(order.total * 83).toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mb-2">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                  <ul className="text-sm space-y-1">
                    {order.items.map((item) => {
                  const productId = item.product?._id || item.product;
                  const productImage = item.product?.images?.[0]
                    ? convertDriveLink(item.product.images[0])
                    : item.product?.image
                      ? item.product.image
                      : noImagePlaceholder;
                  return (
                    <li key={item._id} className="flex items-center gap-3">
                      <img src={productImage} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      {productId ? (
                        <Link
                          to={`/products/${productId}`}
                          className="text-black hover:text-gray-800 font-semibold"
                        >
                          • {item.name} x{item.quantity} (₹{(item.price * 83).toFixed(2)} each)
                        </Link>
                      ) : (
                        <span>• {item.name} x{item.quantity} (₹{(item.price * 83).toFixed(2)} each)</span>
                      )}
                    </li>
                  );
                })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;
