import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

interface MedicationDetailProps {
  medicationName: string;
  dosage: string;
  time: string;
  image?: string;
  lastTaken?: string;
  onTakeNow: () => void;
  onRemindLater: () => void;
  onSkip: () => void;
}

export default function MedicationDetail({
  medicationName,
  dosage,
  time,
  image,
  lastTaken,
  onTakeNow,
  onRemindLater,
  onSkip
}: MedicationDetailProps) {
  return (
    <Container 
      sx={{ 
        bgcolor: 'background.paper', 
        borderTopLeftRadius: 16, 
        borderTopRightRadius: 16,
        py: 2,
        px: 2
      }}
    >
      <Typography variant="h6" align="center" sx={{ my: 1 }}>
        {time}
      </Typography>
      
      <Box sx={{ 
        width: '100%', 
        height: 200, 
        backgroundColor: '#f5f8ff', 
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2
      }}>
        {image ? (
          <img src={image} alt={medicationName} style={{ maxHeight: '80%', maxWidth: '80%' }} />
        ) : (
          <Box sx={{ 
            width: '60%', 
            height: '60%', 
            backgroundImage: 'linear-gradient(180deg, #e0e6ff 0%, #b0c4ff 100%)',
            borderRadius: 8,
            position: 'relative',
          }}>
            <Box sx={{
              position: 'absolute',
              top: '-15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '30%',
              height: '20%',
              backgroundColor: '#ffc0cb',
              borderRadius: 4
            }} />
          </Box>
        )}
      </Box>
      
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {medicationName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {dosage}
        </Typography>
        {lastTaken && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {lastTaken}
          </Typography>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ 
            borderRadius: 28,
            py: 1.5,
            backgroundColor: '#4c4cff'
          }}
          onClick={onTakeNow}
        >
          Use it now
        </Button>
        
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ 
            borderRadius: 28,
            py: 1.5,
            borderColor: '#4c4cff',
            color: '#4c4cff'
          }}
          onClick={onRemindLater}
        >
          Remind me later
        </Button>
      </Box>
      
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button
          variant="text"
          color="primary"
          onClick={onSkip}
          sx={{ color: '#4c4cff' }}
        >
          Skip this task
        </Button>
      </Box>
      
      <Box sx={{ 
        width: '30%', 
        height: 4, 
        backgroundColor: '#e0e0e0', 
        borderRadius: 2,
        mx: 'auto',
        mt: 2
      }} />
    </Container>
  );
}