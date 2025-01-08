import {
  openModal,
  openPublishModal,
  openSubscriptionPopup,
  refreshUserData,
  setCreateMemoryStep,
  showActualSection,
} from '@/store/actions';
import type { currentStorySelector } from '@/store/selectors';
import { checkPermissions, checkRoleAndPermission } from '@/utils';
import { Box, Fab } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const { user, story, isMobile, extendedPalette } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const goToCreateMemory = () => {
    dispatch(refreshUserData());

    if (story?.user_id === user?.id) {
      if (
        !checkRoleAndPermission(story?.user?.roles, 'Subscriber_Individual', 'CLIENT_MEMORY_UPDATE', story?.user_id)
      ) {
        localStorage.setItem('router_history', `/app/story/${story?.url}`)
        setTimeout(() => {
          dispatch(openSubscriptionPopup());
        }, 2000);
        return;
      }
    } else {
      const isCollaborator = story?.roleUsers?.some(
        (roleUser: any) => roleUser?.user_id === user?.id && roleUser?.role_id !== 4,
      );

      if (!isCollaborator) {
        dispatch(openModal({ content: 'You do not have permission to create memories for this story.' }));
        return;
      }

      const isOwnerSubscriber = checkRoleAndPermission(
        story?.user?.roles,
        'Subscriber_Individual',
        'CLIENT_MEMORY_UPDATE',
        story?.user_id,
      );

      if (!isOwnerSubscriber) {
        dispatch(openModal({ content: 'The owner of this story is not a subscriber.' }));
        return;
      }
    }
    router.push(`/app/story/${story?.url}/memory/create`);
    dispatch(setCreateMemoryStep(1));
    dispatch(showActualSection('create_new_memory'));
  };

  return (
    <Box
      position={'fixed'}
      right={router?.pathname == '/app/story/[id]' && !isMobile ? 50 : 0}
      bottom={'-0.9rem'}
      zIndex={10001}
      flexDirection={'column'}>
      {!story?.isLocked &&
        (checkPermissions(user?.roles || [], 'CLIENT_COLLABORATOR_ADD', story?.id) || user?.id === story?.user_id) && (
          <Box margin={'0.75rem 0'}>
            <Fab
              size={isMobile ? 'medium' : 'large'}
              onClick={() => dispatch(openPublishModal())}
              sx={{
                backgroundColor: extendedPalette.buttonbackgroundIcon,
                color: extendedPalette.buttonbackgroundIcon,
                '&:hover': {
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
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
      {!story?.isLocked &&
        (checkPermissions(user?.roles || [], 'CLIENT_MEMORY_CREATE', story?.id) || user?.id === story?.user_id) && (
          <Box margin={'0.75rem 0'}>
            <Fab
              size={isMobile ? 'medium' : 'large'}
              component={'button'}
              onClick={goToCreateMemory}
              sx={{
                backgroundColor: extendedPalette.buttonbackgroundIcon,
                color: extendedPalette.buttonbackgroundIcon,
                '&:hover': {
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
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
