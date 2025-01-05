import { Avatar, Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

import { palette } from '@/theme/constants';

interface ProfilePopupProps {
  onClick: () => void;
  user: any;
  showName?: boolean;
}

const ProfilePopup = ({ onClick, user, showName }: ProfilePopupProps) => {
  const isMobile = useMediaQuery((template: Theme) => template.breakpoints.down('lg'));
  return (
    <Button type={'button'} sx={{ padding: 0 }} onClick={onClick}>
      <Box
        borderRadius={'2.5rem'}
        display={'flex'}
        height={'2.375rem'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={'0.625rem'}
        padding={'0.375rem 1rem'}
        border={`0.063rem solid ${palette.cardBorder}`}
        bgcolor={palette.cardBackground}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}>
        <Image src={`/images/glyph-white.svg`} alt={'logo'} width={24} height={24} quality={80} />

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          {user.avatar ? (
            <Avatar sx={{ width: 24, height: 24 }} alt='avatar' src={user.avatar || `/icons/person-outlined.svg`} />
          ) : (
            <Image src={`/icons/person-outlined.svg`} alt={'avatar'} width={24} height={24} quality={80} />
          )}
          {showName && (
            <Typography variant={isMobile ? 'body2' :'h5'} marginLeft={'0.5rem'}>
              {`${user?.name || ''} ${user?.lastname || ''}`}
            </Typography>
          )}
        </Box>

        <Image src={`/icons/expand.svg`} alt={'logo'} width={20} height={20} quality={80} />
      </Box>
    </Button>
  );
};

export default ProfilePopup;
