'use client'
import * as React from "react";
import {useEffect} from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { Typography, Button, Container, IconButton, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import StatusCard from "@/components/StatusCard";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUserInfo } from '@/context/UserInfoContext';
import AdministrationPage from './Administration';

export default function HomeContent() {
  const [notifications, setNotifications] = React.useState(false);
  const [progress, setProgress] = React.useState(50);
  const { userInfo, loading, error, fetchUserInfo } = useUserInfo();
  const [currentTab, setCurrentTab] = React.useState(0);

  useEffect(() => {
    fetchUserInfo('user_123');
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case 2: // Medications tab
        return <AdministrationPage />;
      default:
        return (
          <>
            <Container>
              <Box>
                <Typography variant="h4">
                  Hello {userInfo?.name || 'User'}!
                </Typography>
                <Typography variant="subtitle1">
                  Good Morning!
                </Typography>
              </Box>
            </Container>
            <Container>
              <StatusCard />
            </Container>
            <Container>
              <Box>
                <Typography variant="h4">
                  Your have no plans yet
                </Typography>
                <Box sx={{ width: '70%', height: '70%', margin: '0 auto' }}>
                  <CircularProgressbar value={progress} text={`${progress}%`} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
                  <Button variant="contained" color="primary" sx={{ width: '80%' }}>
                    Add Medication Plan
                  </Button>
                </Box>
              </Box>
            </Container>
          </>
        );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Container>
      {renderContent()}
      <Container>
        <BottomNavigation value={currentTab} onChange={(val) => setCurrentTab(val)} />
      </Container>
    </>
  );
} 