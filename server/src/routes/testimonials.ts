import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';

export const testimonialsRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/testimonials.json');

const defaultTestimonials = [
  {
    id: 't-1',
    name: 'R. Lakshmi Ammal',
    role: 'Anbu Illam Resident (Age 74)',
    roleTa: 'அன்பு இல்லப் பயனாளி (வயது 74)',
    quote: 'After losing my family, I felt completely abandoned. Sri Susheela Trust gave me not just shelter, but a warm family filled with love, medical care, and respect.',
    quoteTa: 'குடும்பத்தை இழந்த பின் எனக்கு வாழ்வே இருண்டது. ஸ்ரீ சுசீலா அறக்கட்டளை எனக்கு தங்குமிடம் மட்டுமின்றி, அன்பு நிறைந்த குடும்பத்தையும் தந்தது.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    location: 'Chennai',
  },
  {
    id: 't-2',
    name: 'K. Karthikeyan',
    role: 'Vidya Jyothi Scholar (Engineering Student)',
    roleTa: 'வித்யா ஜோதி அம்மா மாணவர்',
    quote: 'Without the full scholarship and laptop from Sri Susheela Trust, my dream of pursuing Computer Science Engineering would have remained impossible.',
    quoteTa: 'இலவச கல்வி உதவித்தொகை மற்றும் கணினி கிடைக்காமல் போயிருந்தால் என் பொறியியல் கனவு நனவாகியிருக்காது.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    location: 'Thiruvallur',
  },
];

function getTestimonialsData(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveTestimonialsData(defaultTestimonials);
      return defaultTestimonials;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultTestimonials;
  }
}

function saveTestimonialsData(data: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing testimonials.json:', err);
  }
}

// GET /api/testimonials - Read from MongoDB Atlas
testimonialsRouter.get('/', async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const data = await Testimonial.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error('MongoDB Testimonial Find Error:', err);
    }
  }

  const data = getTestimonialsData();
  res.json({ success: true, count: data.length, data });
});

// POST /api/testimonials - Create testimonial in MongoDB Atlas
testimonialsRouter.post('/', async (req, res) => {
  const { name, role, roleTa, quote, quoteTa, avatarUrl, rating } = req.body;
  if (!name || !quote) {
    return res.status(400).json({ success: false, message: 'Name and Quote are required' });
  }

  const id = `t-${Date.now()}`;

  if (mongoose.connection.readyState === 1) {
    try {
      const newTest = await Testimonial.create({
        id,
        name,
        role: role || 'Beneficiary',
        roleTa: roleTa || role || '',
        quote,
        quoteTa: quoteTa || quote,
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        rating: rating || 5,
      });
      return res.status(201).json({ success: true, message: 'Testimonial saved to MongoDB Atlas', data: newTest });
    } catch (err) {
      console.error('MongoDB Testimonial Create Error:', err);
    }
  }

  const items = getTestimonialsData();
  const newTestimonial = {
    id,
    name,
    role: role || 'Beneficiary',
    roleTa: roleTa || role || '',
    quote,
    quoteTa: quoteTa || quote,
    avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    rating: rating || 5,
    createdAt: new Date().toISOString(),
  };

  items.unshift(newTestimonial);
  saveTestimonialsData(items);
  res.status(201).json({ success: true, message: 'Testimonial added successfully', data: newTestimonial });
});

// PUT /api/testimonials/:id - Update testimonial in MongoDB Atlas
testimonialsRouter.put('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const updated = await Testimonial.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Testimonial updated in MongoDB Atlas', data: updated });
      }
    } catch (err) {
      console.error('MongoDB Testimonial Update Error:', err);
    }
  }

  const items = getTestimonialsData();
  const index = items.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Testimonial not found' });

  items[index] = {
    ...items[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveTestimonialsData(items);
  res.json({ success: true, message: 'Testimonial updated successfully', data: items[index] });
});

// DELETE /api/testimonials/:id - Delete testimonial from MongoDB Atlas
testimonialsRouter.delete('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Testimonial.deleteOne({ id: req.params.id });
      return res.json({ success: true, message: 'Testimonial deleted from MongoDB Atlas' });
    } catch (err) {
      console.error('MongoDB Testimonial Delete Error:', err);
    }
  }

  const items = getTestimonialsData();
  const filtered = items.filter((t) => t.id !== req.params.id);
  saveTestimonialsData(filtered);
  res.json({ success: true, message: 'Testimonial deleted successfully' });
});
