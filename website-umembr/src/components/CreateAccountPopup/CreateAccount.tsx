

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

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, useMediaQuery, Theme } from "@mui/material";
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

const CreateAccount: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const authData = useSelector(authSelector);
  const collaborator = useSelector(collaboratorSelector);

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
    <Card
      sx={{
        padding: "16px",
        bgcolor: "rgba(102, 102, 102, 1)",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Typography variant="h5" color="white" mb={2}>
          Create Your Account
        </Typography>
        <Formik
          initialValues={{
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            phonenumber: "123456789", // Placeholder phone number
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Full Name Field */}
              <Field
                as="input"
                name="name"
                placeholder="Full Name"
                className="form-field"
              />
              <ErrorMessage name="name" component="div" className="error-message" />

              {/* Last Name Field */}
              <Field
                as="input"
                name="lastname"
                placeholder="Last Name"
                className="form-field"
              />
              <ErrorMessage name="lastname" component="div" className="error-message" />

              {/* Email Field */}
              <Field
                as="input"
                name="email"
                placeholder="Email Address"
                className="form-field"
              />
              <ErrorMessage name="email" component="div" className="error-message" />

              {/* Password Field */}
              <Field
                as="input"
                name="password"
                type="password"
                placeholder="Password"
                className="form-field"
              />
              <ErrorMessage name="password" component="div" className="error-message" />

              {/* Confirm Password Field */}
              <Field
                as="input"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="form-field"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />

              {/* Submit Button */}
              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CreateAccount;
