import React from 'react';
import { mount } from '@cypress/react18';
import { Login } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
import { GoogleOAuthProvider } from '@react-oauth/google';
const mockStore = configureStore([]);
import { google_client_id } from '@/utils';
import * as NextRouter from 'next/router';

describe('Login screen', () => {
  beforeEach(() => {
    const pushStub = cy.stub().as('routerPush');
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/app/login',
      asPath: '/app/login',
      push: pushStub,
    });
  });
  const store: any = mockStore({
    intermitence: {
      loading: false,
    },
  });

  const storeAuth: any = mockStore({
    intermitence: {
      loading: false,
    },
    auth: {
      isAuth: true,
    },
  });

  it('Renders Login', () => {
    mount(
      <GoogleOAuthProvider clientId={google_client_id}>
        <AppContainer store={store}>
          <Login />
        </AppContainer>
        ,
      </GoogleOAuthProvider>,
    );
  });
  it('Render Responsive', () => {
    cy.viewport(414, 896);
    mount(
      <GoogleOAuthProvider clientId={google_client_id}>
        <AppContainer store={store}>
          <Login />
        </AppContainer>
        ,
      </GoogleOAuthProvider>,
    );

    cy.get('#password').type('Test1234*');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root > img').click();
  });
  it('fields errors', () => {
    mount(
      <GoogleOAuthProvider clientId={google_client_id}>
        <AppContainer store={store}>
          <Login />
        </AppContainer>
        ,
      </GoogleOAuthProvider>,
    );

    cy.get('#email').type('test@jjjj');
    cy.get('#password').type('1234');
  });
  it('submit fields success', () => {
    mount(
      <GoogleOAuthProvider clientId={google_client_id}>
        <AppContainer store={store}>
          <Login />
        </AppContainer>
        ,
      </GoogleOAuthProvider>,
    );

    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('Test1234*');
    cy.get('.MuiGrid-container > :nth-child(4)').click();
  });
  it('show password', () => {
    mount(
      <GoogleOAuthProvider clientId={google_client_id}>
        <AppContainer store={store}>
          <Login />
        </AppContainer>
        ,
      </GoogleOAuthProvider>,
    );

    cy.get('#password').type('Test1234*');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root > img').click();
  });

  it('render Login is auth ', () => {
    mount(
      <GoogleOAuthProvider clientId={google_client_id}>
        <AppContainer store={storeAuth}>
          <Login />
        </AppContainer>
      </GoogleOAuthProvider>,
    );
  });

  // TO DO: this test is broke because google block the unsecured cypress navigator
  // it('click login with google ', () => {
  //   mount(
  //     <GoogleOAuthProvider clientId={google_client_id}>
  //       <AppContainer store={store}>
  //         <Login />
  //       </AppContainer>
  //       ,
  //     </GoogleOAuthProvider>,
  //   );
  //
  //   cy.get(':nth-child(1) > .MuiButtonBase-root > img').click();
  //   cy.get('.css-145rgon > :nth-child(2) > .MuiButtonBase-root > img').click();
  //   cy.get(':nth-child(3) > .MuiButtonBase-root > img').click();
  // });
  // it('click login with facebook  ', () => {
  //   mount(
  //     <GoogleOAuthProvider clientId={google_client_id}>
  //       <AppContainer store={store}>
  //         <Login />
  //       </AppContainer>
  //       ,
  //     </GoogleOAuthProvider>,
  //   );
  //
  //   cy.get('.css-145rgon > :nth-child(2) > .MuiButtonBase-root > img').click()
  // });
});
// it('go to forgot password screen ', () => {
//
//   mount(
//     <AppContainer store={store}>
//       <Login />
//     </AppContainer>,
//   );

// cy.get('.css-1fpckdt-MuiGrid-root > a').click();

//   cy.intercept('GET', '/app/forgot-password').as('forgotPassword');
//   cy.get('.css-1onxmye-MuiGrid-root > a > .MuiTypography-root').click();

//   cy.wait('@forgotPassword');
// });
