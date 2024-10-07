import {createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';
import {Message} from './ChatInterface';
// Define the type for the context data
interface ChatContextType {
    messageText: string;
    setMessageText: Dispatch<SetStateAction<string>>;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    chatLoading: boolean;
    setChatLoading: Dispatch<SetStateAction<boolean>>;
}

// Create the context with no default values (undefined as initial state)
const ChatContext = createContext<ChatContextType>({
    messageText: '',
    setMessageText: () => {},
    messages: [],
    setMessages: () => {},
    chatLoading: false,
    setChatLoading: () => {},
});

export default ChatContext;



// Create the provider
export const ChatContextProvider = ({ children }: { children: ReactNode }) => {

    const [
        messageText,
         setMessageText
        ] = useState<string>('');

    const [
        messages,
         setMessages
        ] = useState<Message[]>([]);

    const [
        chatLoading, 
        setChatLoading
    ] = useState<boolean>(false);



    const contextData: ChatContextType = {
        messageText,
        setMessageText,
        messages,
        setMessages,
        chatLoading,
        setChatLoading,
    };



    return (
        <ChatContext.Provider value={contextData}>
            {children}
        </ChatContext.Provider>
    );
};

