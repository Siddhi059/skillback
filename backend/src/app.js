import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { getDBStatus } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { requireDB } from './middleware/requireDB.js';
import agentRoutes from './routes/agentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'skillback-api',
    db: getDBStatus(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', requireDB, authRoutes);
app.use('/api/profile', requireDB, profileRoutes);
app.use('/api/workspace', requireDB, workspaceRoutes);
app.use('/api/agents', requireDB, agentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
