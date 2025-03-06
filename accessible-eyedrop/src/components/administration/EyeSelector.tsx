import React from 'react';
import { Box, Button } from '@mui/material';

interface EyeSelectorProps {
  currentEye: 'left' | 'right';
  onEyeChange: (eye: 'left' | 'right') => void;
}

export default function EyeSelector({ currentEye, onEyeChange }: EyeSelectorProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
      <Button
        variant={currentEye === 'left' ? 'contained' : 'outlined'}
        fullWidth
        sx={{ 
          bgcolor: currentEye === 'left' ? 'white' : 'transparent',
          color: currentEye === 'left' ? '#4400FF' : 'white',
          borderColor: 'white',
          '&:hover': {
            bgcolor: currentEye === 'left' ? 'white' : 'rgba(255, 255, 255, 0.1)',
          },
          borderRadius: 8,
          py: 1.5
        }}
        onClick={() => onEyeChange('left')}
      >
        Left Eye
      </Button>
      <Button
        variant={currentEye === 'right' ? 'contained' : 'outlined'}
        fullWidth
        sx={{ 
          bgcolor: currentEye === 'right' ? 'white' : 'transparent',
          color: currentEye === 'right' ? '#4400FF' : 'white',
          borderColor: 'white',
          '&:hover': {
            bgcolor: currentEye === 'right' ? 'white' : 'rgba(255, 255, 255, 0.1)',
          },
          borderRadius: 8,
          py: 1.5
        }}
        onClick={() => onEyeChange('right')}
      >
        Right Eye
      </Button>
    </Box>
  );
} 