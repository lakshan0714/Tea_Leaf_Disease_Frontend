import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, prediction }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <h2>Prediction Result</h2>
          <div className={`prediction-box ${prediction === 'healthy' ? 'healthy' : 'no-healthy'}`}>
            <p className="prediction-text">{prediction}</p>
          </div>
          <p className="modal-message">
            {prediction === 'healthy' 
              ? 'Your tea leaves appear healthy. No disease detected.'
              : 'Your tea leaves show signs of disease. Please consult an expert.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal; 