import React, {useState, useEffect, useContext, useRef} from 'react';
import './Chat.css'
import {Reference, Message, MessageInputProps} from './ChatInterface';
import ChatContext from './ChatContext';
import {app, authentication} from '@microsoft/teams-js'; 
import ReactMarkdown from 'react-markdown';


const LoadingImage = () => {
  return (
    <div className="loading">
      Thinking...
    </div>
  );
};



// Chat log component
const ChatLog: React.FC = () => {
  const {
    messages,
  } = useContext(ChatContext);

  const {
    chatLoading,
  } = useContext(ChatContext);



  // Scroll to the bottom
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);




  return (
    <div className="chat-log">
      <div className="chat-log-narrow">


        {/* Each message line */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === 'user'
                ? 'user-message-container'
                : 'bot-message-container'
            }
          >
            {msg.sender === 'bot' && (
              <img
                src="/donut_logo.png"
                alt="Bot Avatar"
                className="avatar"
              />
            )}
            <div className={`${msg.sender}-message`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>



              {/* Reference list */}
              {msg.references?.[0] && (
                <>
                  <hr className="divider" />
                  <ul className="reference">
                    {msg.references.map((item, index) => (
                      <li key={index} className="reference-item">
                        <div className="reference-button-container">
                          <button
                            className="reference-button"
                          >
                            <sup>{index + 1}</sup> <em>{item.title}</em>
                          </button>
                          <span className="tooltip">{item.content}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}



        {/* Loading image*/}
        {chatLoading && (
          <div className="bot-message-container">
            <img
              src="/donut_logo.png"
              alt="Bot Avatar"
              className="avatar"
            />
            <div className="bot-message">
              <LoadingImage />
            </div>
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>
    </div>
  );
};



// Message input component
const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const {
    messageText,
    setMessageText
  } = useContext(ChatContext);
  

  const handleSend = () => {
    if (messageText.trim() !== '') {
      onSend(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Message MySMB"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};



// Entire chat component
const Chat: React.FC = () => {
  const { setMessages, setChatLoading } = useContext(ChatContext);

  const currentBotMessageId = useRef<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null); // Ref to store WebSocket instance

  useEffect(() => {
    // Initialize WebSocket connection when component mounts
    const initializeWebSocket = async () => {
      try {
        await app.initialize();
        const accessToken = await authentication.getAuthToken();
        const ws = new WebSocket(`${process.env.REACT_APP_BACKEND_URL_WS}/chat/?access_token=${accessToken}`);

        ws.onopen = () => {
          console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          // Initiate bot message
          if (currentBotMessageId.current === null) {
            setChatLoading(false);
            const botMessage: Message = {
              id: Date.now(),
              text: '',
              sender: 'bot',
              references: undefined,
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            currentBotMessageId.current = botMessage.id;
          }

          // Update the bot message
          if (data.is_completed) { // when final event
            console.log('Chat completed');
            const botId = currentBotMessageId.current;
            setMessages((prevMessages) => prevMessages.map((msg) => msg.id === botId ? { ...msg, text: data.message, references: data.references } : msg));
            currentBotMessageId.current = null;
          } else { // when intermediate event
            const botId = currentBotMessageId.current;
            setMessages((prevMessages) => prevMessages.map((msg) => msg.id === botId ? { ...msg, text: data.message } : msg));
          }
        };

        ws.onclose = () => {
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        wsRef.current = ws;
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
        const errorMessage: Message = {
          id: Date.now(),
          text: 'Sorry, something went wrong.',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    };

    initializeWebSocket();

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = (text: string) => {
    setChatLoading(true);

    // Add user input as user message in messages state
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
    };

    // Add user message to the chat log
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Send message via WebSocket if connected
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: text }));
    } else {
      // Optionally handle the case where WebSocket is not connected
      console.error('WebSocket is not connected.');
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Connection lost. Please refresh the page.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setChatLoading(false);
    }
  };

  return (
    <div className="app-container">
      <ChatLog />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;