// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Unisex'], required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  availableSizes: [{ type: String }],
  images: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Product', ProductSchema);
