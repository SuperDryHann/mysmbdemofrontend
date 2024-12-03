import { FC, useContext } from "react";
import "./MessageInput.scss";
import globalContext from "../../global/GlobalContext";
import ChatContext from "../ChatContext";

import Chip from "@mui/material/Chip";
import LanguageIcon from "@mui/icons-material/Language";

import { MessageInputProps } from "../ChatInterface";

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const { worksheet } = useContext(globalContext);

  const { messageText, setMessageText } = useContext(ChatContext);

  const { directData, setDirectData } = useContext(ChatContext);

  const handleSend = () => {
    if (messageText.trim() !== "") {
      onSend(messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
        placeholder={
          worksheet === "customer_service_chat" ? "Ask mySMB" : "Ask myCompany"
        }
      />
      <div className="chat-action-btn">
        <Chip
          color={directData ? "primary" : undefined}
          className={!directData ? "direct-data-default" : ""}
          // icon={<LanguageIcon fontSize="small" />}
          icon={<i className="material-symbols-outlined">language</i>}
          label={directData ? "Search" : undefined}
          variant="outlined"
          onClick={() => setDirectData(!directData)}
        />
        <button onClick={handleSend} disabled={messageText === ""}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
