// src/pages/Contact.js
import React, { useState } from 'react';
import NavigationBar from '../components/Navbar';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { EnvelopeFill, Facebook, Twitter, Instagram, GeoAlt, Telephone, Clock } from 'react-bootstrap-icons';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: true, success: false, error: false });

    try {
      const response = await axios.post(`${API_URL}/contact`, formData);
      if (response.status === 200) {
        setStatus({ submitted: true, success: true, error: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ submitted: true, success: false, error: true });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus({ submitted: true, success: false, error: true });
    }
  };

  const contactInfo = [
    {
      icon: <GeoAlt className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Fragrance Street", "Perfume City, PC 12345"]
    },
    {
      icon: <Telephone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM - 8PM", "Sat-Sun: 10AM - 6PM"]
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
          {/* Header */}
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
              <EnvelopeFill className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-black mb-6">
              Get in <span className="text-black">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our fragrances? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-1 space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gray-100 rounded-full text-black mr-4">
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{info.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <Facebook size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <Twitter size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <Instagram size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>

                {status.submitted && status.success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                  >
                    Your message has been sent successfully!
                  </motion.div>
                )}

                {status.submitted && status.error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                  >
                    There was an error sending your message. Please try again later.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      rows={6}
                      placeholder="Your message..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
