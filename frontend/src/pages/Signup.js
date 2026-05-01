import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Please complete all fields.');
      setLoading(false);
      return;
    }

    try {
      await signup(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-24"
      >
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
          {error && <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-4 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-black font-semibold">Log in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
