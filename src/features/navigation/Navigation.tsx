import { useContext, useEffect, createElement, ReactNode} from 'react';
import { Grid, Box, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, Tooltip } from '@mui/material';
import NavigationContext from './NavigationContext';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import GlobalContext from '../global/GlobalContext';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import LogoutButton from '../auth/LogoutButton';
import { useMsal, useAccount } from "@azure/msal-react";
import useAxiosToBackend from '../auth/useAxiosToBackend';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import '../global/Global.css';



export function Navigation({children}: {children: ReactNode}) {

  const {worksheet, setWorksheet} = useContext(GlobalContext);
  const axiosToBackend = useAxiosToBackend();

  const clickNavigationChat= () => {
    setWorksheet('chat');
    console.log('chat')
  };

  const clickNavigationLog= () => {
    setWorksheet('log');
    console.log('log')
  };

  const clickKnowledgeBase= async () => {
    setWorksheet('knowledge_base');
  }

  const navigationMap = [
    {title: 'Knowledge Base', icon: FolderRoundedIcon, onclick: clickKnowledgeBase, iconColor: worksheet === 'knowledge_base' ? 'rgb(255, 218, 23)' : 'var(--primary-color)'},
    {title: 'AI', icon: MemoryRoundedIcon, onclick: clickNavigationChat, iconColor: worksheet === 'chat' ? 'rgb(255, 218, 23)' : 'var(--primary-color)'},
    // {title: 'Log', icon: ManageSearchRoundedIcon, onclick: clickNavigationLog, iconColor: worksheet === 'log' ? 'rgb(255, 218, 23)' : 'var(--primary-color)'},
  ]
  

  
  // const navigationMap = user.user_type === 'client' ? navigationMapClient : navigationMapBookkeeper;
  
  // const systemMap = user.user_type === 'client' ? systemMapClient : systemMapBookkeeper;
  

  return (
    <Grid container sx={{width:'100vw', height:'100vh'}}>

      {/* Side Navigation */}
      <Grid item xs={0.4} sx={{height:'100vh', borderRight: '1px solid var(--border-color)'}}>
        <Grid container sx={{ flexDirection: 'column', height:'100vh'}}>
          <Box sx={{ flexGrow: 1 }} />
          <List>
            {navigationMap.map((x) => (
              <ListItem key={x.title} disablePadding>
                <Tooltip
                  title={<Typography sx={{ fontSize: '14px' }}>{x.title}</Typography>}
                  placement="right"
                >
                  <ListItemButton
                    onClick={x.onclick}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'50px', width:'40px'}}
                  >
                    {createElement(x.icon, {
                      sx: { color: x.iconColor, fontSize: 'var(--icon-size)', mb: 0 },
                    })}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mb:5, border: 'none'}} />
          </Grid>
      </Grid>


      <Grid item xs={11.6}>
        <Grid container sx={{ display: 'flex'}}>
      
          {/* Main Content */}
          <Grid item xs={12} sx= {{width:'94.5vw', height:'93.5vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Grid container sx={{width: 'var(--width-main)', height: 'var(--height-main)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Navigation;