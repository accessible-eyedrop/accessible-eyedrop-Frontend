import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface BottomNavigationProps {
  value: number;
  onChange: (newValue: number) => void;
}

export default function SimpleBottomNavigation({ value, onChange }: BottomNavigationProps) {
  return (
    <Box sx={{ 
      width: '100%', 
      position: 'fixed', 
      bottom: 0, 
      right: 0, 
      left: 0,
      boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Calendar" icon={<CalendarTodayIcon />} />
        <BottomNavigationAction label="Medications" icon={<AccessTimeIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}