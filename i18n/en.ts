
export const en = {
  common: {
    or: 'or',
    thinking: 'Thinking...',
    runningFor: 'Running for {{seconds}}s',
    loading: 'Loading...',
    loadingEditor: 'Loading Editor...',
  },
  header: {
    title: 'ProcurementDraft',
    templates: 'Templates',
    saveDraft: 'Save Draft',
    history: 'History',
    export: 'Export DOCX',
    saving: 'Saving...',
    saved: 'All changes saved',
    landingPageAria: 'Go to landing page',
    documentation: 'How-to Guide',
  },
  chat: {
    title: 'Chat',
    subtitle: 'Tell the AI how to build your document.',
    placeholder: 'e.g., Add a conclusion summarizing the key points...',
    initialWelcome: 'Welcome to ProcurementDraft IA. Please select a template or start with a blank document.',
    welcomeBack: "Welcome back! I've loaded your last saved session.",
    templateLoaded: "I've loaded the {{templateName}} template. Use the chat to build your document.",
    startedBlank: 'Starting with a blank slate. What should we create first?',
    importedFile: "I've imported and converted {{fileName}}. Let's get to work!",
    documentUpdated: "I've updated the document. Changes are highlighted.",
    documentRefined: "I've refined your recent edits. The changes are highlighted.",
    restoredVersion: 'Restored the document to the version from "{{documentTitle}}" saved on {{date}}.',
    errorPrefix: "Sorry, I couldn't process that.",
    errorOccurred: 'An error occurred: {{errorMessage}}',
    placeholdersHint: "I've highlighted sections in red that require your input. Please fill them out before exporting.",
    clearChatAria: 'Clear chat history',
    guidedMode: {
      label: 'Guided Mode',
      description: 'AI will ask guiding questions to help build the document.',
      activated: 'Guided Mode is on. I will now guide you to complete the document.',
      error: 'Sorry, I couldn\'t generate a guiding question right now.',
    },
  },
  editor: {
    title: 'Document Editor',
    subtitle: 'Edit your document directly. Use the toolbar for formatting.',
    newDocumentTitle: 'New Document',
    startWriting: 'Start writing here...',
    refine: {
      aiAssistant: 'AI Assistant',
      prompt: 'Refine your changes for clarity and impact?',
      button: 'Refine with AI',
      dismissAria: 'Dismiss AI suggestion',
      refining: 'Refining...',
    },
    placeholderTooltip: 'This section needs to be filled out.',
  },
  templates: {
    subtitle: 'Your intelligent partner for building structured, professional documents. Start with a template or import your own work.',
    chooseStartPoint: 'Choose a Starting Point',
    importing: 'Importing...',
    importFromFile: 'Import from File',
    importFromFileDescription: 'Supports .docx, .md, .txt',
    startBlank: 'Start with a Blank Document',
    startBlankDescription: 'Begin with a clean slate.',
    faqLink: 'FAQ & Data Privacy',
    documentationLink: 'How-to Guide',
    rfp: {
      name: 'Request for Proposal',
      description: 'A comprehensive template to solicit detailed proposals for a specific project, outlining scope, requirements, and evaluation criteria.',
    },
    rfq: {
      name: 'Request for Quotation',
      description: 'A streamlined template to gather competitive pricing for specific goods or services with detailed specifications.',
    },
    rfi: {
      name: 'Request for Information',
      description: 'A formal template to explore vendor capabilities and gather general information about solutions in the market.',
    },
    nda: {
      name: 'Non-Disclosure Agreement',
      description: 'A robust, legally-binding agreement to protect sensitive information shared between two parties.',
    },
  },
  history: {
    modalTitle: 'Activity History',
    closeAria: 'Close history log',
    noActivity: 'No activity has been logged yet.',
    restoreButton: 'Restore',
    restoreAria: 'Restore version from {{date}}',
    draftSaved: {
      manual: {
        title: 'Draft Saved',
      },
      auto: {
        title: 'Draft Auto-Saved',
      },
      description: '"{{documentTitle}}" was saved.',
    },
    templateLoaded: {
      title: 'Template Loaded',
      description: 'Started new document from "{{templateName}}" template.',
    },
    startedBlank: {
      title: 'New Document',
      description: 'Started a new blank document.',
    },
    imported: {
      title: 'File Imported',
      description: 'Imported "{{fileName}}".',
    },
    exported: {
      title: 'Exported as DOCX',
      description: 'Exported "{{documentTitle}}" as DOCX.',
    },
    restored: {
      title: 'Document Restored',
      description: 'Restored version: "{{documentTitle}}".',
    },
    unknown: {
      title: 'Unknown Event',
    },
  },
  toolbar: {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    bulletList: 'Bulleted List',
    numberedList: 'Numbered List',
    quote: 'Blockquote',
    clearFormatting: 'Clear Formatting',
    paragraph: 'Paragraph',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    blockTypeAria: 'Select text block style',
  },
  errors: {
    fileReadFailed: 'Failed to read the file.',
    docxConversionFailed: 'Failed to convert {{fileName}}. The file might be corrupted.',
    docNotSupported: 'Sorry, .doc files are not supported. Please save the file as a .docx and try again.',
    unsupportedFileType: 'Sorry, only .md, .txt, and .docx files can be imported at this time.',
    exportFailed: 'Failed to export document as .docx.',
    restoreNoContent: 'This history point cannot be restored as it has no saved content.',
  },
  time: {
    yearsAgo: '{{count}} years ago',
    monthsAgo: '{{count}} months ago',
    daysAgo: '{{count}} days ago',
    hoursAgo: '{{count}} hours ago',
    minutesAgo: '{{count}} minutes ago',
    justNow: 'Just now',
  },
  faq: {
    modalTitle: 'Frequently Asked Questions',
    closeAria: 'Close FAQ',
    items: [
      {
        q: 'How is my data used?',
        a: 'Your document content and chat messages are sent to the Gemini API solely to fulfill your requests, such as updating the document or responding to your queries. We do not use your data to train our models or for any other purpose.',
      },
      {
        q: 'Is my data stored? Where?',
        a: 'The application uses your browser\'s local storage to auto-save your session. This means your work is stored directly on your computer, not on our servers. If you clear your browser data, your session will be lost. We do not have a central database storing user documents.',
      },
      {
        q: 'Who has access to my data?',
        a: 'Only you have access to the data stored in your browser\'s local storage. The content is sent securely via HTTPS to the Gemini API for processing, but it is not permanently stored or accessible by human reviewers unless required for legal or safety reasons as outlined in the API terms of service.',
      },
      {
        q: 'How do you ensure the confidentiality of my documents?',
        a: 'We prioritize your privacy. The application is designed so that your sensitive document data resides on your own machine. All communication with the AI service is encrypted in transit. We have no access to your documents, and they are not used for any purpose other than providing the AI-powered features of this tool.',
      },
    ],
  },
  confirmation: {
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
    confirm: 'Confirm',
    cancel: 'Cancel',
    confirmLeave: 'Leave Page',
  },
  documentation: {
    modalTitle: 'How to Use ProcurementDraft IA',
    closeAria: 'Close documentation',
    sections: [
      {
        title: '1. Starting Your Document',
        content: [
          '<strong>From a Template:</strong> Choose one of the professionally crafted templates like RFP or NDA. This gives you a structured document to start with, complete with placeholders for you to fill in.',
          '<strong>Start Blank:</strong> If you prefer to begin from scratch, select "Start with a Blank Document". You can then use the chat to build the document section by section.',
          '<strong>Import a File:</strong> You can import an existing document (.docx, .md, .txt). The app will convert it to an editable format, and you can then use the AI to enhance it.',
        ],
      },
      {
        title: '2. Using the Chat Assistant',
        content: [
          'The chat is your primary tool for interacting with the AI. Simply type your instructions in plain language.',
          '<strong>Examples:</strong><ul><li>"Add a section about our company\'s sustainability policy."</li><li>"Create a table with columns for Item, Quantity, and Price."</li><li>"Rephrase the introduction to sound more formal."</li></ul>',
          'The AI will update the document on the right. All changes will be highlighted in <mark>purple</mark> for your review.',
        ],
      },
      {
        title: '3. Direct Editing & Formatting',
        content: [
          'You can click directly into the document editor on the right to make manual changes at any time.',
          'Use the toolbar at the top of the editor to apply formatting like <strong>bold</strong>, <em>italics</em>, lists, and headings.',
        ],
      },
      {
        title: '4. Refining Your Edits',
        content: [
          'After you make manual edits, a purple banner will appear at the bottom of the editor.',
          'Click the "Refine with AI" button. The AI will review your changes, improving them for clarity, professionalism, and tone, while preserving your original intent. The refinements will also be highlighted.',
          'If you are happy with your manual changes, you can dismiss this suggestion by clicking the "X" button on the banner or by saving the draft.',
        ],
      },
      {
        title: '5. Guided Mode',
        content: [
          'Toggle "Guided Mode" in the chat panel to get proactive help from the AI.',
          'In this mode, after you send a message, the AI will analyze the document and ask you a relevant, open-ended question to help you figure out what to work on next. This is great for overcoming writer\'s block or ensuring you haven\'t missed any important sections.',
        ],
      },
      {
        title: '6. Saving, History & Exporting',
        content: [
          '<strong>Auto-Save:</strong> The app automatically saves your work a few seconds after you stop typing.',
          '<strong>Manual Save:</strong> You can click "Save Draft" or use Ctrl/Cmd + S to save your progress at any time.',
          '<strong>History:</strong> Click the "History" button to see a log of all your actions (saves, template loads, etc.). You can restore the document to any previous state from this log.',
          '<strong>Export:</strong> When you are finished, click "Export DOCX" to download your document as a Microsoft Word file.',
        ],
      },
    ],
  },
};
