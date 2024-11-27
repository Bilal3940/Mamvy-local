import { palette } from '@/theme/constants';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { styles } from './styles';

interface IBreadcrumbsProps {
  route: any;
}

export const MuiBreadcrumbs = ({ route }: IBreadcrumbsProps) => {
  const { t } = useTranslation();
  const title = typeof route === 'string' ? route : route?.title;
  const State = typeof route === 'string' ? '' : route?.publish;
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
        <Typography sx={styles.title} color={palette.primary} fontSize={'1.25rem'} fontWeight={'700'}>
          {t(title)}
        </Typography>{' '}
        <Typography align='center' variant={'caption'}>
          &nbsp;
        </Typography>
        <span
          style={{ color: palette.primary, fontWeight: '700', fontSize: '1.25rem' }}
        >{typeof State === 'string' ? State : <State />}</span>
      </Box>
    </Breadcrumbs>
  );
};
