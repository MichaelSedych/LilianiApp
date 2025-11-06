import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Transport from './pages/Transport';

function App() {
  const [bunkerWeight, setBunkerWeight] = useState(0);

  // Измените это значение на нужное вам
  const WEIGHT_INCREMENT = 5; // кг за раз

  const handleAddWeight = () => {
    setBunkerWeight(prev => prev + WEIGHT_INCREMENT);
  };

  const handleRemoveWeight = () => {
    setBunkerWeight(prev => (prev - WEIGHT_INCREMENT > 0 ? prev - WEIGHT_INCREMENT : 0));
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
                  onAddWeight={handleAddWeight}
                  onRemoveWeight={handleRemoveWeight}
                />
              } 
            />
            <Route path="/transport" element={<Transport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
