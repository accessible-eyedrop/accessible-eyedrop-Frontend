import { Box, Card, CardContent, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import React from 'react';

interface MedicationCardProps {
  time: string;
  condition: string;
  medicationName: string;
  instructions: string;
  progress: number;
}


export default function MedicationCard({
  time = "12:00 PM",
  condition = "Glaucoma", 
  medicationName = "Alcaftadine 0.25%",
  instructions = "3 drops each eye, twice a day",
  progress 
}: MedicationCardProps) 


{
  return (
    <Box sx={{ px: 3 }}>
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            p: 2,
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  bgcolor: '#e8e5ff', 
                  color: '#6200ee', 
                  borderRadius: '50%', 
                  width: 32, 
                  height: 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <AccessTimeIcon fontSize="small" />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {time}
              </Typography>
            </Box>
            <Box 
              sx={{ 
                bgcolor: '#e8f7ff', 
                color: '#0288d1', 
                borderRadius: 50, 
                px: 2, 
                py: 0.5,
                fontSize: '14px',
                fontWeight: 'medium'
              }}
            >
              {condition}
            </Box>
          </Box>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {medicationName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {instructions}
              </Typography>
            </Box>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress 
                  variant="determinate" 
                  value={50} 
                  size={40} 
                  sx={{ color: '#0288d1' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                  >{`${progress}/2`}</Typography>
                </Box>
              </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}