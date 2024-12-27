import { Stepper, Step, StepLabel, Typography, Box, useMediaQuery, Theme, MobileStepper } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { styles } from './styles';
import Image from 'next/image';
import { palette } from '@/theme/constants';

interface ITabsProps {
  actualStep: number;
  steps: IItemsProps[];
  buttonBackground?:any;
}

interface IItemsProps {
  label: string;
  value: number;
  
}

export const MuiStepper: FC<ITabsProps> = ({ buttonBackground,steps, actualStep }: any) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!isMobile ? (
        <Stepper activeStep={actualStep}>
          {steps?.map((item: IItemsProps, index: number) => {
            return (
              <Step key={item?.label} sx={styles.stepper} completed={actualStep > item?.value}>
                <StepLabel
               sx={{
      color: actualStep === item?.value ? palette?.white : palette?.white, // Apply red color to active step label
      "& .MuiStepLabel-label": {
        color: actualStep === item?.value ? palette?.white : palette?.white,
         // Targeting the label inside StepLabel
      },
    }}
                  StepIconComponent={() =>
                    actualStep > item?.value ? (
                      <Image src={'/icons/completed-step.svg'} alt={'icon'} width={18} height={18} />
                    ) : (
                      <Box sx={actualStep == item?.value ? styles.activeIcon : styles.defaultIcon}>
                        <Typography
                          textAlign={'center'}
                          color={actualStep == item?.value ? buttonBackground : palette?.white}
                          lineHeight={0}
                          variant='caption'>
                          {index + 1}
                        </Typography>
                      </Box>
                    )
                  }>
                  {t(item?.label)}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      ) : (
        <MobileStepper
          steps={steps?.length || 0}
          sx={styles(buttonBackground).mobileStepper}
          position='static'
          activeStep={actualStep}
          backButton={undefined}
          nextButton={undefined}
        />
      )}
    </>
  );
};
