import { useContext, useEffect, createElement, ReactNode} from 'react';
import { Grid, Box, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, Tooltip, IconButton} from '@mui/material';
import NavigationContext from './NavigationContext';
import GlobalContext from '../global/GlobalContext';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import LogoutButton from '../auth/LogoutButton';
import { useMsal, useAccount } from "@azure/msal-react";
import useAxiosToBackend from '../auth/useAxiosToBackend';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';import '../global/Global.css';
import './Navigation.css';



export function Navigation({children}: {children: ReactNode}) {

  const {
    worksheet, 
    setWorksheet,
    chatCase,
    setChatCase
  } = useContext(GlobalContext);

  const axiosToBackend = useAxiosToBackend();

  const clickBIChat= async () => {
    setWorksheet('bi_chat');
  }

  const clickCompanyChat =() =>{
    setWorksheet('company_chat');
    setChatCase('organisation');
  }

  const clickCustomerServiceChat= () => {
    setWorksheet('customer_service_chat');
    setChatCase('customerservice');
  };

  const clickEmailClassifier= () => {
    setWorksheet('email_classifier');
  };

  // const clickNavigationLog= () => {
  //   setWorksheet('log');
  //   console.log('log')
  // };

  const clickKnowledgeBase = async () => {
    switch (worksheet) {
      case 'bi_chat':
        setWorksheet('bi_knowledge_base');
        break;
      case 'company_chat':
        setWorksheet('company_knowledge_base');
        break;
      case 'customer_service_chat':
        setWorksheet('customer_service_knowledge_base');
        break;
    }
  }

  const navigationMap = [
    // {
    //   title: 'Ask Hannah',
    //   icon: EmailRoundedIcon,
    //   onclick: clickEmailClassifier,
    //   iconColor: worksheet === 'email_classifier' ? 'var(--component3-color)' : 'var(--primary-color)',
    // },
    // {
    //   title: 'Ask mySMB',
    //   icon: AssessmentRoundedIcon,
    //   onclick: clickBIChat,
    //   iconColor: worksheet === 'bi_chat' ? 'var(--component3-color)' : 'var(--primary-color)',
    // },
    {
      title: 'Ask myCompany',
      icon: ApartmentRoundedIcon,
      onclick: clickCompanyChat,
      iconColor: worksheet === 'company_chat' || worksheet ==='company_knowledge_base' ? 'var(--component3-color)' : 'var(--primary-color)',
    },
    {
      title: 'Ask mySMB',
      icon: QuestionMarkRoundedIcon,
      onclick: clickCustomerServiceChat,
      iconColor: worksheet === 'customer_service_chat' || worksheet ==='customer_service_knowledge_base' ? 'var(--component3-color)' : 'var(--primary-color)',
    },
  ];

  return (
  <div className="navigation">
    {/* AppBar */}
    <header className="appbar">
      <Tooltip
        title={<Typography sx={{ fontSize: '12px' }}>{"Knowledge Base"}</Typography>}
        placement="right"
      >
        <IconButton onClick={clickKnowledgeBase}>
            <FolderRoundedIcon 
              sx={{
                color: worksheet.includes("knowledge_base") ? 'var(--component3-color)' : 'var(--primary-color)',
                fontSize: 'var(--icon-size)'
                }}/>
        </IconButton>
      </Tooltip>
    </header>

    {/* Side Navigation */}
    <header className="sidebar-header"></header>
    <nav className="sidebar">
      <List>
        {navigationMap.map((x) => (
          <ListItem key={x.title} disablePadding>
            <Tooltip
              title={<Typography sx={{ fontSize: '12px' }}>{x.title}</Typography>}
              placement="right"
            >
              <IconButton
                onClick={x.onclick}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'40px', width:'40px'}}
              >
                {createElement(x.icon, {
                  sx: { color: x.iconColor, fontSize: 'var(--icon-size)', mb: 0 },
                })}
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
    </List>
    </nav>

    {/* Main Content */}
    <main className="content">
      {children}
    </main>
  </div>
  );
}

export default Navigation;