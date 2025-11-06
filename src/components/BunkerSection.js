import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BunkerSection.css';

const BunkerSection = ({ currentWeight, status, onAddWeight, onRemoveWeight }) => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const isLoadingRef = useRef(false);

  const formatWeight = (weight) => {
    return weight.toLocaleString('ru-RU');
  };

  const handlePrint = () => {
    navigate('/transport');
  };

  // Запуск непрерывной загрузки
  const startLoading = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    intervalRef.current = setInterval(() => {
      onAddWeight();
    }, 100); // 50 кг в 100мс = 500 кг в сек, но мы добавляем по 1000 кг, поэтому 100мс
  };

  // Остановка загрузки
  const stopLoading = () => {
    isLoadingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Запуск непрерывной выгрузки
  const startUnloading = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    intervalRef.current = setInterval(() => {
      onRemoveWeight();
    }, 100);
  };

  // Остановка выгрузки
  const stopUnloading = () => {
    isLoadingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section className="bunker-section">
      <h1 className="section-title">Вес в бункере:</h1>
      <div className="weight-display">
        {formatWeight(currentWeight)} кг
      </div>
      <div className="status-bar">
        <div className="weight-info">{formatWeight(currentWeight)} кг</div>
        <div className="status-loaded">{status}</div>
      </div>
      <button className="print-btn" onClick={handlePrint}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Печать чека
      </button>

      <div className="weight-control-buttons">
        <button 
          className="weight-btn add-btn"
          onMouseDown={startLoading}
          onMouseUp={stopLoading}
          onMouseLeave={stopLoading}
          onTouchStart={startLoading}
          onTouchEnd={stopLoading}
        >
          <span className="btn-icon">+</span>
          Загрузить
        </button>
        <button 
          className="weight-btn remove-btn"
          onMouseDown={startUnloading}
          onMouseUp={stopUnloading}
          onMouseLeave={stopUnloading}
          onTouchStart={startUnloading}
          onTouchEnd={stopUnloading}
        >
          <span className="btn-icon">−</span>
          Выгрузить
        </button>
      </div>
    </section>
  );
};

export default BunkerSection;
