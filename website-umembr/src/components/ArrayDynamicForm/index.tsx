import { palette } from '@/theme/constants';
import { Box, Divider, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useRef, useState } from 'react';
import { DynamicForm, MuiButton, MuiIconButton } from '..';
import { styles } from './styles';

const ArrayDynamicForm: FC<any> = ({ color,setSubmit, fieldsConfig, submitHandler, defaultValues, isEdit, onError }) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState([{ fields: fieldsConfig?.fields }]);
  const [values, setValues] = useState<any>([]);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handleAddField = () => {
    setFields([...fields, { fields: fieldsConfig?.fields }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = (val: any, index: any) => {
    setValues((prev: any) => {
      const newValues = [...prev];
      newValues[index] = val;
      return newValues;
    });
  };

  useEffect(() => {
    if (submitHandler && values.length === fields.length) submitHandler(values);
  }, [values]);

  const submit = useRef<any>(null);
  const [title, setTitle] = useState(fieldsConfig?.subtitle);

  useEffect(() => {
    if (defaultValues?.length) {
      const fields = [];
      for (let i = 0; i < defaultValues?.length; i++) {
        fields.push({ fields: fieldsConfig?.fields });
      }
      setFields(fields);
      setValues([]);
    } else {
      setFields([{ fields: fieldsConfig?.fields }]);
      setValues([]);
    }
  }, [fieldsConfig, defaultValues]);

  const setSubmitArray = (handler: any) => {
    if (fieldsConfig.subtitle !== title) {
      submit.current = null;
      setTitle(fieldsConfig?.subtitle);
    }
    const find = submit.current?.find((item: any) => item === handler);
    if (handler && !find && (submit.current?.length < fields?.length || !submit.current)) {
      if (submit.current) {
        submit.current.push(handler);

        setSubmit(submit.current);
        return;
      }
      submit.current = [handler];
      setSubmit(submit.current);
    }
  };

  useEffect(() => {
    if (fields.length < submit?.current?.length && submit.current) {
      submit.current.splice(submit?.current?.length - 1, 1);
      setSubmit(submit.current);
    }
  }, [fields.length]);

  return (
    <Box marginBottom={'1rem'}>
      <Box marginBottom={'0.5rem'}>
        {fieldsConfig?.title && (
          <Typography variant={isMobile ? 'body1' : 'h5'} textAlign={isMobile ? 'left' : 'left'} color={palette.white}>
            {t(fieldsConfig.title)}
          </Typography>
        )}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={'0.5rem'}>
        {fieldsConfig?.subtitle && (
          <Typography variant={isMobile ? 'body1' : 'h5'} color={palette.white}>
            {t(fieldsConfig.subtitle)}
          </Typography>
        )}
        <Box width={isMobile ? 'inherit' : '3.8125rem'}>
          <MuiButton variant={'contained'} boxShadow='none' height='2.25rem' method={handleAddField} backgroundColor={color}
          sx={{
    backgroundColor: color,
    '&:hover': {
      backgroundColor: color, // Add your hover color
    },
  }}>
            <Typography variant='subtitle2' color={palette.white}>
              {t('add')}
            </Typography>
          </MuiButton>
        </Box>
      </Box>

      {fields.map((item: any, index: number) => (
        <Box key={`item-${index}`} width={'100%'} position={'relative'}>
          {index > 0 && <Divider sx={styles.divider} />}

          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
            <DynamicForm
              setSubmit={setSubmitArray}
              fieldsConfig={item}
              isArray
              isEdit={isEdit}
              submitHandler={(val: any) => handleSubmit(val, index)}
              id={`${fieldsConfig.subtitle}-${index}`}
              defaultValues={defaultValues ? defaultValues[index] || null : null}
              onError={onError}
            />
            <Box
              position={isMobile ? 'relative' : 'absolute'}
              right={isMobile ? '0.5rem' : '-2.2rem'}
              left={isMobile ? '0.25rem' : 'inherit'}>
              {index !== 0 && (
                <MuiIconButton
                  method={() => handleRemoveField(index)}
                  background='transparent'
                  icon='/icons/close'
                  iconHeight={16}
                  iconWidth={16}
                  altIcon='close'
                />
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ArrayDynamicForm;
