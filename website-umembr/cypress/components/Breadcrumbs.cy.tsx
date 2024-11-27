import React from 'react';
import { mount } from '@cypress/react18';
import { MuiBreadcrumbs } from '@/components';

describe('Render Mui Button ', () => {
  it('render button', () => {
    mount(<MuiBreadcrumbs route={'section'} />);
  });
});
