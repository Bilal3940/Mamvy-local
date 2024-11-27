import { useFormik } from 'formik';
import * as Yup from 'yup';
import { emailRegex, onlyLettersAndNumbers, onlyLettersRegex, onlyNames } from '@/utils';
import i18next from 'i18next';

export const FormikConfig = (t: any, handleSubmit: any, def?: any) =>
  useFormik({
    initialValues: {
      name: def?.name || '',
      lastname: def?.lastname || '',
      phonenumber: def?.phonenumber || '',
      description: def?.description || '',
      email: def?.email || '',
      password: '',
      confirm_password: '',
      address_state: def?.address_state || '',
      address_city: def?.address_city || '',
      address_line_1: def?.address_line_1 || '',
      address_line_2: def?.address_line_2 || '',
      address_postal_code: def?.address_postal_code || '',
      referralCode: def?.referalCode?.trim()?.toUpperCase() || '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('field_required'))
        .min(3, t('min_invalid', { number: 3 }))
        .max(40, t('max_invalid', { number: 40 }))
        .matches(onlyNames, 'only_letters'),

      lastname: Yup.string()
        .required(t('field_required'))
        .min(3, t('min_invalid', { number: 3 }))
        .max(60, t('max_invalid', { number: 60 }))
        .matches(onlyNames, 'only_letters'),

      email: Yup.string().required(t('field_required')).matches(emailRegex, t('invalid_email')),

      password: Yup.string()
        .notRequired()
        .min(8, i18next.t('min_invalid', { number: 8 })),
      confirm_password: Yup.string()
        .notRequired()
        .min(8, i18next.t('min_invalid', { number: 8 }))
        .oneOf([Yup.ref('password')], 'password_must_match'),

      phonenumber: Yup.string().required(t('field_required')),
      description: Yup.string()
        .notRequired()
        .max(255, t('max_invalid', { number: 255 })),

      address_state: Yup.string().notRequired(),

      address_city: Yup.string()
        .notRequired()
        .min(3, t('min_invalid', { number: 3 }))
        .max(80, t('max_invalid', { number: 80 }))
        .matches(onlyLettersRegex, 'only_letters'),

      address_line_1: Yup.string()
        .notRequired()
        .min(3, t('min_invalid', { number: 3 }))
        .max(255, t('max_invalid', { number: 40 })),

      address_line_2: Yup.string()
        .notRequired()
        .min(3, t('min_invalid', { number: 3 }))
        .max(255, t('max_invalid', { number: 255 })),

      address_postal_code: Yup.string()
        .notRequired()
        .min(3, t('min_invalid', { number: 3 }))
        .max(10, t('max_invalid', { number: 10 }))
        .matches(onlyLettersAndNumbers, 'only_letters'),
      referralCode: Yup.string().notRequired()
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
