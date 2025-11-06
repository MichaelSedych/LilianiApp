import React, { useEffect } from 'react';
import './Transport.css';

const Transport = () => {
  useEffect(() => {
    // Добавляем класс к main-content при открытии страницы
    const mainContent = document.querySelector('.main-content');
    mainContent?.classList.add('transport-layout');

    // Убираем класс при закрытии страницы
    return () => {
      mainContent?.classList.remove('transport-layout');
    };
  }, []);

  const vehicles = [
    { id: 1, name: 'Комбайн А123ЕВ' },
    { id: 2, name: 'Комбайн А123ЕВ' },
    { id: 3, name: 'Комбайн А123ЕВ' },
    { id: 4, name: 'Комбайн зерноуборочный Е193АУ' },
    { id: 5, name: 'Комбайн (поле 1) И783ВИ' },
    { id: 6, name: 'Комбайн А723ПО' },
    { id: 7, name: 'Комбайн зерноуборочный У298ЕН' },
    { id: 8, name: 'Комбайн А224АС' },
    { id: 9, name: 'Комбайн А224АС' }
  ];

  return (
    <div className="transport-page">
      <div className="transport-left">
        <h1 className="transport-title">Транспорт</h1>
        <div className="transport-sidebar">
          <div className="vehicle-card-large">
            <div className="vehicle-icon-large">
              <img  
                src="/assets/Harvester.svg" 
                alt="Harvester icon" 
              />
            </div>
            <p className="vehicle-name-large">Комбайн</p>
          </div>
        </div>
      </div>
      
      <div className="transport-list">
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-item">
              <span>{vehicle.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transport;
