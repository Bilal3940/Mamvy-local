import { Select, SelectProps, MenuItem, Box, Typography, FormControl, InputLabel } from '@mui/material';
import { FC, useState } from 'react';
import { palette } from '@/theme/constants';
import Image from 'next/image';
import { styles } from './styles';
import { useTranslation } from 'next-i18next';

interface IAditionalProps {
  name: string;
  placeholder?: string;
  options?: any;
  handleSelect: any;
  value: string;
  error?: boolean | any;
  errorMessage?: string | any;
  isDarkTheme?: boolean;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
}

type Props = SelectProps | IAditionalProps;

export const MuiSelect: FC<Props> = ({
  name,
  options,
  handleSelect,
  value,
  error = false,
  errorMessage = '',
  isDarkTheme = true,
  label,
  placeholder,
  disabled,
  defaultValue,
}: any) => {
  const [isSelectOpen, setSelectOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <FormControl fullWidth error={error ? true : false}>
      <InputLabel
        id={`${name}-label`}
        shrink
        sx={{
          color: isDarkTheme ? (disabled ? palette?.gray : palette.white) : disabled ? palette?.gray : palette.white,
          '&.Mui-focused': {
            color: palette.focus,
          },
          '&.Mui-error.Mui-focused': {
            color: palette.error,
          },
        }}>
        {t(label)}
      </InputLabel>
      <Select
        data-cy='select-component'
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        defaultValue={defaultValue ?? ''}
        sx={styles(isDarkTheme)}
        onChange={handleSelect}
        label={t(label)}
        placeholder='Label'
        displayEmpty={true}
        MenuProps={{ style: { width: '50%', borderRadius: '50rem' } }}
        IconComponent={() => (
          <Box marginRight={1} marginTop={1} onClick={() => setSelectOpen(!isSelectOpen)} sx={{ cursor: 'pointer' }}>
            <Image
              src={`/icons/${disabled ? 'down-arrow-light' : 'down-arrow-dark'}.svg`}
              alt={'alt'}
              width={10}
              height={20}
            />
          </Box>
        )}
        inputProps={{
          MenuProps: {
            style: { zIndex: 1400 },
          },
        }}
        open={isSelectOpen}
        onOpen={() => setSelectOpen(true)}
        onClose={() => setSelectOpen(false)}>
        {!isSelectOpen && (
          <MenuItem value='' disabled>
            <Typography color={isDarkTheme ? palette.white : palette.white}>{t(placeholder)}</Typography>
          </MenuItem>
        )}
        {options?.map((item: any) => {
          return (
            <MenuItem
              value={item.id}
              key={item.id}
              sx={{
                whiteSpace: 'normal',
              }}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      {error && (
        <Typography
          position={'absolute'}
          bottom={-21}
          left={15}
          fontSize={'0.75rem'}
          fontWeight={400}
          color={palette.error}>
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};
