import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import styled from 'styled-components';
import { Button, ProgressBar } from 'react-bootstrap';
import { formConfig } from './config/formConfig';
import { useFormContext } from './context/FormContext';
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

// Map form IDs to their components
const formComponents = {
  basicInfo: BasicInfoForm,
  contactInfo: ContactInfoForm,
  // Add other form components here as they are created
};

const MultiStepForm = () => {
  const { canAccessForm } = useFormContext();
  
  const calculateProgress = (step) => {
    const totalSteps = Object.keys(formConfig).length;
    return ((step) / totalSteps) * 100;
  };

  const renderForms = (stepId) => {
    const stepConfig = formConfig[stepId];
    if (!stepConfig) return null;

    return Object.entries(stepConfig.forms).map(([formId, form]) => {
      if (!canAccessForm(form.requiredPrivilege)) return null;

      const FormComponent = formComponents[formId];
      return FormComponent ? <FormComponent key={formId} /> : null;
    });
  };

  return (
    <FormWrapper>
      <Wizard
        render={({
          step,
          steps,
          next,
          previous,
          push,
          history,
        }) => (
          <div>
            <Progress
              now={calculateProgress(steps.indexOf(step) + 1)}
              variant="info"
            />
            
            <StepTitle>
              {formConfig[step.id]?.title || step.id}
            </StepTitle>

            <Steps>
              {Object.entries(formConfig).map(([stepId, config]) => (
                <Step
                  key={stepId}
                  id={stepId}
                  render={({ next, previous }) => (
                    <>
                      {renderForms(stepId)}
                      <StepNavigation>
                        <Button
                          variant="secondary"
                          onClick={previous}
                          disabled={steps.indexOf(step) === 0}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="primary"
                          onClick={next}
                          disabled={steps.indexOf(step) === steps.length - 1}
                        >
                          Next
                        </Button>
                      </StepNavigation>
                    </>
                  )}
                />
              ))}
            </Steps>
          </div>
        )}
      />
    </FormWrapper>
  );
};

export default MultiStepForm;