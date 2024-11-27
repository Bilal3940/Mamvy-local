// CardInputField.tsx
import React from "react";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

interface CardInputFieldProps {
  label: string;
  focused: boolean;
  hasValue: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (event: any) => void;
  isCardElement?: boolean;
  elementType?: "cardNumber" | "expiry" | "cvc";
}

export const CardInputField: React.FC<CardInputFieldProps> = ({
  label,
  focused,
  hasValue,
  onFocus,
  onBlur,
  onChange,
  isCardElement = false,
  elementType,
}) => {
  const inputProps = {
    options: {
      style: {
        base: {
          fontSize: "16px",
          padding:'20px',
          color: "#fff",
          "::placeholder": { color: "transparent" },
        },
        invalid: { color: "#9e2146" },
      },
    },
  };

  const renderCardElement = () => {
    switch (elementType) {
      case "cardNumber":
        return <CardNumberElement {...inputProps} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />;
      case "expiry":
        return <CardExpiryElement {...inputProps} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />;
      case "cvc":
        return <CardCvcElement {...inputProps} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        shrink={focused || hasValue}
        sx={{
          transition: "0.2s",
          width:'max-content',
          padding:'0 4px',
          position:'relative',
          left:'20px',
          transform: focused || hasValue ? "translate(0, 1.5rem) scale(0.75)" : "translate(0, 2.5rem) scale(1)",
          background: focused || hasValue ? '#131544' : 'transparent',
          pointerEvents: "none",
          color: focused || hasValue ? '#0072CE':"#fff",
          
        }}
      >
        {label}
      </InputLabel>
      <Box
  sx={{
    border: !isCardElement
      ? "none"
      : (focused || hasValue) 
      ? "2px solid #0072CE" 
      : "1px solid #ccc",
    padding: "8px",
    borderRadius: !isCardElement ? "" :"4px",
    height:  !isCardElement ? "" : "40px",
    margin: !isCardElement ? "" :  "10px",
    color: "#fff",
  }}
>

        {isCardElement ? renderCardElement() : <TextField
              type="text"
              id="cc-name"
              className="input-field"
              name="cc-name"
              
{...inputProps} onFocus={onFocus} onBlur={onBlur} onChange={onChange}
              required
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  paddingLeft:'12px',
                  backgroundColor: 'transparent',
                  border: focused ? '' :'1px solid #ccc',
                  borderRadius: '2px',
                  color: '#fff', // Set text color to white
                },
                '& .MuiInputBase-input': {
                  paddingLeft:'12px',
                  color: '#fff', // Set text color to white
                },
              }}
            />
          }
      </Box>
    </FormControl>
  );
};
