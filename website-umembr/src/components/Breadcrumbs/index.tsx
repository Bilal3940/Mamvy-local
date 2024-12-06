import { palette } from '@/theme/constants';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { authSelector, currentStorySelector, templatesSelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { styles } from './styles';

interface IBreadcrumbsProps {
  route: any;
}

export const MuiBreadcrumbs = ({ route }: IBreadcrumbsProps) => {
  const { t } = useTranslation();
  const title = typeof route === 'string' ? route : route?.title;
  const State = typeof route === 'string' ? '' : route?.publish;
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '#333333', 
    textColor: '#fff', 
    accentColor: '#fff', 
  });
  const { user } = useSelector(authSelector);
  const story = useSelector(currentStorySelector);
  const { template } = useSelector(templatesSelector);

  useEffect(() => {
    if (template?.template?.colors) {
      const colors = template.template.colors.reduce((acc: any, color: any) => {
        
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

      
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333', 
        textColor: colors.textColor || '#fff', 
        accentColor: colors.accentColor || '#fff', 
      });
    }
  }, [template]); 

  const accentColor = adminPalette.accentColor;

  return (
    <Breadcrumbs aria-label='breadcrumb' sx={styles.separator}>
      <Link
        underline={'hover'}
        color={palette.white}
        href={'/app/home'}
        component={NextLink}
        onClick={() => window.scrollTo(0, 0)}
        fontSize={'1.25rem'}>
        {t('home')}
      </Link>
      <Box display={'flex'} alignItems={'center'}>
        <Typography
          sx={styles.title}
          color={accentColor} 
          fontSize={'1.25rem'}
          fontWeight={'700'}>
          {t(title)}
        </Typography>
        <Typography align='center' variant={'caption'}>
          &nbsp;
        </Typography>

        {user.id === story?.user_id && (
          <span style={{ color: palette.primary, fontWeight: '700', fontSize: '1.25rem' }}>
            {typeof State === 'string' ? State : <State />}
          </span>
        )}
      </Box>
    </Breadcrumbs>
  );
};
