

  // useEffect(() => {
  //   if (authData?.isAuth) {
  //     if (router.asPath.includes("guest")) {
  //       dispatch(inviteAccepted({ story_id: decodedUrl.story, role_name: decodedUrl.role }));
  //       if (decodedUrl.role === "Story_Viewer") {
  //         router.push(`/app/story/${decodedUrl.story}`);
  //       } else {
  //         router.push(`/app/story/${decodedUrl.story}/memory/create`);
  //       }
  //     } else {
  //       router.push("/app/home");
  //     }
  //     const storedReferralCode = localStorage.getItem("referral_code");
  //     if (storedReferralCode) {
  //       localStorage.removeItem("referral_code");
  //     }
  //   }
  // }, [authData?.isAuth]);






import {
   
  Button,

} from '@mui/material';
// import LoginForm from "./LoginForm";
import { theme } from "@/theme";

import { MuiTextField } from '@/components';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { actualStory,  registerUser, registerUserView, setGuest } from '@/store/actions';
import { authSelector, collaboratorSelector, intermitenceSelector } from '@/store/selectors';

import { Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikConfig } from './formik';




interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

import { Card, CardContent } from "@mui/material";
import * as Yup from "yup";


// Decoding utility function
const decodeBase64 = (encodedString: string) =>
  Buffer.from(encodedString, "base64").toString("utf-8");

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const CreateAccount: React.FC<PopupModalProps> = ({open , onClose}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { status: showPassword, switchStatus: switchShowPassword } = UseIntermitence();
  const { status: showConfirmPassword, switchStatus: switchShowConfirmPassword } = UseIntermitence();
  const authData = useSelector(authSelector);
  const collaborator = useSelector(collaboratorSelector);
  const decodeBase64 = (encodedString: any) => {
    return Buffer.from(encodedString, 'base64').toString('utf-8');
  };
  const [decodedUrl, setDecodedUrl] = useState({
    story: decodeBase64(
      Array.isArray(router?.query?.story_id) ? router?.query?.story_id[0] : router?.query?.story_id || '',
    ),
    email: decodeBase64(Array.isArray(router?.query?.guest) ? router?.query?.guest[0] : router?.query?.guest || ''),
    role: decodeBase64(Array.isArray(router?.query?.role) ? router?.query?.role[0] : router?.query?.role || ''),
    notification: decodeBase64(
      Array.isArray(router?.query?.notification) ? router.query?.notification[0] : router.query?.notification || '',
    ),
    type: decodeBase64(Array.isArray(router?.query?.type) ? router?.query?.type[0] : router.query?.type || ''),
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(intermitenceSelector);

  

  useEffect(() => {
    if(authData?.isAuth &&collaborator.roleUser.length > 0){
        if(collaborator.roleUser !== 'inactive'){
        dispatch(actualStory(decodedUrl.story));
        dispatch(setGuest(decodedUrl?.role));
        if (decodedUrl?.role === 'Story_Viewer') {
          router.push(`/app/story/${decodedUrl?.story}`);
        } else {
          router.push(`/app/story/${decodedUrl?.story}/memory/create`);
        }
        }
      if(authData?.isAuth && collaborator?.roleUser === 'inactive'){
        router.push('/app/home');
      }
    }
  }, [collaborator?.roleUser]);

  UseFirstRender(() => {
    dispatch(registerUserView());
  }, [dispatch]);

  const handleSubmit = (data: any) => {
    data.email = data.email.toLowerCase();
    const { confirm_password, ...formValues } = data;
    if (router?.asPath?.includes('invitation')) {
      dispatch(registerUser({ ...formValues, invitation: router?.query?.invitation }));
    } else {
      dispatch(registerUser(formValues));
    }
  };

  const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });

  const {
    values,
    handleSubmit: formikSubmit,
    handleChange,
    errors,
    touched,
    setTouched,
    dirty,
    isValid,
    setFieldValue,
  } = FormikConfig(handleSubmit);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  const handlePhone = (value: string) => {
    setFieldValue('phonenumber', value);
  };

  useEffect(() => {
    const storedReferralCode = localStorage.getItem('referral_code');
    if (storedReferralCode) {
      setFieldValue('referralCode', storedReferralCode);
    }
  }, [setFieldValue]);




return (
 
      <Card
        sx={{
          padding: '12px',
          bgcolor: 'rgba(102, 102, 102, 1)',
          boxShadow: 'none',
          height: '58vh',
          [theme.breakpoints.down('sm')]: {
            padding: 0,
            height: '54vh',
          },
        }}
      >
        <CardContent
          sx={{
            padding: { xs: 0, sm: '16px' },
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <form onSubmit={formikSubmit}>
            {/* First Name and Last Name */}
            
          
                <MuiTextField
                id='name'
                name='name'
                fullWidth
                required
                onBlur={() => {
                  handleOnTouched('name');
                }}
                status={changeInputStatus(values.name, errors.name && touched.name)}
                onChange={handleChange}
                value={values.name}
                autoComplete='given-name'
                placeholder={'name'}
                // label={'name'}
                isDarkTheme
                errorMessage={errors.name}
                FormHelperTextProps={{
                  sx: {
                    fontSize: '16px', // Increase font size
                    color: 'orange', // Change error message color
                    marginTop: '6px',
                    fontWeight:"bold"
                  },
                }}
                sx={{
                  paddingTop: '2px',
                  marginTop: '5px',
                  backgroundColor: 'white',
                  height: '50px',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    left: '14px',
                    transition: 'all 0.2s ease-in-out',
                    top: values.name ? '1px' : '50%',
                    transform: values.name ? 'translateY(0)' : 'translateY(-50%)',
                    fontSize: values.name ? '12px' : '16px',
                  },
                }}
              />
           <MuiTextField
                id='lastname'
                name='lastname'
                fullWidth
                required
                onBlur={() => {
                  handleOnTouched('lastname');
                }}
                status={changeInputStatus(values.lastname, errors.lastname && touched.lastname)}
                onChange={handleChange}
                value={values.lastname}
                autoComplete='family-name'
                placeholder={'lastname'}
                //label={'lastname'}
                isDarkTheme
                errorMessage={errors.lastname}
                FormHelperTextProps={{
                  sx: {
                    fontSize: '16px', // Increase font size
                    color: 'orange', // Change error message color
                    marginTop: '6px',
                    fontWeight:"bold"
                  },
                }}
                sx={{
                  paddingTop: '2px',
                  marginTop: '20px',
                  backgroundColor: 'white',
                  height: '50px',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    left: '14px',
                    transition: 'all 0.2s ease-in-out',
                    top: values.lastname ? '1px' : '50%',
                    transform: values.lastname ? 'translateY(0)' : 'translateY(-50%)',
                    fontSize: values.lastname ? '12px' : '16px',
                  },
                }}
              />
            

            {/* Email Input */}
            <MuiTextField
                id='email'
                name='email'
                fullWidth
                required
                onBlur={() => {
                  handleOnTouched('email');
                }}
                status={changeInputStatus(values.email, errors.email && touched.email)}
                onChange={handleChange}
                value={values.email}
                autoComplete='email'
                placeholder={'email'}
               // label={'email'}
                isDarkTheme
                errorMessage={errors.email}
                FormHelperTextProps={{
                  sx: {
                    fontSize: '16px', // Increase font size
                    color: 'orange', // Change error message color
                    marginTop: '6px',
                    fontWeight:"bold"
                  },
                }}
              sx={{
                paddingTop: '2px',
                marginTop: '20px',
                backgroundColor: 'white',
                height: '50px',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  left: '14px',
                  transition: 'all 0.2s ease-in-out',
                  top: values.email ? '1px' : '50%',
                  transform: values.email ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: values.email ? '12px' : '16px',
                },
              }}
            />

            {/* Password Input */}
               <MuiTextField
                id='password'
                name='password'
                required
                fullWidth
                onBlur={() => {
                  handleOnTouched('password');
                }}
                onChange={handleChange}
                value={values.password}
                autoComplete='new-password'
                placeholder={'password'}
               // label={'password'}
                isDarkTheme
                iconMethod={switchShowPassword}
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
                    marginTop: '6px',
                    fontWeight:"bold"
                  },
                }}

              sx={{
                paddingTop: '2px',
                marginTop: '20px',
                backgroundColor: 'white',
                height: '50px',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  left: '14px',
                  transition: 'all 0.2s ease-in-out',
                  top: values.password ? '1px' : '50%',
                  transform: values.password ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: values.password ? '12px' : '16px',
                },
              }}
            />

            {/* Confirm Password Input */}
        
                 <MuiTextField
                id='confirm_password'
                name='confirm_password'
                required
                fullWidth
                onBlur={() => {
                  handleOnTouched('confirm_password');
                }}
                onChange={handleChange}
                value={values.confirm_password}
                autoComplete='new-password'
                placeholder={'confirm_password'}
              //  label={'confirm_password'}
                isDarkTheme
                iconMethod={switchShowConfirmPassword}
                iconHeight={18}
                iconWidth={18}
                type={!showConfirmPassword ? 'password' : 'text'}
                endIcon={showConfirmPassword ? '/icons/eye-white.svg' : '/icons/eye-out-white.svg'}
                errorMessage={errors.confirm_password}
                status={changeInputStatus(values.confirm_password, errors.confirm_password && touched.confirm_password)}
                FormHelperTextProps={{
                  sx: {
                    fontSize: '16px', // Increase font size
                    color: 'orange', // Change error message color
                    marginTop: '6px',
                    fontWeight:"bold"
                  },
                }}
              sx={{
                paddingTop: '2px',
                marginTop: '20px',
                backgroundColor: 'white',
                height: '50px',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  left: '14px',
                  transition: 'all 0.2s ease-in-out',
                  top: values.confirmPassword ? '1px' : '50%',
                  transform: values.confirmPassword ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: values.confirmPassword ? '12px' : '16px',
                },
              }}
            
            />

            {/* Submit Button */}
            <Button
             type='submit' disabled={!isValid || !dirty || loading} 
              fullWidth
              sx={{
                marginTop: '20px',
                mb: 1,
                color: 'white !important',
                height: '20px',
                backgroundColor: '#BA0C2F !important',
                '&:hover': {
                  backgroundColor: 'rgba(34, 34, 34, 1)',
                },
                borderRadius: '10px',
                padding: '25px',
              }}
            >
              Create Account
            </Button>
          </form>

          <Typography
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'rgba(238, 238, 238, 1)',
              marginTop: '1px',
              fontWeight: 'bold',
            }}
          >
            Already have an Account?{' '}
            <a onClick={onClose} style={{ color: '#BA0C2F', cursor: 'pointer' }}>
              Log In
            </a>
          </Typography>
        </CardContent>
      </Card>
   
 
);
};
export default CreateAccount;