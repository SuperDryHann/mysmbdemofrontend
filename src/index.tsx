import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {NavigationContextProvider} from './features/navigation/NavigationContext';
import {KnowledgeBaseContextProvider} from './features/knowledge_base/KnowledgeBaseContext';
import {GlobalContextProvider} from './features/global/GlobalContext';
import {ChatContextProvider} from './features/chat/ChatContext';
import PrivateRoute from "./features/auth/PrivateRoute";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <PrivateRoute>
      <GlobalContextProvider>
        <NavigationContextProvider>
          <ChatContextProvider>
          <KnowledgeBaseContextProvider>
          <App />
          </KnowledgeBaseContextProvider>
          </ChatContextProvider>
        </NavigationContextProvider>
      </GlobalContextProvider>
    </PrivateRoute>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
