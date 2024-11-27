import React from 'react';
import { mount } from '@cypress/react18';
import { FilterDropdown, MuiIconButton } from '@/components';
import AppContainer from './AppContainer';
import configureStore from 'redux-mock-store';
import { Box, ClickAwayListener } from '@mui/material';
import { palette } from '@/theme/constants';

const mockStore = configureStore([]);

const TestComponent = () => {
  const [openFilters, setOpenFilters] = React.useState(false);
  const prompts = [
    {
      label: 'Share a Memory of how this person positively affected your life',
      id: '1',
    },
    {
      label: 'Share a Memory of a fun time with this person',
      id: '2',
    },
    {
      label: 'Share a Memory of working with this person',
      id: '3',
    },
    {
      label: 'Share a Memory of anything else that captures the essence of the life this person lived',
      id: '4',
    },
  ];

  const collaborators = [
    {
      friends: [
        { label: 'All', id: '1' },
        { label: 'User 10', id: '2' },
        { label: 'User 9', id: '3' },
        { label: 'User 8', id: '4' },
      ],
      family: [
        { label: 'All', id: '5' },
        { label: 'User 7', id: '6' },
        { label: 'User 6', id: '7' },
        { label: 'User 5', id: '8' },
      ],
      others: [
        { label: 'All', id: '9' },
        { label: 'User 4', id: '10' },
        { label: 'User 3', id: '11' },
        { label: 'User 2', id: '12' },
      ],
    },
  ];

  const setShowFilters = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenFilters((openFilters) => !openFilters);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };
  return (
    <Box height={'100vh'}>
      <MuiIconButton
        icon='/icons/filter'
        altIcon='filter'
        background={palette?.background}
        width={30}
        height={30}
        iconHeight={24}
        iconWidth={24}
        method={(event: any) => setShowFilters(event)}
      />
      <ClickAwayListener onClickAway={handleCloseFilters} disableReactTree={true}>
        <Box position={'relative'}>
          <FilterDropdown isOpen={openFilters} listItem={[prompts, collaborators]} />;
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

describe('FilterDropdown component', () => {
  const store: any = mockStore({
    home: {
      criterias: {
        search: '',
        prompts: ['1'],
        collaborators: ['2'],
      },
    },
    story: {
      id: 4,
      user_id: 3,
      title: 'test joker',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
      url: 'test-joker-1',
      private: false,
      password: 'public',
      cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
      story_details: {
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
      updated_at: '2024-06-10T20:12:08.846Z',
      status: 'published',
      invitationCode: [],
      roleUsers: [
        {
          role_id: 3,
          user_id: 6,
          created_at: '2024-06-04T11:46:08.766Z',
          updated_at: '2024-06-04T15:38:21.071Z',
          story_id: 4,
          id: 84,
          validated: true,
          user_type: null,
          user: {
            id: 6,
            name: 'Loïc ',
            lastname: 'Rafique',
            email: 'memvytest2@yopmail.com',
            password: '$2b$10$VqFN4Cb1artzCu.UhPsVvOoI0ncv40D3Yuq6zyD/vi3SpcetVcBcu',
            phonenumber: '1222223252',
            address_city: '',
            address_country: null,
            address_line_1: '',
            address_line_2: null,
            address_postal_code: null,
            address_state: 'ID',
            picture: null,
            description:
              'Test 🍓 ☀ 🌩 combien coûte une baguette bonjour combien coûtant une croissant une croissant une pizza bonjour merci combien coûte ',
            recover_code: '335319',
            created_at: '2024-05-16T15:52:37.915Z',
            updated_at: '2024-06-03T16:02:32.818Z',
            facebookAccessToken: null,
            googleAccessToken: null,
          },
        },
      ],
    },
    memory: {
      memoryTypes: [],
    },
  });
  it('Render FilterDropdown ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('img').click();
  });
  it('FilterDropdown open and close ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
    cy.get('.css-m8dnq0').click();
  });
  it('FilterDropdown select prompts ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
    cy.get(':nth-child(1) > .MuiMenuItem-root > .MuiBox-root > .MuiTypography-root').click();
    cy.get(':nth-child(4) > .MuiMenuItem-root > .MuiBox-root > .MuiTypography-root').click();
  });
  it('FilterDropdown select collaborators ', () => {
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
    cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();

    cy.get('.css-gznmbh > :nth-child(1) > .MuiMenuItem-root > .MuiBox-root').click();
    cy.get('.css-gznmbh > :nth-child(2) > .MuiMenuItem-root > .MuiBox-root').click();
    cy.get('.css-gznmbh > :nth-child(3) > .MuiMenuItem-root > .MuiBox-root').click();
  });

  //Is Mobile

  it('FilterDropdown render monbile ', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
  });

  it('FilterDropdown select prompts mobile ', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
    cy.get(':nth-child(1) > .MuiMenuItem-root > .MuiBox-root > .MuiTypography-root').click();
    cy.get(':nth-child(4) > .MuiMenuItem-root > .MuiBox-root > .MuiTypography-root').click();
  });
  it('FilterDropdown select collaborators mobile', () => {
    cy.viewport(414, 896);
    mount(
      <AppContainer store={store}>
        <TestComponent />
      </AppContainer>,
    );
    cy.get('.MuiButtonBase-root').click();
    cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();
    cy.get('.css-gznmbh > :nth-child(1) > .MuiMenuItem-root > .MuiBox-root').click();
    cy.get('.css-gznmbh > :nth-child(2) > .MuiMenuItem-root > .MuiBox-root').click();
    cy.get('.css-gznmbh > :nth-child(3) > .MuiMenuItem-root > .MuiBox-root').click();
  });
});
