import React from 'react';
import {
  IconBold, IconItalic, IconUnderline, IconList, IconListNumbers, IconQuote, IconStrikethrough, IconClearFormatting
} from './Icon';
import { useTranslation } from '../hooks/useTranslation';

export interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  ul: boolean;
  ol: boolean;
  blockquote: boolean;
  blockType: string;
}

interface EditorToolbarProps {
  activeFormats: ActiveFormats;
  editorRef: React.RefObject<HTMLDivElement>;
}

interface CommandButtonProps {
    command: string;
    arg?: string;
    children: React.ReactNode;
    titleKey: string;
    isActive: boolean;
}

const CommandButton: React.FC<CommandButtonProps> = ({ command, arg, children, titleKey, isActive }) => {
  const { t } = useTranslation();
  const title = t(titleKey);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent editor from losing focus
    document.execCommand(command, false, arg);
  };

  const activeClass = isActive ? 'bg-[#333333] text-white' : 'text-[#A3A3A3] hover:text-white';

  return (
    <button
      title={title}
      onMouseDown={handleClick} // Use onMouseDown to prevent focus loss and re-triggering command
      className={`p-2 rounded hover:bg-[#333333] transition-colors duration-150 ${activeClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] focus:ring-[#7F56D9]`}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
};

const BlockFormatDropdown: React.FC<{ blockType: string; editorRef: React.RefObject<HTMLDivElement> }> = ({ blockType, editorRef }) => {
    const { t } = useTranslation();
    const options = {
        p: t('toolbar.paragraph'),
        h1: t('toolbar.heading1'),
        h2: t('toolbar.heading2'),
        h3: t('toolbar.heading3'),
    };
    
    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        document.execCommand('formatBlock', false, value);
        // Refocus the editor to keep typing context
        editorRef.current?.focus();
    };

    return (
        <select
            value={blockType}
            onChange={handleFormatChange}
            className="bg-[#262626] border border-[#333333] text-[#F5F5F5] text-sm rounded-md focus:ring-[#7F56D9] focus:border-[#7F56D9] block p-1.5 focus:outline-none"
            aria-label={t('toolbar.blockTypeAria')}
        >
            {Object.entries(options).map(([tag, label]) => (
                <option key={tag} value={tag}>{label}</option>
            ))}
        </select>
    );
};


export const EditorToolbar: React.FC<EditorToolbarProps> = ({ activeFormats, editorRef }) => {
  return (
    <div className="p-2 border-b border-[#262626] flex items-center gap-2 sticky top-0 bg-[#1A1A1A] z-10 flex-wrap">
      <BlockFormatDropdown blockType={activeFormats.blockType} editorRef={editorRef} />
      <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>
      <CommandButton command="bold" titleKey="toolbar.bold" isActive={activeFormats.bold}><IconBold className="w-5 h-5" /></CommandButton>
      <CommandButton command="italic" titleKey="toolbar.italic" isActive={activeFormats.italic}><IconItalic className="w-5 h-5" /></CommandButton>
      <CommandButton command="underline" titleKey="toolbar.underline" isActive={activeFormats.underline}><IconUnderline className="w-5 h-5" /></CommandButton>
      <CommandButton command="strikeThrough" titleKey="toolbar.strikethrough" isActive={activeFormats.strikethrough}><IconStrikethrough className="w-5 h-5" /></CommandButton>
      <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>
      <CommandButton command="insertUnorderedList" titleKey="toolbar.bulletList" isActive={activeFormats.ul}><IconList className="w-5 h-5" /></CommandButton>
      <CommandButton command="insertOrderedList" titleKey="toolbar.numberedList" isActive={activeFormats.ol}><IconListNumbers className="w-5 h-5" /></CommandButton>
      <CommandButton command="formatBlock" arg="blockquote" titleKey="toolbar.quote" isActive={activeFormats.blockquote}><IconQuote className="w-5 h-5" /></CommandButton>
      <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>
      <CommandButton command="removeFormat" titleKey="toolbar.clearFormatting" isActive={false}><IconClearFormatting className="w-5 h-5" /></CommandButton>
    </div>
  );
};