'use client'
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import { addAdministrationRecord, subscribeToAdministrationRecord, getLatestAdministrationRecordId } from '../firebase/api';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

// Import or define the interface
interface AdministrationRecord {
  timestamp: number;  // Unix timestamp in seconds
  drops_left_eye: number;
  success: boolean;
  angle: number; //Positive: Too much tilt ; Negative: Not enough Tile
}

interface AdministrationProcessProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const steps = [
  'Position Device',
  'Confirm Administration'
];

export default function AdministrationProcess({ onComplete, onCancel }: AdministrationProcessProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [angle, setAngle] = useState(0);
  const [dropCount, setDropCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [checkComplete, setCheckComplete] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<AdministrationRecord | null>(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Add useEffect to set up the database listener
  useEffect(() => {
    const userId = 'user_123';
    const recordsRef = collection(db, `Users/${userId}/administration_records`);
    const q = query(
      recordsRef,
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    console.log('Setting up Firestore listener...'); // Debug log

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Snapshot received:', snapshot.size); // Debug log
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        console.log('Reading administration record:', snapshot.docs[0].id, data);
        
        const latestRecord: AdministrationRecord = {
          timestamp: data.timestamp || Math.floor(Date.now() / 1000),
          drops_left_eye: data.drops_left_eye || 0,
          success: Boolean(data.success),
          angle: data.angle || 0
        };
        
        setCurrentRecord(latestRecord);
        setAngle(latestRecord.angle);
        setDropCount(latestRecord.drops_left_eye);
        setCheckComplete(true);
        setActiveStep(1);
      } else {
        console.log('No documents found in snapshot'); // Debug log
      }
    }, (error) => {
      console.error('Firestore listener error:', error);
      setError('Failed to listen to administration records');
      setCheckComplete(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  const handleComplete = async () => {
    try {
      const record: AdministrationRecord = {
        timestamp: Math.floor(Date.now() / 1000),
        drops_left_eye: dropCount,
        success: true,
        angle: angle
      };

      console.log('Saving record:', record);
      await addAdministrationRecord('user_123', record);
      onComplete?.();
    } catch (err) {
      console.error('Error in handleComplete:', err);
      setError('Failed to save administration record');
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6">Align the device:</Typography>
            <Typography>Align the device with your eye</Typography>
            {/* Add device positioning UI/feedback here */}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6">Confirm Administration:</Typography>
            {currentRecord ? (
              <>
                <Typography>Successfully administered {dropCount} drops</Typography>
                <Typography>Final angle: {angle}°</Typography>
                <Typography>Drop Successful: {currentRecord.success ? 'Yes' : 'No'}</Typography>
                <Typography>Time: {formatTimestamp(currentRecord.timestamp)}</Typography>
              </>
            ) : (
              <>
                <Typography>Ready to administer drops</Typography>
                <Typography>Current angle: {angle}°</Typography>
              </>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box sx={{ width: '100%', mt: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          {checkComplete ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          ) : (
            <CircularProgress />
          )}
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            onClick={onCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleComplete}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
