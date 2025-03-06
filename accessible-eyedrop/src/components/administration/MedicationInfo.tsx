import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface MedicationInfoProps {
  medication: {
    name: string;
    dosage: string;
    frequency: string;
  };
}

export default function MedicationInfo({ medication }: MedicationInfoProps) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        bgcolor: 'rgba(0, 0, 0, 0.2)', 
        color: 'white',
        padding: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 2
      }}
    >
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box 
          sx={{ 
            bgcolor: '#6847F0', 
            width: 48, 
            height: 48, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: 1,
            marginRight: 2
          }}
        >
          <Typography variant="caption" sx={{ fontSize: 20, fontWeight: 'bold' }}>
            💧
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {medication.name}
          </Typography>
          <Typography variant="body2">
            {medication.dosage}, {medication.frequency}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
} 