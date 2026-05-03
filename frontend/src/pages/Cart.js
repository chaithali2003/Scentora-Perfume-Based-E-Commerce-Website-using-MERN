import React, { useState } from 'react';
import NavigationBar from '../components/Navbar';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { convertDriveLink, noImagePlaceholder } from '../utils/imageUtils';

function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'creditCard',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      setOrderError('Please log in first to place an order.');
      return;
    }

    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setOrderError('Please fill in all shipping details.');
      return;
    }

    if (paymentInfo.method === 'creditCard' && (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv)) {
      setOrderError('Please fill in your card details.');
      return;
    }

    if (items.length === 0) {
      setOrderError('Your cart is empty.');
      return;
    }

    setProcessing(true);
    setOrderError('');
    setOrderSuccess('');

    const payload = {
      items: items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.priceForSize,
        quantity: item.quantity,
        size: item.size
      })),
      shippingAddress,
      paymentMethod: paymentInfo.method,
      shipping: 5,
      tax: Math.round(getTotal() * 0.08 * 100) / 100
    };

    try {
      await axios.post(`${API_URL}/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrderSuccess('Order placed successfully!');
      clearCart();
      setTimeout(() => {
        navigate('/orders');
      }, 1000);
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setProcessing(false);
    }
  };

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
          Shopping Cart
        </motion.h2>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8">Add some amazing fragrances to your cart!</p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Cart Items</h3>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.product.images && item.product.images[0] ? convertDriveLink(item.product.images[0]) : noImagePlaceholder}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = noImagePlaceholder;
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
                        <p className="text-gray-600">Size: {item.size}</p>
                          <p className="text-black font-bold">₹{(item.priceForSize * 83).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        >
                          -
                        </motion.button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        >
                          +
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.product._id, item.size)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-semibold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-black">₹{(getTotal() * 83).toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-8 space-y-3 border-t pt-4">
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-gray-700">Shipping Address</h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-700">Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="creditCard"
                      checked={paymentInfo.method === 'creditCard'}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                      className="w-4 h-4 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Credit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, AmEx</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="debitCard"
                      checked={paymentInfo.method === 'debitCard'}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                      className="w-4 h-4 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Debit Card</div>
                      <div className="text-sm text-gray-600">Bank Debit Card</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentInfo.method === 'upi'}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                      className="w-4 h-4 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">UPI</div>
                      <div className="text-sm text-gray-600">Google Pay, PhonePe, PayTM</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentInfo.method === 'netbanking'}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                      className="w-4 h-4 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Net Banking</div>
                      <div className="text-sm text-gray-600">All major banks supported</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentInfo.method === 'paypal'}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                      className="w-4 h-4 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">PayPal</div>
                      <div className="text-sm text-gray-600">Fast and secure payment</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentInfo.method === 'wallet'}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                      className="w-4 h-4 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Digital Wallet</div>
                      <div className="text-sm text-gray-600">Apple Pay, Samsung Pay</div>
                    </div>
                  </label>
                </div>
              </div>

              {paymentInfo.method === 'creditCard' && (
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-gray-700">Card Details</h4>
                  <p className="text-sm text-gray-500">This is a simulated payment flow for UI purposes only. No real transaction will be processed.</p>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {orderError && <div className="text-sm text-red-700 bg-red-100 p-3 rounded">{orderError}</div>}
              {orderSuccess && <div className="text-sm text-green-700 bg-green-100 p-3 rounded">{orderSuccess}</div>}

              <motion.button
                whileHover={{ scale: processing ? 1 : 1.02 }}
                whileTap={{ scale: processing ? 1 : 0.98 }}
                onClick={handleCheckout}
                disabled={processing}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg"
              >
                {processing ? 'Placing Order...' : 'Place Order'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Clear Cart
              </motion.button>
            </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Cart;