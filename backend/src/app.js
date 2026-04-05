import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

const app = express();
const configuredOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const defaultOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const allowedOrigins = [...new Set([...defaultOrigins, ...configuredOrigins])];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS origin not allowed'));
    },
  }),
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found' });
});

export { app };
