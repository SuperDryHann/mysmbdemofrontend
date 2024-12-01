import React, { useEffect, useContext, useRef } from "react";
import "./Chat.scss";
import { Message } from "./ChatInterface";
import ChatContext from "./ChatContext";
import { app, authentication } from "@microsoft/teams-js";
import GlobalContext from "../global/GlobalContext";

import MessageInput from "./MessageInput/MessageInput";
import ChatLog from "./ChatLog/ChatLog";
import DataSourceView from "./DataSourceView/DataSourceView";

// Entire chat component
const Chat: React.FC = () => {
  const { chatCase, setGlobalLoading } = useContext(GlobalContext);

  const { setMessages, setChatLoading } = useContext(ChatContext);

  const currentBotMessageId = useRef<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null); // Ref to store WebSocket instance
  const initializeWebSocket = async () => {
    setGlobalLoading(true);
    try {
      await app.initialize();
      const accessToken = await authentication.getAuthToken();
      console.log("Access token:", accessToken);
      const ws = new WebSocket(
        `${process.env.REACT_APP_BACKEND_URL_WS}/chat/?access_token=${accessToken}&case=${chatCase}`
      );

      ws.onopen = () => {
        console.log("WebSocket connected");
        setGlobalLoading(false);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message:", data);

        // Initiate bot message
        if (currentBotMessageId.current === null) {
          setChatLoading(false);
          const botMessage: Message = {
            id: Date.now(),
            text: "",
            sender: "bot",
            references: undefined,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          currentBotMessageId.current = botMessage.id;
        }

        // Update the bot message
        if (data.is_completed) {
          // when final event
          console.log("Chat completed");
          const botId = currentBotMessageId.current;
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botId
                ? { ...msg, text: data.message, references: data.references }
                : msg
            )
          );
          currentBotMessageId.current = null;
        } else {
          // when intermediate event
          const botId = currentBotMessageId.current;
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botId ? { ...msg, text: data.message } : msg
            )
          );
        }
      };

      ws.onclose = () => {};

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Failed to initialize WebSocket:", error);
      const errorMessage: Message = {
        id: Date.now(),
        text: "Sorry, something went wrong.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };
  
  useEffect(() => {
    // Initialize WebSocket connection when component mounts

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
      sender: "user",
    };

    // Add user message to the chat log
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Send message via WebSocket if connected
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: text }));
    } else {
      // Optionally handle the case where WebSocket is not connected
      console.error("WebSocket is not connected.");
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Connection lost. Please refresh the page.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setChatLoading(false);
    }
  };

  return (
    <div className="app-container">
      <DataSourceView />
      <ChatLog />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
