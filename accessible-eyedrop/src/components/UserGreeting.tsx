import { Avatar } from "@mui/material";

import { Typography, Box, IconButton } from "@mui/material";

import { useUserInfo } from '@/context/UserInfoContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

export default function UserGreeting() {
  const { userInfo } = useUserInfo();

  return (
    <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        px: 3,
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src="https://i.pravatar.cc/300" 
            alt={userInfo?.name || 'User'}
            sx={{ width: 50, height: 50, border: '2px solid #6200ee' }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              Hello {userInfo?.name || 'Julia'}!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#333', fontWeight: 'medium' }}>
              Good Morning
            </Typography>
          </Box>
        </Box>
        <IconButton sx={{ color: '#6200ee' }}>
          <Badge color="error" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
  );
}
