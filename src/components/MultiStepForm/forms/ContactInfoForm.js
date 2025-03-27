import React from 'react';
import * as yup from 'yup';
import BaseForm from './BaseForm';
import { useFormContext } from '../context/FormContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\+?[\d\s-]+$/, 'Invalid phone number').required('Phone is required'),
  address: yup.string().required('Address is required'),
});

const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter your phone number',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter your address',
  },
];

const ContactInfoForm = () => {
  const { updateFormData, getFormData } = useFormContext();
  
  return (
    <BaseForm
      title="Contact Information"
      schema={schema}
      fields={fields}
      defaultValues={getFormData('personalInfo', 'contactInfo')}
      onSubmit={(data) => updateFormData('personalInfo', 'contactInfo', data)}
      formId="contactInfo"
      stepId="personalInfo"
    />
  );
};

export default ContactInfoForm;