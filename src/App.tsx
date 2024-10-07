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



function App() {
  const {worksheet} = useContext(GlobalContext);

  return (
    <div className="App">
      <Grid container sx={{height: '100vh', width: '100vw', backgroundColor: 'var(--background1-color)'}}>
        <Navigation>
          {/* Worksheet */}
            <Grid container sx={{ height: 'var(--height-main)', width: 'var(--width-main)', borderRadius: '20px', textAlign: "left", boxShadow: 'none', border: 'none'}}>
              {worksheet === 'chat' && <Chat/>}
              {/* {worksheet === 'log' && <Log/>} */}
              {worksheet === 'knowledge_base' && <KnowledgeBase/>}
            </Grid> 
        </Navigation>
      </Grid>
    </div>
  );
}

export default App;