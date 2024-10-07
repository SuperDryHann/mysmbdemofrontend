import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface GlobalContextType {
    globalLoading: Boolean;
    setGlobalLoading: Dispatch<SetStateAction<Boolean>>;
    worksheet: String; // Explicitly define tenantList as an array of objects
    setWorksheet: Dispatch<SetStateAction<String>>; // Correct type for the setter
}

const GlobalContext = createContext<GlobalContextType>({
    globalLoading: false,
    setGlobalLoading: () => {},
    worksheet: "chat",
    setWorksheet: () => {},
  });

export default GlobalContext;

export const GlobalContextProvider = ({children}: {children: ReactNode}) => {

    const [globalLoading, setGlobalLoading] = useState<Boolean>(false);
    const [worksheet, setWorksheet] = useState<String>("chat");

    const contextData: GlobalContextType = {
        globalLoading,
        setGlobalLoading,
        worksheet,
        setWorksheet
    }

    return(
        <GlobalContext.Provider value={contextData}>
            {children}
        </GlobalContext.Provider>
    )
}
