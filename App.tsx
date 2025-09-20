
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { DocumentEditor } from './components/DocumentEditor';
import type { ChatMessage } from './types';
import { MessageSender } from './types';
import { generateDocumentUpdate } from './services/geminiService';

const App: React.FC = () => {
  const [documentContent, setDocumentContent] = useState<string>(
    `# My New Document\n\nThis is the beginning of your document. Use the chat to add content, create sections, and structure your ideas.`
  );
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'initial-bot-message',
      sender: MessageSender.BOT,
      text: "Hello! I'm DocuBot AI. How can I help you build your document today? Try saying 'Create a section about React hooks'.",
    },
  ]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: MessageSender.USER,
      text: message,
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const updatedDocument = await generateDocumentUpdate(documentContent, message);
      setDocumentContent(updatedDocument);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: MessageSender.BOT,
        text: "I've updated the document based on your request. What's next?",
      };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't process that. ${errorMessage}`);
      const botErrorMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        sender: MessageSender.BOT,
        text: `An error occurred: ${errorMessage}`,
      };
      setChatHistory(prev => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, documentContent]);

  const handleDocumentChange = (newContent: string) => {
    setDocumentContent(newContent);
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-900 text-slate-100">
      <Header />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="flex flex-col h-full bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
          <ChatInterface
            messages={chatHistory}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="flex flex-col h-full bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
          <DocumentEditor
            content={documentContent}
            onContentChange={handleDocumentChange}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
