import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unloading.css';

const Unloading = ({ onSelectVehicle, currentWeight, prevWeight }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    mainContent?.classList.add('transport-layout');

    return () => {
      mainContent?.classList.remove('transport-layout');
    };
  }, []);

  const vehicles = [
    { id: 1, name: 'Автомобиль E193АУ' },
    { id: 2, name: 'Автомобиль E193АУ' },
    { id: 3, name: 'Автомобиль E193АУ' },
    { id: 4, name: 'Автомобиль E193АУ' },
    { id: 5, name: 'Автомобиль (поле 1) A429ЕВ' },
    { id: 6, name: 'Автомобиль(разгр.) 0213ОВ' },
    { id: 7, name: 'Автомобиль 0787ЕН' },
    { id: 8, name: 'Автомобиль E843ОП' },
    { id: 9, name: 'Автомобиль(поле 1) У787ЕН' }
  ];

  const handleVehicleClick = (vehicleName) => {
    onSelectVehicle(vehicleName);
    navigate('/');
  };

  return (
    <div className="unloading-page">
      <div className="unloading-left">
        <h1 className="unloading-title">Отгрузка</h1>
        <div className="unloading-sidebar">
          <div className="vehicle-card-large">
            <div className="vehicle-icon-large">
              <svg width="120" height="80" viewBox="0 0 120 80">
                <rect x="10" y="30" width="70" height="30" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2"/>
                <circle cx="30" cy="65" r="8" fill="#333"/>
                <circle cx="70" cy="65" r="8" fill="#333"/>
                <rect x="65" y="15" width="35" height="20" fill="#2E7D32"/>
                <rect x="70" y="20" width="25" height="10" fill="#90EE90"/>
              </svg>
            </div>
            <p className="vehicle-name-large">Автомобиль</p>
          </div>
        </div>
      </div>
      
      <div className="unloading-list">
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="vehicle-item"
              onClick={() => handleVehicleClick(vehicle.name)}
            >
              <span>{vehicle.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Unloading;
