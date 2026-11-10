import { Router } from 'express';
import { answerQuestion } from '../services/assistant.js';

export const assistantRouter = Router();

/* ------------------------------------------------------------------ */
/*  Per-IP rate limiter with automatic cleanup                         */
/* ------------------------------------------------------------------ */

const attempts = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const CLEANUP_INTERVAL_MS = 5 * 60_000; // purge stale entries every 5 min

setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of attempts) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) attempts.delete(ip);
    else attempts.set(ip, recent);
  }
}, CLEANUP_INTERVAL_MS).unref(); // .unref() so it doesn't keep the process alive

/* ------------------------------------------------------------------ */
/*  POST /ask                                                          */
/* ------------------------------------------------------------------ */

assistantRouter.post('/ask', async (req, res) => {
  // Validate the question
  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question || question.length > 500) {
    res.status(400).json({ error: 'Enter a question between 1 and 500 characters.' });
    return;
  }

  // Validate optional conversation history
  const rawHistory: unknown = req.body?.history;
  let history: { role: 'user' | 'assistant'; content: string }[] = [];

  if (Array.isArray(rawHistory)) {
    history = rawHistory
      .filter(
        (msg): msg is { role: 'user' | 'assistant'; content: string } =>
          typeof msg === 'object' &&
          msg !== null &&
          (msg.role === 'user' || msg.role === 'assistant') &&
          typeof msg.content === 'string' &&
          msg.content.length <= 500,
      )
      .slice(-12); // cap at last 12 messages (6 pairs)
  }

  // Rate limiting
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
    res.json(await answerQuestion(question, history));
  } catch (error) {
    console.error(
      'Assistant request failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    res.status(503).json({ error: 'The assistant is temporarily unavailable.' });
  }
});
