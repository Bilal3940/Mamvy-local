import React, {useState} from "react";
// import Stepper from "./Stepper";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Link,
  } from '@mui/material';
import { theme } from "@/theme";
import { MuiIconButton, MuiTextField } from '@/components';

import { UseFirstRender } from '@/hooks';
import {
  actualStory,
  deleteNotification,
  loginApple,
  loginFacebook,
  loginGoogle,
  loginUser,
  loginUserView,
  setStep,
} from '@/store/actions';
import {  setGuest } from '@/store/collaborator/action';
import { authSelector, collaboratorSelector, intermitenceSelector } from '@/store/selectors';

import { face_client_id, google_client_id } from '@/utils';
import {  Divider, Grid, Theme,  useMediaQuery } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'next-i18next';


import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import AppleLogin from 'react-apple-login';
import { useDispatch, useSelector } from 'react-redux';

import { FormikConfig } from './formik';


declare let AppleID: any;

  interface PopupModalProps {
    open: boolean;
    onClose: () => void;
  }

  const LoginForm: React.FC<PopupModalProps> = ({ open, onClose }) => {

    
    const [showSignup , setShowSignup]=useState(false);
    

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    function OpenSignup (){
  setShowSignup(true);
    }

    
    class ExternalScriptError extends Error {
      constructor(src: string) {
        super(`Error loading script: ${src}`);
        this.name = 'ExternalScriptError';
      }
    }  
      const { t } = useTranslation();
      const router = useRouter();
      const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
      const authData = useSelector(authSelector);
      const { loading } = useSelector(intermitenceSelector);
      const clientId = google_client_id;
      const dispatch = useDispatch();
      const [appleReady, setAppleReady] = useState(false);
      const collaborator = useSelector(collaboratorSelector);
      const decodeBase64 = (encodedString: any) => {
        return Buffer.from(encodedString, 'base64').toString('utf-8');
      };
      const [decodedUrl, setDecodedUrl] = useState({
        story: decodeBase64(
          Array.isArray(router?.query?.story_id) ? router.query?.story_id[0] : router.query?.story_id || '',
        ),
        email: decodeBase64(Array.isArray(router?.query?.guest) ? router.query?.guest[0] : router.query?.guest || ''),
        role: decodeBase64(Array.isArray(router?.query?.role) ? router.query?.role[0] : router?.query?.role || ''),
        notification: decodeBase64(
          Array.isArray(router?.query?.notification) ? router.query?.notification[0] : router.query?.notification || '',
        ),
        type: decodeBase64(Array.isArray(router?.query?.type) ? router.query?.type[0] : router.query?.type || ''),
      });
    
      const handleSubmit = (data: any) => {
        data.email = data.email.toLowerCase();
        dispatch(loginUser(data));
      };
    
      const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });
    
      const [showPassword, setShowPassword] = useState(false);
    
      const handleShowPassword = () => setShowPassword((show) => !show);
    
      const {
        values,
        handleSubmit: formikSubmit,
        handleChange,
        errors,
        touched,
        setTouched,
        dirty,
        isValid,
      } = FormikConfig(handleSubmit);
    
      const changeInputStatus = (value: string, error: any) => {
        if (value !== '') {
          if (error) return 'error';
          return 'inherit';
        }
        return 'inherit';
      };
    
      const initGoogleLogin = useGoogleLogin({
        scope: 'email',
        onSuccess: (tokenResponse: any) => {
          if (router?.asPath?.includes('invitation')) {
            dispatch(loginGoogle({ ...tokenResponse, invitation: router?.query?.invitation }));
          } else {
            dispatch(loginGoogle(tokenResponse));
          }
        },
    
        onError: (error: any) => {
          console.log('Login Failed', error);
        },
      });
    
      // useEffect(() => {
      //   dispatch(setStep(1));
      //   if (authData?.isAuth) {
      //     if (router.asPath?.includes('guest')) {
      //       if (decodedUrl?.email == authData?.user?.email) {
      //         dispatch(inviteAccepted({ story_id: decodedUrl?.story, role_name: decodedUrl?.role }));
      //         // dispatch(actualStory(decodedUrl.story));
      //         // dispatch(setGuest(decodedUrl?.role));
      //         // if (decodedUrl?.notification.length > 0) dispatch(deleteNotification(decodedUrl?.notification));
      //         // if (decodedUrl?.role === 'Story_Viewer') {
      //         //   router.push(`/app/story/${decodedUrl?.story}`);
      //         // } else {
      //         //   router.push(`/app/story/${decodedUrl?.story}/memory/create`);
      //         // }
      //       } else {
      //         router.push('/app/home');
      //       }
      //     } else {
      //       router.push('/app/home');
      //     }
      //   }
      // }, [authData?.isAuth]);
    
      useEffect(() => {
        if (authData?.isAuth && collaborator.roleUser.length > 0) {
          if (collaborator.roleUser !== 'inactive') {
            dispatch(actualStory(decodedUrl.story));
            dispatch(setGuest(decodedUrl?.role));
            if (decodedUrl?.notification.length > 0 && collaborator.roleUser !== 'collaborating') dispatch(deleteNotification(decodedUrl?.notification));
            if (decodedUrl?.role === 'Story_Viewer') {
              router.push(`/app/story/${decodedUrl?.story}`);
            } else {
              router.push(`/app/story/${decodedUrl?.story}/memory/create`);
            }
          }
          if (authData?.isAuth && collaborator?.roleUser === 'inactive') {
            router.push('/app/home');
          }
        }
      }, [collaborator?.roleUser]);
    
      UseFirstRender(() => {
        if (!authData?.isAuth) {
          dispatch(loginUserView());
        }
      }, [authData?.isAuth]);
    
      useEffect(() => {
        const referralCode = router?.query?.referral_code;
        if (referralCode) {
          localStorage.setItem('referral_code', referralCode as string);
        }
      }, [router.query]);
    
    
      UseFirstRender(() => {
        // Google script Init
        const google = require('gapi-script');
        const start = () => {
          google.gapi?.client.init({
            clientId: clientId,
            scope: 'email',
            cookiepolicy: 'single_host_origin',
          });
        };
    
        google.gapi?.load('client', start);
    
        let winType: any = window;
        winType.fbAsyncInit = function () {
          winType.FB.init({
            appId: face_client_id,
            xfbml: true,
            version: 'v20.0',
          });
    
          winType.FB.AppEvents.logPageView();
        };
    
        (function (d, s, id) {
          var js: any,
            fjs: any = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs?.parentNode?.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      }, [])
    
      function loadScript(src: any, { scriptId = '', insertBeforeAllTags = false } = {}) {
        return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.id = scriptId;
          script.onload = resolve;
          script.onerror = (event: any) => {
            reject(new ExternalScriptError(event.target.src));
          };
          script.src = src;
    
          if (insertBeforeAllTags) {
            let firstScriptTagInDocument = document.getElementsByTagName('script')[0];
    
            firstScriptTagInDocument.parentNode &&
              firstScriptTagInDocument.parentNode.insertBefore(script, firstScriptTagInDocument);
          } else {
            document.body.appendChild(script);
          }
        });
      }
    
      const initializeAppleSDK = async () => {
        try {
          if (location) {
            let winType: any = window;
            await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js');
            setAppleReady(true);
            AppleID.auth.init({
              clientId: 'memvy-app-prod-service',
              scope: 'name email',
              redirectURI: winType?.location?.href,
              state: 'initialState',
              usePopup: true,
            });
          }
        } catch (error) {
          console.error('Error loading Apple SDK:', error);
        }
      };
    
      const appleResponse = (response: any) => {
    
        if (!response.error) {
          if (router?.asPath?.includes('invitation')) {
            dispatch(loginApple({ ...response, invitation: router?.query?.invitation, location: location }));
          } else {
            dispatch(loginApple({ ...response, location: location }));
          }
        }
      };
    
      const validateIsFaceLogged = () => {
        return new Promise((resolve) => {
          let winType: any = window;
          winType?.FB?.getLoginStatus(function (response: any) {
            console.log(response, 'facebook status');
    
            if (response?.status === 'connected') {
              if (router?.asPath?.includes('invitation')) {
                dispatch(loginFacebook({ ...response?.authResponse, invitation: router?.query?.invitation }));
              } else {
                dispatch(loginFacebook(response?.authResponse));
              }
              resolve(true);
            } else if (response?.status === 'unknown') {
              console.log('unkwoh error');
    
              resolve(false);
            } else {
              console.log('user is not logged in facebook ');
              resolve(false);
            }
          });
        });
      };
    
      const handleFaceLogin = async () => {
        let winType: any = window;
    
        const isLogged = await validateIsFaceLogged();
    
        if (!isLogged) {
          winType?.FB?.login((response: any) => {
            if (response?.authResponse) {
              if (router?.asPath?.includes('invitation')) {
                dispatch(loginFacebook({ ...response?.authResponse, invitation: router?.query?.invitation }));
              } else {
                dispatch(loginFacebook(response?.authResponse));
              }
              //this code return the user facebook primary data
              // winType.FB.api('/me', function (response: any) {
              //   console.log('Good to see you, ' + response.name + '.');
              // });
            } else {
              console.log('User cancelled login or did not fully authorize.');
            }
          });
        }
        return null;
      };
    
    
      const [location, setLocation] = useState('');
    
    
      UseFirstRender(() => {
        if (typeof window !== 'undefined') {
          let winType: any = window;
          setLocation(winType?.location?.href);
        }
      }, [])
    
    
      UseFirstRender(() => {
        if(location) {
          initializeAppleSDK();
        }
      }, [location])
    


    return(

<Card
  sx={{
    padding: '2px',
    paddingTop:"4px",
    bgcolor: 'rgba(102, 102, 102, 1)',
    boxShadow: 'none',
    height:"auto",
    [theme.breakpoints.down('sm')]:{
     padding:'0px'
    }
  }}>
  <CardContent 
    sx={{
      padding: { xs: 0, sm: '16px' },  '&:last-child': {
        paddingBottom: 0, 
      },
    }}
  >
   <h2 style={{fontFamily:"inter", color:"white", marginBottom:"3px"}}>Log In</h2>
    {/* Email Input */}
    <form onSubmit={formikSubmit}>
    <MuiTextField
     id='email'
     name='email'
     fullWidth
     onBlur={() => {
       handleOnTouched('email');
     }}
     status={changeInputStatus(values.email, errors.email && touched.email)}
     onChange={handleChange}
     value={values.email}
     autoComplete='email'
     placeholder={t('email')}
    //  label={t('email')}
     isDarkTheme
     errorMessage={errors.email}
     FormHelperTextProps={{
      sx: {
        fontSize: '16px', // Increase font size
        color: 'orange', // Change error message color
        marginTop: '2.2px',
        fontWeight:"bold"
      },
    }}
  sx={{
    paddingTop: '2px',
    marginTop: '5px',
    height:"50px",
    border:"1px solid white",
    color:"white",
    backgroundColor: 'black',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', // Remove border
        color:"white"
      },
      '& input': {
        color: 'white', // Change the text and password dots color to white
      },

    },
    

    '& .MuiOutlinedInput-root.Mui-focused': {
      '& fieldset': {
        border: 'none', // Ensure no border on focus
      },
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px black inset', // Match the background color
      WebkitTextFillColor: 'white', // Match the text color
      transition: 'background-color 5000s ease-in-out 0s', // Prevent autofill background reset
    },
  }}
/>

    {/* Password Input */}
    <MuiTextField
             id='password'
             name='password'
             fullWidth
             onBlur={() => {
               handleOnTouched('password');
             }}
             onChange={handleChange}
             value={values.password}
             autoComplete='current-password'
             placeholder={t('password')}
            //  label={'password'}
             isDarkTheme
             iconMethod={handleShowPassword}
             iconHeight={18}
             iconWidth={18}
             type={!showPassword ? 'password' : 'text'}
             endIcon={showPassword ? '/icons/eye-white.svg' : '/icons/eye-out-white.svg'}
             errorMessage={errors.password}
             status={changeInputStatus(values.password, errors.password && touched.password)}
             FormHelperTextProps={{
              sx: {
                fontSize: '16px', // Increase font size
                color: 'orange', // Change error message color
                marginTop: '2.2px',
                fontWeight:"bold"
              },
            }}
      sx={{
        paddingTop: '2px',
        height: '50px',
        marginTop: '17px',
        paddingBottom:"2px",
        backgroundColor: 'black',
        border: '1px solid white',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove border
          },
          '& input': {
            color: 'white', // Set the text color to white
          },
        },
       
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& fieldset': {
            border: 'none', // Ensure no border on focus
          },
        },
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px black inset', // Match the background color
          WebkitTextFillColor: 'white', // Match the text color
          transition: 'background-color 5000s ease-in-out 0s', // Prevent autofill background reset
        },
      }}

    />


<Box sx={{ display: 'flex', justifyContent: 'center', color: 'black', cursor:"pointer" }}>
    {/* <button>Sign Up</button> */}
    <Button
      type='submit' disabled={!isValid || !dirty || loading}  
      fullWidth
       
      sx={{
        marginTop: '17px',
        mb: 1,
        color:"black !important",
        border:"1px solid black",
        height: '50px', 
        backgroundColor: 'white !important',
        '&:hover': {
          backgroundColor: '#BA0C2F', 
          
        },
        borderRadius: '8px', 
        padding: '25px', 
        textTransform:"none",
      }}> Continue
    </Button>
    </Box>

    </form>
    <Typography style={{ display: 'flex', justifyContent: 'center', color: 'rgba(238, 238, 238, 1)', marginTop:"5px"}}>
    <Link style={{color:"#BA0C2F", cursor:"pointer" , fontWeight:"bold", textDecoration:"none"}}> {""}Forgot Password?</Link>
    </Typography>
    <Typography style={{ display: 'flex', justifyContent: 'center', color: 'rgba(238, 238, 238, 1)', marginTop:"5px",fontWeight:"bold"}}>
     or
    </Typography>


    <div
  style={{
    display: 'flex',
    gap: '10px', // Adds spacing between the buttons
    marginTop: '10px', // Adjust spacing above the buttons
  }}
>
  <Button
    fullWidth
    onClick={() => initGoogleLogin()}
    endIcon={<img src='/icons/devicon_google.svg' />}
    sx={{
      color: 'white',
      height: '48px',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      border:"1px solid black",
      backgroundColor: 'rgba(34, 34, 34, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(34, 34, 34, 1)',
      },
      borderRadius: '8px',
      padding: '0 15px',
      lineHeight:"1.15"
    }}
  >
    Continue with
  </Button>


<Box
  sx={{
    display: 'flex', // Flexbox for the container
    alignItems: 'center', // Center content vertically
    justifyContent: 'space-between', // Space between text and icon
    color: 'white',
    height: '48px',
    border: '1px solid black',
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(34, 34, 34, 1)',
      color:"#0072ce"
    },
    borderRadius: '8px',
    padding: '0 5px',
  }}
>
  {/* Text Container */}
  <Box
    sx={{
      display: 'flex',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      flexDirection: 'column', // Stack "Continue" and "with" vertically
      alignItems: 'flex-start', // Align text to the left
      justifyContent: 'center',
      cursor:"pointer",
     paddingRight:"8px",
     paddingLeft:"12px"
    }}
  >
    <span style={{ fontSize: '15px' }}>Continue</span>
    <span style={{ fontSize: '15px', paddingLeft:"10px" }}>with</span>
  </Box>

  {/* Icon */}
  <AppleLogin
    clientId="memvy-app-prod-service"
    redirectURI={location}
    usePopup={!!appleReady}
    callback={appleResponse}
    scope="name email"
    responseMode="form_post"
    state="SignInUserAuthenticationRequest"
    render={(renderProps) => (
      <MuiIconButton
        icon={'/images/apple'}
        altIcon="apple"
        background="transparent"
        iconHeight={24}
        iconWidth={24}
        method={renderProps.onClick}
        
      />
    )}
  />
</Box>


  <Button
    fullWidth
    endIcon={<img src='/icons/Vector.svg' />}
    onClick={handleFaceLogin}
    sx={{
      color: 'white',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      height: '48px',
      border:"1px solid black",
      backgroundColor: 'rgba(34, 34, 34, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(34, 34, 34, 1)',
      },
      borderRadius: '10px',
      padding: '0 15px',
      lineHeight:"1.15"
    }}
  >
    Continue with
  </Button>
</div>
    <Box mt={1.2} sx={{ display: 'flex', color: 'rgba(238, 238, 238, 1)', marginTop: {xs: '6px', sm:"35px"}, fontWeight:"bold"}}>
    <Typography style={{fontWeight:"bold"}}>
        New to Memvy?
    </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
    {/* <button>Sign Up</button> */}
    <Button
      onClick={onClose}
      fullWidth
      sx={{
        marginTop: '15px',
        mb: 1,
        color:"white",
      
        height: '60px', 
        background: '#BA0C2F',
        
        '&:hover': {
          backgroundColor: 'rgba(34, 34, 34, 1)', 
        },
        borderRadius: '8px', 
        padding: '25px', 
        textTransform:"none",
      }}> Create Your Account
    </Button>
    </Box>
  </CardContent>
</Card>
    )
};
export default LoginForm;