import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Button, ProgressBar } from 'react-bootstrap';
import { formConfig } from './config/formConfig';
import { useMultiStepForm } from './context/FormContext';
import BasicInfoForm from './forms/BasicInfoForm';
import ContactInfoForm from './forms/ContactInfoForm';

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const StepNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StepTitle = styled.h2`
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Progress = styled(ProgressBar)`
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  margin-bottom: 30px;
`;

// Map form IDs to their components
const formComponents = {
  basicInfo: BasicInfoForm,
  contactInfo: ContactInfoForm,
  // Add other form components here as they are created
};

const MultiStepForm = () => {
  const { canAccessForm, currentStep, nextStep, prevStep } = useMultiStepForm();
  const { handleSubmit, formState: { isValid, errors } } = useFormContext();
  
  const steps = Object.entries(formConfig);
  const currentStepConfig = steps[currentStep][1];
  
  const calculateProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const onSubmit = async (data) => {
    if (currentStep === steps.length - 1) {
      // Handle final form submission
      console.log('Final form data:', data);
    } else {
      nextStep();
    }
  };

  const renderForms = () => {
    const [stepId, stepConfig] = steps[currentStep];
    
    return Object.entries(stepConfig.forms).map(([formId, form]) => {
      if (!canAccessForm(form.requiredPrivilege)) return null;

      const FormComponent = formComponents[formId];
      return FormComponent ? (
        <FormContainer key={formId}>
          <FormComponent />
        </FormContainer>
      ) : null;
    });
  };

  return (
    <FormWrapper>
      <Progress
        now={calculateProgress()}
        variant="info"
      />
      
      <StepTitle>
        {currentStepConfig.title}
      </StepTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        {renderForms()}
        
        <StepNavigation>
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
            type="button"
          >
            Previous
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid}
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </StepNavigation>
      </form>
    </FormWrapper>
  );
};

export default MultiStepForm;