import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

const FormContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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

const BaseForm = ({
  title,
  schema,
  defaultValues,
  onSubmit,
  fields,
  formId,
  stepId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues,
  });

  const renderField = (field) => {
    const {
      name,
      label,
      type = 'text',
      options,
      placeholder,
      ...rest
    } = field;

    switch (type) {
      case 'select':
        return (
          <Form.Group key={name} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select {...register(name)} {...rest}>
              <option value="">Select {label}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
            {errors[name] && (
              <ErrorMessage>{errors[name].message}</ErrorMessage>
            )}
          </Form.Group>
        );

      case 'textarea':
        return (
          <Form.Group key={name} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={placeholder}
              {...register(name)}
              {...rest}
            />
            {errors[name] && (
              <ErrorMessage>{errors[name].message}</ErrorMessage>
            )}
          </Form.Group>
        );

      default:
        return (
          <Form.Group key={name} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type={type}
              placeholder={placeholder}
              {...register(name)}
              {...rest}
            />
            {errors[name] && (
              <ErrorMessage>{errors[name].message}</ErrorMessage>
            )}
          </Form.Group>
        );
    }
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit((data) => onSubmit(data, formId, stepId))}>
        {fields.map(renderField)}
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Form>
    </FormContainer>
  );
};

export default BaseForm;