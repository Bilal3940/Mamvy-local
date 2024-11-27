

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



{/* Hammad Code*/ }


// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, useMediaQuery, Theme } from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import {
//   registerUser,
//   inviteAccepted,
//   actualStory,
//   setGuest,
//   registerUserView,
// } from "@/store/actions";
// import { authSelector, collaboratorSelector } from "@/store/selectors";
// import { UseFirstRender } from "@/hooks";

// // Decoding utility function
// const decodeBase64 = (encodedString: string) =>
//   Buffer.from(encodedString, "base64").toString("utf-8");

// const validationSchema = Yup.object({
//   name: Yup.string().required("Full name is required"),
//   lastname: Yup.string().required("Last name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const CreateAccount: React.FC = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
//   const authData = useSelector(authSelector);
//   const collaborator = useSelector(collaboratorSelector);

//   const [decodedUrl, setDecodedUrl] = useState({
//     story: decodeBase64(
//       Array.isArray(router?.query?.story_id)
//         ? router?.query?.story_id[0]
//         : router?.query?.story_id || ""
//     ),
//     email: decodeBase64(
//       Array.isArray(router?.query?.guest)
//         ? router?.query?.guest[0]
//         : router?.query?.guest || ""
//     ),
//     role: decodeBase64(
//       Array.isArray(router?.query?.role)
//         ? router?.query?.role[0]
//         : router?.query?.role || ""
//     ),
//   });

//   useEffect(() => {
//     if (authData?.isAuth && collaborator.roleUser.length > 0) {
//       if (collaborator.roleUser !== "inactive") {
//         dispatch(actualStory(decodedUrl.story));
//         dispatch(setGuest(decodedUrl.role));
//         if (decodedUrl.role === "Story_Viewer") {
//           router.push(`/app/story/${decodedUrl.story}`);
//         } else {
//           router.push(`/app/story/${decodedUrl.story}/memory/create`);
//         }
//       }
//     }
//   }, [collaborator.roleUser]);

//   UseFirstRender(() => {
//     dispatch(registerUserView());
//   }, [dispatch]);

//   const handleSubmit = async (data: {
//     name: string;
//     lastname: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     phonenumber: string; // Add phonenumber here
//   }) => {
//     const { confirmPassword, ...formValues } = data;
  
//     // Ensure name is created by combining name and lastname
//     const formattedData = {
//       ...formValues,
//       name: `${formValues.name} ${formValues.lastname}`, // Combine name and lastname
//       phonenumber: "123456789", // Placeholder phone number
//     };
  
//     if (router.asPath.includes("invitation")) {
//       dispatch(
//         registerUser({
//           ...formattedData,
//           invitation: router.query.invitation,
//         })
//       );
//     } else {
//       dispatch(registerUser(formattedData));
//     }
//   };

//   return (
//     <Card
//       sx={{
//         padding: "16px",
//         bgcolor: "rgba(102, 102, 102, 1)",
//         boxShadow: "none",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h5" color="white" mb={2}>
//           Create Your Account
//         </Typography>
//         <Formik
//           initialValues={{
//             name: "",
//             lastname: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             phonenumber: "123456789", // Placeholder phone number
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               {/* Full Name Field */}
//               <Field
//                 as="input"
//                 name="name"
//                 placeholder="Full Name"
//                 className="form-field"
//               />
//               <ErrorMessage name="name" component="div" className="error-message" />

//               {/* Last Name Field */}
//               <Field
//                 as="input"
//                 name="lastname"
//                 placeholder="Last Name"
//                 className="form-field"
//               />
//               <ErrorMessage name="lastname" component="div" className="error-message" />

//               {/* Email Field */}
//               <Field
//                 as="input"
//                 name="email"
//                 placeholder="Email Address"
//                 className="form-field"
//               />
//               <ErrorMessage name="email" component="div" className="error-message" />

//               {/* Password Field */}
//               <Field
//                 as="input"
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 className="form-field"
//               />
//               <ErrorMessage name="password" component="div" className="error-message" />

//               {/* Confirm Password Field */}
//               <Field
//                 as="input"
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="form-field"
//               />
//               <ErrorMessage name="confirmPassword" component="div" className="error-message" />

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="form-submit"
//                 disabled={isSubmitting}
//               >
//                 Create Account
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </CardContent>
//     </Card>
//   );
// };

// export default CreateAccount;



import {
   
  TextField,
  Button,

} from '@mui/material';
// import LoginForm from "./LoginForm";
import { theme } from "@/theme";




interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, useMediaQuery, Theme } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  registerUser,
  inviteAccepted,
  actualStory,
  setGuest,
  registerUserView,
} from "@/store/actions";
import { authSelector, collaboratorSelector } from "@/store/selectors";
import { UseFirstRender } from "@/hooks";

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
const dispatch = useDispatch();
const router = useRouter();
const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
const authData = useSelector(authSelector);
const collaborator = useSelector(collaboratorSelector);


const [showPassword, setShowPassword] = useState(false);

const handleClickShowPassword = () => {
  setShowPassword(!showPassword);
};

const [decodedUrl, setDecodedUrl] = useState({
  story: decodeBase64(
    Array.isArray(router?.query?.story_id)
      ? router?.query?.story_id[0]
      : router?.query?.story_id || ""
  ),
  email: decodeBase64(
    Array.isArray(router?.query?.guest)
      ? router?.query?.guest[0]
      : router?.query?.guest || ""
  ),
  role: decodeBase64(
    Array.isArray(router?.query?.role)
      ? router?.query?.role[0]
      : router?.query?.role || ""
  ),
});

useEffect(() => {
  if (authData?.isAuth && collaborator.roleUser.length > 0) {
    if (collaborator.roleUser !== "inactive") {
      dispatch(actualStory(decodedUrl.story));
      dispatch(setGuest(decodedUrl.role));
      if (decodedUrl.role === "Story_Viewer") {
        router.push(`/app/story/${decodedUrl.story}`);
      } else {
        router.push(`/app/story/${decodedUrl.story}/memory/create`);
      }
    }
  }
}, [collaborator.roleUser]);

UseFirstRender(() => {
  dispatch(registerUserView());
}, [dispatch]);

const handleSubmit = async (data: {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phonenumber: string; // Add phonenumber here
}) => {
  const { confirmPassword, ...formValues } = data;

  // Ensure name is created by combining name and lastname
  const formattedData = {
    ...formValues,
    name: `${formValues.name} ${formValues.lastname}`, // Combine name and lastname
    phonenumber: "123456789", // Placeholder phone number
  };

  if (router.asPath.includes("invitation")) {
    dispatch(
      registerUser({
        ...formattedData,
        invitation: router.query.invitation,
      })
    );
  } else {
    dispatch(registerUser(formattedData));
  }
};



return (
  <Formik
    initialValues={{
      name: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      phonenumber:''
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ values, handleChange, errors, touched }) => (
      <Card
        sx={{
          padding: '12px',
          bgcolor: 'rgba(102, 102, 102, 1)',
          boxShadow: 'none',
          height: '55vh',
          [theme.breakpoints.down('sm')]: {
            padding: 0,
            height: '46vh',
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
          <Form>
            {/* First Name and Last Name */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <Field
                as={TextField}
                label="First Name"
                variant="outlined"
                margin="normal"
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: values.name ? true : false }}
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
              <Field
                as={TextField}
                label="Last Name"
                variant="outlined"
                margin="normal"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: values.lastname ? true : false }}
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
                    top: values.lastname ? '1px' : '50%',
                    transform: values.lastname ? 'translateY(0)' : 'translateY(-50%)',
                    fontSize: values.lastname ? '12px' : '16px',
                  },
                }}
              />
            </div>

            {/* Email Input */}
            <Field
              as={TextField}
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: values.email ? true : false }}
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
                  top: values.email ? '1px' : '50%',
                  transform: values.email ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: values.email ? '12px' : '16px',
                },
              }}
            />

            {/* Password Input */}
            <Field
              as={TextField}
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: values.password ? true : false }}
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
                  top: values.password ? '1px' : '50%',
                  transform: values.password ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: values.password ? '12px' : '16px',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: 'black', // Icon color
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Input */}
            <Field
              as={TextField}
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: values.confirmPassword ? true : false }}
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
                  top: values.confirmPassword ? '1px' : '50%',
                  transform: values.confirmPassword ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: values.confirmPassword ? '12px' : '16px',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: 'black', // Icon color
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                marginTop: '12px',
                mb: 1,
                color: 'white',
                height: '70px',
                backgroundColor: '#BA0C2F',
                '&:hover': {
                  backgroundColor: 'rgba(34, 34, 34, 1)',
                },
                borderRadius: '10px',
                padding: '25px',
              }}
            >
              Create Account
            </Button>
          </Form>

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
    )}
  </Formik>
);
};
export default CreateAccount;