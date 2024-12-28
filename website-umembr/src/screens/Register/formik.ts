// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useTranslation } from 'react-i18next';
// import { emailRegex, onlyNames } from '@/utils';
// import i18next from 'i18next';

// export const FormikConfig: any = (handleSubmit: any) =>
//   useFormik({
//     initialValues: {
//       name: '',
//       lastname: '',
//       phonenumber: '',
//       description: '',
//       referralCode: '',
//       email: '',
//       password: '',
//       confirm_password: '',
//     },

//     validationSchema: Yup.object({
//       name: Yup.string()
//         .required(useTranslation().t('field_required'))
//         .min(3, useTranslation().t('min_invalid', { number: 3 }))
//         .max(40, useTranslation().t('max_invalid', { number: 40 }))
//         .matches(onlyNames, 'only_letters'),

//       lastname: Yup.string()
//         .required(useTranslation().t('field_required'))
//         .min(3, useTranslation().t('min_invalid', { number: 3 }))
//         .max(60, useTranslation().t('max_invalid', { number: 60 }))
//         .matches(onlyNames, 'only_letters'),

//       email: Yup.string()
//         .required(useTranslation().t('field_required'))
//         .matches(emailRegex, useTranslation().t('invalid_email')),

//       password: Yup.string()
//         .required(useTranslation().t('field_required'))
//         .min(8, i18next.t('min_invalid', { number: 8 })),
//       confirm_password: Yup.string()
//         .required(useTranslation().t('field_required'))
//         .min(8, i18next.t('min_invalid', { number: 8 }))
//         .oneOf([Yup.ref('password')], 'password_must_match'),

//       phonenumber: Yup.string().notRequired(),
//       description: Yup.string().max(255, useTranslation().t('max_invalid', { number: 255 })),
//       referralCode: Yup.string().notRequired(),
//     }),

//     onSubmit: (values) => {
//       handleSubmit(values);
//     },
//   });
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { emailRegex, onlyNames, popularDomains } from '@/utils';
import stringSimilarity from 'string-similarity'; // Ensure it's installed

export const FormikConfig: any = (handleSubmit: any) => {
  const { t } = useTranslation();

  return useFormik({
    initialValues: {
      name: '',
      lastname: '',
      phonenumber: '',
      description: '',
      referralCode: '',
      email: '',
      password: '',
      confirm_password: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('field_required'))
        .min(3, t('min_invalid', { number: 3 }))
        .max(40, t('max_invalid', { number: 40 }))
        .matches(onlyNames, t('only_letters')),

      lastname: Yup.string()
        .required(t('field_required'))
        .min(3, t('min_invalid', { number: 3 }))
        .max(60, t('max_invalid', { number: 60 }))
        .matches(onlyNames, t('only_letters')),

      email: Yup.string()
        .required(t('field_required'))
        .matches(emailRegex, t('invalid_email'))
        .test('check-domain', (value, context) => {
          if (value) {
            const domain = value.split('@')[1];
            if (domain) {
              const bestMatch = stringSimilarity.findBestMatch(domain, popularDomains);
              if (bestMatch.bestMatch.rating > 0.7 && bestMatch.bestMatch.target !== domain) {
                // Update error message with a suggestion
                return context.createError({
                  message: t('did_you_mean', {
                    suggestion: `${value.split('@')[0]}@${bestMatch.bestMatch.target}`,
                  }),
                });
              }
            }
          }
          return true;
        }),

      password: Yup.string()
        .required(t('field_required'))
        .min(8, t('min_invalid', { number: 8 })),
      confirm_password: Yup.string()
        .required(t('field_required'))
        .min(8, t('min_invalid', { number: 8 }))
        .oneOf([Yup.ref('password')], t('password_must_match')),

      phonenumber: Yup.string().notRequired(),
      description: Yup.string().max(255, t('max_invalid', { number: 255 })),
      referralCode: Yup.string().notRequired(),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
};
