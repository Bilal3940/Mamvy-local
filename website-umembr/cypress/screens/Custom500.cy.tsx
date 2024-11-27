import React from 'react';
import { mount } from '@cypress/react18';
import { Custom500 } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';
import * as NextRouter from 'next/router';
const mockStore = configureStore([]);

const store: any = mockStore({});
describe('custom 500', () => {
  beforeEach(() => {
    const pushStub = cy.stub().as('routerPush');
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: 'app/login',
      push: pushStub,
    });
  });

  const storeAuth: any = mockStore({
    auth: {
      isAuth: true,
      user: {},
    },
    memory: {
      createMemoryStep: null,
    },
    story: {
      stories: [],
    },
    home: {
      criterias: {
        search: '',
        prompts: [],
        collaborators: [],
      },
      stories: {},
    },
    intermitence: {
      separation: 7.785,
    },
  });

  it('render 500', () => {
    mount(
      <AppContainer store={storeAuth}>
        <Custom500 />
      </AppContainer>,
    );
  });
});
