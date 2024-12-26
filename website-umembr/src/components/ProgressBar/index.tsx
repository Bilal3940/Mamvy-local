import React from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { palette } from '@/theme/constants';
import { styled } from '@mui/material';

function LinearProgressWithLabel(props: { value: number }) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    width:"100%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: 'rgba(122, 133, 155, 0.2)',
      ...theme.applyStyles('dark', {
        backgroundColor:' rgba(122, 133, 155, 0.2)',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
        backgroundColor: palette.primary,
      }),
    },
  }));

  return (
        <BorderLinearProgress variant='determinate' value={props.value} />
  );
}

// Main StorageProgressBar component
export default function StorageProgressBar({
  totalStorage,
  usedStorage,
}: {
  totalStorage: number;
  usedStorage: number;
}) {
  const totalStorageInGb = totalStorage / 1024 ** 3;
  const usedStorageInGB = usedStorage / (1024 * 1024 * 1024);

  const usedPercentage = (usedStorageInGB / totalStorageInGb) * 100;

  let displayStorage;
  let unit;
  if (usedStorage > 0) {
    if (usedStorage >= 1024 * 1024 * 1024) {
      displayStorage = (usedStorage / (1024 * 1024 * 1024)).toFixed(2);
      unit = 'GB';
    } else if (usedStorage >= 1024 * 1024) {
      displayStorage = (usedStorage / (1024 * 1024)).toFixed(2);
      unit = 'MB';
    } else if (usedStorage >= 1024) {
      displayStorage = (usedStorage / 1024).toFixed(2);
      unit = 'KB';
    } else {
      displayStorage = usedStorage.toFixed(2);
      unit = 'bytes';
    }
  } else {
    displayStorage = '0.00';
    unit = 'bytes';
  }

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'} width={'100%'}  >
      <Box>
            <Typography  fontSize={'0.8rem'}  variant='button' color={palette?.background}>
        {`${displayStorage} ${unit} of ${Math.ceil(totalStorageInGb)} GB used`}
      </Typography>
      </Box>
      <Box width={'50%'} >
      <LinearProgressWithLabel value={Math.ceil(usedPercentage)} />
      </Box>

    </Box>
  );
}