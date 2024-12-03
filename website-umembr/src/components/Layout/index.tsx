// import Box from '@mui/material/Box';
// import { MuiAppBar, Drawer } from '@/components';
// import { Theme, useMediaQuery } from '@mui/material';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setSeparation } from '@/store/actions';

// export const Layout = ({ children }: any) => {
//   const router = useRouter();
//   const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
//   const dispatch = useDispatch();
//   const dispatchSeparation = () => {
//     if (!isMobile && router?.pathname == '/app/story/[id]') return dispatch(setSeparation('0rem'));
//     if ((router.pathname == '/app/home' || router?.asPath?.includes('story/')) && !isMobile)
//       return dispatch(setSeparation('7.875rem'));
//     if (router?.asPath?.includes('story/') && isMobile) return dispatch(setSeparation('3.875rem'));
//     if (router.pathname.includes('story/create')) return dispatch(setSeparation('3.875rem'));
//     if (router.pathname?.includes('memory/create')) return dispatch(setSeparation('5.875rem'));
//     dispatch(setSeparation('5.375rem'));
//   };

//   useEffect(() => {
//     dispatchSeparation();
//   }, [router.pathname, isMobile]);

//   return (
//     <>
//       <MuiAppBar />
//       <Box display={'flex'} id='component-main' position={'relative'}>
//         <Drawer />
//         <Box

//           component='main'
//           height={isMobile ? 'auto' : `100%`}
//           width={'100%'}
//           minHeight={isMobile ? 'auto' : `100%`}
//           overflow={'visible'}
//           >
            
//           {children}
//         </Box>
//       </Box>
//     </>
//   );
// };

import Box from '@mui/material/Box';
import { MuiAppBar, Drawer } from '@/components';
import { Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSeparation } from '@/store/actions';

interface LayoutProps {
  children: React.ReactNode;
  color?: string;  // Add a color prop
}

export const Layout = ({ children}: LayoutProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();

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
  }, [router.pathname, isMobile]);



  return (
    <>
      <MuiAppBar  />
      <Box display={'flex'} id="component-main" position={'relative'}>
        <Drawer />
        <Box
          component="main"
          sx={{
            // Apply the color to background dynamically
            height: isMobile ? 'auto' : '100%',
            width: '100%',
            minHeight: isMobile ? 'auto' : '100vh',
            overflow: 'visible',
            position: 'relative',  // Ensure child elements are positioned relative to this container
          }}
        >
          {/* Main content */}
          {children}
        </Box>
      </Box>
    </>
  );
};
