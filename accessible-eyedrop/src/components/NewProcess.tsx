import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MedicationInfo from './administration/MedicationInfo';
import EyeSelector from './administration/EyeSelector';
import StatusIndicators from './administration/StatusIndicators';
import ProgressCircle from './administration/ProgressCircle';
import TutorialCard from './administration/TutorialCard';
import { useDeviceDataListener } from '../firebase/listener';

interface AdministrationRecord {
  angle: number;
  drop_count: number;
  id?: string;
  date: string;
  time: string;
  drops_left_eye: number;
  drops_right_eye: number;
  success: boolean;
  timestamp: number;
}

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
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [angleMessage, setAngleMessage] = useState<string>("Tilt a little more");
  const [success, setSuccess] = useState<boolean>(false);
  
  // Set up the passive listener for device data
  const userId = 'user_123'; // Get this from your auth context or props
  const collectionPath = `Users/${userId}/administration_records`;
  const { latestDocument, isListening, error } = useDeviceDataListener(collectionPath);
  
  // Update UI when new device data is received
  useEffect(() => {
    if (latestDocument) {
      const record = latestDocument as AdministrationRecord;
      console.log('Processing new administration record:', record);
      
      // Check if this is a new record (to avoid processing old data on initial load)
      const isNewRecord = record.timestamp > (Date.now() / 1000) - 10; // Convert to seconds and allow 10 sec buffer
      
      if (isNewRecord) {
        console.log('Processing new record with timestamp:', record.timestamp);
        
        // Update angle information
        setCurrentAngle(record.angle);
        
        // Determine angle suitability and message
        if (record.angle < -90) {
          setIsSuitableAngle(false);
          setAngleMessage("Too much tilt");
        } else if (record.angle > -45) {
          setIsSuitableAngle(false);
          setAngleMessage("Not enough tilt");
        } else {
          setIsSuitableAngle(true);
          setAngleMessage("Perfect Angle");
        }
        
        // Update success status
        setSuccess(record.success);
        
        // Update drop information based on success status
        if (record.success) {
          setIsDropDetected(true);
          // Increment drop count using functional update to avoid stale state
          setDropCount(prevCount => prevCount + 1);
          console.log('Drop successful! Incrementing count');
        }
        
        // Optional: Notify of completion if needed
        if (record.success && onComplete && 
            ((currentEye === 'left' && record.drops_left_eye >= targetDrops) || 
             (currentEye === 'right' && record.drops_right_eye >= targetDrops))) {
          onComplete();
        }
      } else {
        console.log('Skipping old record with timestamp:', record.timestamp);
      }
    }
  }, [latestDocument, currentEye, targetDrops, onComplete]);

  const handleEyeChange = (eye: 'left' | 'right') => {
    setCurrentEye(eye);
    setDropCount(0);
    setIsDropDetected(false);
  };

  // This function is just for tutorial/demo purposes
  // In the real app, the device would create the Firebase documents
  const simulateDropDetection = () => {
    console.log('Button clicked - in a real scenario, this would trigger the device');
    // No Firebase write here - the device would do that
  };

  const togglePause = () => {
    // This would communicate with the device to pause/resume
    console.log('Toggle pause requested');
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
        {angleMessage}
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
      
      {error && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255, 0, 0, 0.2)', 
            p: 1, 
            borderRadius: 1,
            mt: 2
          }}
        >
          Error: {error}
        </Typography>
      )}
      
      {isListening && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            p: 1, 
            mt: 1,
            fontSize: '0.75rem'
          }}
        >
          {latestDocument ? 
            `Last update: ${new Date(latestDocument.timestamp).toLocaleTimeString()}` :
            'Waiting for device data...'
          }
        </Typography>
      )}
    </Box>
  );
}