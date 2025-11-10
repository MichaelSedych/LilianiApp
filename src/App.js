import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Transport from './pages/Transport';
import Unloading from './pages/Unloading';

function App() {
  const [bunkerWeight, setBunkerWeight] = useState(0);
  const [startWeight, setStartWeight] = useState(0);
  const [loads, setLoads] = useState([]);
  const [unloadings, setUnloadings] = useState([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptConfirmed, setReceiptConfirmed] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [operationType, setOperationType] = useState(null);
  const [nextId, setNextId] = useState(1); // Общий счетчик ID

  const WEIGHT_INCREMENT = 50;

  const handleAddWeight = () => {
    setBunkerWeight(prev => prev + WEIGHT_INCREMENT);
  };

  const handleRemoveWeight = () => {
    setBunkerWeight(prev => (prev - WEIGHT_INCREMENT > 0 ? prev - WEIGHT_INCREMENT : 0));
  };

  const weightDifference = bunkerWeight - startWeight;
  const isLoading = weightDifference > 0;
  const isUnloading = weightDifference < 0;

  const handleSelectHarvester = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setOperationType('load');
    setReceiptConfirmed(false);
    setShowReceiptModal(true);
  };

  const handleSelectCar = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setOperationType('unload');
    setReceiptConfirmed(false);
    setShowReceiptModal(true);
  };

  const handleConfirmPrint = () => {
    setReceiptConfirmed(true);
  };

  const handleContinue = () => {
    const now = new Date();
    const timestamp = now.getTime(); // Используем timestamp для точной сортировки
    
    if (operationType === 'load') {
      const newLoad = {
        id: nextId,
        timestamp: timestamp,
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString('ru-RU'),
        truckNumber: selectedVehicle || 'Комбайн',
        unloadedWeight: `${weightDifference.toLocaleString('ru-RU')} кг`,
        remaining: `${bunkerWeight.toLocaleString('ru-RU')} кг`
      };
      setLoads(prev => [newLoad, ...prev]);
    } else {
      const newUnloading = {
        id: nextId,
        timestamp: timestamp,
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString('ru-RU'),
        carName: selectedVehicle || 'Автомобиль',
        unloadedWeight: `${Math.abs(weightDifference).toLocaleString('ru-RU')} кг`,
        remaining: `${bunkerWeight.toLocaleString('ru-RU')} кг`
      };
      setUnloadings(prev => [newUnloading, ...prev]);
    }

    setNextId(prev => prev + 1); // Увеличиваем общий счетчик
    setStartWeight(bunkerWeight);
    setShowReceiptModal(false);
    setReceiptConfirmed(false);
    setSelectedVehicle(null);
    setOperationType(null);
  };

  const handleCloseModal = () => {
    setShowReceiptModal(false);
    setReceiptConfirmed(false);
    setSelectedVehicle(null);
    setOperationType(null);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  currentWeight={bunkerWeight}
                  weightDifference={weightDifference}
                  loads={loads}
                  unloadings={unloadings}
                  onAddWeight={handleAddWeight}
                  onRemoveWeight={handleRemoveWeight}
                  showReceiptModal={showReceiptModal}
                  receiptConfirmed={receiptConfirmed}
                  selectedVehicle={selectedVehicle}
                  onConfirmPrint={handleConfirmPrint}
                  onContinue={handleContinue}
                  onCloseModal={handleCloseModal}
                  isLoading={isLoading}
                  isUnloading={isUnloading}
                />
              } 
            />
            <Route 
              path="/transport" 
              element={
                <Transport 
                  onSelectVehicle={handleSelectHarvester}
                  currentWeight={bunkerWeight}
                />
              } 
            />
            <Route 
              path="/unloading" 
              element={
                <Unloading 
                  onSelectVehicle={handleSelectCar}
                  currentWeight={bunkerWeight}
                  startWeight={startWeight}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
