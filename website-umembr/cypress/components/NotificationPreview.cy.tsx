import React from 'react';
import { mount } from '@cypress/react18';
import { NotificationsPreview, MuiIconButton } from '@/components';
import AppContainer from './AppContainer';
import configureStore from 'redux-mock-store';
import { Box, ClickAwayListener } from '@mui/material';
import { palette } from '@/theme/constants';
import * as NextRouter from 'next/router';
const mockStore = configureStore([]);

const TestComponent = ({ notifications }: any) => {
  const [openNotification, setOpenNotification] = React.useState(false);

  const setShowNotification = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenNotification((openNotification) => !openNotification);
  };
  const handleCloseNotifications = () => {
    setOpenNotification(false);
  };
  return (
    <>
      <MuiIconButton
        icon='/icons/notification'
        altIcon='notification'
        background={palette?.primary}
        method={(event: any) => setShowNotification(event)}
      />
      <ClickAwayListener onClickAway={handleCloseNotifications} disableReactTree={true}>
        <Box position={'relative'}>
          <NotificationsPreview
            isOpen={openNotification}
            handleClose={handleCloseNotifications}
            listItem={notifications}
          />
        </Box>
      </ClickAwayListener>
    </>
  );
};

const TestComponentEmptyComponent = () => {
  const [openNotification, setOpenNotification] = React.useState(false);
  const notifications: any = [];

  const setShowNotification = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenNotification((openNotification) => !openNotification);
  };
  const handleCloseNotifications = () => {
    setOpenNotification(false);
  };
  return (
    <Box>
      <MuiIconButton
        icon='/icons/notification'
        altIcon='notification'
        background={palette?.primary}
        method={(event: any) => setShowNotification(event)}
      />
      <ClickAwayListener onClickAway={handleCloseNotifications} disableReactTree={true}>
        <Box position={'relative'}>
          <NotificationsPreview
            isOpen={openNotification}
            handleClose={handleCloseNotifications}
            listItem={notifications}
          />
        </Box>
      </ClickAwayListener>
    </Box>
  );
};
describe('NotificationPreview component', () => {
  const test = [
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
  ];

  beforeEach(() => {
    const pushStub = cy.stub().as('routerPush');
    cy.stub(NextRouter, 'useRouter').returns({
      pathname: '/app/home',
      push: pushStub,
      startsWith: '/app/home/',
    });
  });
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
      otherNotifications: [],
    },
  });
  it('Render NotificationPreview ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent notifications={test} />
      </AppContainer>,
    );
    cy.get('img').click();
  });
  it('NotificationPreview click buttons ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent notifications={test} />
      </AppContainer>,
    );
    cy.get('img').click();
    cy.get('.css-69i1ev > .MuiButtonBase-root').click({ multiple: true });
  });
  it('NotificationPreview show empty  ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponentEmptyComponent />
      </AppContainer>,
    );
    cy.get('img').click();
  });
  it('NotificationPreview show  mobile ', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <TestComponent notifications={test} />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
  });
});
