import React from 'react';
import { mount } from '@cypress/react18';
import { MuiTabs } from '@/components';
import AppContainer from './AppContainer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('MuiTabs component', () => {
  const store: any = mockStore();

  const TestComponent = () => {
    const [showSection, setShowSection] = React.useState(0);
    const tabs: any = [
      {
        label: 'my_profile_mayus',
        action: () => setShowSection(0),
      },
      {
        label: 'collaborations_mayus',
        action: () => setShowSection(1),
      },
    ];

    return <MuiTabs tabs={tabs} value={showSection} width='100%' />;
  };

  const TestDefaultComponent = () => {
    const [showSection] = React.useState(0);

    return <MuiTabs tabs={[]} value={showSection} width='100%' />;
  };
  const TestComponentExtraProp = () => {
    const [showSection] = React.useState(0);

    return (
      <MuiTabs
        tabs={[]}
        value={showSection}
        width='100%'
        extraStyle={{
          width: '100%',
        }}
      />
    );
  };
  it('Render MuiTabs ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
  });
  it('Render MuiTabs  ', () => {
    mount(
      <AppContainer store={store}>
        <TestDefaultComponent />
      </AppContainer>,
    );
  });
  it('MuiTabs Click ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('[tabindex="-1"]').click();
  });
  it('MuiTabs custom width ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponentExtraProp />
      </AppContainer>,
    );
  });
});
