import React from 'react';
import './PrintModal.css';

const PrintModal = ({ onSelectVehicle, onClose }) => {
  const vehicles = [
    'Комбайн А123ЕВ',
    'Комбайн зерноуборочный Е193АУ',
    'Комбайн (поле 1) И783ВИ',
    'Комбайн А723ПО',
    'Комбайн А224АС'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Внимание!</h2>
        <p>Распечатать чек?</p>
        <div className="vehicle-selector">
          {vehicles.map((vehicle, index) => (
            <button
              key={index}
              className="vehicle-option"
              onClick={() => onSelectVehicle(vehicle)}
            >
              {vehicle}
            </button>
          ))}
        </div>
        <button className="modal-btn cancel" onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default PrintModal;
