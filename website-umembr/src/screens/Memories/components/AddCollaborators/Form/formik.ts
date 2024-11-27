import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const FormikConfig: any = (handleSubmit: any) => {
  const { t } = useTranslation();

  return useFormik({
    initialValues: {
      email: '',
      collaborators: [],
    },
    validationSchema: Yup.object({
      collaborators: Yup.array().of(
        Yup.object({
          type: Yup.string().required(t('Type is required')),
          role: Yup.string().required(t('Role is required')),
        }),
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
};
