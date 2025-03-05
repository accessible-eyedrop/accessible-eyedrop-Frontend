'use client'
import * as React from "react";
import { useEffect, useState } from "react";
import { 
  Typography, 
  Box, 
  Container, 
  IconButton, 
  Button,
  Card, 
  CardContent,
  Avatar,
  Badge
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BottomNavigation from "@/components/BottomNavigation";
import { useUserInfo } from '@/context/UserInfoContext';
import AdministrationProcess from './AdministrationProcess';
import UserGreeting from './UserGreeting';
import DeviceConnection from './DeviceConnection';
import ProgressCircle from './ProgressCircle';
import MedicationCard from './MedicationCard';

export default function HomeContent() {
  const [currentTab, setCurrentTab] = useState(0);
  const { userInfo, loading, error, fetchUserInfo } = useUserInfo();
  const [completedDrops, setCompletedDrops] = useState(3);
  const [totalDrops, setTotalDrops] = useState(5);
  const progressValue = (completedDrops / totalDrops) * 100;
  const [individualProgress, setIndividualProgress] = useState(1);

  useEffect(() => {
    fetchUserInfo('user_123');
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case 2: // Medications tab
        return <AdministrationProcess />;
      default:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            pb: 10, 
            background: 'linear-gradient(180deg, #f0f8ff 0%, #ffffff 100%)', 
            minHeight: '100vh',
            overflowY: 'auto'
          }}>
            {/* User greeting section */}
            <UserGreeting />

            {/* Device connection card */}
            <DeviceConnection />

            {/* Progress circle */}
            <ProgressCircle progressValue={progressValue} completedDrops={completedDrops} totalDrops={totalDrops} />

            {/* Medication card */}
            <MedicationCard progress={individualProgress} time="12:00 PM" condition="Glaucoma" medicationName="Alcaftadine 0.25%" instructions="3 drops each eye, twice a day" />
          </Box>
        );
    }
  };

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 3 }}>Error: {error}</Box>;
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      overflowY: 'auto'
    }}>
      {renderContent()}
      <BottomNavigation value={currentTab} onChange={(val) => setCurrentTab(val)} />
    </Box>
  );
}