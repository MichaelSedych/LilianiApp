import React from 'react';
import LoadCard from './LoadCard';
import './Sidebar.css';

const Sidebar = ({ loads, unloadings }) => {
  // Формируем единый массив с сортировкой по timestamp
  const allItems = [
    ...loads.map(load => ({
      ...load,
      transportType: "harvester",
      transportNumber: load.truckNumber
    })),
    ...unloadings.map(unload => ({
      ...unload,
      transportType: "car",
      transportNumber: unload.carName
    }))
  ].sort((a, b) => b.timestamp - a.timestamp); // Сортируем по timestamp (новые сверху)

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
              key={`entry-${item.id}-${item.timestamp}`}
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
