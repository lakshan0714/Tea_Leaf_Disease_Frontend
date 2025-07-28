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
      const response = await fetch('http://192.168.106.100:8000/predict', {
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

  return (
    <Fragment>
      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {selectedImage && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: '400px', maxHeight: '400px'}}
            />
          </div>
        )}
        <button
          onClick={handlePredict}
          disabled={!selectedImage || loading}
          className="predict-button"
        >
          {loading ? 'Predicting...' : 'Predict'}
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
      <h2>About Breast Cancer Detection</h2>
      <p>This application uses advanced AI technology to detect breast cancer from medical images.</p>
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
