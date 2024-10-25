import './App.css';
import React, { useState, useContext} from 'react';
import Grid from '@mui/material/Grid';
import GlobalContext from './features/global/GlobalContext';
import './features/global/Global.css';
import Navigation from './features/navigation/Navigation';
import Chat from './features/chat/Chat';
import Log from './features/log/Log';
import KnowledgeBase from './features/knowledge_base/KnowledgeBase';
import AuthTestButton from './features/auth/AuthTestButton';
import {ChatContextProvider} from './features/chat/ChatContext';
import {KnowledgeBaseContextProvider} from './features/knowledge_base/KnowledgeBaseContext';
import TestButton from './TestButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';







function App() {
  const {
    worksheet,
  globalLoading,
  setGlobalLoading
} = useContext(GlobalContext);

  return (
    <div className="App">
      <Grid container  sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: worksheet === "company_chat" || worksheet === "company_knowledge_base" ? 'url(/background1.png)' : 'url(/background2.png)',
        backgroundSize: 'cover', // Ensures the image covers the entire area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      }}>
        <Navigation key={worksheet}>
          <ChatContextProvider>
          <KnowledgeBaseContextProvider>
          {/* Worksheet */}
          {worksheet === 'bi_chat' && <Chat/>}
          {worksheet === 'company_chat' && <Chat/>}
          {worksheet === 'customer_service_chat' && <Chat/>}
          {/* {worksheet === 'log' && <Log/>} */}
          {worksheet === 'bi_knowledge_base' && <KnowledgeBase/>}
          {worksheet === 'company_knowledge_base' && <KnowledgeBase/>}
          {worksheet === 'customer_service_knowledge_base' && <KnowledgeBase/>}
          </KnowledgeBaseContextProvider>
          </ChatContextProvider>
        </Navigation>



        <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
        open={globalLoading}
        >
          <CircularProgress sx={{color: 'var(--component3-color)'}}/>
        </Backdrop>



      </Grid>
    </div>
  );
}

export default App;