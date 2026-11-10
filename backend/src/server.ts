import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { assistantRouter } from './routes/assistant.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const origins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((value) => value.trim());

app.disable('x-powered-by');
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '8kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', assistantRouter);
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
app.listen(port, () => console.log(`Portfolio API listening on ${port}`));
