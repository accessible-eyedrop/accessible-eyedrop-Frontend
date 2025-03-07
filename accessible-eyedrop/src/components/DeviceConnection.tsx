import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import deviceImage from '../images/device.png';  // Add this import at the top

import React from 'react';

interface DeviceConnectionProps {
  isConnected?: boolean;
  batteryLevel?: number;
  onDeviceClick?: () => void;
}

export default function DeviceConnection({
  isConnected = false,
  batteryLevel = 100,
  onDeviceClick
}: DeviceConnectionProps) {
  return (
    <Box sx={{ px: 3 }}>
      <Card sx={{ 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #6200ee 0%, #3700b3 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'visible',
        boxShadow: '0 8px 16px rgba(98, 0, 238, 0.2)'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                You have connected
              </Typography>
              <Typography variant="subtitle1">
                to your device
              </Typography>
              <Button 
                variant="contained" 
                onClick={onDeviceClick}
                sx={{ 
                  mt: 2, 
                  bgcolor: 'white', 
                  color: '#6200ee',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: '#6200ee'
                  },
                  fontWeight: 'bold',
                  borderRadius: 50,
                  px: 3
                }}
              >
                My Device
              </Button>
            </Box>
            <Box sx={{ 
              position: 'relative', 
              width: '100px', 
              height: '100px', 
              display: 'flex', 
              alignItems: 'center', 
              mt: -3
            }}>
              <img 
                src= "/images/device.png" 
                alt="Eye Drop Device" 
                style={{ 
                  width: '300%', 
                  height: '300%',
                  objectFit: 'contain',
                  position: 'absolute',
                  top: -50,
                  left: 0
                }} 
              />
              {/* Battery indicator */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: '#6200ee',
                  borderRadius: 1,
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px'
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-block',
                    width: '24px', // Increased from 18px
                    height: '14px', // Increased from 10px
                    border: '1px solid white',
                    borderRadius: '2px', 
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '2px', // Adjusted for larger size
                      top: '2px', // Adjusted for larger size
                      width: '16px', // Increased from 12px
                      height: '8px', // Increased from 6px
                      bgcolor: 'white'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: '-4px', // Adjusted for larger size
                      top: '4px', // Adjusted for larger size
                      width: '3px', // Increased from 2px
                      height: '6px', // Increased from 4px
                      bgcolor: 'white',
                      borderRadius: '0 1px 1px 0'
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}