// cypress/integration/textFieldComponent.spec.js
import React from 'react';
import { mount } from '@cypress/react18';
import { InputPhone } from '@/components';

describe('Input Phone component', () => {
  it('render Input Phone', () => {
    mount(<InputPhone value='3432' error={false} onChange={null} />);
  });
  it('render Input Phone dark mode', () => {
    mount(<InputPhone value='' isDarkTheme={false} onChange={null} />);
  });
  it('render Input Phone error', () => {
    mount(<InputPhone value='' error={true} errorMessage='error' isDarkTheme={true} onChange={null} />);
  });
});
