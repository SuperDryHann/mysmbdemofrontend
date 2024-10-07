import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the type for the context data
interface NavigationContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    sidebar: boolean;
    setSidebar: Dispatch<SetStateAction<boolean>>;
}

// Create the context with no default values (undefined as initial state)
const NavigationContext = createContext<NavigationContextType>({
    open: true,
    setOpen: () => {},
    sidebar: false,
    setSidebar: () => {},
});

export default NavigationContext;



// Create the provider
export const NavigationContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState<boolean>(true);
    const [sidebar, setSidebar] = useState<boolean>(false);

    const contextData: NavigationContextType = {
        open,
        setOpen,
        sidebar,
        setSidebar,
    };

    return (
        <NavigationContext.Provider value={contextData}>
            {children}
        </NavigationContext.Provider>
    );
};

