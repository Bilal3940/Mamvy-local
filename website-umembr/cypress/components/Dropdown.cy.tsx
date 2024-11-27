import React from 'react';
import { mount } from '@cypress/react18';
import { MuiDropdown } from '@/components';
import { Box } from '@mui/material';

describe('Dropdown component', () => {
  const settingsOptions: any = [
    {
      label: 'settings',
      action: () => console.log('settings'),
    },
    {
      label: 'logout',
      action: () => console.log('logout'),
    },
  ];

  it('Render Dropdown', () => {
    const TestComponent = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <Box onClick={() => setOpen((open) => !open)} bgcolor={'red'} width={'4rem'} height={'4rem'}>
          <MuiDropdown isOpen={open} handleClose={() => setOpen((open) => !open)} listItem={settingsOptions} />
        </Box>
      );
    };

    mount(<TestComponent />);
    cy.get('body').invoke('css', 'background-color', '#FFFFFF');
    cy.get('.MuiBox-root').click();
    cy.get('.MuiList-root').should('be.visible');
    cy.get('.MuiList-root > [tabindex="-1"]').click();
  });
});
