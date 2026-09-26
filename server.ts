import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI securely on the server side
// GEMINI_API_KEY is retrieved securely from environment variables, NEVER exposed to client!
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
} else {
  console.warn('⚠️ GEMINI_API_KEY environment variable is not defined.');
}

// Secure proxy endpoint for AI English tutoring & conversational evaluation
app.post('/api/ai/evaluate-dialogue', async (req: Request, res: Response) => {
  try {
    const { scenarioTitle, characterRole, userMessage, context } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: 'User message is required.' });
    }

    if (!aiClient) {
      return res.status(503).json({
        error: 'AI service temporarily unavailable. API key is missing on the server.',
      });
    }

    const systemPrompt = `You are an expert English Language Tutor and NPC citizen of "Virtual Tavana City" (Scenario: ${scenarioTitle || 'General Conversation'}, Role: ${characterRole || 'Citizen'}).
Evaluate the learner's English input: "${userMessage}".
Context: ${context || 'Everyday English dialogue'}.

Output a JSON response with:
1. "reply": A natural, warm conversational English response adhering to the NPC character.
2. "feedback": Pedagogical feedback on fluency, grammar, or polite nuances (1-2 sentences).
3. "grammarScore": An integer rating from 1 to 10.
4. "suggestedBetterAlternative": A more native or articulate phrasing, if applicable.
5. "lingousEarned": An integer from 5 to 25 based on quality.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(resultText);
    } catch {
      parsedData = {
        reply: resultText,
        feedback: 'Good job speaking English!',
        grammarScore: 8,
        suggestedBetterAlternative: userMessage,
        lingousEarned: 15,
      };
    }

    return res.json({ success: true, data: parsedData });
  } catch (error: unknown) {
    console.error('Error generating AI evaluation:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Failed to evaluate dialogue', details: message });
  }
});

// Secure endpoint for generating dynamic vocabulary sentences or idioms
app.post('/api/ai/explain-word', async (req: Request, res: Response) => {
  try {
    const { word } = req.body;
    if (!word) {
      return res.status(400).json({ error: 'Word parameter is required.' });
    }

    if (!aiClient) {
      return res.status(503).json({
        error: 'AI service unavailable. Server API key not configured.',
      });
    }

    const prompt = `Provide educational details for the English word or idiom: "${word}".
Format response as JSON:
{
  "phonetic": "IPA pronunciation",
  "cefrLevel": "A1-A2" or "B1-B2" or "C1-C2",
  "definition": "Clear concise English definition",
  "examples": ["Example sentence 1", "Example sentence 2"],
  "collocations": ["collocation 1", "collocation 2", "collocation 3"],
  "tavanaTip": "A fun memory hook set in Virtual Tavana City"
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: unknown) {
    console.error('Error explaining word:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Failed to explain word', details: message });
  }
});

// Bidirectional Persian <-> English Chat & Voice Translator Endpoint
app.post('/api/ai/translate', async (req: Request, res: Response) => {
  try {
    const { text, direction, includeMature17Plus } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required.' });
    }

    if (!aiClient) {
      return res.status(503).json({ error: 'Offline fallback active' });
    }

    const prompt = `You are a master bilingual Persian-English interpreter covering everything from everyday travel, specialized Persian carpet trade (Ghali, Ghalicheh, Dozar, Zar-o-Nim, Kohneh Zaati), and C2 proverbs to colloquial street slang${includeMature17Plus ? ' (including edgy 17+ street idioms)' : ''}.
Direction: ${direction === 'fa_to_en' ? 'Persian to English' : 'English to Persian'}.
Input text: "${text}"

Return a JSON object with:
{
  "translation": "Accurate natural translation in the target language",
  "colloquialVariant": "Colloquial / street slang equivalent in the target language",
  "pronunciation": "Clear phonetic pronunciation guide (English phonetics if target is English, or Fingilish Latin script if target is Persian)",
  "noteFa": "Brief 1-sentence cultural or linguistic note in Persian"
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Translation fallback required', details: message });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    appName: 'English-lingou',
    aiProxyConfigured: !!aiClient,
    environment: process.env.NODE_ENV || 'development',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In dev, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
