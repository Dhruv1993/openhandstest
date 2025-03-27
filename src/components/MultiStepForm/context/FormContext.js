import React, { createContext, useContext, useState } from 'react';
import { PRIVILEGE_LEVELS } from '../config/formConfig';

const FormContext = createContext();

export const FormProvider = ({ children, userPrivilege = PRIVILEGE_LEVELS.BASIC }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (stepId, formId, data) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [formId]: data,
      },
    }));
  };

  const getFormData = (stepId, formId) => {
    return formData[stepId]?.[formId] || {};
  };

  const canAccessForm = (requiredPrivilege) => {
    const privilegeLevels = Object.values(PRIVILEGE_LEVELS);
    const userPrivilegeIndex = privilegeLevels.indexOf(userPrivilege);
    const requiredPrivilegeIndex = privilegeLevels.indexOf(requiredPrivilege);
    
    return userPrivilegeIndex >= requiredPrivilegeIndex;
  };

  const value = {
    formData,
    updateFormData,
    getFormData,
    canAccessForm,
    userPrivilege,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};