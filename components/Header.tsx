
import React from 'react';
import { BotIcon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 p-4">
      <div className="container mx-auto flex items-center gap-3">
        <BotIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl font-bold tracking-wider text-slate-100">
          Docu<span className="text-cyan-400">Bot</span> AI
        </h1>
      </div>
    </header>
  );
};
