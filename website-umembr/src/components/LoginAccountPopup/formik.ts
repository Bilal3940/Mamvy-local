import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { emailRegex } from '@/utils';
import i18next from 'i18next';

export const FormikConfig = (handleSubmit: any) =>
  useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required(useTranslation().t('field_required'))
        .matches(emailRegex, useTranslation().t('invalid_email')),
      password: Yup.string()
        .required(useTranslation().t('field_required'))
        .min(8, i18next.t('min_invalid', { number: 8 })),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
