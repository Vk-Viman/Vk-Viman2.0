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

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith('.onrender.com');
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  }),
);
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    service: 'portfolio-backend',
    ok: true,
    endpoints: ['/api/health', '/api/portfolio', '/api/contact (POST)'],
  });
});

app.get('/api', (_request, response) => {
  response.json({
    ok: true,
    endpoints: ['/api/health', '/api/portfolio', '/api/contact (POST)'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/contact', (_request, response) => {
  response.status(405).json({
    message: 'Method Not Allowed. Use POST /api/contact with JSON body.',
  });
});

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found' });
});

export { app };
