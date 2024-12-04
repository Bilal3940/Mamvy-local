import { openPublishModal, setCreateMemoryStep, showActualSection } from '@/store/actions';
import type { currentStorySelector } from '@/store/selectors';
import { checkPermissions } from '@/utils';
import { Box, Fab } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
interface MemoryFloatingActionButtonsProps {
  user?: any;
  story: ReturnType<typeof currentStorySelector>;
  isMobile?: boolean;
  extendedPalette?: any;
}
const MemoryFloatingActionButtons: FC<MemoryFloatingActionButtonsProps> = (props) => {
  const { user, story, isMobile,extendedPalette} = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goToCreateMemory = () => {
    dispatch(setCreateMemoryStep(1));
    dispatch(showActualSection('create_new_memory'));
  };

  return (
    <Box position={'fixed'} right={'0'} bottom={'-0.9rem'} zIndex={2} flexDirection={'column'}>
      {(checkPermissions(user?.roles || [], 'CLIENT_COLLABORATOR_ADD', story?.id) || user?.id === story?.user_id) && (
        <Box margin={'0.75rem 0'}>
          <Fab
            size={isMobile ? 'medium' : 'large'}
            onClick={() => dispatch(openPublishModal())}
            // color={''}
            // sx={{
            //   right: { xs: '0.75rem', lg: '1.5rem' },
            //   bottom: { xs: '0.5rem', lg: '1.0rem' },
            // }}>
            sx={{
              backgroundColor: extendedPalette.buttonbackgroundIcon, // Custom color
              color: extendedPalette.buttonbackgroundIcon, // Icon or text color
              '&:hover': {
                backgroundColor: extendedPalette.buttonbackgroundIcon, // Hover color
              },
              right: { xs: '0.75rem', lg: '1.5rem' },
              bottom: { xs: '0.5rem', lg: '1.0rem' },
            }}>
            <Image
              src={`/icons/add-people.svg`}
              width={isMobile ? 20 : 26}
              height={isMobile ? 20 : 26}
              quality={80}
              alt={t('collaborators')}
            />
          </Fab>
        </Box>
      )}
      {(checkPermissions(user?.roles || [], 'CLIENT_MEMORY_CREATE', story?.id) || user?.id === story?.user_id) && (
        <Box margin={'0.75rem 0'}>
          <Fab
            size={isMobile ? 'medium' : 'large'}
            component={Link}
            onClick={goToCreateMemory}
            href={`/app/story/${story?.url}/memory/create`}
            // color={'secondary'}
            sx={{
              backgroundColor: extendedPalette.buttonbackgroundIcon, // Custom color
              color:extendedPalette.buttonbackgroundIcon , // Icon or text color
              '&:hover': {
                backgroundColor: extendedPalette.buttonbackgroundIcon, // Hover color
              },
              right: { xs: '0.75rem', lg: '1.5rem' },
              bottom: { xs: '0.5rem', lg: '1.0rem' },
            }}>
            <Image
              src={`/icons/add.svg`}
              width={isMobile ? 20 : 26}
              height={isMobile ? 20 : 26}
              quality={80}
              alt={t('add')}
            />
          </Fab>
        </Box>
      )}
    </Box>
  );
};

export default memo(MemoryFloatingActionButtons);
