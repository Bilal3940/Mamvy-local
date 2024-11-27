import { palette } from '@/theme/constants';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { ReactNode } from 'react';

interface ICardProps {
  text: string;

  method: () => void;
  backgroundImageColor: string;
  isSelected: boolean;
  extraText?: string;
  children?: ReactNode;
  enterHoverMethod?: () => void;
  leaveHoverMethod?: () => void;
}

export const Card = ({ text, method, backgroundImageColor, isSelected, extraText, children }: ICardProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Button type='button' sx={styles.button} onClick={method}>
      <Box
        borderRadius={'0.375rem'}
        padding={'0 0 0.625rem 0'}
        display={'flex'}
        sx={styles.card}
        flexDirection={'column'}
        bgcolor={extraText && isSelected ? palette.primary : palette.lightCardBackground}
        border={`0.25rem solid ${isSelected ? palette.primary : palette.lightCardBackground}`}
        justifyContent={'center'}
        width={'100%'}
        height={isMobile? '14rem': '18rem'}
        alignItems={'center'}>
        <Box
          bgcolor={backgroundImageColor}
          borderRadius={'0.375rem'}
          width={'100%'}
          maxWidth={'100%'}
          height={isMobile ? '10.438rem' : '15.5rem'}
          maxHeight={isMobile ? '10.438rem' : '15.5rem'}
          position={'relative'}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}>
          {children}
        </Box>
        <Typography
          fontSize={isMobile ? '0.75rem' : '1.125rem'}
          marginTop={'0.5rem'}
          textAlign={'center'}
          color={extraText && isSelected ? palette.white : palette.primary}
          fontWeight={'600'}>
          {t(text)}
        </Typography>
        {extraText && isSelected && (
          <Typography
            marginTop={'0.5rem'}
            textAlign={'center'}
            variant='body2'
            color={extraText && isSelected ? palette.white : palette.primary}>
            {t(extraText)}
          </Typography>
        )}
      </Box>
    </Button>
  );
};
