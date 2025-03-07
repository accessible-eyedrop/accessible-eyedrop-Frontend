import React from 'react';
import { Box, Typography, Button, Card, IconButton, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CongratulationsScreen() {
  // Data that would be fetched from API in a real app
  const sessionData = {
    leftEyeDrops: 3,
    rightEyeDrops: 3,
    unsuccessfulDrops: 2,
    successRate: 80,
    medication: {
      name: "Azelastine 0.05%",
      dosage: "3 drop each eye, twice a day"
    },
    nextReplacement: {
      date: "24 September 2025",
      daysLeft: 32
    }
  };

  return (
    <Box sx={{ 
      bgcolor: "#f5f5f7", 
      height: "100vh", 
      width: "100%", 
      maxWidth: "430px", 
      mx: "auto",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>


      {/* Header */}
      <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IconButton sx={{ color: "#000" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: "500" }}>
          Congratulations
        </Typography>
        <IconButton sx={{ color: "#000" }}>
          <ShareIcon />
        </IconButton>
      </Box>

      {/* Main content */}
      <Box sx={{ px: 2, py: 1, flex: 1, overflow: "auto" }}>
        {/* Congratulations card */}
        <Card sx={{ 
          bgcolor: "#6847F0", 
          borderRadius: 4,
          color: "white",
          p: 3,
          mb: 3,
          overflow: "hidden",
          display: "flex",
          alignItems: "center"
        }}>
          <Box sx={{ 
            display: "flex",
            alignItems: "center",
            mr: 3
          }}>
            <img 
              src="/images/party-popper.png" 
              alt="party popper" 
              style={{ width: 40, height: 40 }} 
            />
          </Box>
          <Box>
            <Typography variant="h6">
              Congratulations
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Amazing Work!
            </Typography>
          </Box>
        </Card>

        {/* Usage Performance */}
        <Typography variant="h6" sx={{ mb: 2, color: "#666" }}>
          Your Usage Performance
        </Typography>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 3 
        }}>
          {/* Circle Progress */}
          <Box sx={{ 
            position: "relative", 
            width: 150, 
            height: 150, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <Box sx={{ 
              width: 150, 
              height: 150, 
              borderRadius: "50%", 
              background: `conic-gradient(#6847F0 ${sessionData.successRate}%, #eee 0)`,
              transform: "rotate(-90deg)",
              position: "absolute"
            }} />
            <Box sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: "50%", 
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1
            }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {sessionData.successRate}%
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ width: "55%" }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Box component="span" sx={{ 
                  display: "inline-block", 
                  width: 10, 
                  height: 10, 
                  borderRadius: "50%", 
                  bgcolor: "#6847F0", 
                  mr: 1 
                }} />
                <Typography variant="body2">Left Eyes Success</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", ml: 3 }}>
                {sessionData.leftEyeDrops} drops
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Box component="span" sx={{ 
                  display: "inline-block", 
                  width: 10, 
                  height: 10, 
                  borderRadius: "50%", 
                  bgcolor: "#00A3FF", 
                  mr: 1 
                }} />
                <Typography variant="body2">Right Eyes Success</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", ml: 3 }}>
                {sessionData.rightEyeDrops} drops
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Box component="span" sx={{ 
                  display: "inline-block", 
                  width: 10, 
                  height: 10, 
                  borderRadius: "50%", 
                  bgcolor: "#999", 
                  mr: 1 
                }} />
                <Typography variant="body2">Unsuccessful</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", ml: 3 }}>
                {sessionData.unsuccessfulDrops} drops
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Medication Card */}
        <Card sx={{ 
          p: 2, 
          mb: 3, 
          display: "flex", 
          alignItems: "center", 
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: "#EEE6FF", 
            borderRadius: 2, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            mr: 2 
          }}>
            <img 
              src="images/image_90.png" 
              alt="medication icon" 
              style={{ width: 24, height: 24 }} 
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {sessionData.medication.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sessionData.medication.dosage}
            </Typography>
          </Box>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </Card>

        {/* Next Replacement */}
        <Typography variant="body2" color="text.secondary">
          Estimated time for next replacement
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {sessionData.nextReplacement.date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {sessionData.nextReplacement.daysLeft} days lefts
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={70} 
          sx={{ 
            mb: 3, 
            height: 8, 
            borderRadius: 4,
            backgroundColor: "#EEE6FF",
            ".MuiLinearProgress-bar": {
              backgroundColor: "#6847F0",
            }
          }} 
        />

        {/* Usage History */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 2 
        }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Usage History
          </Typography>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            color: "#6847F0", 
            fontWeight: "bold" 
          }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#6847F0" }}>
              More
            </Typography>
            <ChevronRightIcon fontSize="small" />
          </Box>
        </Box>

        {/* Back Home Button */}
        <Button 
          variant="contained"
          onClick={() => window.location.href = '/'}
          fullWidth
          sx={{ 
            py: 1.5, 
            borderRadius: 50, 
            bgcolor: "#6847F0", 
            textTransform: "none", 
            fontSize: 16,
            mb: 3
          }}
        >
          Back Home
        </Button>
      </Box>
    </Box>
  );
}