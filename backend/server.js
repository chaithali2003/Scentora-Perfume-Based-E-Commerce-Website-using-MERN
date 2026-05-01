// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const seedDefaultUsers = async () => {
  try {
    const defaults = [
      { name: 'Admin Vendor', email: 'seller@perfume.com', password: 'pass123', role: 'seller' },
      { name: 'Demo Customer', email: 'customer@perfume.com', password: 'pass123', role: 'customer' }
    ];

    for (const def of defaults) {
      let existing = await User.findOne({ email: def.email.toLowerCase() });
      if (!existing) {
        const hashed = await bcrypt.hash(def.password, 10);
        existing = new User({
          name: def.name,
          email: def.email.toLowerCase(),
          password: hashed,
          role: def.role
        });
        await existing.save();
        console.log(`🛠️ Created default user ${def.email} (${def.role})`);
      }
    }

    console.log('✅ Default users available');
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Contact route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // For now, just log it. In production, send email.
  console.log('Contact form submission:', { name, email, message });
  res.status(200).json({ message: 'Message sent successfully!' });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Scentora API');
});

// Connect to MongoDB and Start Server
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing required environment variable: MONGODB_URI');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('MongoDB connected');
  await seedDefaultUsers();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
