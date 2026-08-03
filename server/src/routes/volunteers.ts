import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Volunteer } from '../models/Volunteer.js';

export const volunteersRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/volunteers.json');

const defaultVolunteers = [
  { id: 'VOL-301', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '+91 98765 43210', role: 'Event Coordinator', joinedDate: '2026-01-15', status: 'Active' },
  { id: 'VOL-302', name: 'Neha Verma', email: 'neha@example.com', phone: '+91 98765 12345', role: 'Medical Volunteer', joinedDate: '2026-03-20', status: 'Active' },
  { id: 'VOL-303', name: 'Suresh Rao', email: 'suresh@example.com', phone: '+91 98765 99887', role: 'Field Worker', joinedDate: '2026-06-01', status: 'Pending' },
];

function getVolunteersData(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveVolunteersData(defaultVolunteers);
      return defaultVolunteers;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultVolunteers;
  }
}

function saveVolunteersData(data: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing volunteers.json:', err);
  }
}

// GET /api/volunteers - Read from MongoDB Atlas
volunteersRouter.get('/', async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const data = await Volunteer.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error('MongoDB Volunteer Find Error:', err);
    }
  }

  const data = getVolunteersData();
  res.json({ success: true, count: data.length, data });
});

// POST /api/volunteers - Create new volunteer in MongoDB Atlas
volunteersRouter.post('/', async (req, res) => {
  const name = req.body.name || req.body.fullName;
  const phone = req.body.phone;
  const email = req.body.email;
  const role = req.body.role || req.body.preferredDomain || 'General Volunteer';
  const message = req.body.message || req.body.motivation || '';

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
  }

  const id = `VOL-${Math.floor(300 + Math.random() * 600)}`;

  if (mongoose.connection.readyState === 1) {
    try {
      const newVol = await Volunteer.create({
        id,
        name,
        email: email || 'N/A',
        phone,
        role,
        message,
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
      });
      return res.status(201).json({
        success: true,
        message: 'Volunteer application saved to MongoDB Atlas',
        data: newVol,
      });
    } catch (err) {
      console.error('MongoDB Volunteer Create Error:', err);
    }
  }

  const items = getVolunteersData();
  const newVolunteer = {
    id,
    name,
    email: email || 'N/A',
    phone,
    role,
    message,
    joinedDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  items.unshift(newVolunteer);
  saveVolunteersData(items);
  res.status(201).json({ success: true, message: 'Volunteer application submitted successfully', data: newVolunteer });
});

// PUT /api/volunteers/:id - Update volunteer status in MongoDB Atlas
volunteersRouter.put('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const updated = await Volunteer.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Volunteer status updated in MongoDB Atlas', data: updated });
      }
    } catch (err) {
      console.error('MongoDB Volunteer Update Error:', err);
    }
  }

  const items = getVolunteersData();
  const index = items.findIndex((v) => v.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Volunteer not found' });

  items[index] = {
    ...items[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveVolunteersData(items);
  res.json({ success: true, message: 'Volunteer status updated', data: items[index] });
});

// DELETE /api/volunteers/:id - Delete volunteer from MongoDB Atlas
volunteersRouter.delete('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Volunteer.deleteOne({ id: req.params.id });
      return res.json({ success: true, message: 'Volunteer deleted from MongoDB Atlas' });
    } catch (err) {
      console.error('MongoDB Volunteer Delete Error:', err);
    }
  }

  const items = getVolunteersData();
  const filtered = items.filter((v) => v.id !== req.params.id);
  saveVolunteersData(filtered);
  res.json({ success: true, message: 'Volunteer deleted' });
});
