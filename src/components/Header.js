import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Проверяем, находимся ли мы на странице транспорта или отгрузки
  const isTransportPage = location.pathname === '/transport';
  const isUnloadingPage = location.pathname === '/unloading';
  const showBackButton = isTransportPage || isUnloadingPage;
  
  const handleButtonClick = () => {
    if (showBackButton) {
      navigate('/'); // Возврат на главную
    } else {
      // Здесь можно добавить логику для кнопки "Меню"
      console.log('Открыть меню');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img  
            src="/assets/Logo.svg" 
            alt="Liliani Logo" 
          />
        </div>
        <div className="contact-info">
          <span>8-800-555-126 доб. 123</span>
          <span>www.liliani.ru</span>
        </div>
        <button className="menu-btn" onClick={handleButtonClick}>
          {showBackButton ? 'Назад' : 'Меню'}
        </button>
      </div>
    </header>
  );
};

export default Header;
