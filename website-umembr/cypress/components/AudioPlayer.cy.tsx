import React from 'react';
import { mount } from '@cypress/react18';
import { AudioPlayer } from '@/components';
import configureStore from 'redux-mock-store';
import AppContainer from './AppContainer';
const mockStore = configureStore([]);

describe('AudioPlayer component', () => {
  const store: any = mockStore({
    auth: {
      isAuth: true,
      auth: {
        isAuth: true,
        user: {
          id: 102,
          name: 'gerards',
          lastname: 'miot',
          email: 'mauricemiot18@gmail.com',
          phonenumber: '134234',
          address_city: 'testing',
          address_country: null,
          address_line_1: '2',
          address_line_2: 'pepepe',
          address_postal_code: '1010',
          address_state: 'WA',
          picture: null,
          description: 'halossss',
          recover_code: '775938',
          created_at: '2024-04-01T12:30:06.304Z',
          updated_at: '2024-04-01T17:20:59.355Z',
          googleAccessToken: null,
          facebookAccessToken: null,
        },
      },
    },
  });
  it('renders and controls audio playback', () => {
    const audioData = {
      url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3',
      index: '1',
      name: 'Test Audio',
    };

    mount(
      <AppContainer store={store}>
        <AudioPlayer audioData={audioData} />
      </AppContainer>,
    );

    cy.wait(1000);
    cy.get('img').click({ force: true });
    cy.wait(2000);
    cy.get('img').click({ force: true });
  });
});
