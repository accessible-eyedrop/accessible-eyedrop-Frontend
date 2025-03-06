import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SyncIcon from '@mui/icons-material/Sync';

interface StatusIndicatorsProps {
  isDropDetected: boolean;
  isSuitableAngle: boolean;
}

export default function StatusIndicators({ isDropDetected, isSuitableAngle }: StatusIndicatorsProps) {
  return (
    <Stack spacing={1} sx={{ marginBottom: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isDropDetected ? (
          <CheckCircleOutlineIcon sx={{ color: 'white' }} />
        ) : (
          <SyncIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        )}
        <Typography sx={{ color: isDropDetected ? 'white' : 'rgba(255, 255, 255, 0.5)' }}>
          Eye drops detected
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isSuitableAngle ? (
          <CheckCircleOutlineIcon sx={{ color: 'white' }} />
        ) : (
          <SyncIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        )}
        <Typography sx={{ color: isSuitableAngle ? 'white' : 'rgba(255, 255, 255, 0.5)' }}>
          Suitable angle
        </Typography>
      </Box>
    </Stack>
  );
} 