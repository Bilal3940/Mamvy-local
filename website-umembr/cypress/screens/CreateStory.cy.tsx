import React from 'react';
import { mount } from '@cypress/react18';
import { CreateStory } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import 'cypress-file-upload';

describe('Render Create Story Types', () => {
  const storeAuth: any = mockStore({
    auth: {
      isAuth: true,
    },
    memory: {
      createMemoryStep: null,
    },
    story: {},
    intermitence: {
      separation: 7.785,
    },
  });
  const storeLifeStory: any = mockStore({
    auth: {
      isAuth: true,
    },
    memory: {
      createMemoryStep: null,
    },
    story: {
      storySection: 'life_story',
      createStep: 1,
    },
    intermitence: {
      separation: 7.785,
    },
  });
  const storePromts: any = mockStore({
    auth: {
      isAuth: true,
    },
    memory: {
      createMemoryStep: null,
    },
    story: {
      storySection: 'life_story',
      createStep: 2,
    },
    intermitence: {
      separation: 7.785,
    },
  });
  const storeFinished: any = mockStore({
    auth: {
      isAuth: true,
    },
    memory: {
      createMemoryStep: null,
    },
    story: {
      storySection: 'life_story',
      createStep: 3,
    },
    intermitence: {
      separation: 7.785,
    },
  });
  it('Render Create Story', () => {
    mount(
      <AppContainer store={storeAuth}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
  });
  it('Change story types', () => {
    mount(
      <AppContainer store={storeAuth}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get(':nth-child(1) > .css-13jxw3v').click();
    cy.get(':nth-child(2) > .css-13jxw3v').click();
    cy.get(':nth-child(3) > .css-13jxw3v').click();
    cy.get(':nth-child(4) > .css-13jxw3v').click();
    cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiTypography-root');
  });
  it('Render life story form and fill first step ', () => {
    mount(
      <AppContainer store={storeLifeStory}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get(':nth-child(2) > .MuiButtonBase-root').click();

    cy.fixture('/images/apple.svg').then((fileContent: any) => {
      // Get the input element and attach the file
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'apple.svg',
        mimeType: 'image/svg',
      });
      cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
    });
    cy.get('#title').type('test');
    cy.get('#description').type('test');
    cy.get(':nth-child(2) > .MuiBox-root > .MuiTypography-root').click();
  });
  it('Render life story form and press other steps ', () => {
    mount(
      <AppContainer store={storeLifeStory}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get(':nth-child(2) > .MuiBox-root > .MuiTypography-root').click();
  });
  // it('Render life story form and fill first step and fill array', () => {
  //   mount(
  //     <AppContainer store={storeLifeStory}>
  //       <CreateStory />
  //     </AppContainer>,
  //   );
  //   cy.stub(require('next/router'), 'useRouter');

  //   cy.fixture('/images/apple.svg').then((fileContent: any) => {
  //     // Get the input element and attach the file
  //     cy.get('input[type="file"]').attachFile({
  //       fileContent: fileContent.toString(),
  //       fileName: 'apple.svg',
  //       mimeType: 'image/svg',
  //     });
  //     cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
  //   });
  //   cy.get('#title').type('test');
  //   cy.get('#description').type('test');
  //   cy.get(':nth-child(8) > .MuiBox-root').click();
  //   cy.get(':nth-child(1) > .css-126th59 > .MuiBox-root > .MuiButtonBase-root').click();
  //   cy.get(
  //     '#elementary-1 > .MuiGrid-container > .MuiGrid-grid-xs-6 > .MuiFormControl-root > .MuiInputBase-root > #name_of_school',
  //   ).type('test');
  //   cy.get('.css-1cp2zxb > :nth-child(2) > .MuiButtonBase-root > .MuiTypography-root').click();
  // });

  // it('Render life story form and fill first step and fill array', () => {
  //   mount(
  //     <AppContainer store={storeLifeStory}>
  //       <CreateStory />
  //     </AppContainer>,
  //   );
  //   cy.stub(require('next/router'), 'useRouter');
  //   cy.fixture('/images/apple.svg').then((fileContent: any) => {
  //     // Get the input element and attach the file
  //     cy.get('input[type="file"]').attachFile({
  //       fileContent: fileContent.toString(),
  //       fileName: 'apple.svg',
  //       mimeType: 'image/svg',
  //     });
  //     cy.get('input[type="file"]').should('have.prop', 'files').and('have.length', 1);
  //   });
  //   cy.get('#title').type('test');
  //   cy.get('#description').type('test');
  //   cy.get(':nth-child(2) > .MuiButtonBase-root').click();
  //   cy.get('.css-1cp2zxb > :nth-child(1) > .MuiButtonBase-root').click();
  //   cy.wait(1000);
  //   cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiTypography-root').click();
  // });

  it('Render life story ', () => {
    mount(
      <AppContainer store={storeLifeStory}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get('.css-1cp2zxb > :nth-child(1) > .MuiButtonBase-root').click();
  });
  it('Render life story mobile', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeLifeStory}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get(':nth-child(1) > :nth-child(3) > .MuiButtonBase-root').click();
    cy.get(':nth-child(1) > :nth-child(3) > .MuiButtonBase-root').click();
  });

  it('Render step promts', () => {
    mount(
      <AppContainer store={storePromts}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
  });
  it('Render step promts', () => {
    mount(
      <AppContainer store={storePromts}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
    cy.get(':nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get(':nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
  });
  it('Render step Finishing', () => {
    mount(
      <AppContainer store={storeFinished}>
        <CreateStory />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
  });
});
