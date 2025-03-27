import React, { createContext, useContext, useState, useCallback } from 'react';

const WizardContext = createContext();

export const WizardProvider = ({ children, steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([0]);

  const next = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setHistory(prev => [...prev, nextIndex]);
    }
  }, [currentStepIndex, steps.length]);

  const previous = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }, [currentStepIndex]);

  const goTo = useCallback((index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
      setHistory(prev => [...prev, index]);
    }
  }, [steps.length]);

  const value = {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    steps,
    next,
    previous,
    goTo,
    isFirst: currentStepIndex === 0,
    isLast: currentStepIndex === steps.length - 1,
    history,
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};