import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BunkerSection.css';

const BunkerSection = ({ currentWeight, unloadedWeight, status, onAddWeight, onRemoveWeight, isUnloading }) => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const isLoadingRef = useRef(false);

  const formatWeight = (weight) => {
    return weight.toLocaleString('ru-RU');
  };

  // Проверяем, изменился ли вес (если unloadedWeight > 0, значит был изменен)
  const isPrintDisabled = unloadedWeight === 0;

  const handlePrint = () => {
    if (isPrintDisabled) return; // Не даем нажать, если вес не изменился
    
    if (isUnloading) {
      navigate('/unloading');
    } else {
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
        <div className="weight-info">{formatWeight(unloadedWeight)} кг</div>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2"/>
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
