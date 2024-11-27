import React from 'react';
import { mount } from '@cypress/react18';
import { Register } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import * as NextRouter from 'next/router';

describe('Register Screen', () => {
  beforeEach(() => {
    const pushStub = cy.stub().as('routerPush');
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/app/register',
      asPath: '/app/register',
      push: pushStub,
    });
  });
  const store: any = mockStore({
    intermitence: {
      loading: false,
    },
  });

  it('Render Register', () => {
    mount(
      <AppContainer store={store}>
        <Register />
      </AppContainer>,
    );
  });
  it('Render Register Responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <Register />
      </AppContainer>,
    );
  });
  it('Fill form Error', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <Register />
      </AppContainer>,
    );

    cy.get('#name').type('123');
    cy.get('#lastname').type('123');

    cy.get('#email').type('test@');
    cy.get('#password').type('1234');
    cy.get('#confirm_password').type('1234');
    cy.get('.form-control').type('1234567');
    cy.get('#description');
  });
  it('Fill form success', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <Register />
      </AppContainer>,
    );

    cy.get('#name').type('name');
    cy.get('#lastname').type('lastname');
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('Test1234');
    cy.get(
      ':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root',
    ).click();
    cy.get('#confirm_password').type('Test1234');
    cy.get(
      ':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root',
    ).click();
    cy.get('.form-control').type('1234567');
    cy.get('#description').type('about me');
    cy.get('.MuiGrid-container > :nth-child(8)').click();
  });
});
