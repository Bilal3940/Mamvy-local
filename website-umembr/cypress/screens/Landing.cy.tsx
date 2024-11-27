import React from 'react';
import { mount } from '@cypress/react18';
import { Landing } from '@/screens';

describe('Landing Screen', () => {
  it('Landing Register', () => {
    mount(<Landing />);
    cy.stub(require('next/router'), 'useRouter');
    cy.get('ul > :nth-child(1) > a > .MuiTypography-root').click();
    cy.get('ul > :nth-child(2) > a > .MuiTypography-root').click();
    cy.get('header > [href="#"] > img').click();
  });
});
