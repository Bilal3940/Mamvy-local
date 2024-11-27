import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { statusManagement } from '@/utils';
import { styles } from './style';
import Image from 'next/image';

interface IAditionalProps {
  name: string;
  error: boolean;
  ref: any;
  label: string;
  type: string;
  status: any;
  errorMessage: string | any;
  placeholder: string;
  isDarkTheme: boolean;
  value: string | number;
  testId: string;
  endIcon: string;
  iconMethod: () => void;
  iconWidth: string | number;
  iconHeight: string | number;
  multiline?: boolean;
  disabledColor?: string;
}

type Props = TextFieldProps | IAditionalProps;

export const MuiTextField: FC<Props> = ({
  name,
  error = false,
  ref,
  label,
  type = 'text',
  errorMessage = '',
  status,
  placeholder,
  isDarkTheme = true,
  value,
  testId,
  endIcon,
  iconMethod,
  iconWidth,
  iconHeight,
  multiline,
  disable,
  disabledColor,
  ...props
}: any) => {
  const { t } = useTranslation();

  return (
    <TextField
      variant='outlined'
      name={name}
      fullWidth
      disabled={disable}
      data-cy={testId}
      label={t(label)}
      inputRef={ref}
      type={type}
      value={value}
      multiline={multiline}
      minRows={multiline ? 4 : 1}
      sx={styles(isDarkTheme, disabledColor).input}
      error={statusManagement(status) || error}
      helperText={status == 'error' || error ? t(errorMessage) : ''}
      placeholder={t(placeholder)}
      InputProps={{
        endAdornment: endIcon && (
          <InputAdornment position='end'>
            <IconButton onClick={iconMethod} edge='end'>
              <Image src={endIcon} alt={'icon'} width={iconWidth} height={iconHeight} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default MuiTextField;
