import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { t } = useTranslation();

  return (
    <motion.header
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '16px',
        width: '100%',
        borderBottom: '1px solid rgba(228, 222, 255, 0.2)',
        zIndex: 10,
        position: 'sticky',
        top: 0,
        WebkitBackdropFilter: 'blur(25px)',
        backdropFilter: 'blur(25px)',
      }}>
      <Link
        href='#'
        onClick={() => document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Image src={`/images/logo-primary-white.svg`} alt={'logo'} width={180} height={34.5} quality={100} />
      </Link>
      <Box component='nav' sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <li>
            <Link href='#about'>
              <Typography>About</Typography>
            </Link>
          </li>
          <li>
            <Link href='#faq'>
              <Typography>FAQ</Typography>
            </Link>
          </li>
        </ul>
      </Box>
      <Box>
        <Button component={Link} href={'/app/login'} variant={'contained'} sx={{ borderRadius: '19px' }}>
          <Typography variant='button'>{t('login')}</Typography>
        </Button>
      </Box>
    </motion.header>
  );
};

export default Header;
