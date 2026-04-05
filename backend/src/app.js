import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

const app = express();

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.options('*', cors());
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
