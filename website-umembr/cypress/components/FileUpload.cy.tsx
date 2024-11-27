import React from 'react';
import { mount } from '@cypress/react18';
import { FileUpload } from '@/components';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { Box } from '@mui/material';
import 'cypress-file-upload';

describe('Render FileUpload ', () => {
  const schema = yup.object().shape({
    file: yup.array().required('Email is required'),
  });

  it('render with default values', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Box bgcolor={'white'}>
          <Formik
            initialValues={{ file: '' }}
            validationSchema={schema}
            onSubmit={(data) => {
              console.log(data);
            }}>
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FileUpload
                  value={values.file}
                  name='primaryMedia'
                  onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
                />
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>,
    );
    cy.fixture('/images/apple.svg').then((fileContent: any) => {
      // Get the input element and attach the file
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'apple.svg',
        mimeType: 'image/svg',
      });
      cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
    });
  });
  it('render with image type ', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Box bgcolor={'white'}>
          <Formik
            initialValues={{ file: '' }}
            validationSchema={schema}
            onSubmit={(data) => {
              console.log(data);
            }}>
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FileUpload
                  value={values.file}
                  name='primaryMedia'
                  onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
                  placeholder='Click to upload'
                  acceptedFormats={'image/*'}
                  error={false}
                />
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>,
    );

    cy.fixture('/images/apple.svg').then((fileContent: any) => {
      // Get the input element and attach the file
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'apple.svg',
        mimeType: 'image/svg',
      });
      cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
    });
    cy.get('.MuiButtonBase-root').click();
  });
  it('render with audio type ', () => {
    //TODO add audio with cypress not suported
    mount(
      <ThemeProvider theme={theme}>
        <Box bgcolor={'white'}>
          <Formik
            initialValues={{ file: '' }}
            validationSchema={schema}
            onSubmit={(data) => {
              console.log(data);
            }}>
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FileUpload
                  value={values.file}
                  name='primaryMedia'
                  onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
                  placeholder='Click to upload'
                  acceptedFormats={'audio/*'}
                  error={false}
                />
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>,
    );
  });

  it('render with rich text type ', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Box bgcolor={'white'}>
          <Formik
            initialValues={{ file: '' }}
            validationSchema={schema}
            onSubmit={(data) => {
              console.log(data);
            }}>
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FileUpload
                  value={values.file}
                  name='primaryMedia'
                  onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
                  placeholder='Click to upload'
                  acceptedFormats={'application/rtf'}
                  error={false}
                />
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>,
    );
    cy.fixture('/richText/sample-rich.rtf').then((fileContent: any) => {
      // Get the input element and attach the file
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'sample-rich.rtf',
        mimeType: 'application/rtf',
      });
      cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
    });
  });

  it('render simulate drag and drop image ', () => {
    mount(
      <ThemeProvider theme={theme}>
        <Box bgcolor={'white'}>
          <Formik
            initialValues={{ file: '' }}
            validationSchema={schema}
            onSubmit={(data) => {
              console.log(data);
            }}>
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FileUpload
                  value={values.file}
                  name='primaryMedia'
                  onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
                  placeholder='Click to upload'
                  acceptedFormats={'application/rtf'}
                  error={false}
                />
              </form>
            )}
          </Formik>
        </Box>
      </ThemeProvider>,
    );
    const dataTransfer = new DataTransfer();
    cy.fixture('images/apple.svg').then((fileContent) => {
      const file = new File([fileContent], 'apple.svg', {
        type: 'image/svg',
      });
      dataTransfer.items.add(file);

      cy.get('[role="presentation"]').trigger('dragover', {
        dataTransfer,
      });

      cy.get('[role="presentation"]').trigger('drop', {
        dataTransfer,
      });

      // cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
    });
  });

  // it('render fileupload mobile', () => {
  //   cy.viewport(414, 896);
  //   mount(
  //     <ThemeProvider theme={theme}>
  //       <Box bgcolor={'white'}>
  //         <Formik
  //           initialValues={{ file: '' }}
  //           validationSchema={schema}
  //           onSubmit={(data) => {
  //             console.log(data);
  //           }}>
  //           {({ values, handleSubmit }) => (
  //             <form onSubmit={handleSubmit}>
  //               <FileUpload
  //                 value={values.file}
  //                 name='primaryMedia'
  //                 onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
  //               />
  //             </form>
  //           )}
  //         </Formik>
  //       </Box>
  //     </ThemeProvider>,
  //   );
  // });

  // it('render fileupload error', () => {
  //   cy.viewport(414, 896);
  //   mount(
  //     <ThemeProvider theme={theme}>
  //       <Box bgcolor={'white'}>
  //         <Formik
  //           initialValues={{ file: '' }}
  //           validationSchema={schema}
  //           onSubmit={(data) => {
  //             console.log(data);
  //           }}>
  //           {({ values, handleSubmit }) => (
  //             <form onSubmit={handleSubmit}>
  //               <FileUpload
  //                 value={values.file}
  //                 name='primaryMedia'
  //                 onChange={(_event: any, value: any) => console.log('primaryMedia', value)}
  //                 error={true}
  //                 errorMessage='This field is required'
  //               />
  //             </form>
  //           )}
  //         </Formik>
  //       </Box>
  //     </ThemeProvider>,
  //   );
  // });
});
