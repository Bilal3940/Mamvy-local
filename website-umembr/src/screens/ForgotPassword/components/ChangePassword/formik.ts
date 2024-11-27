import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import i18next from 'i18next';

export const FormikConfig = (handleSubmit: any) =>
  useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required(useTranslation().t('field_required'))
        .min(8, i18next.t('min_invalid', { number: 8 })),
      confirm_password: Yup.string()
        .required('field_required')
        .min(8, i18next.t('min_invalid', { number: 8 }))
        .oneOf([Yup.ref('password')], 'password_must_match'),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
