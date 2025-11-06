import React from 'react';
import './ReceiptModal.css';

const ReceiptModal = ({ vehicleName, unloadedWeight, isConfirmed, onConfirm, onContinue, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={!isConfirmed ? onCancel : undefined}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Внимание!</h2>
        
        {!isConfirmed ? (
          <>
            <p>Распечатать чек?</p>
            <p className="vehicle-info">Имя техники: {vehicleName}</p>
            <div className="modal-buttons">
              <button className="modal-btn confirm" onClick={onConfirm}>
                Да
              </button>
              <button className="modal-btn cancel" onClick={onCancel}>
                Нет
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Чек распечатан</p>
            <button className="modal-btn continue" onClick={onContinue}>
              Продолжить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceiptModal;
