import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';
import { Gallery } from '../models/Gallery.js';

export const galleryRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `img-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (.jpg, .png, .webp, .gif) are allowed!'));
    }
  },
});

// JSON Persistence Helper Fallback
const DATA_FILE = path.join(__dirname, '../data/gallery.json');

function getGalleryData(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading gallery.json:', error);
    return [];
  }
}

function saveGalleryData(data: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing gallery.json:', error);
  }
}

// GET /api/gallery - Read from MongoDB Atlas
galleryRouter.get('/', async (req, res) => {
  const category = req.query.category as string;

  if (mongoose.connection.readyState === 1) {
    try {
      const query: any = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      const data = await Gallery.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error('MongoDB Gallery Find Error:', err);
    }
  }

  let data = getGalleryData();
  if (category && category !== 'all') {
    data = data.filter((item) => item.category === category);
  }
  res.json({ success: true, count: data.length, data });
});

// POST /api/gallery/upload - Safe file upload with callback error handling
galleryRouter.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).json({ success: false, message: err.message || 'File upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      url: imageUrl,
      filename: req.file.filename,
    });
  });
});

// POST /api/gallery - Create new gallery item in MongoDB Atlas
galleryRouter.post('/', async (req, res) => {
  const { title, titleTa, category, description, mediaUrl, thumbnailUrl } = req.body;

  if (!title || !mediaUrl) {
    return res.status(400).json({ success: false, message: 'Title and image URL are required' });
  }

  const id = `gal-${Date.now()}`;

  if (mongoose.connection.readyState === 1) {
    try {
      const newGal = await Gallery.create({
        id,
        title,
        titleTa: titleTa || title,
        category: category || 'general',
        type: 'image',
        mediaUrl,
        thumbnailUrl: thumbnailUrl || mediaUrl,
        description: description || '',
      });
      return res.status(201).json({
        success: true,
        message: 'Gallery item saved to MongoDB Atlas',
        data: newGal,
      });
    } catch (err) {
      console.error('MongoDB Gallery Create Error:', err);
    }
  }

  const items = getGalleryData();
  const newItem = {
    id,
    title,
    titleTa: titleTa || title,
    category: category || 'general',
    type: 'image',
    mediaUrl,
    thumbnailUrl: thumbnailUrl || mediaUrl,
    description: description || '',
    createdAt: new Date().toISOString(),
  };

  items.unshift(newItem);
  saveGalleryData(items);

  res.status(201).json({
    success: true,
    message: 'Gallery item added successfully',
    data: newItem,
  });
});

// PUT /api/gallery/:id - Update gallery item in MongoDB Atlas
galleryRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1) {
    try {
      const updated = await Gallery.findOneAndUpdate(
        { id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Gallery item updated in MongoDB Atlas', data: updated });
      }
    } catch (err) {
      console.error('MongoDB Gallery Update Error:', err);
    }
  }

  const items = getGalleryData();
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  }

  items[index] = { ...items[index], ...req.body };
  saveGalleryData(items);

  res.json({ success: true, message: 'Gallery item updated successfully', data: items[index] });
});

// DELETE /api/gallery/:id - Delete gallery item from MongoDB Atlas
galleryRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1) {
    try {
      await Gallery.deleteOne({ id });
      return res.json({ success: true, message: 'Gallery item deleted from MongoDB Atlas' });
    } catch (err) {
      console.error('MongoDB Gallery Delete Error:', err);
    }
  }

  const items = getGalleryData();
  const filtered = items.filter((item) => item.id !== id);
  saveGalleryData(filtered);

  res.json({ success: true, message: 'Gallery item deleted successfully' });
});
