import React from 'react';
import BunkerSection from '../components/BunkerSection';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const loadData = [
    {
      id: 1,
      date: '28.11.2022',
      time: '12:12:53',
      truckNumber: 'а456ер',
      unloadedWeight: '23 000 кг',
      remaining: '700 кг'
    },
    {
      id: 2,
      date: '28.11.2022',
      time: '12:12:53',
      truckNumber: 'а456ер',
      unloadedWeight: '23 000 кг',
      remaining: '700 кг'
    },
    {
      id: 3,
      date: '28.11.2022',
      time: '12:12:53',
      truckNumber: 'а456ер',
      unloadedWeight: '23 000 кг',
      remaining: null
    }
  ];

  const handlePrintCard = (id) => {
    console.log(`Печать карточки ${id}...`);
  };

  return (
    <>
      <BunkerSection 
        currentWeight={23900}
        status="Загружено"
      />
      <Sidebar 
        loads={loadData}
        onPrintCard={handlePrintCard}
      />
    </>
  );
};

export default Home;
