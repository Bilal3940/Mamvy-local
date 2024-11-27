import React from 'react';
import { mount } from '@cypress/react18';
import { CancelModal } from '@/screens/EditStory/components';

describe('Render CancelModal ', () => {
  it('render Modal', () => {
    mount(<CancelModal open={true} onClose={() => {}} confirmRoute={''} />);
  });
  it('hide Modal', () => {
    mount(<CancelModal open={false} onClose={() => {}} confirmRoute={''} />);
  });
});
