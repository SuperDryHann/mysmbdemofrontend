import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface GlobalContextType {
    globalLoading: boolean;
    setGlobalLoading: Dispatch<SetStateAction<boolean>>;
    worksheet: string; // Explicitly define tenantList as an array of objects
    setWorksheet: Dispatch<SetStateAction<string>>; // Correct type for the setter,
    chatCase: string; 
    setChatCase: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType>({
    globalLoading: false,
    setGlobalLoading: () => {},
    worksheet: "company_chat",
    setWorksheet: () => {},
    chatCase: "organisation",
    setChatCase: () => {}
  });

export default GlobalContext;

export const GlobalContextProvider = ({children}: {children: ReactNode}) => {

    const [globalLoading, setGlobalLoading] = useState<boolean>(false);
    const [worksheet, setWorksheet] = useState<string>("company_chat");
    const [chatCase, setChatCase] = useState<string>("organisation");

    const contextData: GlobalContextType = {
        globalLoading,
        setGlobalLoading,
        worksheet,
        setWorksheet,
        chatCase,
        setChatCase
    }

    return(
        <GlobalContext.Provider value={contextData}>
            {children}
        </GlobalContext.Provider>
    )
}
