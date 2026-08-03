import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact.js';

export const contactRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/contacts.json');

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Read' | 'Replied' | 'Archived';
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

const defaultContacts: ContactItem[] = [
  {
    id: 'CNT-101',
    name: 'Kavitha Ramakrishnan',
    email: 'kavitha.ram@gmail.com',
    phone: '+91 98401 23456',
    subject: 'Annadhanam Donation',
    message: 'Hello, I would like to sponsor Sunday lunch Annadhanam for 200 people at your Uthandi center.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'CNT-102',
    name: 'Santhosh Kumar',
    email: 'santhosh.k@techcorp.in',
    phone: '+91 97908 76543',
    subject: 'Corporate CSR',
    message: 'We are looking to partner with Sri Susheela Trust for our Q3 CSR education kit distribution drive.',
    status: 'Replied',
    adminNotes: 'Spoke on phone, scheduled meeting for Thursday.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'CNT-103',
    name: 'Meena Sundaram',
    email: 'meena.s@yahoo.co.in',
    phone: '+91 94440 98765',
    subject: 'General Inquiry',
    message: 'Can I visit the trust headquarters this Saturday evening between 4 PM and 6 PM?',
    status: 'Read',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

function getContactsData(): ContactItem[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveContactsData(defaultContacts);
      return defaultContacts;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultContacts;
  }
}

function saveContactsData(data: ContactItem[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing contacts.json:', err);
  }
}

// GET /api/contact - List all contact inquiries
contactRouter.get('/', async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const data = await Contact.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error('MongoDB Contact Find Error:', err);
    }
  }

  const data = getContactsData();
  res.json({ success: true, count: data.length, data });
});

// POST /api/contact - Submit new contact inquiry
contactRouter.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
  }

  const id = `CNT-${Math.floor(100 + Math.random() * 900)}`;

  if (mongoose.connection.readyState === 1) {
    try {
      const newContactDoc = await Contact.create({
        id,
        name,
        email: email || 'N/A',
        phone,
        subject: subject || 'General Inquiry',
        message: message || '',
        status: 'Pending',
      });
      return res.status(201).json({
        success: true,
        message: 'Contact message saved to MongoDB Atlas',
        data: newContactDoc,
      });
    } catch (err) {
      console.error('MongoDB Contact Create Error:', err);
    }
  }

  const items = getContactsData();
  const newContact: ContactItem = {
    id,
    name,
    email: email || 'N/A',
    phone,
    subject: subject || 'General Inquiry',
    message: message || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  items.unshift(newContact);
  saveContactsData(items);

  res.status(201).json({
    success: true,
    message: 'Contact message submitted and saved successfully',
    data: newContact,
  });
});

// PUT /api/contact/:id - Update contact inquiry (status, notes)
contactRouter.put('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const updated = await Contact.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Contact inquiry updated in MongoDB Atlas', data: updated });
      }
    } catch (err) {
      console.error('MongoDB Contact Update Error:', err);
    }
  }

  const items = getContactsData();
  const index = items.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Contact record not found' });
  }

  items[index] = {
    ...items[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveContactsData(items);
  res.json({ success: true, message: 'Contact inquiry updated successfully', data: items[index] });
});

// DELETE /api/contact/:id - Delete a contact inquiry
contactRouter.delete('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Contact.deleteOne({ id: req.params.id });
      return res.json({ success: true, message: 'Contact inquiry deleted from MongoDB Atlas' });
    } catch (err) {
      console.error('MongoDB Contact Delete Error:', err);
    }
  }

  const items = getContactsData();
  const filtered = items.filter((c) => c.id !== req.params.id);

  saveContactsData(filtered);
  res.json({ success: true, message: 'Contact inquiry deleted successfully' });
});
