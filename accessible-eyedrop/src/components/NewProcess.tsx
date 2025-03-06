import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { addAdministrationRecord } from '../firebase/api';
import MedicationInfo from './administration/MedicationInfo';
import EyeSelector from './administration/EyeSelector';
import StatusIndicators from './administration/StatusIndicators';
import ProgressCircle from './administration/ProgressCircle';
import TutorialCard from './administration/TutorialCard';

interface EyeDropAdministrationProps {
  onComplete?: () => void;
  medication?: {
    name: string;
    dosage: string;
    frequency: string;
  };
}

export default function EyeDropAdministration({ 
  onComplete, 
  medication = {
    name: 'Azelastine 0.05%',
    dosage: '3 drop each eye',
    frequency: 'twice a day'
  }
}: EyeDropAdministrationProps) {
  const [currentEye, setCurrentEye] = useState<'left' | 'right'>('left');
  const [dropCount, setDropCount] = useState<number>(0);
  const [targetDrops, setTargetDrops] = useState<number>(3);
  const [isDropDetected, setIsDropDetected] = useState<boolean>(false);
  const [isSuitableAngle, setIsSuitableAngle] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const handleEyeChange = (eye: 'left' | 'right') => {
    setCurrentEye(eye);
    setDropCount(0);  // Reset drop count when switching eyes
  };

  const simulateDropDetection = () => {
    setIsDropDetected(true);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  
  return (
    <Box 
      sx={{ 
        height: '100vh',
        background: 'linear-gradient(to bottom, #4400FF, #875CFF)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 2
      }}
    >
      <MedicationInfo medication={medication} />
      
      <EyeSelector 
        currentEye={currentEye} 
        onEyeChange={handleEyeChange} 
      />

      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          marginBottom: 2 
        }}
      >
        Tilt a little more
      </Typography>

      <StatusIndicators 
        isDropDetected={isDropDetected}
        isSuitableAngle={isSuitableAngle}
      />

      <ProgressCircle 
        dropCount={dropCount}
        targetDrops={targetDrops}
        onPauseToggle={togglePause}
      />

      <TutorialCard onClick={simulateDropDetection} />
    </Box>
  );
} 