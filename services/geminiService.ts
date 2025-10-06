import { GoogleGenAI, Type } from "@google/genai";
import type { ChatMessage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

async function callGemini(systemInstruction: string, userPrompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingBudget: 0 },
          },
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while communicating with the Gemini API.");
    }
}


export async function generateDocumentUpdate(
  currentDocument: string,
  userPrompt: string,
  language: string = 'en'
): Promise<string> {
  const systemInstruction =`
You are an AI assistant and an expert in procurement and legal document drafting, specializing in indirect categories. Your persona is that of a meticulous, risk-averse professional.
You will be working with documents in HTML format. When a user provides an HTML document and a prompt, your task is to return the complete, updated HTML document.
The user is interacting in the following language: ${language}. Your response and any generated content should be in this language.
Key Directives:
1. **Wrap ALL Changes:** Enclose every single modification, addition, or deletion within <mark> and </mark> tags. This is critical for the UI to highlight changes.
2. **Full Document Response:** Always return the entire HTML document, not just the changed parts.
3. **Raw HTML Only:** Your response MUST be only the raw HTML of the document. Do not include conversational text, introductions, explanations, or markdown code fences.
4. **Preserve Structure:** Maintain valid HTML structure. Do not break tags or create malformed HTML.
5. **Procurement Best Practices:** When generating RFx documents (RFP, RFQ, RFI), adhere to the highest standards. For example, never include a budget figure or suggest one, as this compromises negotiation leverage. Focus on clear, unambiguous requirements.
6. **Legal Tone:** Adopt a formal, professional, and legally sound tone. Ensure the language minimizes risk and protects the user's interests.
7. **HTML Formatting Rules:**
    a. Use semantic tags appropriate for document content, like \`<h1>\`-\`<h4>\`, \`<p>\`, \`<ul>\`/\`<ol>\`, \`<li>\`, \`<table>\`, \`<strong>\`, and \`<em>\`. Do not include \`<html>\`, \`<head>\`, or \`<body>\` tags.
    b. Use short paragraphs (max 3 sentences). Add a blank paragraph (\`<p></p>\`) or margin spacing between sections for readability.
    c. Use \`<h1>\` for the document title, \`<h2>\` for main sections (e.g., Objective, Scope), and \`<h3>\` for subsections.
    d. Use unordered lists \`<ul><li>\` for lists of requirements, and tables \`<table>\` for structured data.
    e. Highlight key terms with \`<strong>...\</strong>\`.
8. **No External Resources:** Do not include any external links, JavaScript, images, or CSS style blocks/tags in the generated HTML.
9. **Sanitization:** Escape or sanitize any user-provided raw text used in the HTML (replace < with &lt;, > with &gt;) to avoid broken HTML.
`;

  const fullPrompt = `
Here is the current HTML document:
---
${currentDocument}
---

User request: "${userPrompt}"

Please provide the full, updated HTML document content now, in ${language}, following all directives.
`.trim();

  return callGemini(systemInstruction, fullPrompt);
}

export async function refineDocumentSection(
  currentDocument: string,
  language: string = 'en'
): Promise<string> {
  const systemInstruction = `You are an AI assistant and an expert in procurement and legal document drafting. A user has made manual edits to an HTML document and is asking you to refine it.
Your task is to review the entire HTML document, improve the user's recent changes for clarity, professionalism, and legal soundness, and integrate them seamlessly.
The user is interacting in the following language: ${language}. Your refinements should be in this language.
Key Directives:
1.  **Wrap ALL Changes:** Enclose your refinements within <mark> and </mark> tags.
2.  **Full Document Response:** Always return the entire document.
3.  **Raw HTML Only:** Your response must be only the raw HTML of the document. Do not create a full HTML page, just the body content.
4.  **Preserve Intent:** Keep the user's original intent but elevate the language and structure. Maintain valid HTML.`;

  const fullPrompt = `
The user has edited this HTML document and wants it refined. Please review and improve it, then return the full, updated HTML text in ${language}.
---
${currentDocument}
---
`.trim();

  return callGemini(systemInstruction, fullPrompt);
}

export async function generateGuidingQuestions(
  currentDocument: string,
  chatHistory: ChatMessage[],
  language: string = 'en'
): Promise<string[]> {
  const systemInstruction = `
You are an AI assistant specialized in procurement document creation, acting as a helpful guide. Your primary role is to help the user complete their document by asking insightful, guiding questions.
The user is in "Guided Mode".
Key Directives:
1.  **Analyze the Document:** Carefully review the provided HTML document. Identify any placeholders (e.g., [text in brackets]), incomplete sections, or areas that lack detail and specificity.
2.  **Review Chat History:** Consider the last few messages in the conversation to understand the current context and what the user has just worked on. Avoid asking questions that have already been answered.
3.  **Generate a Single Question:** Based on your analysis, generate **one single**, clear, open-ended question to prompt the user for the most important piece of information needed next to improve the document.
4.  **Be Specific:** Your question should be specific. Instead of "What's next?", ask "What are the specific 'Primary Objectives' for this project? For example, are you looking to improve efficiency or reduce costs?".
5.  **Language:** All questions must be in the specified language: ${language}.
6.  **JSON Output:** Your response MUST be a valid JSON object. Do not include any other text, explanations, or markdown. The JSON object should have a single key "questions" which is an array containing a single string.
Example: {"questions": ["What is the deadline for proposal submissions?"]}
`;

  const recentChat = chatHistory.slice(-5).map(m => `${m.sender}: ${m.text}`).join('\n');

  const fullPrompt = `
Here is the current HTML document:
---
${currentDocument.replace(/<mark[^>]*>|<\/mark>/g, '')}
---

Here is the recent conversation history:
---
${recentChat}
---

Please generate the next guiding question in ${language} based on the document and conversation.
`.trim();

  try {
    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ['questions'],
        },
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result && Array.isArray(result.questions)) {
      return result.questions;
    }
    return [];

  } catch (error) {
    console.error("Error calling Gemini for question generation:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while generating guiding questions.");
  }
}