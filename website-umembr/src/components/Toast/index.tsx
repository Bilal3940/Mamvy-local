import { Snackbar, Slide, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { intermitenceSelector, templatesSelector } from '@/store/selectors';
import { useTranslation } from 'next-i18next';
import { palette } from '@/theme/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Toast = () => {
  const { toast } = useSelector(intermitenceSelector);
 const router = useRouter();
  const { t } = useTranslation();
    const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '', // Default value
    textColor: '', // Default value
    accentColor: '', // Default value
  });

  const { template } = useSelector(templatesSelector);

  useEffect(() => {
    if (template?.template?.colors) {
      const colors = template.template.colors.reduce((acc:any, color:any) => {
        // Map each color to the corresponding palette key
        switch (color.PLabel) {
          case 'storyBackground':
            acc.storyBackgroundColor = color.PValue;
            break;
          case 'TextColor':
            acc.textColor = color.PValue;
            break;
          case 'AccentColor':
            acc.accentColor = color.PValue;
            break;
          default:
            break;
        }
        return acc;
      }, {});

      // Set the colors to the adminPalette state
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333', // Fallback if color is missing
        textColor: colors.textColor || '#fff', // Fallback
        accentColor: colors.accentColor || '#BF5700', // Fallback
      });
    }
  }, [template]);

  const accentColor = adminPalette.accentColor;
 const buttonBackground =
    router.pathname === '/app/story/[id]' // Replace '/specific-page' with your desired route
      ? accentColor // Custom background for the specific page
      : palette?.primary;
  return (
    <Slide direction='left' in={toast.show} timeout={{ enter: 600, exit: 600 }} data-cy='toast'>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          marginTop: '0.3rem',
          width: '100% !important',
          right: '0 !important',
          left: '0 !important',
        }}>
        <Box
          display={'flex'}
          bgcolor={toast?.type == 'success' ? buttonBackground : palette?.error}
          padding={'0.5rem'}
          borderRadius={'0.5rem'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Typography margin={'0 0.5rem'} variant='subtitle1'>
            {t(toast?.message)}
          </Typography>
        </Box>
      </Snackbar>
    </Slide>
  );
};
