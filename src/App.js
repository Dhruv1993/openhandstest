import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormProvider } from './components/MultiStepForm/context/FormContext';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import { PRIVILEGE_LEVELS } from './components/MultiStepForm/config/formConfig';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 40px 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
`;

function App() {
  return (
    <AppContainer>
      <Header>Multi-Step Form Demo</Header>
      <FormProvider userPrivilege={PRIVILEGE_LEVELS.ADMIN}>
        <MultiStepForm />
      </FormProvider>
    </AppContainer>
  );
}

export default App;
