import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Transport from './pages/Transport';
import Unloading from './pages/Unloading';

function App() {
  const [bunkerWeight, setBunkerWeight] = useState(0);
  const [prevBunkerWeight, setPrevBunkerWeight] = useState(0);
  const [unloadedWeight, setUnloadedWeight] = useState(0);
  const [loads, setLoads] = useState([]);
  const [unloadings, setUnloadings] = useState([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptConfirmed, setReceiptConfirmed] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isUnloading, setIsUnloading] = useState(false);
  const [operationType, setOperationType] = useState(null); // 'load' или 'unload'

  const WEIGHT_INCREMENT = 50;

  const handleAddWeight = () => {
    setBunkerWeight(prev => prev + WEIGHT_INCREMENT);
    setUnloadedWeight(prev => prev + WEIGHT_INCREMENT);
  };

  const handleRemoveWeight = () => {
    setBunkerWeight(prev => (prev - WEIGHT_INCREMENT > 0 ? prev - WEIGHT_INCREMENT : 0));
    setUnloadedWeight(prev => (prev - WEIGHT_INCREMENT > 0 ? prev - WEIGHT_INCREMENT : 0));
  };

  // Проверяем, уменьшился ли вес
  useEffect(() => {
    if (bunkerWeight < prevBunkerWeight && prevBunkerWeight > 0) {
      setIsUnloading(true);
    }
    setPrevBunkerWeight(bunkerWeight);
  }, [bunkerWeight, prevBunkerWeight]);

  // Выбрать комбайн на странице Transport
  const handleSelectHarvester = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setOperationType('load'); // Это загрузка
    setReceiptConfirmed(false);
    setShowReceiptModal(true);
  };

  // Выбрать автомобиль на странице Unloading
  const handleSelectCar = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setOperationType('unload'); // Это отгрузка
    setReceiptConfirmed(false);
    setShowReceiptModal(true);
  };

  // Подтвердить печать
  const handleConfirmPrint = () => {
    setReceiptConfirmed(true);
  };

  // Продолжить после печати
  const handleContinue = () => {
    if (operationType === 'load') {
      // Добавляем загрузку (комбайн)
      const newLoad = {
        id: loads.length + 1,
        date: new Date().toLocaleDateString('ru-RU'),
        time: new Date().toLocaleTimeString('ru-RU'),
        truckNumber: selectedVehicle || 'Комбайн',
        unloadedWeight: `${unloadedWeight.toLocaleString('ru-RU')} кг`,
        remaining: `${bunkerWeight.toLocaleString('ru-RU')} кг`
      };
      setLoads(prev => [newLoad, ...prev]);
    } else {
      // Добавляем отгрузку (автомобиль)
      const newUnloading = {
        id: unloadings.length + 1,
        date: new Date().toLocaleDateString('ru-RU'),
        time: new Date().toLocaleTimeString('ru-RU'),
        carName: selectedVehicle || 'Автомобиль',
        unloadedWeight: `${(prevBunkerWeight - bunkerWeight).toLocaleString('ru-RU')} кг`,
        remaining: `${bunkerWeight.toLocaleString('ru-RU')} кг`
      };
      setUnloadings(prev => [newUnloading, ...prev]);
    }

    setShowReceiptModal(false);
    setReceiptConfirmed(false);
    setIsUnloading(false);
    setSelectedVehicle(null);
    setOperationType(null);
    setUnloadedWeight(0);
  };

  // Закрыть модальное окно
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
                  unloadedWeight={unloadedWeight}
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
                  prevWeight={prevBunkerWeight}
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
