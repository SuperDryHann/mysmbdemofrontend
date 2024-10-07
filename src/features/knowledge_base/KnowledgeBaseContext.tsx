import {createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';
import {KnowledgeBaseFile} from './KnowledgeBaseInterface';

// Define the type for the context data
interface KnowledgeBaseContextType {
    selectedFile: KnowledgeBaseFile | undefined;
    setSelectedFile: Dispatch<SetStateAction<KnowledgeBaseFile | undefined>>;
    files: KnowledgeBaseFile[] | undefined;
    setFiles: Dispatch<SetStateAction<KnowledgeBaseFile[] | undefined>>;
    uploadFiles: any | undefined;
    setUploadFiles: Dispatch<SetStateAction<any | undefined>>;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

// Create the context with no default values (undefined as initial state)
const KnowledgeBaseContext = createContext<KnowledgeBaseContextType>({
    selectedFile: undefined,
    setSelectedFile: () => {},
    files: undefined,
    setFiles: () => {},
    uploadFiles: undefined,
    setUploadFiles: () => {},
    refresh: false,
    setRefresh: () => {}
});

export default KnowledgeBaseContext;



// Create the provider
export const KnowledgeBaseContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFile, setSelectedFile] = useState<KnowledgeBaseFile | undefined>(undefined);  // Initialize with undefined
    const [files, setFiles] = useState<KnowledgeBaseFile[] | undefined>(undefined);  // Initialize with undefined
    const [uploadFiles, setUploadFiles] = useState<any | undefined>(undefined);  // Initialize with undefined
    const [refresh, setRefresh] = useState<boolean>(false);  // Initialize with false

    const contextData: KnowledgeBaseContextType = {
        selectedFile,
        setSelectedFile,
        files,
        setFiles,
        uploadFiles,
        setUploadFiles,
        refresh,
        setRefresh
    };

    return (
        <KnowledgeBaseContext.Provider value={contextData}>
            {children}
        </KnowledgeBaseContext.Provider>
    );
};

