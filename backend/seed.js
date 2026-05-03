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
  // FLORAL CATEGORY
  {
    name: 'Eau de Parfum',
    shortDescription: 'A timeless classic fragrance with elegance.',
    fullDescription: 'Eau de Parfum is a sophisticated classic scent with luxurious notes of jasmine and sandalwood. Perfect for daily wear and special occasions.',
    price: 129.99,
    category: 'Floral',
    gender: 'Female',
    rating: 4.8,
    availableSizes: ['50ml', '100ml', '200ml'],
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
    rating: 4.6,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Rose Garden',
    shortDescription: 'Romantic rose with hint of vanilla.',
    fullDescription: 'Rose Garden brings the beauty of a blooming rose garden with subtle vanilla undertones. A romantic and feminine fragrance perfect for evening wear.',
    price: 134.99,
    category: 'Floral',
    gender: 'Female',
    rating: 4.7,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1615733684344-e6e99c183e44?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1617633537304-792cf2baf235?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Lily Luxe',
    shortDescription: 'Exotic lily with creamy notes.',
    fullDescription: 'Lily Luxe combines exotic lilies with creamy musk for a sophisticated and luxurious fragrance. Perfect for special occasions and evening events.',
    price: 144.99,
    category: 'Floral',
    gender: 'Female',
    rating: 4.5,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1588405748412-cf21b6d70e39?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1589953372847-e5f5fbfcc9d5?w=500&h=500&fit=crop'
    ]
  },

  // ORIENTAL CATEGORY  
  {
    name: 'Mystic Oud',
    shortDescription: 'Deep and alluring oriental mystery.',
    fullDescription: 'Mystic Oud combines rich oud notes with hints of amber and exotic spices for a captivating and luxurious aroma. A signature scent for those with refined taste.',
    price: 179.99,
    category: 'Oriental',
    gender: 'Male',
    rating: 4.9,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1615522571714-f049cd1cbf33?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Amber Nights',
    shortDescription: 'Warm and sensual evening allure.',
    fullDescription: 'Amber Nights blends warm amber with vanilla, musk, and sandalwood, creating a sensual and luxurious fragrance ideal for evening occasions and special moments.',
    price: 149.99,
    category: 'Oriental',
    gender: 'Female',
    rating: 4.7,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1598037254857-6596cf8b3da3?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1616409829580-96b9e83ee8d9?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Golden Spice',
    shortDescription: 'Exotic spices with warmth and depth.',
    fullDescription: 'Golden Spice is an enchanting blend of exotic spices, amber, and precious woods. A luxurious oriental fragrance perfect for evening wear.',
    price: 164.99,
    category: 'Oriental',
    gender: 'Unisex',
    rating: 4.6,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599599810694-b308ca884c64?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Royal Oud Elite',
    shortDescription: 'Premium oud with rare ingredients.',
    fullDescription: 'Royal Oud Elite is a premium fragrance featuring the finest oud, combined with rare ingredients like rose and saffron. Exclusively for discerning tastes.',
    price: 199.99,
    category: 'Oriental',
    gender: 'Male',
    rating: 4.8,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1617633537304-792cf2baf235?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600644840606-2755a9155f27?w=500&h=500&fit=crop'
    ]
  },

  // CITRUS CATEGORY
  {
    name: 'Citrus Splash',
    shortDescription: 'Fresh and invigorating morning energy.',
    fullDescription: 'Citrus Splash brings an energizing burst of lemon, bergamot, and mandarin. Perfect for daily wear and creating a fresh, vibrant mood.',
    price: 99.99,
    category: 'Citrus',
    gender: 'Unisex',
    rating: 4.4,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1590080876411-cd7bc0341ae0?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Summer Breeze',
    shortDescription: 'Refreshing citrus with ocean notes.',
    fullDescription: 'Summer Breeze combines fresh citrus fruits with cool ocean and mint notes. Perfect for summer days and outdoor activities.',
    price: 104.99,
    category: 'Citrus',
    gender: 'Unisex',
    rating: 4.3,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1616412682851-72bdabb3e5bb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1596012230614-58eb77b1f27b?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Lemon Zest',
    shortDescription: 'Vibrant lemon with ginger spice.',
    fullDescription: 'Lemon Zest is an energetic blend of fresh lemon and warming ginger spices. Ideal for daytime wear and boosting your mood.',
    price: 94.99,
    category: 'Citrus',
    gender: 'Unisex',
    rating: 4.5,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1615634260987-c4891a8abb3b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594383546211-d0dd06e40a19?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Orange Serenity',
    shortDescription: 'Sweet orange with calming chamomile.',
    fullDescription: 'Orange Serenity blends warm orange with soothing chamomile and vanilla. A comforting and uplifting everyday fragrance.',
    price: 109.99,
    category: 'Citrus',
    gender: 'Unisex',
    rating: 4.6,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1613503328567-ec89e90fab9b?w=500&h=500&fit=crop'
    ]
  },

  // WOODY CATEGORY (Added)
  {
    name: 'Sandalwood Luxe',
    shortDescription: 'Creamy sandalwood with cedar.',
    fullDescription: 'Sandalwood Luxe combines luxurious sandalwood with warm cedar and musk. A sophisticated woody fragrance for the modern man.',
    price: 154.99,
    category: 'Woody',
    gender: 'Male',
    rating: 4.7,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1615562141207-5a88fb12ce338?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599599810346-f578069b7e41?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Forest Walk',
    shortDescription: 'Fresh woody notes with pine.',
    fullDescription: 'Forest Walk captures the essence of a walk through a fresh forest with pine, fir, and cedarwood. A natural and earthy fragrance.',
    price: 139.99,
    category: 'Woody',
    gender: 'Male',
    rating: 4.5,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1615123949471-93a327e6b0dc?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eab?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Vetiver Elegance',
    shortDescription: 'Smoky vetiver with leather notes.',
    fullDescription: 'Vetiver Elegance blends smoky vetiver with refined leather and amber. A masculine and sophisticated woody fragrance.',
    price: 169.99,
    category: 'Woody',
    gender: 'Male',
    rating: 4.8,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1606146296196-090e1a93aa59?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600644840606-2755a9155f27?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Cedar Heritage',
    shortDescription: 'Rich cedar with tobacco leaf.',
    fullDescription: 'Cedar Heritage features rich cedarwood combined with warm tobacco leaf and leather. A classic masculine fragrance with timeless appeal.',
    price: 159.99,
    category: 'Woody',
    gender: 'Male',
    rating: 4.6,
    availableSizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8e7b9ccc?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599599810694-b308ca884c64?w=500&h=500&fit=crop'
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
