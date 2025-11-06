import React from 'react';
import './Sidebar.css';
import LoadCard from './LoadCard';

const Sidebar = ({ loads, onPrintCard }) => {
  return (
    <aside className="sidebar">
      {loads.map((load) => (
        <LoadCard
          key={load.id}
          date={load.date}
          time={load.time}
          truckNumber={load.truckNumber}
          unloadedWeight={load.unloadedWeight}
          remaining={load.remaining}
          onPrint={() => onPrintCard(load.id)}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
