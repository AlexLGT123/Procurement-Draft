
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { MessageSender } from '../types';
import { BotIcon, UserIcon, SendIcon } from './Icon';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, error }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200">Chat</h2>
        <p className="text-sm text-slate-400">Tell the AI how to build your document.</p>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === MessageSender.USER ? 'justify-end' : ''}`}>
              {msg.sender === MessageSender.BOT && (
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <BotIcon className="h-5 w-5 text-cyan-400" />
                </div>
              )}
              <div className={`max-w-md p-3 rounded-lg ${
                  msg.sender === MessageSender.USER
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === MessageSender.USER && (
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-600 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-slate-200" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                 <div className="w-8 h-8 flex-shrink-0 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <BotIcon className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="max-w-md p-3 rounded-lg bg-slate-700 text-slate-200 rounded-bl-none">
                   <LoadingSpinner />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {error && <div className="p-4 text-sm text-red-400 bg-red-900/50 border-t border-slate-700">{error}</div>}
      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., Add a conclusion summarizing the key points..."
            className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition duration-200"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
