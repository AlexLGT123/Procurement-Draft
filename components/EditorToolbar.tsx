import React from 'react';
import {
  IconBold, IconItalic, IconUnderline, IconList, IconListNumbers, IconQuote
} from './Icon';

const CommandButton: React.FC<{ command: string; arg?: string; children: React.ReactNode, title: string }> = ({ command, arg, children, title }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent editor from losing focus
    document.execCommand(command, false, arg);
  };

  return (
    <button
      title={title}
      onMouseDown={handleClick} // Use onMouseDown to prevent focus loss and re-triggering command
      className="p-2 rounded hover:bg-[#333333] transition-colors duration-150 text-[#A3A3A3] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] focus:ring-[#7F56D9]"
      aria-label={title}
    >
      {children}
    </button>
  );
};

export const EditorToolbar: React.FC = () => {
  return (
    <div className="p-2 border-b border-[#262626] flex items-center gap-1 sticky top-0 bg-[#1A1A1A] z-10 flex-wrap">
      <CommandButton command="bold" title="Bold"><IconBold className="w-5 h-5" /></CommandButton>
      <CommandButton command="italic" title="Italic"><IconItalic className="w-5 h-5" /></CommandButton>
      <CommandButton command="underline" title="Underline"><IconUnderline className="w-5 h-5" /></CommandButton>
      <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>
      <CommandButton command="insertUnorderedList" title="Bulleted List"><IconList className="w-5 h-5" /></CommandButton>
      <CommandButton command="insertOrderedList" title="Numbered List"><IconListNumbers className="w-5 h-5" /></CommandButton>
      <CommandButton command="formatBlock" arg="blockquote" title="Blockquote"><IconQuote className="w-5 h-5" /></CommandButton>
    </div>
  );
};
