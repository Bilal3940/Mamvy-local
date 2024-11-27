import React from 'react';
import { mount } from '@cypress/react18';
import { Drawer } from '@/components';
import AppContainer from './AppContainer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Drawer component', () => {
  const store: any = mockStore({
    intermitence: {
      drawerOpen: true,
    },
    auth: {
      isAuth: true,
      user: {
        name: 'name',
        lastname: 'lastname',
        address_city: 'testing',
        address_country: null,
        address_line_1: '2',
        address_line_2: 'pepepe',
      },
    },
  });
  const storeClosed: any = mockStore({
    intermitence: {
      drawerOpen: false,
    },
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
  });

  it('Renders Appbar hidden', () => {
    mount(
      <AppContainer store={storeClosed}>
        <Drawer />
      </AppContainer>,
    );
  });
  it('renders Drawer open', () => {
    const store: any = mockStore({
      intermitence: {
        drawerOpen: true,
      },
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
    });
    mount(
      <AppContainer store={store}>
        <Drawer />
      </AppContainer>,
    );
  });
  it('Renders Drawer mobile', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <Drawer />
      </AppContainer>,
    );
  });

  it('Close modal ', () => {
    mount(
      <AppContainer store={store}>
        <Drawer />
      </AppContainer>,
    );

    cy.get('[data-cy="drawerButton"] > .MuiBox-root > .MuiButtonBase-root > img').click();
  });
});
