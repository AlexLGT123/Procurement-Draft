
import React, { useState, useRef, useEffect, memo } from 'react';
import type { ChatMessage } from '../types';
import { MessageSender } from '../types';
import { RocketIcon, UserIcon, SendIcon } from './Icon';
import { ThinkingIndicator } from './ThinkingIndicator';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ChatInterfaceComponent: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, error }) => {
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
      <div className="p-4 border-b border-[#262626]">
        <h2 className="text-lg font-semibold text-[#F5F5F5]">Chat</h2>
        <p className="text-sm text-[#A3A3A3]">Tell the AI how to build your document.</p>
      </div>
      <div className="flex-grow p-4 overflow-y-scroll min-h-0">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === MessageSender.USER ? 'justify-end' : ''}`}>
              {msg.sender === MessageSender.BOT && (
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#7F56D9]/10 flex items-center justify-center border border-[#7F56D9]/20">
                  <RocketIcon className="h-5 w-5 text-[#7F56D9]" />
                </div>
              )}
              <div className={`max-w-md p-3 rounded-lg ${
                  msg.sender === MessageSender.USER
                    ? 'bg-[#7F56D9] text-white rounded-br-none'
                    : 'bg-[#262626] text-[#F5F5F5] rounded-bl-none'
                }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
              </div>
              {msg.sender === MessageSender.USER && (
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#333333] flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-[#A3A3A3]" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                 <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#7F56D9]/10 flex items-center justify-center border border-[#7F56D9]/20">
                  <RocketIcon className="h-5 w-5 text-[#7F56D9]" />
                </div>
                <div className="max-w-md p-3 rounded-lg bg-[#262626] text-[#F5F5F5] rounded-bl-none">
                   <ThinkingIndicator />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {error && <div className="p-4 text-sm text-red-400 bg-red-900/50 border-t border-[#262626]">{error}</div>}
      <div className="p-4 border-t border-[#262626] bg-[#1A1A1A]">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., Add a conclusion summarizing the key points..."
            className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#7F56D9] transition duration-200 text-[#F5F5F5]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-[#7F56D9] hover:bg-[#6941C6] disabled:bg-[#333333] disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition duration-200"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export const ChatInterface = memo(ChatInterfaceComponent);
