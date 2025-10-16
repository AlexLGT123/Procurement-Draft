
export const fr = {
  common: {
    or: 'ou',
    thinking: 'Réflexion...',
    runningFor: 'En cours... {{seconds}}s',
    loading: 'Chargement...',
    loadingEditor: "Chargement de l'éditeur...",
  },
  header: {
    title: 'ProcurementDraft',
    templates: 'Modèles',
    saveDraft: 'Sauvegarder',
    history: 'Historique',
    export: 'Exporter DOCX',
    saving: 'Sauvegarde...',
    saved: 'Modifications sauvegardées',
    landingPageAria: "Aller à la page d'accueil",
    documentation: 'Mode d\'emploi',
  },
  chat: {
    title: 'Chat',
    subtitle: "Indiquez à l'IA comment construire votre document.",
    placeholder: 'Ex: Ajoutez une conclusion résumant les points clés...',
    initialWelcome: 'Bienvenue sur ProcurementDraft IA. Veuillez sélectionner un modèle ou commencer avec un document vierge.',
    welcomeBack: "Content de vous revoir ! J'ai chargé votre dernière session.",
    templateLoaded: "J'ai chargé le modèle {{templateName}}. Utilisez le chat pour construire votre document.",
    startedBlank: 'Nous partons de zéro. Que devrions-nous créer en premier ?',
    importedFile: "J'ai importé et converti {{fileName}}. Au travail !",
    documentUpdated: "J'ai mis à jour le document. Les modifications sont surlignées.",
    documentRefined: "J'ai affiné vos récentes modifications. Les changements sont surlignées.",
    restoredVersion: 'Document restauré à la version de "{{documentTitle}}" enregistrée le {{date}}.',
    errorPrefix: "Désolé, je n'ai pas pu traiter cela.",
    errorOccurred: 'Une erreur est survenue : {{errorMessage}}',
    placeholdersHint: "J'ai surligné en rouge les sections qui nécessitent votre attention. Veuillez les compléter avant d'exporter.",
    clearChatAria: "Effacer l'historique du chat",
    guidedMode: {
      label: 'Mode Guidé',
      description: "L'IA posera des questions pour aider à créer le document.",
      activated: "Le Mode Guidé est activé. Je vais maintenant vous guider pour compléter le document.",
      error: "Désolé, je n'ai pas pu générer de question guide pour le moment.",
    },
  },
  editor: {
    title: 'Éditeur de Document',
    subtitle: 'Modifiez votre document directement. Utilisez la barre d\'outils pour la mise en forme.',
    newDocumentTitle: 'Nouveau Document',
    startWriting: 'Commencez à écrire ici...',
    refine: {
      aiAssistant: 'Assistant IA',
      prompt: 'Affiner vos modifications pour plus de clarté et d\'impact ?',
      button: 'Affiner avec l\'IA',
      dismissAria: "Rejeter la suggestion de l'IA",
      refining: 'Raffinage...',
    },
    placeholderTooltip: 'Cette section doit être remplie.',
  },
  templates: {
    subtitle: 'Votre partenaire intelligent pour créer des documents structurés et professionnels. Commencez avec un modèle ou importez votre travail.',
    chooseStartPoint: 'Choisissez un point de départ',
    importing: 'Importation...',
    importFromFile: 'Importer un fichier',
    importFromFileDescription: 'Fichiers supportés : .docx, .md, .txt',
    startBlank: 'Commencer avec un document vierge',
    startBlankDescription: 'Commencez sur une page blanche.',
    faqLink: 'FAQ & Confidentialité',
    documentationLink: 'Mode d\'emploi',
    rfp: {
      name: 'Appel d\'offres (RFP)',
      description: 'Un modèle complet pour solliciter des propositions détaillées pour un projet, décrivant la portée, les exigences et les critères d\'évaluation.',
    },
    rfq: {
      name: 'Demande de devis (RFQ)',
      description: 'Un modèle simple pour recueillir des prix compétitifs pour des biens ou services spécifiques avec des spécifications détaillées.',
    },
    rfi: {
      name: 'Demande d\'information (RFI)',
      description: 'Un modèle formel pour explorer les capacités des fournisseurs et recueillir des informations générales sur les solutions du marché.',
    },
    nda: {
      name: 'Accord de non-divulgation (NDA)',
      description: 'Un accord juridiquement contraignant et robuste pour protéger les informations sensibles partagées entre deux parties.',
    },
  },
  history: {
    modalTitle: 'Historique des activités',
    closeAria: "Fermer l'historique",
    noActivity: "Aucune activité n'a encore été enregistrée.",
    restoreButton: 'Restaurer',
    restoreAria: 'Restaurer la version du {{date}}',
    draftSaved: {
      manual: {
        title: 'Brouillon enregistré',
      },
      auto: {
        title: 'Sauvegarde automatique',
      },
      description: '"{{documentTitle}}" a été sauvegardé.',
    },
    templateLoaded: {
      title: 'Modèle chargé',
      description: 'Nouveau document créé à partir du modèle "{{templateName}}".',
    },
    startedBlank: {
      title: 'Nouveau document',
      description: 'Création d\'un nouveau document vierge.',
    },
    imported: {
      title: 'Fichier importé',
      description: 'Importation de "{{fileName}}".',
    },
    exported: {
      title: 'Exporté en DOCX',
      description: 'Exportation de "{{documentTitle}}" en DOCX.',
    },
    restored: {
      title: 'Document restauré',
      description: 'Version restaurée : "{{documentTitle}}".',
    },
    unknown: {
      title: 'Événement inconnu',
    },
  },
  toolbar: {
    bold: 'Gras',
    italic: 'Italique',
    underline: 'Souligné',
    strikethrough: 'Barré',
    bulletList: 'Liste à puces',
    numberedList: 'Liste numérotée',
    quote: 'Citation',
    clearFormatting: 'Effacer la mise en forme',
    paragraph: 'Paragraphe',
    heading1: 'Titre 1',
    heading2: 'Titre 2',
    heading3: 'Titre 3',
    blockTypeAria: 'Sélectionner le style du bloc de texte',
  },
  errors: {
    fileReadFailed: 'Échec de la lecture du fichier.',
    docxConversionFailed: 'Échec de la conversion de {{fileName}}. Le fichier est peut-être corrompu.',
    docNotSupported: 'Désolé, les fichiers .doc ne sont pas pris en charge. Veuillez enregistrer le fichier en .docx et réessayer.',
    unsupportedFileType: "Désolé, seuls les fichiers .md, .txt et .docx peuvent être importés pour le moment.",
    exportFailed: "Échec de l'exportation du document en .docx.",
    restoreNoContent: "Ce point de l'historique ne peut pas être restauré car il n'a pas de contenu sauvegardé.",
  },
  time: {
    yearsAgo: 'Il y a {{count}} ans',
    monthsAgo: 'Il y a {{count}} mois',
    daysAgo: 'Il y a {{count}} jours',
    hoursAgo: 'Il y a {{count}} heures',
    minutesAgo: 'Il y a {{count}} minutes',
    justNow: "À l'instant",
  },
  faq: {
    modalTitle: 'Foire Aux Questions',
    closeAria: 'Fermer la FAQ',
    items: [
      {
        q: 'Comment sont utilisées mes données ?',
        a: "Le contenu de votre document et vos messages de chat sont envoyés à l'API Gemini uniquement pour répondre à vos demandes, comme la mise à jour du document ou vos questions. Nous n'utilisons pas vos données pour entraîner nos modèles ou à toute autre fin.",
      },
      {
        q: 'Mes données sont-elles stockées ? Où ?',
        a: "L'application utilise le stockage local de votre navigateur pour sauvegarder automatiquement votre session. Cela signifie que votre travail est stocké directement sur votre ordinateur, et non sur nos serveurs. Si vous effacez les données de votre navigateur, votre session sera perdue. Nous n'avons pas de base de données centrale stockant les documents des utilisateurs.",
      },
      {
        q: 'Qui a accès à mes données ?',
        a: "Seul vous avez accès aux données stockées dans le stockage local de votre navigateur. Le contenu est envoyé de manière sécurisée via HTTPS à l'API Gemini pour traitement, mais il n'est pas stocké de manière permanente ni accessible par des examinateurs humains, sauf si requis pour des raisons légales ou de sécurité, comme le stipulent les conditions d'utilisation de l'API.",
      },
      {
        q: "Comment assurez-vous la confidentialité de mes documents ?",
        a: "Votre vie privée est notre priorité. L'application est conçue pour que les données sensibles de vos documents résident sur votre propre machine. Toute communication avec le service d'IA est chiffrée en transit. Nous n'avons aucun accès à vos documents, et ils ne sont utilisés à aucune autre fin que de fournir les fonctionnalités d'IA de cet outil.",
      },
    ],
  },
  confirmation: {
    title: 'Modifications non enregistrées',
    message: 'Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ? Vos modifications seront perdues.',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    confirmLeave: 'Quitter la page',
  },
  documentation: {
    modalTitle: 'Comment utiliser ProcurementDraft IA',
    closeAria: 'Fermer la documentation',
    sections: [
      {
        title: '1. Démarrer votre document',
        content: [
          '<strong>À partir d\'un modèle :</strong> Choisissez l\'un des modèles professionnels comme RFP ou NDA. Cela vous donne un document structuré pour commencer, avec des espaces réservés à remplir.',
          '<strong>Partir de zéro :</strong> Si vous préférez commencer de zéro, sélectionnez "Commencer avec un document vierge". Vous pourrez ensuite utiliser le chat pour construire le document section par section.',
          '<strong>Importer un fichier :</strong> Vous pouvez importer un document existant (.docx, .md, .txt). L\'application le convertira en format éditable, et vous pourrez alors utiliser l\'IA pour l\'améliorer.',
        ],
      },
      {
        title: '2. Utiliser l\'assistant de chat',
        content: [
          'Le chat est votre principal outil pour interagir avec l\'IA. Tapez simplement vos instructions en langage clair.',
          '<strong>Exemples :</strong><ul><li>"Ajoute une section sur la politique de développement durable de notre entreprise."</li><li>"Crée un tableau avec les colonnes Article, Quantité et Prix."</li><li>"Reformule l\'introduction pour qu\'elle soit plus formelle."</li></ul>',
          'L\'IA mettra à jour le document à droite. Toutes les modifications seront surlignées en <mark>violet</mark> pour votre examen.',
        ],
      },
      {
        title: '3. Édition directe et mise en forme',
        content: [
          'Vous pouvez cliquer directement dans l\'éditeur de document à droite pour effectuer des modifications manuelles à tout moment.',
          'Utilisez la barre d\'outils en haut de l\'éditeur pour appliquer une mise en forme comme le <strong>gras</strong>, l\'<em>italique</em>, les listes et les titres.',
        ],
      },
      {
        title: '4. Affiner vos modifications',
        content: [
          'Après avoir effectué des modifications manuelles, une bannière violette apparaîtra en bas de l\'éditeur.',
          'Cliquez sur le bouton "Affiner avec l\'IA". L\'IA examinera vos changements, les améliorant en termes de clarté, de professionnalisme et de ton, tout en préservant votre intention initiale. Les améliorations seront également surlignées.',
          'Si vous êtes satisfait de vos modifications manuelles, vous pouvez ignorer cette suggestion en cliquant sur le "X" de la bannière ou en sauvegardant le brouillon.',
        ],
      },
      {
        title: '5. Mode Guidé',
        content: [
          'Activez le "Mode Guidé" dans le panneau de chat pour obtenir une aide proactive de l\'IA.',
          'Dans ce mode, après avoir envoyé un message, l\'IA analysera le document et vous posera une question pertinente et ouverte pour vous aider à déterminer sur quoi travailler ensuite. C\'est excellent pour surmonter le blocage de l\'écrivain ou pour s\'assurer que vous n\'avez oublié aucune section importante.',
        ],
      },
      {
        title: '6. Sauvegarde, historique et exportation',
        content: [
          '<strong>Sauvegarde automatique :</strong> L\'application sauvegarde automatiquement votre travail quelques secondes après que vous ayez cessé de taper.',
          '<strong>Sauvegarde manuelle :</strong> Vous pouvez cliquer sur "Sauvegarder" ou utiliser Ctrl/Cmd + S pour enregistrer votre progression à tout moment.',
          '<strong>Historique :</strong> Cliquez sur le bouton "Historique" pour voir un journal de toutes vos actions (sauvegardes, chargements de modèles, etc.). Vous pouvez restaurer le document à n\'importe quel état antérieur à partir de ce journal.',
          '<strong>Exporter :</strong> Lorsque vous avez terminé, cliquez sur "Exporter DOCX" pour télécharger votre document sous forme de fichier Microsoft Word.',
        ],
      },
    ],
  },
};
