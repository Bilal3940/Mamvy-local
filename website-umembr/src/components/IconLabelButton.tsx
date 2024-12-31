import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import Image from 'next/image';
import { SxProps, Theme } from '@mui/material/styles';
import { palette } from '@/theme/constants';

interface IAditionalProps {
  icon: string;
  background: string;
  width?: string | number;
  height?: string | number;
  iconWidth?: number;
  iconHeight?: number;
  padding?: string | number;
  altIcon: string;
  label?: string;
  labelColor?: string;
  method?: (event?: any) => void;
  positionIcon?: string;
  isRounded?: boolean;
  disableRipple?: boolean;
  borderColor?: string;
  sx?: SxProps<Theme>;
}

export const MuiIconLabelButton: FC<IAditionalProps> = ({
  icon,
  background,
  width = 32,
  height = 32,
  padding = 1,
  altIcon,
  iconWidth = 16,
  iconHeight = 16,
  label,
  labelColor = palette.white,
  method,
  positionIcon = 'center',
  isRounded = true,
  disableRipple = false,
  borderColor,
  sx,
}: IAditionalProps) => {
  const darkenHexColor = (hex: string, darkenFactor: number) => {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, r - darkenFactor);
    g = Math.max(0, g - darkenFactor);
    b = Math.max(0, b - darkenFactor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const iconStyle = {
    width: width,
    height: height,
    background: background,
    padding: padding,
    display: 'flex',
    justifyContent: 'center',
    alignItems: positionIcon,
    borderRadius: isRounded ? '50%' : 0,
    border: `0.063rem solid ${borderColor}`,
    '&:hover': {
      backgroundColor: darkenHexColor(background, 35),
    },
    ...sx,
  };

  return (
    <IconButton sx={iconStyle} onClick={method} disableRipple={disableRipple}>
      <Box display="flex" alignItems="center" justifyContent="center">
        {label && (
          <Typography
            variant="body2"
            color={labelColor}
            sx={{ marginRight: 1 }} // Add some space between label and icon
          >
            {label}
          </Typography>
        )}
        <Image
          priority={true}
          src={`${icon}.svg`}
          alt={altIcon}
          width={iconWidth}
          height={iconHeight}
          quality={80}
        />
      </Box>
    </IconButton>
  );
};

