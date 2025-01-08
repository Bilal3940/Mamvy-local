import Box from '@mui/material/Box';
import { MuiAppBar, Drawer } from '@/components';
import { Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription, deleteUser, getStorageLogs, setSeparation } from '@/store/actions';
import { ConfirmationModal } from '../ConfirmationModal';
import { authSelector, storagelogSelector } from '@/store/selectors';
import { SubscriptionCancelModal } from '../SubscriptionCancelModal';
import { ErrorPopup } from '../ErrorPopup';
import { SubscriptionPopup } from '@/screens/SubscriptionPopup.tsx';

interface LayoutProps {
  children: React.ReactNode;
  color?: string; 
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { user } = useSelector(authSelector);
  const {storageLog, actionSuccess} = useSelector(storagelogSelector)
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const dispatchSeparation = () => {
    if (!isMobile && router?.pathname == '/app/story/[id]') return dispatch(setSeparation('0rem'));
    if ((router.pathname == '/app/home' || router?.asPath?.includes('story/')) && !isMobile)
      return dispatch(setSeparation('7.875rem'));
    if (router?.asPath?.includes('story/') && isMobile) return dispatch(setSeparation('3.875rem'));
    if (router.pathname.includes('story/create')) return dispatch(setSeparation('3.875rem'));
    if (router.pathname?.includes('memory/create')) return dispatch(setSeparation('5.875rem'));
    dispatch(setSeparation('5.375rem'));
  };

  useEffect(() => {
    dispatchSeparation();
    localStorage.setItem("popupshowed", `${false}`)
  }, [router.pathname, isMobile]);

  useEffect(()=>{
    if(user?.id){

    
      dispatch(getStorageLogs(user?.id))
    }
  },[user, actionSuccess])


  const handleDeleteAccount = async () => {
    dispatch(deleteUser(user?.id));
    setOpenModal(false);
  };

  const handleCancelSubscription = async ()=>{
    dispatch(cancelSubscription({ userId: user?.id }));
    setOpenSubscriptionModal(false)
  }
  return (
    <>
      <MuiAppBar />
      <Box display={'flex'} id='component-main' position={'relative'}>
        <Drawer setOpenModal={setOpenModal} setOpenSubscriptionModal={setOpenSubscriptionModal} />
        <Box
          component='main'
          sx={{
            
            height: isMobile ? 'auto' : '100%',
            width: '100%',

            minHeight: isMobile ? 'auto' : '100vh',
            overflow: 'visible',
            position: 'relative', 
          }}>
          {/* Main content */}
          {children}
          <ConfirmationModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={handleDeleteAccount}
            confirmationText={Math.random().toString(36).substr(2, 8)}
          />
          <SubscriptionCancelModal
            open={openSubscriptionModal}
            onClose={() => setOpenSubscriptionModal(false)}
            onConfirm={handleCancelSubscription}
            confirmationText={Math.random().toString(36).substr(2, 8)}
          />
          <ErrorPopup/>
          <SubscriptionPopup />
        </Box>
      </Box>
    </>
  );
};
