import * as React from "react";
import {useEffect} from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { Typography, Button, Container, IconButton, Box } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import StatusCard from "@/components/StatusCard";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUserInfo } from '@/context/UserInfoContext';

export default function HomeContent() {
  const [notifications, setNotifications] = React.useState(false);
  const [progress, setProgress] = React.useState(50);
  const { userInfo, loading, error, fetchUserInfo } = useUserInfo();

  useEffect(() => {
    fetchUserInfo('user_123'); // Replace with actual user ID
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h4">Add Medication</Typography>
        </Box>
      </Container>
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
    </>
  );
} 