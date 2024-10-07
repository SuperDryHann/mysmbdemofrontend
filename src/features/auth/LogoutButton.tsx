import { useMsal } from "@azure/msal-react";
import { Tooltip, Typography, IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";

const LogoutButton = () => {
  const { instance, inProgress } = useMsal(); // Track the MSAL process status

  const handleLogout = async () => {
    if (inProgress === 'none') { // Ensure no process is ongoing before logout
      try {
        await instance.logoutRedirect();  // Use logoutRedirect instead of logoutPopup
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      console.log('A process is already in progress');
    }
  };

  return (
    <Tooltip
    title={<Typography sx={{ fontSize: '16px' }}>Logout</Typography>}
    placement="bottom"
    >
      <IconButton
        onClick={handleLogout}
        disabled={inProgress !== 'none'}
        sx={{
          color: 'var(--primary-color)',
        }}
      >
        <LogoutIcon 
        sx={{
          fontSize: 'var(--icon-size)',
        }}/>
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
