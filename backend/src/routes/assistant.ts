import { Router } from 'express';
import { answerQuestion } from '../services/assistant.js';

export const assistantRouter = Router();
const attempts = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

assistantRouter.post('/ask', async (req, res) => {
  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question || question.length > 500) {
    res.status(400).json({ error: 'Enter a question between 1 and 500 characters.' });
    return;
  }
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    res.status(429).json({ error: 'Too many questions. Please try again in a minute.' });
    return;
  }
  recent.push(now);
  attempts.set(ip, recent);
  try {
    res.json(await answerQuestion(question));
  } catch (error) {
    console.error(
      'Assistant request failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    res.status(503).json({ error: 'The assistant is temporarily unavailable.' });
  }
});
