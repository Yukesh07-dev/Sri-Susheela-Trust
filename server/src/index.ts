import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { donationsRouter } from './routes/donations.js';
import { eventsRouter } from './routes/events.js';
import { volunteersRouter } from './routes/volunteers.js';
import { newsRouter } from './routes/news.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'UP',
    service: 'Sri Susheela Trust Backend API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/donations', donationsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/news', newsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
