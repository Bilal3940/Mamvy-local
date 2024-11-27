import React from 'react';
import { mount } from '@cypress/react18';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { RichText } from '@/components';

describe('Render RichText ', () => {
  it('render RichText', () => {
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
  });
  it('call actions undo and fordward', () => {
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
    cy.get('[role="textbox"]').type('this is a test');
    cy.get(':nth-child(1) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(2) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
  });
  it('call actions font styles', () => {
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
    cy.get('[role="textbox"]').type('this is a test');
    cy.get(':nth-child(4) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(5) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(6) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(7) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
  });
  it('call actions text align', () => {
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
    cy.get('[role="textbox"]').type('this is a test');
    cy.get(':nth-child(9) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(10) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(11) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(12) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
  });
  it('call actions list styles', () => {
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
    cy.get('[role="textbox"]').type('this is a test');
    cy.get(':nth-child(14) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(15) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
  });
  it('call actions fontsize', () => {
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
    cy.get('[role="textbox"]').type('this is a test');
    cy.get('.css-79elbk > .MuiButtonBase-root').click();
    cy.get(':nth-child(5) > .MuiTypography-root').click();
  });
  it('render RichText mobile', () => {
    cy.viewport(414, 896);
    mount(
      <ThemeProvider theme={theme}>
        <RichText
          name='complementaryText'
          placeholder='type_here'
          onChange={(_event: any, value: any) => console.log('complementaryText', value)}
        />
      </ThemeProvider>,
    );
  });
});
