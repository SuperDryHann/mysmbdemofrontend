import { FC, useContext, useEffect, useRef } from "react";
import "./ChatLog.scss";
import ReactMarkdown from "react-markdown";
import ChatContext from "../ChatContext";
import { CircularProgress } from "@mui/material";
import ReferenceButton from "./ReferenceButton/ReferenceButton";

const ChatLog: FC = () => {
  const { messages } = useContext(ChatContext);

  const { chatLoading } = useContext(ChatContext);

  // Scroll to the bottom
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  return (
    <div className="chat-log">
      <div className="chat-log-narrow">
        {/* Each message line */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === "user"
                ? "user-message-container"
                : "bot-message-container"
            }
          >
            {msg.sender === "bot" && (
              <img src="/logo_mysmb.png" alt="Bot Avatar" className="avatar" />
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
                          <ReferenceButton
                            index={index + 1}
                            referenceTitle={item.title}
                            referenceContent={item.content}
                          />
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
            <img src="/logo_mysmb.png" alt="Bot Avatar" className="avatar" />
            <div className="bot-message">
              <CircularProgress
                sx={{
                  color: "var(--component3-color)",
                  fontSize: "20px",
                }}
              />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatLog;
