'use client'
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import { addAdministrationRecord } from '../firebase/api';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




interface AdministrationProcessProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const steps = [
  'Position Device',
  'Administer Drops',
  'Confirm Administration'
];

export default function AdministrationProcess({ onComplete, onCancel }: AdministrationProcessProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [angle, setAngle] = useState(0);
  const [dropCount, setDropCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [checkComplete, setCheckComplete] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleComplete = async () => {
    try {
      const record = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        drops_left_eye: dropCount,
        drops_right_eye: 0, // Update based on your needs
        success: true,
        angle: angle,
        drop_count: dropCount
      };

      await addAdministrationRecord('user_123', record);
      onComplete?.();
    } catch (err) {
      setError('Failed to save administration record');
      console.error(err);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Box>
            <Typography variant="h6">Position the Device:</Typography>
            <Typography>Align the device with your eye</Typography>
            {/* Add device positioning UI/feedback here */}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Administering Drops:</Typography>
            <Typography>Current angle: {angle}°</Typography>
            <Typography>Drops administered: {dropCount}</Typography>
            {/* Add drop administration UI/controls here */}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6">Confirm Administration:</Typography>
            <Typography>Successfully administered {dropCount} drops</Typography>
            <Typography>Final angle: {angle}°</Typography>
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
          <Box>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleComplete}
              >
                Complete
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
