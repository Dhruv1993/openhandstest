import React, { createContext, useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PRIVILEGE_LEVELS } from '../config/formConfig';

const FormContext = createContext();

export const MultiStepFormProvider = ({ 
  children, 
  userPrivilege = PRIVILEGE_LEVELS.BASIC,
  validationSchema,
  defaultValues = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues
  });

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const canAccessForm = (requiredPrivilege) => {
    const privilegeLevels = Object.values(PRIVILEGE_LEVELS);
    const userPrivilegeIndex = privilegeLevels.indexOf(userPrivilege);
    const requiredPrivilegeIndex = privilegeLevels.indexOf(requiredPrivilege);
    return userPrivilegeIndex >= requiredPrivilegeIndex;
  };

  const value = {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    canAccessForm,
    userPrivilege
  };

  return (
    <FormContext.Provider value={value}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </FormContext.Provider>
  );
};

export const useMultiStepForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useMultiStepForm must be used within a MultiStepFormProvider');
  }
  return context;
};