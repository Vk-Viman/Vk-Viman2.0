import dotenv from 'dotenv';
dotenv.config();

import { app } from './src/app.js';
import { connectDatabase } from './src/config/db.js';

const port = process.env.PORT || 5000;

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await connectDatabase();
    } catch (error) {
      console.warn('MongoDB connection failed. Continuing without database.');
      console.warn(error.message);
    }
  }

  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
