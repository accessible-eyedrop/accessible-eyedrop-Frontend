import { Box, Typography } from '@mui/material';
import React from 'react';

interface ProgressCircleProps {
  progressValue: number;
  completedDrops: number;
  totalDrops: number;
}

export default function ProgressCircle({ progressValue, completedDrops, totalDrops }: ProgressCircleProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      pt: 3,
      pb: 2
    }}>
      <Box 
        sx={{ 
          position: 'relative', 
          width: 300, 
          height: 300, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        {/* Background circle */}
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            background: '#f0f0f0' 
          }} 
        />
        
        {/* Progress arc */}
        <Box sx={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          borderRadius: '50%',
          background: `conic-gradient(#6200ee ${progressValue}%, transparent 0)`,
          transform: 'rotate(-90deg)'
        }} />
        
        {/* Inner white circle */}
        <Box 
          sx={{ 
            position: 'absolute', 
            width: '80%', 
            height: '80%', 
            borderRadius: '50%', 
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }} 
        >
          <Typography variant="subtitle2" sx={{ color: '#666', mb: 0 }}>
            Today
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                color: '#6200ee', 
                fontWeight: 'bold', 
                fontSize: '60px', 
                lineHeight: 1
              }}
            >
              {completedDrops}
            </Typography>
            <Typography variant="h6" sx={{ color: '#666' }}>
              /{totalDrops}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
            Eye Drops
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}