export interface KnowledgeBaseFile {
    name: string;
    url?: string;
    metadata?: {};
    status?: string;
}

export interface iKBFile {
    file: KnowledgeBaseFile;
}

export interface Url {
    url: string;
    status: string;
    modified_datetime: string;
}

export interface IndexerStatus {
    status: string;
    last_upadated?: string;
    time_difference?: string;
}
