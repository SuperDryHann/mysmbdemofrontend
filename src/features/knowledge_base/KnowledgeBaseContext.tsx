import {createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';
import {
    KnowledgeBaseFile,
    Url,
    IndexerStatus
} from './KnowledgeBaseInterface';

// Define the type for the context data
interface KnowledgeBaseContextType {
    selectedFile: KnowledgeBaseFile | undefined;
    setSelectedFile: Dispatch<SetStateAction<KnowledgeBaseFile | undefined>>;
    files: KnowledgeBaseFile[] | undefined;
    setFiles: Dispatch<SetStateAction<KnowledgeBaseFile[] | undefined>>;
    uploadFiles: File[] | undefined;
    setUploadFiles: Dispatch<SetStateAction<File[] | undefined>>;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    urls: Url[] | undefined;
    setUrls: Dispatch<SetStateAction<Url[] | undefined>>;
    indexerStatus: IndexerStatus | undefined;
    setIndexerStatus: Dispatch<SetStateAction<IndexerStatus | undefined>>;
    knowledgeBaseLoading: boolean;
    setKnowledgeBaseLoading: Dispatch<SetStateAction<boolean>>;
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
    setRefresh: () => {},
    urls: undefined,
    setUrls: () => {},
    indexerStatus: undefined,
    setIndexerStatus: () => {},
    knowledgeBaseLoading: true,
    setKnowledgeBaseLoading: () => {}
});

export default KnowledgeBaseContext;



// Create the provider
export const KnowledgeBaseContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFile, setSelectedFile] = useState<KnowledgeBaseFile | undefined>(undefined);  // Initialize with undefined
    const [files, setFiles] = useState<KnowledgeBaseFile[] | undefined>(undefined);  // Initialize with undefined
    const [uploadFiles, setUploadFiles] = useState<any | undefined>(undefined);  // Initialize with undefined
    const [refresh, setRefresh] = useState<boolean>(false);  // Initialize with false
    const [urls, setUrls] = useState<Url[] | undefined>(undefined);  // Initialize with undefined
    const [indexerStatus, setIndexerStatus] = useState<IndexerStatus | undefined>(undefined);
    const [knowledgeBaseLoading, setKnowledgeBaseLoading] = useState<boolean>(true);



    const contextData: KnowledgeBaseContextType = {
        selectedFile,
        setSelectedFile,
        files,
        setFiles,
        uploadFiles,
        setUploadFiles,
        refresh,
        setRefresh,
        urls,
        setUrls,
        indexerStatus,
        setIndexerStatus,
        knowledgeBaseLoading,
        setKnowledgeBaseLoading
    };

    return (
        <KnowledgeBaseContext.Provider value={contextData}>
            {children}
        </KnowledgeBaseContext.Provider>
    );
};

