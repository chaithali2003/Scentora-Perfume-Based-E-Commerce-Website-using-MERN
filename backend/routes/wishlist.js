// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const auth = require('../middleware/auth');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, products: [] });
      await wishlist.save();
    }
    res.json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
});

// Add product to wishlist
router.post('/add/:productId', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, products: [req.params.productId] });
    } else if (!wishlist.products.includes(req.params.productId)) {
      wishlist.products.push(req.params.productId);
    }
    await wishlist.save();
    res.json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
});

// Remove product from wishlist
router.post('/remove/:productId', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== req.params.productId);
      await wishlist.save();
    }
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
});

// Check if product is in wishlist
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    const isInWishlist = wishlist && wishlist.products.includes(req.params.productId);
    res.json({ isInWishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error checking wishlist', error });
  }
});

module.exports = router;
