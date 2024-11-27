import React from 'react';
import { mount } from '@cypress/react18';
import { MuiButton } from '@/components';

import { Typography } from '@mui/material';

describe('Render Mui Button ', () => {
  it('render button', () => {
    mount(
      <MuiButton type='submit' disabled={false} loading={false} variant={'contained'}>
        <Typography variant='button'>CONTINUE</Typography>
      </MuiButton>,
    );
  });
});
