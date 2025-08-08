export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  functionCalled?: string;
  parameters?: any;
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}
