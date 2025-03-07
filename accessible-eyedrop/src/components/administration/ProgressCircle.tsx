import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { useRouter } from 'next/navigation';

interface ProgressCircleProps {
  dropCount: number;
  targetDrops: number;
  onPauseToggle: () => void;
}

export default function ProgressCircle({ dropCount, targetDrops, onPauseToggle }: ProgressCircleProps) {
  const router = useRouter();

  const handlePauseClick = () => {
    // Call the original onPauseToggle function
    onPauseToggle();
    
    // Navigate to the usage page
    router.push('/usage');
  };

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 4,
        flexGrow: 1
      }}
    >
      {/* Background circle */}
      <Box
        sx={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Animated circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 280,
          height: 280,
          animation: 'spin 4s linear infinite',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      >
        <svg width="280" height="280" viewBox="0 0 280 280">
          {/* First arc - increased radius */}
          <path
            d="M140,5 A135,135 0 0,1 220,30"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Second arc */}
          <path
            d="M140,5 A135,135 0 0,1 220,30"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(120, 140, 140)"
          />
          {/* Third arc */}
          <path
            d="M140,5 A135,135 0 0,1 220,30"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(240, 140, 140)"
          />
        </svg>
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          {dropCount}/{targetDrops}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Drops
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 200, marginBottom: 3 }}>
          Press the button and the eye drops will drip automatically.
        </Typography>
        <IconButton 
          onClick={handlePauseClick}
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.3)', 
            padding: 2
          }}
        >
          <PauseCircleOutlineIcon sx={{ fontSize: 30, color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  );
} 