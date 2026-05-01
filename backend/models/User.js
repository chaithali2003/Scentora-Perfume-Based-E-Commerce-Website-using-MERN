const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'seller'], default: 'customer' },
  profileImage: {
    type: String,
    default: 'https://i.pravatar.cc/150?img=32'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
