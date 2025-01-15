import React from 'react';
import { mount } from '@cypress/react18';
import { EditStory } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import 'cypress-file-upload';
import * as NextRouter from 'next/router';
beforeEach(() => {
  const pushStub = cy.stub().as('routerPush');
  cy.stub(NextRouter, 'useRouter').returns({
    pathname: '/app/home',
    push: pushStub,
  });
});
describe('Render Create Story Types', () => {

  const storeLifeStory: any = mockStore({
    template: {
          template: {
            colors: [
              { PLabel: 'storyBackground', PValue: '#f0f0f0' },
              { PLabel: 'TextColor', PValue: '#333333' },
              { PLabel: 'AccentColor', PValue: '#ff5733' },
            ],
          },
        },
          storageLog: {
        storagePopup: false, // this is important to match the structure of your actual state
      },
    auth: {
      isAuth: true,
    },
    memory: {
      createMemoryStep: null,
    },
    story: {
      storySection: 'life_story',
      createStep: 1,
      story: {
        id: 4,
        user_id: 3,
        title: 'test joker',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
        url: 'test-joker-1',
        private: false,
        password: ' ',
        cover_image: '',
        story_details: {
          id: 'ssss',
          prompts: {
            share_a_memory_fun: true,
          },
          general_info: {
            class_purpose: {
              purpose_of_class: [
                {
                  name_of_class: '',
                  description_of_event: '',
                },
              ],
              general_notes_section: {
                general_information: '',
              },
            },
            class_information: {
              name_of_class: [
                {
                  end_date: '',
                  start_date: '',
                  name_of_class: '',
                },
              ],
              associated_school: {
                city: '',
                state: '',
                street: '',
                province: '',
                zip_code: '',
                name_of_school: '',
              },
            },
            classmates_involved: {
              classmates_involved: [
                {
                  name: '',
                  suffix: '',
                  lastname: '',
                  maiden_name: '',
                  second_name: '',
                },
              ],
            },
          },
          type_of_story: 'classmates_story',
        },
        created_at: '2024-05-16T15:02:54.625Z',
        updated_at: '2024-05-16T15:02:54.625Z',
        status: 'draft',
        invitationCode: [],
      },
    },
    intermitence: {
      separation: 7.785,
    },
  });

  it('Render life story form and fill first step ', () => {

    mount(
      <AppContainer store={storeLifeStory}>
        <EditStory />
      </AppContainer>,
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
    cy.get('#title').type('test');
    cy.get('#description').type('test');
    cy.get(':nth-child(2) > .MuiBox-root > .MuiTypography-root').click();
  });
  it('Render life story form and press other steps ', () => {
    mount(
      <AppContainer store={storeLifeStory}>
        <EditStory />
      </AppContainer>,
    );
    cy.get(':nth-child(2) > .MuiBox-root > .MuiTypography-root').click();
  });

  it('Render life story mobile', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={storeLifeStory}>
        <EditStory />
      </AppContainer>,
    );
    // cy.stub(require('next/router'), 'useRouter');
  });
});
