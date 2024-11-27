import React from 'react';
import { mount } from '@cypress/react18';
import { Custom404 } from '@/screens';
import AppContainer from '../components/AppContainer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const store: any = mockStore({});
describe('custom 404', () => {
  it('render 404', () => {
    mount(
      <AppContainer store={store}>
        <Custom404 />
      </AppContainer>,
    );
    cy.stub(require('next/router'), 'useRouter');
  });
});
