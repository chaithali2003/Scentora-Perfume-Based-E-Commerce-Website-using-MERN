// seed.js

// Import required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import Mongoose models
const Product = require('./models/Product');
const Review = require('./models/Review');

// Define sample products to seed
const products = [
  {
    name: 'Eau de Parfum',
    shortDescription: 'A timeless classic fragrance with elegance.',
    fullDescription: 'Eau de Parfum is a sophisticated classic scent with luxurious notes of jasmine and sandalwood. Perfect for daily wear and special occasions.',
    price: 129.99,
    category: 'Floral',
    gender: 'Female',
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578762996442-48f60103fc96?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Floral Essence',
    shortDescription: 'Bloom with every spritz - springtime elegance.',
    fullDescription: 'Floral Essence offers a beautiful bouquet of fresh flowers, creating a vibrant and uplifting scent. Ideal for springtime and everyday sophistication.',
    price: 119.99,
    category: 'Floral',
    gender: 'Female',
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Mystic Oud',
    shortDescription: 'Deep and alluring oriental mystery.',
    fullDescription: 'Mystic Oud combines rich oud notes with hints of amber and exotic spices for a captivating and luxurious aroma. A signature scent for those with refined taste.',
    price: 179.99,
    category: 'Oriental',
    gender: 'Male',
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1615522571714-f049cd1cbf33?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Citrus Splash',
    shortDescription: 'Fresh and invigorating morning energy.',
    fullDescription: 'Citrus Splash brings an energizing burst of lemon, bergamot, and mandarin. Perfect for daily wear and creating a fresh, vibrant mood.',
    price: 99.99,
    category: 'Citrus',
    gender: 'Unisex',
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1590080876411-cd7bc0341ae0?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Amber Nights',
    shortDescription: 'Warm and sensual evening allure.',
    fullDescription: 'Amber Nights blends warm amber with vanilla, musk, and sandalwood, creating a sensual and luxurious fragrance ideal for evening occasions and special moments.',
    price: 149.99,
    category: 'Amber',
    gender: 'Female',
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1598037254857-6596cf8b3da3?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1616409829580-96b9e83ee8d9?w=500&h=500&fit=crop'
    ]
  }
];

// Define sample reviews to seed
const reviews = [
  {
    username: 'JaneDoe',
    rating: 5,
    comment: 'Absolutely love this fragrance! It lasts all day.'
  },
  {
    username: 'JohnSmith',
    rating: 4,
    comment: 'Great scent, but the bottle could be nicer.'
  },
  {
    username: 'PerfumeLover',
    rating: 5,
    comment: 'A perfect blend of floral and woody notes.'
  },
  {
    username: 'ScentFanatic',
    rating: 3,
    comment: 'Good fragrance, but a bit too strong for my taste.'
  }
];

// Async function to seed the database
const seedDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data from Products and Reviews collections
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️ Cleared existing products and reviews');

    // Iterate over each product and save to the database
    for (const prod of products) {
      const product = new Product(prod);
      await product.save();
      console.log(`➕ Added product: ${product.name}`);

      // Optionally, add reviews to each product
      // Here, we're assigning random reviews from the sample reviews array
      const numberOfReviews = Math.floor(Math.random() * reviews.length) + 1; // At least 1 review
      const shuffledReviews = reviews.sort(() => 0.5 - Math.random());
      const selectedReviews = shuffledReviews.slice(0, numberOfReviews);

      for (const rev of selectedReviews) {
        const review = new Review({
          product: product._id,
          username: rev.username,
          rating: rev.rating,
          comment: rev.comment
        });
        await review.save();
        product.reviews.push(review);
        console.log(`   ➕ Added review by ${review.username}`);
      }

      // Save the product with the associated reviews
      await product.save();
    }

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding the database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('🔒 MongoDB connection closed');
  }
};

// Execute the seed function
seedDB();
