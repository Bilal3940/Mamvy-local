import React from 'react';
import { mount } from '@cypress/react18';
import { InputToken } from '@/components';

import * as yup from 'yup';
import { Formik } from 'formik';

describe('InputToken component', () => {
  it('Renders InputToken', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <InputToken value={values.token} onChange={handleChange} numInputs={6} inputType='number' />
          </form>
        )}
      </Formik>,
    );
  });
  it('Fill InputToken with numbers', () => {
    const schema = yup.object().shape({
      token: yup.string().required('Email is required'),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken value={values.token} onChange={handleChange} numInputs={6} inputType='number' />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('123456');
  });
  it('Fill InputToken with alphanumeric', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken value={values.token} onChange={handleChange} numInputs={6} inputType='text' />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('YEC24');
  });
  it('Fill InputToken with alphanumeric with space', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken value={values.token} onChange={handleChange} numInputs={6} inputType='text' />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('Y EC 2');
  });
  it('default InputToken props', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken onChange={handleChange} />
          </form>
        )}
      </Formik>,
    );
  });
  it('simulate InputToken onPaste correct type data', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken onChange={handleChange} />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').trigger('paste', {
      clipboardData: {
        getData: () => '123456',
      },
    });
  });
  it('simulate InputToken onPaste incorrect type data', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken onChange={handleChange} inputType='number' />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').trigger('paste', {
      clipboardData: {
        getData: () => 'sssw22',
      },
    });
  });
  it('InputToken with separator', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken onChange={handleChange} inputType='number' renderSeparator={'-'} />
          </form>
        )}
      </Formik>,
    );
  });
  it('Fill InputToken press delete , or arrows or space', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken value={values.token} onChange={handleChange} numInputs={6} inputType='text' />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('YE3{del}');
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('{leftarrow}{del}');
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('3{rightarrow}{backspace}');
  });
  it('Fill InputToken click in other input', () => {
    const schema = yup.object().shape({
      token: yup.string().required(),
    });

    mount(
      <Formik
        initialValues={{ token: '' }}
        validationSchema={schema}
        onSubmit={(data) => {
          console.log(data);
        }}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputToken value={values.token} onChange={handleChange} numInputs={6} inputType='text' />
          </form>
        )}
      </Formik>,
    );
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('YE');
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').click();
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('3');
  });
});
