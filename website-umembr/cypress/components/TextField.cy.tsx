// cypress/integration/textFieldComponent.spec.js
import React from 'react';
import { mount } from '@cypress/react18';
import { MuiTextField } from '@/components';
import * as yup from 'yup';
import { Formik } from 'formik';

describe('TextField component', () => {
  const schema = yup.object().shape({
    contactEmail: yup.string().email('Please enter a valid email').required('Email is required'),
  });

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  it('validate email success', () => {
    // Mount the TextField component
    mount(
      <MuiTextField
        testId='input'
        fullWidth
        id='contactEmail'
        name='contactEmail'
        autoComplete='contactEmail'
        placeholder={'Contact Name'}
        label={'Contact Name'}
      />,
    );

    // Interact with the mounted TextField component
    cy.get('#contactEmail').type('anaelle.lesne&2@ibisdev.tech'); // Type an email

    // Additional interactions
    cy.get('#contactEmail').should('have.value', 'anaelle.lesne&2@ibisdev.tech'); // Check if the value is set correctly

    // Assertions
    cy.contains('Contact Name').should('be.visible'); // Ensure placeholder is visible
    cy.get('#contactEmail').should('exist'); // Check the existence of the TextField
    cy.get('#contactEmail').should('have.attr', 'autoComplete', 'contactEmail'); // Ensure autoComplete attribute is set
  });

  it('validates email input error', () => {
    mount(
      <Formik
        initialValues={{ contactEmail: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <MuiTextField
              testId='input'
              fullWidth
              id='contactEmail'
              name='contactEmail'
              autoComplete='contactEmail'
              isDarkTheme={false}
              placeholder={'Contact Name'}
              label={'Contact Name'}
              value={values.contactEmail}
              onChange={handleChange}
              status={changeInputStatus(values.contactEmail, errors.contactEmail && touched.contactEmail)}
              errorMessage={errors.contactEmail}
            />
          </form>
        )}
      </Formik>,
    );

    // Enter an invalid email
    cy.get('#contactEmail').type('anaelle.lesne&2').blur();
    cy.get('form').submit();

    // Assertion for error message display
    cy.contains('Please enter a valid email').should('be.visible');
  });
  it('render dark theme style', () => {
    mount(
      <Formik
        initialValues={{ contactEmail: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <MuiTextField
              testId='input'
              fullWidth
              id='contactEmail'
              name='contactEmail'
              autoComplete='contactEmail'
              placeholder={'Contact Name'}
              label={'Contact Name'}
              value={values.contactEmail}
              onChange={handleChange}
              status={changeInputStatus(values.contactEmail, errors.contactEmail && touched.contactEmail)}
              errorMessage={errors.contactEmail}
              isDarkTheme={false}
            />
          </form>
        )}
      </Formik>,
    );

    // Enter an invalid email
    cy.get('#contactEmail').type('anaelle.lesne&2').blur();
    cy.get('form').submit();

    // Assertion for error message display
    cy.contains('Please enter a valid email').should('be.visible');
  });
  it('render icon method style', () => {
    mount(
      <Formik
        initialValues={{ contactEmail: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <MuiTextField
              testId='input'
              fullWidth
              id='contactEmail'
              name='contactEmail'
              autoComplete='contactEmail'
              placeholder={'Contact Name'}
              endIcon='/icons/eye-white.svg'
              iconHeight={15}
              iconWidth={15}
              label={'Contact Name'}
              value={values.contactEmail}
              onChange={handleChange}
              status={changeInputStatus(values.contactEmail, errors.contactEmail && touched.contactEmail)}
              errorMessage={errors.contactEmail}
              isDarkTheme={false}
            />
          </form>
        )}
      </Formik>,
    );
  });
});
