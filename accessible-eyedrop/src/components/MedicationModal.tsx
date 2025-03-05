import React, { useState } from 'react';
import { Box, Modal, Fade, Backdrop, Slide } from '@mui/material';
import MedicationDetail from './MedicationDetail';

interface MedicationData {
  id: string;
  name: string;
  dosage: string;
  time: string;
  image?: string;
  lastTaken?: string;
}

interface MedicationOverlayProps {
  open: boolean;
  onClose: () => void;
  medication: MedicationData;
  onTakeNow: (id: string) => void;
  onRemindLater: (id: string) => void;
  onSkip: (id: string) => void;
}

export default function MedicationOverlay({
  open,
  onClose,
  medication,
  onTakeNow,
  onRemindLater,
  onSkip
}: MedicationOverlayProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)'
          }
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1300
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box 
          sx={{ 
            width: '100%',
            outline: 'none',
            position: 'relative',
            zIndex: 1301
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <MedicationDetail
            medicationName={medication.name}
            dosage={medication.dosage}
            time={medication.time}
            image={medication.image}
            lastTaken={medication.lastTaken}
            onTakeNow={() => {
              onTakeNow(medication.id);
              onClose();
            }}
            onRemindLater={() => {
              onRemindLater(medication.id);
              onClose();
            }}
            onSkip={() => {
              onSkip(medication.id);
              onClose();
            }}
          />
        </Box>
      </Slide>
    </Modal>
  );
}