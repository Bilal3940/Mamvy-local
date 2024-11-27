import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { emailRegex } from '@/utils';

export const FormikConfig = (handleSubmit: any) =>
  useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required(useTranslation().t('field_required'))
        .matches(emailRegex, useTranslation().t('invalid_email')),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
