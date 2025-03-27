import React from 'react';
import * as yup from 'yup';
import BaseForm from './BaseForm';
import { useFormContext } from '../context/FormContext';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
});

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
  },
];

const BasicInfoForm = () => {
  const { updateFormData, getFormData } = useFormContext();
  
  return (
    <BaseForm
      title="Basic Information"
      schema={schema}
      fields={fields}
      defaultValues={getFormData('personalInfo', 'basicInfo')}
      onSubmit={(data, formId, stepId) => updateFormData('personalInfo', 'basicInfo', data)}
      formId="basicInfo"
      stepId="personalInfo"
    />
  );
};

export default BasicInfoForm;