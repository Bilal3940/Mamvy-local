import { Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { palette } from '@/theme/constants';

interface ITabsProps {
  value: any;
  width: string;
  extraStyle?: any;
  qty?: number;
  tabs: {
    label: string;
    action: () => void;
  }[];
}

export const MuiTabs: FC<ITabsProps> = ({ tabs, value, width, extraStyle, qty = 2 }: any) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  
  return (
    <Tabs
      value={value}
      sx={styles(width, extraStyle, qty, isMobile)}
      TabIndicatorProps={{
        style: {
          backgroundColor: palette?.primary,
        },
      }}>
      {tabs?.map((item: any) => {
        return <Tab key={item.label} onClick={() => item?.action()} label={t(item?.label)} />;
      })}
    </Tabs>
  );
};
