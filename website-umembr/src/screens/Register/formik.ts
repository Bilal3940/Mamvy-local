import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { emailRegex, onlyNames } from '@/utils';
import i18next from 'i18next';

export const FormikConfig: any = (handleSubmit: any) =>
  useFormik({
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
        .required(useTranslation().t('field_required'))
        .min(3, useTranslation().t('min_invalid', { number: 3 }))
        .max(40, useTranslation().t('max_invalid', { number: 40 }))
        .matches(onlyNames, 'only_letters'),

      lastname: Yup.string()
        .required(useTranslation().t('field_required'))
        .min(3, useTranslation().t('min_invalid', { number: 3 }))
        .max(60, useTranslation().t('max_invalid', { number: 60 }))
        .matches(onlyNames, 'only_letters'),

      email: Yup.string()
        .required(useTranslation().t('field_required'))
        .matches(emailRegex, useTranslation().t('invalid_email')),

      password: Yup.string()
        .required(useTranslation().t('field_required'))
        .min(8, i18next.t('min_invalid', { number: 8 })),
      confirm_password: Yup.string()
        .required(useTranslation().t('field_required'))
        .min(8, i18next.t('min_invalid', { number: 8 }))
        .oneOf([Yup.ref('password')], 'password_must_match'),

      phonenumber: Yup.string().notRequired(),
      description: Yup.string().max(255, useTranslation().t('max_invalid', { number: 255 })),
      referralCode: Yup.string().notRequired(),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
