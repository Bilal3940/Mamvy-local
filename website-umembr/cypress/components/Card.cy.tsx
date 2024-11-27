import React from 'react';
import { mount } from '@cypress/react18';
import Image from 'next/image';
import { Box } from '@mui/material';
import { Card } from '@/components';
import { palette } from '@/theme/constants';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';

describe('Render Card ', () => {
  const memoryTypes = [
    { text: 'text', value: 0, url: 'hyper-text', extraText: 'add_text' },
    { text: 'video', value: 1, url: 'video', extraText: 'add_video' },
    { text: 'image', value: 2, url: 'image', extraText: 'add_image' },
    { text: 'audio', value: 3, url: 'audio', extraText: 'add_audio' },
  ];

  const TestCardComponent = () => {
    const [actualMemory, setActualMemory] = React.useState(0);

    return (
      <ThemeProvider theme={theme}>
        <Box display={'flex'} marginTop={'1rem'} justifyContent={'space-between'}>
          {memoryTypes?.map((item: any, index: number) => {
            return (
              <Card
                key={`${item.text} + ${index}`}
                backgroundImageColor={actualMemory == index ? palette.gallery : palette.iron}
                text={item?.text}
                isSelected={actualMemory == index}
                method={() => console.log('card')}
                extraText={item?.extraText}>
                <Image src={`/icons/${item.url}.svg`} alt={item.text} width={90} height={90} quality={80} />
              </Card>
            );
          })}
        </Box>
      </ThemeProvider>
    );
  };
  it('render card', () => {
    mount(<TestCardComponent />);
  });
  it('render card mobile', () => {
    cy.viewport(414, 896);
    mount(<TestCardComponent />);
  });
  it('on click card', () => {
    mount(<TestCardComponent />);
    cy.get(':nth-child(2) > .css-13jxw3v').click();
  });
});