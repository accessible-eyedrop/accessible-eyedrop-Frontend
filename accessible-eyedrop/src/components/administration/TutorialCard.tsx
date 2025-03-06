import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface TutorialCardProps {
  onClick: () => void;
}

export default function TutorialCard({ onClick }: TutorialCardProps) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        bgcolor: 'white', 
        color: '#6847F0',
        padding: 2,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 2
      }}
      onClick={onClick}
    >
      <Box 
        sx={{ 
          bgcolor: '#EDE9FE', 
          width: 40, 
          height: 40, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: '50%',
          marginRight: 2
        }}
      >
        <HelpOutlineIcon sx={{ color: '#6847F0' }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6847F0' }}>
          Tutorial Guidance
        </Typography>
        <Typography variant="body2" sx={{ color: '#6847F0' }}>
          See how to use Smart Drop
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        component="img"
        src="/images/device.png"
        alt="Smart Drop device"
        sx={{ 
          borderRadius: 1,
          width: 80,
          height: 'auto'
        }}
      />
    </Paper>
  );
} 