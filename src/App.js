import React, { Fragment, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPrediction(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error making prediction: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPrediction(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Fragment>
      <div className="upload-container">
        {/* Upload Header */}
        <div className="upload-header">
          <h1 className="upload-title">Tea Leaf Disease Detection</h1>
          <p className="upload-subtitle">
            Upload an image of a tea leaf to detect potential diseases using AI
          </p>
        </div>

        {/* File Upload Area */}
        <div className="file-upload-area">
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-input-display">
              <div className="upload-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div className="upload-text">
                {selectedImage ? 'Change Image' : 'Choose Image'}
              </div>
              <div className="upload-hint">
                Drag and drop or click to select • PNG, JPG, JPEG up to 10MB
              </div>
            </label>
          </div>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected tea leaf"
              className="preview-image"
            />
            <div className="preview-info">
              <div>
                <strong>{selectedImage.name}</strong>
                <br />
                <span>{formatFileSize(selectedImage.size)}</span>
              </div>
              <button 
                onClick={handleRemoveImage}
                className="remove-image"
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={!selectedImage || loading}
          className={`predict-button ${loading ? 'loading' : ''}`}
        >
          {loading && <div className="loading-spinner"></div>}
          {loading ? 'Analyzing Image...' : 'Detect Disease'}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prediction={prediction}
      />
    </Fragment>
  );
}

function About() {
  return (
    <div className="about-container">
      <h2>About Tea_Leaf_Detection</h2>
      <p>This application uses advanced AI technology to detect Tea_Leaf_Detection using Advanced datasets</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>For any inquiries or support, please reach out to us.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
       
      </div>
    </Router>
  );
}

export default App;
