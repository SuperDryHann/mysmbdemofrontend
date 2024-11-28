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

// export interface IndexerStatusLastResult {
//     end_time: string;
//     error:[];
//     failed_item_count: number;
//     final_tracking_state: string;
//     initial_tracking_state: string;
//     item_count: number;
//     start_time: string;
//     status: string;
//     warning: [];
// }