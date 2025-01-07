import { Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { palette } from '@/theme/constants';
import { useRouter } from 'next/router';

interface ITabsProps {
  color?: any;
  value: any;
  width: string;
  extraStyle?: any;
  qty?: number;
  tabs: {
    label: string;
    action: () => void;
  }[];
}

export const MuiTabs: FC<ITabsProps> = ({ color, tabs, value, width, extraStyle, qty = 2 }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  let bgColor = router.pathname === '/app/home' ? palette.cardBackground : color;

  return (
    <Tabs
      value={value}
      sx={styles(width, extraStyle, qty, isMobile)}
      TabIndicatorProps={{
        style: {
          backgroundColor: bgColor, 
        },
      }}>
      {tabs?.map((item: any, index: number) => {
        return (
          <Tab
            key={item.label}
            onClick={() => item?.action()}
            label={t(item?.label)}
            sx={{
              color: value === index ? bgColor : palette?.white, 
              fontWeight: value === index ? 'bold' : 'normal', 
              '&:hover': {
                color: bgColor, 
              },
              '&.Mui-selected': {
                color: '#B3BED4', 
              },
            }}
          />
        );
      })}
    </Tabs>
  );
};
