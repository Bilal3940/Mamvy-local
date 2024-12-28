import { UseFirstRender, UseIntermitence } from '@/hooks';
import {
  actualStory,
  changeBackground,
  closePublishModal,
  deleteStory,
  hideGradient,
  removeMemory,
  setCode,
  setMediaType,
  showActualSection,
  viewStoryG,
} from '@/store/actions';
import { authSelector, currentStorySelector, intermitenceSelector } from '@/store/selectors';
import { ExtractCallbackType, promisifiedCallback } from '@/utils';
import { Box, BoxProps, Theme, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMemoryModal, DeleteStoryModal, MemoryDetail } from './components';
import { AddCollaborators } from './components/AddCollaborators';
import type { FloatingMemoriesHandle, FloatingMemoriesProps } from './components/FloatingMemories';
import MemoryFloatingActionButtons from './components/MemoryFloatingActionButtons';
import MemoryHeader from './components/MemoryHeader';
import MemoryMainCard from './components/MemoryMainCard';
import { PrivateStoryModal } from './components/PrivateStoryModal';

interface IWrappedFloatingMemories extends FloatingMemoriesProps {
  forwardedRef: Ref<FloatingMemoriesHandle>;
}
const FloatingMemories = dynamic(
  async () => {
    const { default: FloatingMemoriesComponent } = await import('./components/FloatingMemories');
    const LoadedComponent = ({ forwardedRef, ...props }: IWrappedFloatingMemories) => (
      <FloatingMemoriesComponent {...props} ref={forwardedRef} />
    );
    return LoadedComponent;
  },
  { ssr: false },
);

export const Memories = () => {
  const [selectedMemorie, setSelectedMemorie] = useState<any>(null);
  const { status, switchStatus } = UseIntermitence();
  const {switchStatus: switchStory } = UseIntermitence();
  const { status: deleteStatusMemory, switchStatus: switchDeleteMemory } = UseIntermitence();
  const { status: deleteStatusStory, switchStatus: switchDeleteStory } = UseIntermitence();
  const { status: privateStatus, switchStatus: switchPublication } = UseIntermitence();
  const { user, isAuth } = useSelector(authSelector);
  const dispatch = useDispatch();
  const story = useSelector(currentStorySelector);
  const { showPublishModal } = useSelector(intermitenceSelector);
  const [viewStory, setViewStory] = useState(false);

  const router = useRouter();
  const [tryCode, setTryCode] = useState(true);
  const [foundRole, setFoundRole] = useState(false);

  const floatingMemoriesRef = useRef<FloatingMemoriesHandle>(null);

  UseFirstRender(() => {
    if (router.query?.id && !router.query.code) {
      dispatch(
        actualStory({
          id: router.query?.id as string,
          router,
          confirmPassword: story?.url === router.query?.id ? story?.confirmPassword : undefined,
        }),
      );
    }
  }, [router.query?.id, story?.confirmPassword]);

  UseFirstRender(() => {
    if (router.query?.id && router.query.code) {
      dispatch(setCode({ password: router?.query?.code, storyId: router.query.id }));
    }
  }, [router.query?.code]);

  UseFirstRender(() => {
    if (story && (!story?.private || story?.confirmPassword || foundRole)) {
      const DraftSpan = () => {
        return <span style={{ color: 'white', fontWeight: 'normal' }}>· Draft</span>
      }
      const PublishedSpan = () => {
        return <span style={{ color: 'white', fontWeight: 'normal' }}>· Published</span>
      }
      dispatch(setMediaType(''));
      dispatch(showActualSection({ title: story?.title, publish: story?.status === 'draft' ? DraftSpan : story?.status == 'published' ? PublishedSpan : '' }));
    }
  }, [story, foundRole]);

  useEffect(() => {
    if (story?.url === router.query?.id)
      router.push(
        router?.query?.memoryId
          ? `/app/story/${story?.url}?memoryId=${router?.query?.memoryId}`
          : `/app/story/${story?.url}`,
      );
  }, [router.query?.id, story?.url]);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const deleteMemory = async () => {
    setSelectedMemorie(null);
    switchDeleteMemory();
    router.push(`/app/story/${story?.url}`);
    const { callback, promise } = promisifiedCallback<ExtractCallbackType<typeof removeMemory>>();
    dispatch(removeMemory({ id: selectedMemorie?.id, story_id: story?.id }, callback));
    const { ok } = await promise;
    if (ok && floatingMemoriesRef.current) {
      floatingMemoriesRef.current.removeBubble(selectedMemorie?.id);
    }
  };

  const deleteStoryAction = () => {
    switchDeleteStory();
    dispatch(deleteStory(story?.id));
    router.push(`/app/home`);
  };

  UseFirstRender(() => {
    if (router?.query?.memoryId && floatingMemoriesRef.current) {
      const memory = floatingMemoriesRef.current
        .getMemories()
        .find((memory) => Number(memory?.id) === Number(router?.query?.memoryId));
      setSelectedMemorie(memory);
      switchStatus();
    }
  }, [router?.query]);

  const closeMemory = () => {
    setSelectedMemorie(null);
    router.push(`/app/story/${story?.url}`);
    switchStatus();
  };

  UseFirstRender(() => {
    if (user && isAuth) {
      const validRoles = ['Story_Collaborator', 'Story_Viewer', 'Story_Owner'];
      const hasRole = user?.roles?.find(
        (role: any) => role.story_id === story?.id && validRoles.includes(role.role.name) && role?.validated,
      );
      const userCreate = user?.id === story?.user_id;
      const foundRole = hasRole || userCreate ? true : false;
      setFoundRole(foundRole);
    }
  }, [user, story, isAuth]);

  useEffect(() => {
    if (story?.id && !viewStory) {
      dispatch(viewStoryG(story));
      setViewStory(true);
    }
  }, [dispatch, story, viewStory]);

  UseFirstRender(() => {
    const validRoles = ['Story_Collaborator', 'Story_Viewer', 'Story_Owner'];
    const hasRole = user?.roles?.find(
      (role: any) => role.story_id === story?.id && role?.validated && validRoles.includes(role.role.name),
    );
    const userCreate = user?.id === story?.user_id;
    const foundRole = hasRole || userCreate ? true : false;
    if (story?.private && tryCode && !story?.newCode && !foundRole) {
      switchPublication();
      setTryCode(false);
    }
  }, [story?.private]);

  const handlePublication = () => {
    if (story?.private && !tryCode && !story?.confirmPassword) {
      switchPublication();
      router.push(`/app/home`);
    }
    if (story?.private && !tryCode && story?.confirmPassword && !story?.newCode) {
      switchPublication();
    }
  };

  const boxRef = useRef<HTMLElement | null>(null);

  const [mobileHeight, setMobileHeight] = useState('35vh');

  useEffect(() => {
    const resize = () => {
      if ((boxRef?.current?.scrollTop || 0) > 100) {
        setMobileHeight((prev: any) => {
          return `${(boxRef?.current?.scrollTop || 0) > 500 ? 0 : Math.round(35 / ((boxRef?.current?.scrollTop || 0) / 100))
            }vh`;
        });
        return;
      }
      setMobileHeight('35vh');
    };
    if (boxRef.current) {
      boxRef.current?.addEventListener('scroll', resize);
    }
    dispatch(changeBackground(true));

    return () => {
      if (boxRef.current) {
        boxRef.current?.removeEventListener('scroll', resize);
      }
    };
  }, [story]);

  const closeCollaboratorsModal = () => {
    dispatch(closePublishModal());
  };
  useEffect(() => {
    if (Number(mobileHeight.replace('vh', '')) <= 10) dispatch(hideGradient(true));
    if (Number(mobileHeight.replace('vh', '')) > 10) dispatch(hideGradient(false));
  }, [mobileHeight]);

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback<Required<BoxProps>['onWheel']>((e) => {
    if (boxRef.current) {
      boxRef.current.scrollTo({ top: boxRef.current.scrollTop + e.deltaY, behavior: 'instant' });
    }
  }, []);

  return (
    <>
      <Box
        ref={boxRef}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'flex-start'}
        width={'100vw'}
        minWidth={'100%'}
        flexDirection={'row'}
        height={isMobile ? 'calc(100vh - 3.875rem)' : '100vh'}
        minHeight={
          isMobile
            ? `calc(calc(100vh - ${Number(mobileHeight.replace('vh', '')) <= 10
              ? '0px'
              : `${Number(mobileHeight.replace('vh', '')) - 7.5}vh`
            }) - 3.875rem)`
            : 'calc(100vh - 7.875rem)'
        }
        marginTop={
          isMobile
            ? Number(mobileHeight.replace('vh', '')) <= 10
              ? '0px'
              : `${Number(mobileHeight.replace('vh', '')) - 7.5}vh`
            : 0
        }
        overflow={'auto'}>
        {isMobile && (
          <MemoryHeader
            ref={ref}
            height={mobileHeight}
            isMobile={isMobile}
            story={story}
            switchStory={switchStory}
            onScroll={handleScroll}
          />
        )}
        {!isMobile && story?.title && (
          <MemoryMainCard
            ref={ref}
            isMobile={isMobile}
            story={story}
            switchStory={switchStory}
            onScroll={handleScroll}
          />
        )}
        <FloatingMemories
          story={story}
          user={user}
          confirmPassword={story?.confirmPassword}
          forwardedRef={floatingMemoriesRef}
        />
        <MemoryFloatingActionButtons story={story} isMobile={isMobile} user={user} /> 
      </Box>
      {!foundRole && !story?.confirmPassword && story?.private && story.url === router.query?.id && (
        <PrivateStoryModal open={privateStatus} onClose={handlePublication} /*confirmMethod={publicate}*/ />
      )}

      <AddCollaborators
        add={showPublishModal}
        onClose={() => closeCollaboratorsModal()}
        mediaContent={selectedMemorie}
        method={() => closeCollaboratorsModal()}
      />

      {/* <StoryDetail
        open={Boolean(storyStatus && story)}
        onClose={switchStory}
        mediaContent={story}
        method={switchDeleteStory}
      /> */}
      <MemoryDetail
        open={Boolean(status && selectedMemorie)}
        onClose={closeMemory}
        mediaContent={selectedMemorie}
        method={switchDeleteMemory}
      />
      <DeleteMemoryModal open={deleteStatusMemory} onClose={switchDeleteMemory} confirmMethod={deleteMemory} />
      <DeleteStoryModal open={deleteStatusStory} onClose={switchDeleteStory} confirmMethod={deleteStoryAction} />
    </>
  );
};
