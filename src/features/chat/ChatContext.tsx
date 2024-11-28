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
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
    directData: boolean;
    setDirectData: Dispatch<SetStateAction<boolean>>;
    currentReferenceContent: string | undefined;
    setCurrentReferenceContent: Dispatch<SetStateAction<string | undefined>>;
}

// Create the context with no default values (undefined as initial state)
const ChatContext = createContext<ChatContextType>({
    messageText: '',
    setMessageText: () => {},
    messages: [],
    setMessages: () => {},
    chatLoading: false,
    setChatLoading: () => {},
    isSidebarOpen: false,
    setIsSidebarOpen: () => {},
    directData: false,
    setDirectData: () => {},
    currentReferenceContent: undefined,
    setCurrentReferenceContent: () => {},
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

    const [
        isSidebarOpen, 
        setIsSidebarOpen
    ] = useState<boolean>(false);

    const [
        directData, 
        setDirectData
    ] = useState<boolean>(false);

    const [
        currentReferenceContent, 
        setCurrentReferenceContent
    ] = useState<string | undefined>(undefined);



    const contextData: ChatContextType = {
        messageText,
        setMessageText,
        messages,
        setMessages,
        chatLoading,
        setChatLoading,
        isSidebarOpen,
        setIsSidebarOpen,
        directData,
        setDirectData,
        currentReferenceContent,
        setCurrentReferenceContent,
    };



    return (
        <ChatContext.Provider value={contextData}>
            {children}
        </ChatContext.Provider>
    );
};

