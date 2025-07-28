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
          <div className={`prediction-box ${prediction === 'Cancer' ? 'cancer' : 'no-cancer'}`}>
            <p className="prediction-text">{prediction}</p>
          </div>
          <p className="modal-message">
            {prediction === 'Cancer' 
              ? 'Please consult with a medical professional for further evaluation.'
              : 'No signs of cancer detected. Regular check-ups are still recommended.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal; 