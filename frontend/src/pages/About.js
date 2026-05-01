import React from 'react';
import NavigationBar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Heart, Award, People, Star } from 'react-bootstrap-icons';

function About() {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Fragrances",
      description: "We curate the finest scents from around the world, ensuring each fragrance tells a unique story."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous testing to meet our high standards of excellence."
    },
    {
      icon: <People className="w-8 h-8" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to help you find the perfect scent."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Unique Collections",
      description: "Discover exclusive fragrances that set you apart from the crowd."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-24"
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block p-4 bg-black rounded-full mb-6"
            >
              <Star className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-black mb-6">
              About <span className="text-black">Scentora</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your premier destination for exquisite fragrances. We believe that every scent has the power to transform your story.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2023, Scentora emerged from a simple passion for the art of perfumery.
                    What started as a small collection of carefully curated fragrances has grown into a
                    sanctuary for scent enthusiasts worldwide.
                  </p>
                  <p>
                    We believe that fragrance is more than just a pleasant smell—it's an expression of
                    personality, a memory captured in a bottle, a confidence booster for every occasion.
                  </p>
                  <p>
                    Our journey is driven by the pursuit of excellence, the joy of discovery, and an
                    unwavering commitment to bringing you the world's most captivating scents.
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl">🌸</div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-black/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-black/10 rounded-full" style={{ opacity: 0.3 }}></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block p-3 bg-gray-100 rounded-full text-black mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center bg-black rounded-2xl p-12 text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mb-6"
            >
              <Heart className="w-16 h-16 mx-auto" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              To empower individuals with fragrances that enhance their unique essence,
              foster confidence, and create lasting memories. We strive to make the world
              of perfumery accessible, enjoyable, and utterly enchanting for everyone.
            </p>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for choosing Scentora. We're honored to be part of your fragrance journey
              and look forward to helping you discover your signature scent.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-6"
            >
              <span className="text-xl font-semibold text-black">
                The Scentora Team
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
