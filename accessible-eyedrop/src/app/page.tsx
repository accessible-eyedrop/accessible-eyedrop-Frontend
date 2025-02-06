'use client'
import * as React from "react"; 
import {useEffect, useState, useContext} from "react";
import BottomNavigation from "@/components/BottomNavigation"; 
import { Typography, Button, Container, IconButton, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import StatusCard from "@/components/StatusCard";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Home() {
  const [notifications, setNotifications] = useState(false);
  const [progress, setProgress] = useState(50);
  
  return (
    <>
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Container>
    <Container>
      <Box>
        <Typography variant="h4">
         Hello Tony!
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
    <Container>
      <BottomNavigation />
    </Container>
    </>
    
  );
}
