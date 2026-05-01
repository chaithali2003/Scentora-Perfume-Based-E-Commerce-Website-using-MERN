const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, shipping, tax } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }
    const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subTotal + (shipping || 0) + (tax || 0);

    const order = new Order({
      user: req.user._id,
      items,
      subTotal,
      shipping: shipping || 0,
      tax: tax || 0,
      total,
      status: 'pending',
      shippingAddress
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seller can list all orders
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
