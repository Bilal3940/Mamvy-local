import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const FormikConfig: any = (handleSubmit: any) =>
  useFormik({
    initialValues: {
      type: '',
      media: '',
      title: '',
      description: '',
      complementaryText: [],
      complementaryMedia: [],
    },

    validationSchema: Yup.object({
      media: Yup.string().when('type', {
        is: (value: any) => value === 'text',
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required('field_required'),
      }),

      title: Yup.string()
        .required(useTranslation().t('field_required'))
        .max(40, useTranslation().t('max_invalid', { number: 40 })),

      description: Yup.string()
        .notRequired()
        .min(3, useTranslation().t('min_invalid', { number: 3 }))
        .max(255, useTranslation().t('max_invalid', { number: 255 })),

      asset: Yup.string().notRequired(),

      complementaryText: Yup.array().notRequired(),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
