import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { eventsRouter } from './routes/events.js';
import { volunteersRouter } from './routes/volunteers.js';
import { newsRouter } from './routes/news.js';
import { galleryRouter } from './routes/gallery.js';
import { programsRouter } from './routes/programs.js';
import { testimonialsRouter } from './routes/testimonials.js';
import { settingsRouter } from './routes/settings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static uploads directory
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Healthcheck endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'UP',
    service: 'Sri Susheela Trust Backend API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/programs', programsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/news', newsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/settings', settingsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static uploads from ${uploadsDir}`);
});
