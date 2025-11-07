import React from 'react';
import BunkerSection from '../components/BunkerSection';
import Sidebar from '../components/Sidebar';
import ReceiptModal from '../components/ReceiptModal';

const Home = ({ 
  currentWeight,
  weightDifference,
  loads,
  unloadings,
  onAddWeight, 
  onRemoveWeight,
  showReceiptModal,
  receiptConfirmed,
  selectedVehicle,
  onConfirmPrint,
  onContinue,
  onCloseModal,
  isLoading,
  isUnloading
}) => {
  return (
    <>
      <BunkerSection 
        currentWeight={currentWeight}
        weightDifference={weightDifference}
        status="Загружено"
        onAddWeight={onAddWeight}
        onRemoveWeight={onRemoveWeight}
        isLoading={isLoading}
        isUnloading={isUnloading}
      />
      <Sidebar loads={loads} unloadings={unloadings} />

      {showReceiptModal && selectedVehicle && (
        <ReceiptModal 
          vehicleName={selectedVehicle}
          weightDifference={Math.abs(weightDifference)}
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
