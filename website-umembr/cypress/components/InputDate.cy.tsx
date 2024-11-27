// cypress/integration/textFieldComponent.spec.js
import React from 'react';
import { mount } from '@cypress/react18';
import { MuiInputDate } from '@/components';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import * as yup from 'yup';
import { Formik } from 'formik';

describe('MuiInputDate component test', () => {
  const schema = yup.object().shape({
    dischargeDate: yup.string().required('Dsicharge date required'),
  });

  it('Render MuiInputDate ', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ dischargeDate: '' }}
          validationSchema={schema}
          setCurrentDateByDefault
          onSubmit={(data) => {
            console.log(data);
          }}>
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <MuiInputDate
                value={values.dischargeDate}
                isDarkTheme
                handleDatePicker={(date: any) => {
                  setFieldValue('dischargeDate', date);
                }}
              />
            </form>
          )}
        </Formik>
      </ThemeProvider>,
    );
    cy.get('.MuiInputBase-root').click();

    cy.get('.MuiPickersDay-today').click();
  });
  it('Render  select Year ', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ dischargeDate: '' }}
          validationSchema={schema}
          onSubmit={(data) => {
            console.log(data);
          }}>
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <MuiInputDate
                value={values.dischargeDate}
                isDarkTheme
                handleDatePicker={(date: any) => {
                  setFieldValue('dischargeDate', date);
                }}
              />
            </form>
          )}
        </Formik>
      </ThemeProvider>,
    );
    cy.get('.MuiInputBase-root').click();
    cy.get('.MuiPickersCalendarHeader-labelContainer').click();

    cy.get('.MuiYearCalendar-root > :nth-child(125)').click();
  });
  it('Render  open and close ', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ dischargeDate: '' }}
          validationSchema={schema}
          onSubmit={(data) => {
            console.log(data);
          }}>
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <MuiInputDate
                value={values.dischargeDate}
                isDarkTheme
                handleDatePicker={(date: any) => {
                  setFieldValue('dischargeDate', date);
                }}
              />
            </form>
          )}
        </Formik>
      </ThemeProvider>,
    );
    cy.get('.MuiInputBase-root').click();
    cy.document().trigger('click', { force: true });
  });

  it('Render  MuiInputDate  with initial data', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ dischargeDate: null }}
          validationSchema={schema}
          onSubmit={(data) => {
            console.log(data);
          }}>
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <MuiInputDate
                value={values.dischargeDate}
                disabled={true}
                isDarkTheme
                error={true}
                errorMessage={' this field is required'}
                handleDatePicker={(date: any) => {
                  setFieldValue('dischargeDate', date);
                }}
              />
            </form>
          )}
        </Formik>
      </ThemeProvider>,
    );
  });
  // it('Render  write Year < 1900 ', () => {
  //   mount(
  //     <ThemeProvider theme={theme}>
  //       <Formik
  //         initialValues={{ dischargeDate: '14/10/1800' }}
  //         validationSchema={schema}
  //         onSubmit={(data) => {
  //           console.log(data);
  //         }}>
  //         {({ values, handleSubmit, setFieldValue }) => (
  //           <form onSubmit={handleSubmit}>
  //             <MuiInputDate
  //               value={values.dischargeDate}
  //               isDarkTheme
  //               handleDatePicker={(date: any) => {
  //                 setFieldValue('dischargeDate', date);
  //               }}
  //             />
  //           </form>
  //         )}
  //       </Formik>
  //     </ThemeProvider>,
  //   );
  //   cy.get('.MuiInputBase-root').click();

  //   cy.get('.MuiInputBase-root').type('11/04/1899');

  //   cy.get('.MuiInputBase-root').type('11/04/2200');
  //   cy.get('.MuiPickersDay-today').click();
  // });

  // it('opens picker on opener click', () => {
  //   mount(
  //     <ThemeProvider theme={theme}>
  //       <Formik
  //         initialValues={{ dischargeDate: '' }}
  //         validationSchema={schema}
  //         onSubmit={(data) => {
  //           console.log(data);
  //         }}>
  //         {({ values, handleSubmit, setFieldValue }) => (
  //           <form onSubmit={handleSubmit}>
  //             <MuiInputDate
  //               value={values.dischargeDate}
  //               handleDatePicker={(date: any) => {
  //                 setFieldValue('dischargeDate', date);
  //               }}
  //             />
  //           </form>
  //         )}
  //       </Formik>
  //     </ThemeProvider>,
  //   );
  //   cy.get('button').click();
  //   cy.get('.MuiDateCalendar-root').should('exist');
  //   cy.get('input').click();
  //   cy.get('input').type('09/12/2023');
  // });
  it('render dark theme', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ dischargeDate: '' }}
          validationSchema={schema}
          onSubmit={(data) => {
            console.log(data);
          }}>
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <MuiInputDate
                value={values.dischargeDate}
                isDarkTheme={false}
                handleDatePicker={(date: any) => {
                  setFieldValue('dischargeDate', date);
                }}
              />
            </form>
          )}
        </Formik>
      </ThemeProvider>,
    );
  });
});
