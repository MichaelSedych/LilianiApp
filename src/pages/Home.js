import React from 'react';
import BunkerSection from '../components/BunkerSection';
import Sidebar from '../components/Sidebar';
import ReceiptModal from '../components/ReceiptModal';

const Home = ({ 
  currentWeight,
  unloadedWeight,
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
        unloadedWeight={unloadedWeight}
        status="Загружено"
        onAddWeight={onAddWeight}
        onRemoveWeight={onRemoveWeight}
      />
      <Sidebar loads={loads} />

      {/* Модальное окно подтверждения печати */}
      {showReceiptModal && selectedVehicle && (
        <ReceiptModal 
          vehicleName={selectedVehicle}
          unloadedWeight={unloadedWeight}
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
