import React from 'react';
import './LoadCard.css';

// transportType: 'harvester' (комбайн) или 'car' (автомобиль)
const LoadCard = ({
  date,
  time,
  transportNumber,
  transportType, // 'harvester' или 'car'
  unloadedWeight,
  remaining,
  onPrint
}) => {
  const isHarvester = transportType === 'harvester';
  console.log('transportType:', transportType);

  return (
    <div className="load-card">
      <div className="card-header">
        <span className="date">{date}</span>
        <span className="time">{time}</span>
        <button className="print-icon" onClick={onPrint}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 22.5H22.5V30H7.5V22.5ZM25.5 27V19.5H4.5V27H1.5C0.67158 27 0 26.3284 0 25.5V10.5C0 9.67158 0.67158 9 1.5 9H28.5C29.3284 9 30 9.67158 30 10.5V25.5C30 26.3284 29.3284 27 28.5 27H25.5ZM4.5 12V15H9V12H4.5ZM7.5 0H22.5C23.3284 0 24 0.67158 24 1.5V6H6V1.5C6 0.67158 6.67158 0 7.5 0Z" fill="black"/>
            </svg>
        </button>
      </div>
      <div className="truck-row">
        <div className="truck-card">
          <img
            src={
              isHarvester
                ? '/assets/Harvester.svg'
                : '/assets/Truck.svg'
            }
            alt={isHarvester ? "Комбайн" : "Автомобиль"}
            className="truck-img"
          />
          <span className="truck-number">{transportNumber}</span>
        </div>
      </div>
      <div className="weight-details">
        <p>{isHarvester ? "Выгруженный вес:" : "Отгружено:"} {unloadedWeight}</p>
        <p>Остаток: {remaining}</p>
      </div>
    </div>
  );
};

export default LoadCard;
