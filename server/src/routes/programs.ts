import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Program } from '../models/Program.js';

export const programsRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/programs.json');

function getProgramsData(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading programs.json:', err);
    return [];
  }
}

function saveProgramsData(data: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing programs.json:', err);
  }
}

// GET /api/programs - Read from MongoDB Atlas
programsRouter.get('/', async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const data = await Program.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error('MongoDB Program Find Error:', err);
    }
  }

  const data = getProgramsData();
  res.json({ success: true, count: data.length, data });
});

// GET /api/programs/:id
programsRouter.get('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const program = await Program.findOne({ id: req.params.id });
      if (program) return res.json({ success: true, data: program });
    } catch (err) {
      console.error('MongoDB Program FindOne Error:', err);
    }
  }

  const data = getProgramsData();
  const program = data.find((p) => p.id === req.params.id);
  if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
  res.json({ success: true, data: program });
});

// POST /api/programs - Create new program in MongoDB Atlas
programsRouter.post('/', async (req, res) => {
  const { title, titleTa, shortDesc, shortDescTa, description, descriptionTa, category, imageUrl, beneficiariesCount, beneficiariesCountTa, features } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and Description are required' });
  }

  const id = `prog-${Date.now()}`;

  if (mongoose.connection.readyState === 1) {
    try {
      const newProg = await Program.create({
        id,
        title,
        titleTa: titleTa || title,
        shortDesc: shortDesc || description.substring(0, 100),
        shortDescTa: shortDescTa || shortDesc || '',
        description,
        descriptionTa: descriptionTa || description,
        category: category || 'general',
        iconName: 'HeartHandshake',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
        beneficiariesCount: beneficiariesCount || '100+ Beneficiaries',
        beneficiariesCountTa: beneficiariesCountTa || beneficiariesCount || '',
        features: Array.isArray(features) ? features : [],
      });
      return res.status(201).json({ success: true, message: 'Program saved to MongoDB Atlas', data: newProg });
    } catch (err) {
      console.error('MongoDB Program Create Error:', err);
    }
  }

  const items = getProgramsData();
  const newProgram = {
    id,
    title,
    titleTa: titleTa || title,
    shortDesc: shortDesc || description.substring(0, 100),
    shortDescTa: shortDescTa || shortDesc || '',
    description,
    descriptionTa: descriptionTa || description,
    category: category || 'general',
    iconName: 'HeartHandshake',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    beneficiariesCount: beneficiariesCount || '100+ Beneficiaries',
    beneficiariesCountTa: beneficiariesCountTa || beneficiariesCount || '',
    features: Array.isArray(features) ? features : [],
    createdAt: new Date().toISOString(),
  };

  items.unshift(newProgram);
  saveProgramsData(items);
  res.status(201).json({ success: true, message: 'Program created successfully', data: newProgram });
});

// PUT /api/programs/:id - Update program in MongoDB Atlas
programsRouter.put('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const updated = await Program.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Program updated in MongoDB Atlas', data: updated });
      }
    } catch (err) {
      console.error('MongoDB Program Update Error:', err);
    }
  }

  const items = getProgramsData();
  const index = items.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Program not found' });

  items[index] = {
    ...items[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveProgramsData(items);
  res.json({ success: true, message: 'Program updated successfully', data: items[index] });
});

// DELETE /api/programs/:id - Delete program from MongoDB Atlas
programsRouter.delete('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Program.deleteOne({ id: req.params.id });
      return res.json({ success: true, message: 'Program deleted from MongoDB Atlas' });
    } catch (err) {
      console.error('MongoDB Program Delete Error:', err);
    }
  }

  const items = getProgramsData();
  const filtered = items.filter((p) => p.id !== req.params.id);
  saveProgramsData(filtered);
  res.json({ success: true, message: 'Program deleted successfully' });
});
