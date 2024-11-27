import { ArrayDynamicForm, DynamicForm, MuiButton} from '@/components';
import { palette } from '@/theme/constants';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { storySelector } from '@/store/selectors';
import { formCategories } from '../../formsCategories';
import { FC, useEffect, useMemo } from 'react';

import ChevronLeftIconComponent from '../../../../../public/icons/components/chevron-left';
import ChevronRightIconComponent from '../../../../../public/icons/components/chevron-right';
import { current } from '@reduxjs/toolkit';
import { MuiStepper } from '@/components/Stepper/index';

export const FormStories: FC<any> = ({
  submit,
  values,
  setValues,
  selectedForm,
  setSelectedForm,
  currentFormConfig,
  setActualFormNumber,
  actualFormNumber,
  submitAction,
  setArrayRun,
  handleForm,
  setHandleForm,
}) => {
  const { t } = useTranslation();

  const createData = useSelector(storySelector);
  const { storySection } = createData;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const renderFormCategories = () => {
    const fieldsConfig = formCategories?.[storySection];
    return fieldsConfig?.map((field: any) => (
      <Button
        key={field.name}
        sx={{ padding: 0, margin: 0, textAlign: 'left', width: '100%' }}
        onClick={() => {
          setHandleForm({ execute: true, form: field.name });
          submitAction();
        }}>
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'2.625rem'}
          borderRight={selectedForm == field.name ? `0.25rem solid ${palette.primary}` : 'none'}>
          <Typography
            variant='subtitle2'
            color={selectedForm == field.name ? palette.primary : palette.codGray}
            marginX={'1rem'}>
            {t(field.label)}
          </Typography>
        </Box>
      </Button>
    ));
  };

  const handleSelectForm = (formKey: string) => {
    setSelectedForm(() => formKey);
    let actual = 0;
    for (let i = 0; i < Object.keys(currentFormConfig || {}).length; i++) {
      if (formKey == Object.keys(currentFormConfig || {})[i]) {
        actual = i;
        break;
      }
    }
    setActualFormNumber(actual);
  };

  useEffect(() => {
    setSelectedForm(formCategories[storySection]?.[actualFormNumber]?.name);
  }, []);

  const currentForm = useMemo(() => {
    return currentFormConfig?.[selectedForm];
  }, [selectedForm, currentFormConfig]);
  const handleSubmit = (values: any) => {
    setValues((prev: any) => ({ ...prev, [selectedForm]: values }));
    setHandleForm((prev: any) => {
      if (prev.execute) {
        handleSelectForm(handleForm.form);
      } else {
        nextForm();
      }
      return { execute: false, form: '' };
    });
  };

  const handleSubmitArray = (values: any, index: any) => {
    setValues((prev: any) => {
      const value = { ...(prev[selectedForm] || {}) };
      value[index] = values;
      const validate = currentForm?.reduce((acc: any, item: any) => {
        return acc && !!value[item?.subtitle || item?.title];
      }, true);
      setArrayRun((prevRun: any) => {
        if (validate && prevRun >= currentForm?.length - 1) {
          setHandleForm((prevHandle: any) => {
            if (prevHandle.execute) {
              handleSelectForm(handleForm.form);
            } else {
              nextForm();
            }
            return { execute: false, form: '' };
          });
          return 0;
        }
        return prevRun + 1;
      });
      return { ...prev, [selectedForm]: value };
    });
  };
  const setSubmitArray = (index: any, handler: any) => {
    if (!Array.isArray(submit.current) || submit?.current?.length > currentForm?.length) submit.current = [];
    submit.current[index] = handler;
  };

  const nextForm = () => {
    setSelectedForm(formCategories[storySection]?.[actualFormNumber + 1]?.name);
    setActualFormNumber(actualFormNumber + 1);
    setArrayRun(0);
  };

  const backForm = () => {
    setSelectedForm(formCategories[storySection]?.[actualFormNumber - 1]?.name);
    setActualFormNumber(actualFormNumber - 1);
    setArrayRun(0);
  };

  const checkError = (errors: any) => {
    const keys = Object.keys(errors || {});
    if (keys.length === 0) {
      setHandleForm({ execute: false, form: '' });
    }
  };
  return (
    <Box
      display={'flex'}
      height={'100%'}
      justifyContent={'space-between'}
      marginBottom={isMobile ? '0' : '1rem'}
      alignItems={isMobile ? 'center' : 'flex-start'}
      flexDirection={isMobile ? 'column' : 'row'}
      width={'100%'}>
      {!isMobile && (
        <Box
          borderRadius={'0.5rem'}
          padding={'1rem 0'}
          width={'20%'}
          marginRight={'1.5rem'}
          bgcolor={palette.lightCardBackground}
          height={'100%'}
          minHeight={'37.75rem'}>
          {renderFormCategories()}
        </Box>
      )}

      <Box
        bgcolor={palette.cardBackground}
        borderRadius={'0.5rem'}
        width={isMobile ? '100%' : '80%'}
        minHeight={isMobile ? '100%' : '37.75rem'}
        height={'100%'}
        padding={isMobile ? '0.5rem ' : '3.5rem'}
        border={`0.063rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}
        position={'relative'}>
        {isMobile && (
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <MuiButton
                type='button'
                disabled={actualFormNumber == 0}
                loading={false}
                variant={'text'}
                padding='0'
                minWidth={isMobile ? 0 : 'auto'}
                method={() => backForm()}>
                <ChevronLeftIconComponent color={actualFormNumber == 0 ? palette.gray : palette.primary} />
                <Typography
                  marginLeft={'0.5rem'}
                  variant='body1'
                  color={actualFormNumber == 0 ? palette.gray : palette.primary}>
                  {t('back_minus')}
                </Typography>
              </MuiButton>
            </Box>
            <Typography variant='subtitle1' color={palette?.white}>
              {t(`${selectedForm}_minus`)}
            </Typography>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <MuiButton
                type='button'
                disabled={storySection == '' ? true : false}
                loading={false}
                padding='0'
                variant={'text'}
                minWidth={isMobile ? 0 : 'auto'}
                method={() => submitAction()}>
                <Typography
                  variant='body1'
                  marginRight={'0.5rem'}
                  color={storySection == '' ? palette.faintGray : palette.primary}>
                  {t('next_minus')}
                </Typography>
                <ChevronRightIconComponent color={storySection == '' ? palette.faintGray : palette.primary} />
              </MuiButton>
            </Box>
          </Box>
        )}
        {!!currentForm && Array.isArray(currentForm)
          ? currentForm?.map((item: any, index: number) =>
              item?.type === 'array' ? (
                <ArrayDynamicForm
                  setSubmit={(sub: any) => setSubmitArray(index, sub)}
                  submitHandler={(values: any) => handleSubmitArray(values, item?.subtitle || item?.title)}
                  key={index}
                  fieldsConfig={item}
                  defaultValues={values[selectedForm] ? values[selectedForm][item?.subtitle || item?.title] : null}
                  title={formCategories[storySection]?.[actualFormNumber].name}
                  onError={checkError}></ArrayDynamicForm>
              ) : (
                <DynamicForm
                  setSubmit={(sub: any) => setSubmitArray(index, sub)}
                  submitHandler={(values: any) => handleSubmitArray(values, item?.subtitle || item?.title)}
                  key={index}
                  defaultValues={values[selectedForm] ? values[selectedForm][item?.subtitle || item?.title] : null}
                  fieldsConfig={item}
                  onError={checkError}></DynamicForm>
              ),
            )
          : currentForm?.type === 'array'
          ? !!currentForm && (
              <ArrayDynamicForm
                setSubmit={(handler: any) => (submit.current = handler)}
                submitHandler={handleSubmit}
                fieldsConfig={currentForm}
                defaultValues={values[selectedForm] ? values[selectedForm] : null}
                title={formCategories[storySection]?.[actualFormNumber - 1].name}></ArrayDynamicForm>
            )
          : !!currentForm && (
              <DynamicForm
                defaultValues={values[selectedForm] ? values[selectedForm] : null}
                setSubmit={(handler: any) => (submit.current = handler)}
                submitHandler={handleSubmit}
                fieldsConfig={currentForm}></DynamicForm>
            )}
        {isMobile && (
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <MuiButton
                type='button'
                disabled={actualFormNumber == 0}
                loading={false}
                padding='0'
                variant={'text'}
                minWidth={isMobile ? 0 : 'auto'}
                method={() => backForm()}>
                <ChevronLeftIconComponent color={actualFormNumber == 0 ? palette.gray : palette.primary} />
                <Typography
                  marginLeft={'0.5rem'}
                  variant='body1'
                  color={actualFormNumber == 0 ? palette.gray : palette.primary}>
                  {t('back_minus')}
                </Typography>
              </MuiButton>
            </Box>
            <MuiStepper steps={formCategories[storySection]} actualStep={actualFormNumber} />
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <MuiButton
                type='button'
                padding='0'
                disabled={storySection == '' ? true : false}
                loading={false}
                variant={'text'}
                minWidth={isMobile ? 0 : 'auto'}
                method={() => submitAction()}>
                <Typography
                  variant='body1'
                  marginRight={'0.5rem'}
                  color={storySection == '' ? palette.faintGray : palette.primary}>
                  {t('next_minus')}
                </Typography>
                <ChevronRightIconComponent color={storySection == '' ? palette.faintGray : palette.primary} />
              </MuiButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
