import { Stack, Typography } from '@mui/material';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Stack
      component='footer'
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent={{ md: 'space-between' }}
      alignItems='center'
      style={{
        display: 'flex',
        padding: '32px 48px',
      }}>
      <Stack spacing={{ xs: 2, md: 4 }} direction={{ xs: 'column', md: 'row' }}>
        <Link href='#' onClick={scrollToTop} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Image src={`/images/logo-primary-white.svg`} alt={'logo'} width={120} height={23} quality={100} />
        </Link>
        <Stack spacing={{ xs: 2, md: 4 }} direction='row'>
          <Link href='https://x.com/memvyofficial' target='_blank'>
            <Image src={`/icons/twitter.svg`} width={24} height={24} quality={80} alt={t('x')} />
          </Link>
          <Link href='https://instagram.com/memvyofficial/' target='_blank'>
            <Image src={`/icons/instagram.svg`} width={24} height={24} quality={80} alt={t('instagram')} />
          </Link>
          <Link href='https://facebook.com/people/Memvyofficial/61560847231115/' target='_blank'>
            <Image src={`/icons/facebook.svg`} width={24} height={24} quality={80} alt={t('facebook')} />
          </Link>
        </Stack>
      </Stack>
      <Stack spacing={{ xs: 2, md: 4 }} direction={{ xs: 'column', md: 'row' }}>
        <Typography variant='caption' align='center' sx={{ color: '#B3BED4' }}>
          © 2024 Falcon 9324 LLC. All rights reserved. Patents Pending.
        </Typography>
        <Link href='/terms' style={{ textAlign: 'center' }}>
          <Typography variant='caption' sx={{ color: '#B3BED4' }}>
            Terms and Conditions
          </Typography>
        </Link>
        <Link href='/privacy' style={{ textAlign: 'center' }}>
          <Typography variant='caption' sx={{ color: '#B3BED4' }}>
            Privacy Policy
          </Typography>
        </Link>
        <Link href='mailto:contact@falcon9324.com' style={{ textAlign: 'center' }}>
          <Typography variant='caption' sx={{ color: '#B3BED4' }}>
            Contact
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Footer;
