import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Transport from './pages/Transport';

function App() {
  const [bunkerWeight, setBunkerWeight] = useState(0);
  const [loads, setLoads] = useState([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const WEIGHT_INCREMENT = 50;

  const handleAddWeight = () => {
    setBunkerWeight(prev => prev + WEIGHT_INCREMENT);
  };

  const handleRemoveWeight = () => {
    setBunkerWeight(prev => (prev - WEIGHT_INCREMENT > 0 ? prev - WEIGHT_INCREMENT : 0));
  };

  // Выбрать комбайн на странице транспорта
  const handleSelectVehicle = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setShowReceiptModal(true);
  };

  // Подтвердить печать и добавить load
  const handleConfirmPrint = () => {
    const newLoad = {
      id: loads.length + 1,
      date: new Date().toLocaleDateString('ru-RU'),
      time: new Date().toLocaleTimeString('ru-RU'),
      truckNumber: selectedVehicle || 'Комбайн',
      unloadedWeight: `${bunkerWeight.toLocaleString('ru-RU')} кг`,
      remaining: `0 кг`
    };

    setLoads(prev => [newLoad, ...prev]);
    setShowReceiptModal(false);
    setBunkerWeight(0);
    setSelectedVehicle(null);
  };

  // Закрыть модальное окно
  const handleCloseModal = () => {
    setShowReceiptModal(false);
    setSelectedVehicle(null);
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
                  loads={loads}
                  onAddWeight={handleAddWeight}
                  onRemoveWeight={handleRemoveWeight}
                  showReceiptModal={showReceiptModal}
                  selectedVehicle={selectedVehicle}
                  onConfirmPrint={handleConfirmPrint}
                  onCloseModal={handleCloseModal}
                />
              } 
            />
            <Route 
              path="/transport" 
              element={
                <Transport 
                  onSelectVehicle={handleSelectVehicle}
                  currentWeight={bunkerWeight}
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
