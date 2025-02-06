import * as React from "react";
import {useEffect, useState, useContext} from "react";
import { Typography, Button, Container, IconButton, Box, Card, CardContent } from "@mui/material";
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import HistoryIcon from '@mui/icons-material/History';

export default function StatusCard() {
    const [battery, setBattery] = useState(98);
    const [history, setHistory] = useState(25);
    
  return (
    <Box>
      <Card>
        <CardContent>
        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'bold' }}>
        Your device is connected
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' , mb: 1.5}}>
        <Box sx={{ mr: 0.5 }}>
        <BatteryFullIcon />
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>98%</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 0.5 }}>
        <HistoryIcon />
        </Box>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>You have 25 intake History</Typography>
      </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
