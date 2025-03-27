import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const FormSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

const BasicInfoForm = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection>
      <FormTitle>Basic Information</FormTitle>
      
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          {...register('firstName', {
            required: 'First name is required'
          })}
          isInvalid={!!errors.firstName}
        />
        {errors.firstName && (
          <ErrorMessage>{errors.firstName.message}</ErrorMessage>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          {...register('lastName', {
            required: 'Last name is required'
          })}
          isInvalid={!!errors.lastName}
        />
        {errors.lastName && (
          <ErrorMessage>{errors.lastName.message}</ErrorMessage>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          {...register('dateOfBirth', {
            required: 'Date of birth is required'
          })}
          isInvalid={!!errors.dateOfBirth}
        />
        {errors.dateOfBirth && (
          <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
        )}
      </Form.Group>
    </FormSection>
  );
};

export default BasicInfoForm;