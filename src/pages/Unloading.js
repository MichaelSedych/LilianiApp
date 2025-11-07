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
              <img  
                src="/assets/Truck.svg" 
                alt="Truck icon"  
              />
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
