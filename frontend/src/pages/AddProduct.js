import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import API_URL from '../config';
import { motion } from 'framer-motion';
import { processImageUrls } from '../utils/imageUtils';

function AddProduct() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    category: '',
    availableSizes: '',
    images: ''
  });
  const [previewSize, setPreviewSize] = useState('medium');
  const [previewObjectFit, setPreviewObjectFit] = useState('cover');
  const [previewObjectPosition, setPreviewObjectPosition] = useState('center');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!user || user.role !== 'seller') {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!form.name || !form.shortDescription || !form.fullDescription || !form.price || !form.category) {
      setError('Please fill in all required fields.');
      return;
    }

    const rawImages = form.images.split(',').map((url) => url.trim()).filter(Boolean);

    const payload = {
      name: form.name,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      price: parseFloat(form.price),
      category: form.category,
      availableSizes: form.availableSizes.split(',').map(s => s.trim()).filter(Boolean),
      images: rawImages
    };

    try {
      const response = await axios.post(`${API_URL}/products`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Product added successfully!');
      setForm({ name: '', shortDescription: '', fullDescription: '', price: '', category: '', availableSizes: '', images: '' });
      navigate(`/products/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.');
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
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Perfume</h2>
          {message && <div className="mb-4 p-3 rounded bg-green-100 text-green-700">{message}</div>}
          {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" rows="2" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Description</label>
              <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" rows="4" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Available Sizes (comma-separated)</label>
              <input type="text" name="availableSizes" value={form.availableSizes} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
              <input type="text" name="images" value={form.images} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" />
            </div>

            <div className="mt-6 p-4 rounded-3xl border border-gray-200 bg-gray-50">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live preview</h3>
                  <p className="text-sm text-gray-600">Adjust how the image appears before saving.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview size</label>
                    <select
                      value={previewSize}
                      onChange={(e) => setPreviewSize(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fit style</label>
                    <select
                      value={previewObjectFit}
                      onChange={(e) => setPreviewObjectFit(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    >
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Focus area</label>
                    <select
                      value={previewObjectPosition}
                      onChange={(e) => setPreviewObjectPosition(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    >
                      <option value="center">Center</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="top left">Top Left</option>
                      <option value="top right">Top Right</option>
                      <option value="bottom left">Bottom Left</option>
                      <option value="bottom right">Bottom Right</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="text-sm text-gray-600 mb-3">First image preview</div>
                    <div
                      className="overflow-hidden rounded-3xl bg-gray-100"
                      style={{
                        width: previewSize === 'small' ? 260 : previewSize === 'medium' ? 380 : 520,
                        height: previewSize === 'small' ? 260 : previewSize === 'medium' ? 380 : 520,
                      }}
                    >
                      {processImageUrls(form.images).length > 0 ? (
                        <img
                          src={processImageUrls(form.images)[0]}
                          alt="Preview"
                          className="h-full w-full"
                          style={{
                            objectFit: previewObjectFit,
                            objectPosition: previewObjectPosition,
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-500 px-4 text-center">
                          Enter a valid image URL to preview the selected crop and size.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold">Add Product</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddProduct;
