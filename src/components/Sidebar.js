import React from 'react';
import LoadCard from './LoadCard';
import './Sidebar.css';

const Sidebar = ({ loads, unloadings }) => {
  // Формируем единый массив, указывая для каждого элемента его тип транспорта
  const allItems = [
    ...loads.map(load => ({
      ...load,
      transportType: "harvester", // Явно для комбайна
      transportNumber: load.truckNumber // идентификатор для карточки
    })),
    ...unloadings.map(unload => ({
      ...unload,
      transportType: "car", // Явно для автомобиля
      transportNumber: unload.carName // идентификатор для карточки
    }))
  ].sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">История операций</h2>
      {allItems.length === 0 ? (
        <div className="empty-state">
          <p>Нет записей о операциях</p>
        </div>
      ) : (
        <div className="loads-container">
          {allItems.map((item) => (
            <LoadCard
              key={`entry-${item.id}`}
              date={item.date}
              time={item.time}
              transportNumber={item.transportNumber}
              transportType={item.transportType}
              unloadedWeight={item.unloadedWeight}
              remaining={item.remaining}
              onPrint={() => console.log("Печать чека", item.id)}
            />
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
