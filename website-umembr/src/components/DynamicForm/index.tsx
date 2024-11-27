import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { palette } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import Item from './Item';
import { MuiTextField } from '..';
import { translate } from '@/utils';

const generateValidationSchema = (fieldsConfig: any) => {
  let schemaFields = fieldsConfig?.reduce((acc: any, field: any) => {
    if (field.validation) {
      acc[field.name] = field.validation;
    }
    return acc;
  }, {});

  return Yup.object().shape(schemaFields);
};

export const DynamicForm = ({
  fieldsConfig,
  submitHandler,
  setSubmit,
  isArray = false,
  id,
  defaultValues,
  isEdit,
  onError,
}: any) => {
  const { t } = useTranslation();
  const [validation, setValidation] = React.useState<any>();
  const handleOnTouched = (key: string) => formik.setTouched({ ...formik.touched, [key]: true });
  const [initialValues, setInitialValues] = React.useState<any>({});
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,

    onSubmit: (values) => {
      if (submitHandler) submitHandler(values);
    },
  });

  const handleInitialValues = async () => {
    const newInitials = fieldsConfig?.fields.reduce((acc: any, field: any) => {
      acc[field.name] = '';
      return acc;
    }, {});
    if (newInitials.hasOwnProperty('country') && newInitials['country'] === '') {
      newInitials['country'] = 'United States';
    }

    setInitialValues(newInitials);

    await formik.setValues(newInitials);
    if (defaultValues) {
      await formik.setValues(defaultValues);
    }
  };
  useEffect(() => {
    setValidation(generateValidationSchema(fieldsConfig?.fields));
    handleInitialValues();
  }, [fieldsConfig]);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  useEffect(() => {
    if (defaultValues) formik.setValues(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (onError) onError(formik.errors);
  }, [formik.errors]);

  return (
    <Box padding={isArray ? '0.5rem 0' : '0.5rem'} width={'100%'}>
      <form
        id={id || null}
        ref={(e) => {
          setSubmit(e);
        }}
        onSubmit={(e) => {
          e?.preventDefault();
          formik?.handleSubmit(e);
        }}
        style={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {fieldsConfig?.title && (
            <Grid item xs={12}>
              <Typography
                variant={isMobile ? 'body1' : 'h5'}
                marginBottom={'1rem'}
                textAlign={isMobile ? 'left' : 'left'}
                color={palette.white}>
                {t(fieldsConfig.title)}
              </Typography>
            </Grid>
          )}
          {fieldsConfig?.fields.map((item: any) => {
            return (
              <React.Fragment key={item?.name}>
                <Grid item xs={isMobile ? 12 : item.grid} key={item?.name}>
                  {item.component == MuiTextField ? (
                    <MuiTextField
                      id={item.name}
                      name={item.name}
                      fullWidth
                      onBlur={() => {
                        handleOnTouched(item.name);
                      }}
                      status={changeInputStatus(
                        formik.values[item.name],
                        formik.errors[item.name] && formik.touched[item.name],
                      )}
                      InputLabelProps={{ shrink: isEdit }}
                      error={Boolean(formik.touched[item.name] && formik.errors[item.name])}
                      onChange={formik.handleChange}
                      value={formik.values[item.name]}
                      autoComplete={item.name}
                      required={item.required}
                      placeholder={t(item.placeholder)}
                      label={item.label}
                      isDarkTheme={false}
                      errorMessage={translate(item.name, formik.errors[item.name])}
                    />
                  ) : (
                    <Item
                      render={item.component}
                      props={{
                        ...item,
                        ...formik.getFieldProps(item.name),
                        error: formik.touched[item.name] && Boolean(formik.errors[item.name]),
                        errorMessage: formik.touched[item.name] && formik.errors[item.name],
                        handleSelect: formik.handleChange,
                        handleDatePicker: formik.setFieldValue,
                        onChange: formik.setFieldValue,
                        value: item?.name == 'country' && item?.value == '' ? item?.value : formik.values[item.name],
                      }}
                    />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </form>
    </Box>
  );
};

export default DynamicForm;
