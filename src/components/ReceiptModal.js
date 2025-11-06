import React, { useState, useEffect } from 'react';
import './ReceiptModal.css';

const ReceiptModal = ({ vehicleName, unloadedWeight, onConfirm, onCancel }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        onConfirm();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onConfirm]);

  if (isConfirmed) {
    return (
      <div className="modal-overlay">
        <div className="modal-content success">
          <h2>Внимание!</h2>
          <p>Чек распечатан</p>
          <button className="modal-btn continue" onClick={onConfirm} disabled>
            Продолжить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Внимание!</h2>
        <p>Распечатать чек?</p>
        <p className="vehicle-info">Имя техники: {vehicleName}</p>
        <div className="modal-buttons">
          <button className="modal-btn confirm" onClick={handleConfirm}>
            Да
          </button>
          <button className="modal-btn cancel" onClick={onCancel}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
