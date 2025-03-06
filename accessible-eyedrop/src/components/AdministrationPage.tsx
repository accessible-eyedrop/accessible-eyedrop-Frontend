import React, { useState } from 'react';
import EyeDropAdministration from './NewProcess';
import { Box, Container } from '@mui/material';
import BottomNavigation from './BottomNavigation';
import { useRouter } from 'next/navigation';

export default function AdministrationPage() {
  const [currentTab, setCurrentTab] = useState(2); // Medications tab
  const router = useRouter();

  const handleCompletion = () => {
    // Go back to home screen
    setCurrentTab(0);
    router.push('/');
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <EyeDropAdministration onComplete={handleCompletion} />
      
      {/* Only show bottom navigation if needed */}
      {false && (
        <Container sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation value={currentTab} onChange={(val) => setCurrentTab(val)} />
        </Container>
      )}
    </Box>
  );
}