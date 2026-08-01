import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// GET /api/volunteers
volunteersRouter.get('/', (_req, res) => {
  const data = getVolunteersData();
  res.json({ success: true, count: data.length, data });
});

// POST /api/volunteers
volunteersRouter.post('/', (req, res) => {
  const name = req.body.name || req.body.fullName;
  const phone = req.body.phone;
  const email = req.body.email;
  const role = req.body.role || req.body.preferredDomain || 'General Volunteer';
  const message = req.body.message || req.body.motivation || '';

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
  }

  const items = getVolunteersData();
  const newVolunteer = {
    id: `VOL-${Math.floor(300 + Math.random() * 600)}`,
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

// PUT /api/volunteers/:id
volunteersRouter.put('/:id', (req, res) => {
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

// DELETE /api/volunteers/:id
volunteersRouter.delete('/:id', (req, res) => {
  const items = getVolunteersData();
  const filtered = items.filter((v) => v.id !== req.params.id);
  saveVolunteersData(filtered);
  res.json({ success: true, message: 'Volunteer deleted' });
});
