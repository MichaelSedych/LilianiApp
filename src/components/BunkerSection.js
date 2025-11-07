import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BunkerSection.css';

const BunkerSection = ({ currentWeight, weightDifference, status, onAddWeight, onRemoveWeight, isLoading, isUnloading }) => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const isLoadingRef = useRef(false);

  const formatWeight = (weight) => {
    return weight.toLocaleString('ru-RU');
  };

  // Проверяем, изменился ли вес
  const isPrintDisabled = weightDifference === 0;

  const handlePrint = () => {
    if (isPrintDisabled) return;
    
    if (isUnloading) {
      navigate('/unloading');
    } else if (isLoading) {
      navigate('/transport');
    }
  };

  const startLoading = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    intervalRef.current = setInterval(() => {
      onAddWeight();
    }, 100);
  };

  const stopLoading = () => {
    isLoadingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startUnloading = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    intervalRef.current = setInterval(() => {
      onRemoveWeight();
    }, 100);
  };

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
        <div className="weight-info">
          {weightDifference > 0 ? '+' : ''}{formatWeight(Math.abs(weightDifference))} кг
        </div>
        <div className="status-loaded">{status}</div>
      </div>
      
      <button 
        className={`print-btn ${isPrintDisabled ? 'disabled' : ''}`}
        onClick={handlePrint}
        disabled={isPrintDisabled}
      >
        {isPrintDisabled ? (
          'Печать чека будет доступна после изменения веса'
        ) : (
          <>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 22.5H22.5V30H7.5V22.5ZM25.5 27V19.5H4.5V27H1.5C0.67158 27 0 26.3284 0 25.5V10.5C0 9.67158 0.67158 9 1.5 9H28.5C29.3284 9 30 9.67158 30 10.5V25.5C30 26.3284 29.3284 27 28.5 27H25.5ZM4.5 12V15H9V12H4.5ZM7.5 0H22.5C23.3284 0 24 0.67158 24 1.5V6H6V1.5C6 0.67158 6.67158 0 7.5 0Z" fill="#029A4A"/>
            </svg>
            Печать чека
          </>
        )}
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
