import { ChangeEventHandler } from 'react';

import { IconButton, InputAdornment, SxProps, TextField, Theme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { styles } from '../styles';

const Search = ({
  value,
  onChange,
  onClear,
  sx,
}: {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onClear?: () => void;
  sx?: SxProps<Theme> | undefined;
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      id='search'
      name='search'
      sx={{ ...sx, ...styles.inputMobile }}
      fullWidth
      onChange={onChange}
      value={value}
      placeholder={t('search')}
      InputProps={{
        startAdornment: (
          <InputAdornment position={'start'} disablePointerEvents>
            <IconButton disableTouchRipple disableRipple edge={'end'}>
              <Image src={'/icons/search.svg'} alt={'icon'} width={22} height={22} />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment:
          value && value?.length > 0 && onClear ? (
            <InputAdornment position={'start'} onClick={onClear}>
              <IconButton disableTouchRipple disableRipple edge={'end'}>
                <Image src={'/icons/close-circle-white.svg'} alt={'icon'} width={18} height={18} />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

export default Search;
