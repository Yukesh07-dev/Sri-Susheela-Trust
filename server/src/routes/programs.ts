import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// GET /api/programs
programsRouter.get('/', (_req, res) => {
  const data = getProgramsData();
  res.json({ success: true, count: data.length, data });
});

// GET /api/programs/:id
programsRouter.get('/:id', (req, res) => {
  const data = getProgramsData();
  const program = data.find((p) => p.id === req.params.id);
  if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
  res.json({ success: true, data: program });
});

// POST /api/programs
programsRouter.post('/', (req, res) => {
  const { title, titleTa, shortDesc, shortDescTa, description, descriptionTa, category, imageUrl, beneficiariesCount, beneficiariesCountTa, features } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and Description are required' });
  }

  const items = getProgramsData();
  const newProgram = {
    id: `prog-${Date.now()}`,
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

// PUT /api/programs/:id
programsRouter.put('/:id', (req, res) => {
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

// DELETE /api/programs/:id
programsRouter.delete('/:id', (req, res) => {
  const items = getProgramsData();
  const filtered = items.filter((p) => p.id !== req.params.id);
  saveProgramsData(filtered);
  res.json({ success: true, message: 'Program deleted successfully' });
});
