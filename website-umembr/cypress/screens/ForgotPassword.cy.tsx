import React from 'react';
import { mount } from '@cypress/react18';
import { ForgotPassword } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import * as NextRouter from 'next/router';

describe('Forgot password Screen step 1 email', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/app/forgot-password',
      query: { code: '', email: '' },
    });
  });

  const storeStep1: any = mockStore({
    forgotPassword: {
      step: 1,
    },
    intermitence: {
      loading: false,
    },
    authSelector: {
      recover: null,
      email: null,
    },
  });

  it('Render Forgot password step 1 email', () => {
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
    cy.get('#email').type('test@gmail.com');
    cy.get('.MuiGrid-container > :nth-child(2) > .MuiButtonBase-root > .MuiTypography-root').click();
  });

  it('Render Forgot password step 1 responsive email', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
    cy.get('#email').type('test@gmail.com');
    cy.get('.MuiGrid-container > :nth-child(2) > .MuiButtonBase-root').click();
  });

  it('Render Forgot password step 1 responsive email error', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
    cy.get('#email').type('test@');
  });
});

describe('Forgot password Screen step 1 handle token', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/app/forgot-password',
      query: { code: '123456', email: 'test@gmail.com' },
    });
  });

  const storeStep1: any = mockStore({
    forgotPassword: {
      step: 1,
    },
    intermitence: {
      loading: false,
    },
    authSelector: {
      recover: null,
      email: null,
    },
  });

  it('Render Forgot password step 1 email', () => {
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('123456');
    cy.get('.css-a0t63y-MuiGrid-root > .MuiButtonBase-root > .MuiTypography-root').click();
  });

  it('Render Forgot password step 1 responsive email', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > #otpToken').type('123456');
    cy.get('.css-a0t63y-MuiGrid-root > .MuiButtonBase-root > .MuiTypography-root').click();
  });
});

describe('Forgot password Screen step 1', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/app/forgot-password',
      query: { code: '144496', email: 'test@gmail.com' },
    });
  });

  const storeStep1: any = mockStore({
    forgotPassword: {
      step: 1,
    },
    intermitence: {
      loading: false,
    },
    authSelector: {
      recover: null,
      email: null,
    },
  });
  const storeStep2: any = mockStore({
    forgotPassword: {
      step: 2,
    },
    intermitence: {
      loading: false,
    },
    authSelector: {
      recover: null,
      email: null,
    },
  });
  const storeError: any = mockStore({
    forgotPassword: {
      step: 0,
    },
    authSelector: {
      recover: null,
      email: null,
    },
    intermitence: {
      loading: false,
    },
  });

  it('Render Forgot password step 1', () => {
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password step 2', () => {
    mount(
      <AppContainer store={storeStep2}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password step 1 responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password step 2 responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep2}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('change between screens', () => {
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );

    cy.get('.css-a0t63y-MuiGrid-root > .MuiButtonBase-root > .MuiTypography-root').click({ multiple: true });
  });
  it('change between screens responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );

    cy.get('.css-a0t63y-MuiGrid-root > .MuiButtonBase-root > .MuiTypography-root').click({ multiple: true });
  });
  it('fill step 2', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep2}>
        <ForgotPassword />
      </AppContainer>,
    );

    cy.get('#password').type('Test1234*');
    cy.get(
      ':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root',
    ).click();
    cy.get('#confirm_password').type('Test1234*');
    cy.get(
      ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root',
    ).click();
    cy.get(':nth-child(3) > .MuiButtonBase-root').click();
  });
  it('render default step', () => {
    mount(
      <AppContainer store={storeError}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
});

describe('Forgot with url params', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/forgot-password',
      query: { code: '123456', email: 'test@gmail.com' },
    });
  });

  const storeStep1: any = mockStore({
    forgotPassword: {
      step: 1,
    },
    intermitence: {
      loading: false,
    },
    authSelector: {
      recover: null,
      email: null,
    },
  });
  const storeStep2: any = mockStore({
    forgotPassword: {
      step: 2,
    },
    intermitence: {
      loading: false,
    },
    authSelector: {
      recover: null,
      email: null,
    },
  });
  const storeError: any = mockStore({
    forgotPassword: {
      step: 0,
    },
    authSelector: {
      recover: null,
      email: null,
    },
    intermitence: {
      loading: false,
    },
  });

  it('Render Forgot password step 1', () => {
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password with redirect data', () => {
    mount(
      <AppContainer store={storeStep2}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password step 1 responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password step 2 responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep2}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('change between screens', () => {
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );

    cy.get('.css-a0t63y-MuiGrid-root > .MuiButtonBase-root').click({ multiple: true });
  });
  it('change between screens responsive', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep1}>
        <ForgotPassword />
      </AppContainer>,
    );

    cy.get('.css-a0t63y-MuiGrid-root > .MuiButtonBase-root').click({ multiple: true });
  });
  it('fill step 2', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeStep2}>
        <ForgotPassword />
      </AppContainer>,
    );

    cy.get('#password').type('Test1234*');
    cy.get(
      ':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root',
    ).click();
    cy.get('#confirm_password').type('Test1234*');
    cy.get(
      ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root',
    ).click();
    cy.get(':nth-child(3) > .MuiButtonBase-root').click();
  });
  it('render default step', () => {
    mount(
      <AppContainer store={storeError}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  // it('render resend token', () => {
  //   mount(
  //     <AppContainer store={storeStep1}>
  //       <ForgotPassword />
  //     </AppContainer>,
  //   );
  //   cy.get('.css-1811y4o-MuiTypography-root').click();
  // });
});

describe('Forgot with url params', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/forgot-password',
      query: { code: '123456', email: 'test@gmail.com' },
    });
  });

  const storeDataEmail: any = mockStore({
    forgotPassword: {
      step: 0,
    },
    authSelector: {
      recover: {
        message: 'code',
      },
    },
    intermitence: {
      loading: false,
    },
  });
  const storeDataCode: any = mockStore({
    forgotPassword: {
      step: 0,
    },
    authSelector: {
      recover: {
        message: 'email',
      },
    },
    intermitence: {
      loading: false,
    },
  });
  const storeDataDefault: any = mockStore({
    forgotPassword: {
      step: 0,
    },
    authSelector: {
      recover: {
        message: '',
      },
    },
    intermitence: {
      loading: false,
    },
  });
  const storeAuth: any = mockStore({
    forgotPassword: {
      step: 1,
    },
    authSelector: {
      isAuth: true,
    },
    intermitence: {
      loading: false,
    },
  });

  it('Forgot password case email store', () => {
    mount(
      <AppContainer store={storeDataEmail}>
        <ForgotPassword />
      </AppContainer>,
    );
  });

  it(' Forgot password case code store', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeDataCode}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it(' Forgot password case default store', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeDataDefault}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
  it('Render Forgot password  is Auth', () => {
    mount(
      <AppContainer store={storeAuth}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
});

describe('Forgot password case new password error', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/forgot-password',
      query: { code: '123456', email: 'test@gmail.com' },
    });
  });

  const storeAuth: any = mockStore({
    forgotPassword: {
      step: 2,
    },
    authSelector: {
      isAuth: true,
    },
    intermitence: {
      loading: false,
    },
  });

  const storeIsAuth: any = mockStore({
    forgotPassword: {
      step: 1,
    },
    authSelector: {
      isAuth: true,
    },
    intermitence: {
      loading: false,
    },
  });
  it('Forgot password case new password error', () => {
    mount(
      <AppContainer store={storeAuth}>
        <ForgotPassword />
      </AppContainer>,
    );
    cy.get('#password').type('test1234');
    cy.get('#confirm_password').type('test1234');
  });

  it(' Forgot password redirect to home', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeIsAuth}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
});

describe('Forgot with url params', () => {
  beforeEach(() => {
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/forgot-password',
      query: { code: '', email: '' },
    });
  });

  const storeIsAuth: any = mockStore({
    forgotPassword: {
      step: 0,
    },
    authSelector: {
      isAuth: true,
    },
    intermitence: {
      loading: false,
    },
  });

  it(' Forgot password redirect to home', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeIsAuth}>
        <ForgotPassword />
      </AppContainer>,
    );
  });
});
