import React from 'react';
import { mount } from '@cypress/react18';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { MuiStepper } from '@/components/Stepper/index';

describe('Render Stepper ', () => {
  const steps = [
    { label: 'type_story', value: 0 },
    { label: 'general_info', value: 1 },
    { label: 'prompt', value: 2 },
    { label: 'create', value: 3 },
  ];

  it('render Stepper', () => {
    mount(
      <ThemeProvider theme={theme}>
        <MuiStepper steps={steps} actualStep={1} />
      </ThemeProvider>,
    );
  });
  it('render Stepper mobile', () => {
    cy.viewport(414, 896);

    mount(
      <ThemeProvider theme={theme}>
        <MuiStepper steps={steps} actualStep={1} />{' '}
      </ThemeProvider>,
    );
  });
});
