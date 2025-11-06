import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Transport from './pages/Transport';

function App() {
  const [bunkerWeight, setBunkerWeight] = useState(23900);

  const handleAddWeight = () => {
    setBunkerWeight(prev => prev + 500); // 500 кг за 100мс = 5000 кг/сек, но контролируем через интервал
  };

  const handleRemoveWeight = () => {
    setBunkerWeight(prev => (prev - 500 > 0 ? prev - 500 : 0));
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
