import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export const FormikConfig = (handleSubmit: any) =>
  useFormik({
    initialValues: {
      code: '',
    },

    validationSchema: Yup.object({
        code: Yup.string()
          .required(useTranslation().t('field_required'))
          .min(6, i18next.t('min_invalid', { number: 6 })),
      }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });