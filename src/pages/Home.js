import React from 'react';
import BunkerSection from '../components/BunkerSection';
import Sidebar from '../components/Sidebar';
import ReceiptModal from '../components/ReceiptModal';

const Home = ({ 
  currentWeight, 
  loads,
  onAddWeight, 
  onRemoveWeight,
  showReceiptModal,
  receiptConfirmed,
  selectedVehicle,
  onConfirmPrint,
  onContinue,
  onCloseModal
}) => {
  return (
    <>
      <BunkerSection 
        currentWeight={currentWeight}
        status="Загружено"
        onAddWeight={onAddWeight}
        onRemoveWeight={onRemoveWeight}
      />
      <Sidebar loads={loads} />

      {/* Модальное окно подтверждения печати */}
      {showReceiptModal && selectedVehicle && (
        <ReceiptModal 
          vehicleName={selectedVehicle}
          unloadedWeight={currentWeight}
          isConfirmed={receiptConfirmed}
          onConfirm={onConfirmPrint}
          onContinue={onContinue}
          onCancel={onCloseModal}
        />
      )}
    </>
  );
};

export default Home;
