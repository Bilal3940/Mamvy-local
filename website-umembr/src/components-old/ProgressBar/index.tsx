import React from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { palette } from '@/theme/constants';
import { styled } from '@mui/material';

function LinearProgressWithLabel(props: { value: number }) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: palette.dirtyWhite,
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
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={0}>
        <BorderLinearProgress variant='determinate' value={props.value} />
      </Box>
    </Box>
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
    <Box width='100%'>
      <LinearProgressWithLabel value={Math.ceil(usedPercentage)} />
      <Typography variant='button' color='white'>
        {`${displayStorage} ${unit} of ${totalStorageInGb} GB used`}
      </Typography>
    </Box>
  );
}
