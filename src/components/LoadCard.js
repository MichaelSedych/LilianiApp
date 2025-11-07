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
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
            <path d="M7.5 22.5H22.5V30H7.5V22.5ZM25.5 27V19.5H4.5V27H1.5..." fill="black"/>
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
