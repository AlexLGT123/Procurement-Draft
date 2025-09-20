
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDocumentUpdate(
  currentDocument: string,
  userPrompt: string
): Promise<string> {
  const model = "gemini-2.5-flash";

  const systemInstruction = `You are an AI assistant that helps users build structured documents. The user will provide you with the current document content and a prompt to modify it.
Your task is to return ONLY the complete, updated raw text for the new document.
DO NOT include any conversational text, introductions, explanations, or markdown code fences like \`\`\` in your response.
Your entire response should be only the raw text of the document itself.`;

  const fullPrompt = `
Here is the current state of the document:
---
${currentDocument}
---

The user has requested the following change: "${userPrompt}"

Please provide the full, updated document content now.
`.trim();


  try {
    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });
    
    // The response text should be the entire updated document content.
    return response.text.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
}
