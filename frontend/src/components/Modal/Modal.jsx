import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    // Para a propagação do evento de clique,
    // garantindo que ele não chegue no overlay
    e.stopPropagation();
  };

  return (
    // o onClick aqui só fecharia se você clicasse no fundo escuro
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;