import { GoogleGenAI } from "@google/genai";

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
  userPrompt: string
): Promise<string> {
  const systemInstruction =`
You are an AI assistant and an expert in procurement and legal document drafting, specializing in indirect categories. Your persona is that of a meticulous, risk-averse professional. 
You will be working with documents in HTML format. When a user provides an HTML document and a prompt, your task is to return the complete, updated HTML document.
Key Directives:
1. **Wrap ALL Changes:** Enclose every single modification, addition, or deletion within <mark> and </mark> tags. This is critical for the UI to highlight changes.
2. **Full Document Response:** Always return the entire HTML document, not just the changed parts.
3. **Raw HTML Only:** Your response MUST be only the raw HTML of the document. Do not include conversational text, introductions, explanations, or markdown code fences.
4. **Preserve Structure:** Maintain valid HTML structure. Do not break tags or create malformed HTML.
5. **Procurement Best Practices:** When generating RFx documents (RFP, RFQ, RFI), adhere to the highest standards. For example, never include a budget figure or suggest one, as this compromises negotiation leverage. Focus on clear, unambiguous requirements.
6. **Legal Tone:** Adopt a formal, professional, and legally sound tone. Ensure the language minimizes risk and protects the user's interests.
7. **HTML Formatting Rules:**
    a. Use semantic tags appropriate for document content, like \`<section>\`, \`<h1>\`-\`<h4>\`, \`<p>\`, \`<ul>\`/\`<ol>\`, \`<li>\`, \`<table>\`, \`<strong>\`, and \`<em>\`. Do not include \`<html>\`, \`<head>\`, or \`<body>\` tags.
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

Please provide the full, updated HTML document content now, following all directives.
`.trim();

  return callGemini(systemInstruction, fullPrompt);
}

export async function refineDocumentSection(
  currentDocument: string,
): Promise<string> {
  // FIX: Removed erroneous backslashes before template literal backticks, which was causing a syntax error.
  const systemInstruction = `You are an AI assistant and an expert in procurement and legal document drafting. A user has made manual edits to an HTML document and is asking you to refine it.
Your task is to review the entire HTML document, improve the user's recent changes for clarity, professionalism, and legal soundness, and integrate them seamlessly.
Key Directives:
1.  **Wrap ALL Changes:** Enclose your refinements within <mark> and </mark> tags.
2.  **Full Document Response:** Always return the entire document.
3.  **Raw HTML Only:** Your response must be only the raw HTML of the document. Do not create a full HTML page, just the body content.
4.  **Preserve Intent:** Keep the user's original intent but elevate the language and structure. Maintain valid HTML.`;

  const fullPrompt = `
The user has edited this HTML document and wants it refined. Please review and improve it, then return the full, updated HTML text.
---
${currentDocument}
---
`.trim();

  return callGemini(systemInstruction, fullPrompt);
}
