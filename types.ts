
export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
}

export interface Template {
  key: string;
  name: string;
  description: string;
  content: string;
}

export enum HistoryEventType {
  DRAFT_SAVED = 'draft_saved',
  TEMPLATE_LOADED = 'template_loaded',
  IMPORTED = 'imported',
  EXPORTED_DOCX = 'exported_docx',
  STARTED_BLANK = 'started_blank',
}

export interface HistoryEntry {
  id: string;
  type: HistoryEventType;
  timestamp: number;
  documentTitle: string;
  details?: string; // e.g., template name, file name
}
