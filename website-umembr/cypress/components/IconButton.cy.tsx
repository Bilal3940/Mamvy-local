// cypress/integration/textFieldComponent.spec.js
import React from 'react';
import { mount } from '@cypress/react18';
import { MuiIconButton } from '@/components';
import { palette } from '@/theme/constants';

describe('IconButton component', () => {
  it('render Iconbutton', () => {
    mount(
      <MuiIconButton
        icon='/icons/filter'
        altIcon='filter'
        width={40}
        height={40}
        background={palette?.gray}
        iconHeight={30}
        iconWidth={30}
        method={() => console.log('press')}
      />,
    );
  });
  it('render Iconbutton with default props', () => {
    mount(
      <MuiIconButton
        icon='/icons/filter'
        altIcon='filter'
        background={palette?.gray}
        method={() => console.log('press')}
      />,
    );
  });
});
