export interface Reference {
    id: string;
    title: string;
    content: string;
}

export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    references?: Reference[]; 
}

export interface MessageInputProps {
    onSend: (messageText: string) => void;
  }