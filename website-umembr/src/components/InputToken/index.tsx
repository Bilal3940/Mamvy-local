import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { MuiTextField } from '..';
import { styles } from './style';

type AllowedInputTypes = 'text' | 'number' | 'tel';

interface OTPInputProps {
  value?: string;
  numInputs?: number;
  onChange: (otp: string) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode;
  inputType?: AllowedInputTypes;
}

export const InputToken = ({
  value = '',
  numInputs = 4,
  onChange,
  onPaste,
  inputType = 'text',

  renderSeparator,
}: OTPInputProps) => {
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const getOTPValue = () => (value ? value.toString().split('') : []);

  const isInputNum = inputType === 'number' || inputType === 'tel';

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, numInputs);
  }, [numInputs]);

  const isInputValueValid = (value: string) => {
    const isTypeValid = isInputNum ? !isNaN(Number(value)) : typeof value === 'string';
    return isTypeValid && value.trim().length === 1;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
      focusInput(activeInput + 1);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => (index: number) => {
    setActiveInput(index);
    event.target.select();
  };

  const handleBlur = () => {
    setActiveInput(activeInput - 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const otp = getOTPValue();
    if ([event.code, event.key].includes('Backspace')) {
      event.preventDefault();
      changeCodeAtFocus('');
      focusInput(activeInput - 1);
    } else if (event.code === 'Delete') {
      event.preventDefault();
      changeCodeAtFocus('');
    } else if (event.code === 'ArrowLeft') {
      event.preventDefault();
      focusInput(activeInput - 1);
    } else if (event.code === 'ArrowRight') {
      event.preventDefault();
      focusInput(activeInput + 1);
    } else if (event.key === otp[activeInput]) {
      event.preventDefault();
      focusInput(activeInput + 1);
    } else if (
      event.code === 'Spacebar' ||
      event.code === 'Space' ||
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  };

  const focusInput = (index: number) => {
    const activeInput = Math.max(Math.min(numInputs - 1, index), 0);

    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput]?.focus();
      inputRefs.current[activeInput]?.select();
      setActiveInput(activeInput);
    }
  };

  const changeCodeAtFocus = (value: string) => {
    const otp = getOTPValue();
    otp[activeInput] = value[0];
    handleOTPChange(otp);
  };

  const handleOTPChange = (otp: Array<string>) => {
    const otpValue = otp.join('');
    onChange(otpValue);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const otp = getOTPValue();
    let nextActiveInput = activeInput;

    const pastedData = event.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    if (isInputNum && pastedData.some((value) => isNaN(Number(value)))) {
      return;
    }

    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift() ?? '';
        nextActiveInput++;
      }
    }

    focusInput(nextActiveInput);
    handleOTPChange(otp);
  };

  return (
    <Box display={'flex'} onPaste={onPaste}>
      {Array.from({ length: numInputs }, (_, index) => index).map((index) => (
        <Box
          margin={renderSeparator ? 0 : '0 0.35rem'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          key={index}>
          <MuiTextField
            id='otpToken'
            name='token'
            value={getOTPValue()[index] ?? ''}
            inputRef={(element: any) => (inputRefs.current[index] = element)}
            onChange={handleChange}
            onFocus={(event: any) => handleFocus(event)(index)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            sx={styles.input}
            type={inputType}
          />

          <Typography margin={!renderSeparator ? 0 : '0 0.35rem'} textAlign={'center'} variant='body1'>
            {' '}
            {index < numInputs - 1 &&
              (typeof renderSeparator === 'function' ? renderSeparator(index) : renderSeparator)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export type { OTPInputProps, AllowedInputTypes };
