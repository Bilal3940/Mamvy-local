import React from 'react';
import { mount } from '@cypress/react18';
import { Settings } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import 'cypress-file-upload';

const store: any = mockStore({
  intermitence: {
    actualSection: 'My profile',
  },
  auth: {
    isAuth: true,
    token: '',
  },
  notifications: {
    allNotifications: [
      {
        id: 18,
        user_id: 6,
        message: 'You have been invited to collaborate on the "gerard" Story in MEMVY as a collaborator.',
        title: 'Story Invitation Collaborator',
        avatar: null,
        actions: {
          role: 'Story_Collaborator',
          type: 'COLLABORATION',
          state: 'UNREAD',
          story_id: 'test-joker-1',
        },
        created_at: '2024-06-04T11:46:08.770Z',
        updated_at: '2024-06-04T11:46:08.770Z',
      },
    ],
    collaborationNotifications: [
      {
        id: 18,
        user_id: 6,
        message: 'You have been invited to collaborate on the "gerard" Story in MEMVY as a collaborator.',
        title: 'Story Invitation Collaborator',
        avatar: null,
        actions: {
          role: 'Story_Collaborator',
          type: 'COLLABORATION',
          state: 'UNREAD',
          story_id: 'test-joker-1',
        },
        created_at: '2024-06-04T11:46:08.770Z',
        updated_at: '2024-06-04T11:46:08.770Z',
      },
    ],
    otherNotifications: [
      {
        id: 18,
        user_id: 6,
        message: 'You have been invited to collaborate on the "gerard" Story in MEMVY as a collaborator.',
        title: 'Story Invitation Collaborator',
        avatar: null,
        actions: {
          role: 'Story_Collaborator',
          type: 'COLLABORATION',
          state: 'UNREAD',
          story_id: 'test-joker-1',
        },
        created_at: '2024-06-04T11:46:08.770Z',
        updated_at: '2024-06-04T11:46:08.770Z',
      },
    ],
  },
});

describe('Settings Screen', () => {
  it('Settings default screen', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
  });
  it('Settings change screen', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
  });

  //   mount(
  //     <AppContainer store={store}>
  //       <Settings />
  //     </AppContainer>,
  //   );
  //   cy.stub(require('next/router'), 'useRouter');
  //   cy.get(':nth-child(2) > .MuiBox-root > .MuiTypography-root').click();
  //   cy.get('.css-4e4qor > .MuiBox-root > .MuiButtonBase-root').click();
  //   cy.get(':nth-child(1) > .css-69i1ev > .MuiButton-outlined').click();
  //   cy.get(':nth-child(1) > .css-69i1ev > .MuiButton-contained').click();
  // });
  it('Settings profile set edit and fill data', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('#name').type('name');
    cy.get('#lastname').type('lastname');

    cy.get('#address_state').click();
    cy.get('[data-value="GA"]').click();
    cy.get('#address_city').type('caracas');
    cy.get('#address_line_1').type('av lecuna');
    cy.get('#address_line_2').type('pinto a miseria');
    cy.get('#address_postal_code').type('1010');

    cy.get('.form-control').type('4149214049');
    cy.get('#description').type('About me');

    cy.get('.css-1kw0nn0-MuiGrid-root > .MuiButtonBase-root').click();
  });
  it('Settings profile set edit and fill data and cancel', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('#name').type('name');
    cy.get('#lastname').type('lastname');

    cy.get('#address_state').click();
    cy.get('[data-value="GA"]').click();
    cy.get('#address_city').type('caracas');
    cy.get('#address_line_1').type('av lecuna');
    cy.get('#address_line_2').type('pinto a miseria');
    cy.get('#address_postal_code').type('1010');
    cy.get('.form-control').type('4149214049');
    cy.get('#description').type('Aboutme');
    cy.get('.css-1adq0un-MuiGrid-root > .MuiButtonBase-root').click();
  });
  it('Settings profile set edit and fill error data', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('#name').type('123*');
    cy.get('#lastname').type('123*');

    cy.get('#address_city').type('caracas34334******');

    cy.get('#address_postal_code').type('1010&&&%%$$');
    cy.get('.form-control').type('test');
    cy.get('#description').type(' ***');
    cy.get('.css-1kw0nn0-MuiGrid-root > .MuiButtonBase-root').click();
  });
  it('Settings profile change profile image', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
    cy.fixture('/images/apple.svg').then((fileContent: any) => {
      // Get the input element and attach the file
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'apple.svg',
        mimeType: 'image/svg',
      });
      cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
      cy.get('.css-1kw0nn0-MuiGrid-root > .MuiButtonBase-root').click();
    });
  });
  it('Settings profile set edit password', () => {
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.MuiGrid-root > .MuiButtonBase-root').click();
    cy.get('[data-cy="change-password-btn"] > .MuiButtonBase-root').click();
    cy.get('#password').type('Test1234');
    cy.get(
      ':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > img',
    ).click();
    cy.get('#confirm_password').type('Test1234');
    cy.get(
      ':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > img',
    ).click();
    cy.get('.css-1kw0nn0-MuiGrid-root > .MuiButtonBase-root').click();
  });
  // it('Settings change screen mobile', () => {
  //   cy.viewport(414, 896);
  //   mount(
  //     <AppContainer store={store}>
  //       <Settings />
  //     </AppContainer>,
  //   );
  //   cy.stub(require('next/router'), 'useRouter');
  //   cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();
  //   // cy.get('.MuiTabs-flexContainer > :nth-child(3)').click();
  //   cy.get('.MuiTabs-flexContainer > :nth-child(1)').click();
  // });
  it('Settings profile set edit password in mobile', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <Settings />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('[data-cy="change-password-btn"] > .MuiButtonBase-root').click();
    cy.get('#password').type('Test1234');
    cy.get(
      ':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > img',
    ).click();
    cy.get('#confirm_password').type('Test1234');
    cy.get(
      ':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > img',
    ).click();
    cy.get('.css-v4mcyg-MuiGrid-root > .MuiButtonBase-root').click();
  });
});
