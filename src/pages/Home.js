import React from 'react';
import BunkerSection from '../components/BunkerSection';
import Sidebar from '../components/Sidebar';
import ReceiptModal from '../components/ReceiptModal';

const Home = ({ 
  currentWeight,
  unloadedWeight,
  loads,
  unloadings,
  onAddWeight, 
  onRemoveWeight,
  onPrintClick,
  showReceiptModal,
  receiptConfirmed,
  selectedVehicle,
  onConfirmPrint,
  onContinue,
  onCloseModal,
  isUnloading
}) => {
  return (
    <>
      <BunkerSection 
        currentWeight={currentWeight}
        unloadedWeight={unloadedWeight}
        status="Загружено"
        onAddWeight={onAddWeight}
        onRemoveWeight={onRemoveWeight}
        isUnloading={isUnloading}
      />
      <Sidebar loads={loads} unloadings={unloadings} />

      {showReceiptModal && selectedVehicle && (
        <ReceiptModal 
          vehicleName={selectedVehicle}
          unloadedWeight={unloadedWeight}
          isConfirmed={receiptConfirmed}
          isUnloading={isUnloading}
          onConfirm={onConfirmPrint}
          onContinue={onContinue}
          onCancel={onCloseModal}
        />
      )}
    </>
  );
};

export default Home;
