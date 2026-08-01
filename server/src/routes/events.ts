import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const eventsRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/events.json');

const defaultEvents = [
  {
    id: 'event-1',
    title: 'Mega Free Multi-Specialty Health Camp',
    titleTa: 'மெகா இலவச பன்முக மருத்துவ முகாம்',
    date: 'August 15, 2026',
    time: '08:30 AM - 04:00 PM',
    location: 'Sri Susheela Community Hall, Kanchipuram',
    locationTa: 'ஸ்ரீ சுசீலா சமுதாயக்கூடம், காஞ்சிபுரம்',
    shortDesc: 'Free Cardiology, Ophthalmology, Pediatrics, and Orthopedic consultations along with free medicine distribution.',
    shortDescTa: 'இலவச இதய நோய், கண், குழந்தைகள் மற்றும் எலும்பு சிகிச்சை பரிசோதனைகள் மற்றும் மருந்துகள்.',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    isUpcoming: true,
    status: 'Upcoming',
    registeredCount: 420,
    attendees: 420,
  },
  {
    id: 'event-2',
    title: 'Educational Kit & Laptop Distribution Drive',
    titleTa: 'கல்வி உபகரணங்கள் மற்றும் மடிக்கணினி வழங்கும் விழா',
    date: 'September 5, 2026',
    time: '10:00 AM - 01:00 PM',
    location: 'Government Higher Secondary School Auditorium, Thiruvallur',
    locationTa: 'அரசு மேல்நிலைப்பள்ளி அரங்கம், திருவள்ளூர்',
    shortDesc: 'Distributing 500+ student learning kits and 50 refurbished laptops to underprivileged college scholars.',
    shortDescTa: '500+ மாணவர்களுக்கு இலவச பாடப்புத்தகங்கள் மற்றும் 50 மடிக்கணினிகள் வழங்கல்.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    isUpcoming: true,
    status: 'Upcoming',
    registeredCount: 290,
    attendees: 290,
  },
  {
    id: 'event-3',
    title: 'Grand Annadhanam Mahotsavam 2026',
    titleTa: 'மாபெரும் அன்னதான மஹோத்சவம் 2026',
    date: 'July 10, 2026',
    time: '07:00 AM - 08:00 PM',
    location: 'Sri Susheela Trust Headquarters, Chennai',
    locationTa: 'ஸ்ரீ சுசீலா அறக்கட்டளை தலைமையகம், சென்னை',
    shortDesc: 'Served traditional festive banana leaf feast for over 10,000 people in a single day.',
    shortDescTa: 'ஒரே நாளில் 10,000-க்கும் மேற்பட்டோருக்கு பாரம்பரிய வாழை இலை விருந்து உபசரிப்பு.',
    category: 'Annadhanam',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    isUpcoming: false,
    status: 'Completed',
    registeredCount: 10500,
    attendees: 10500,
  },
];

function getEventsData(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveEventsData(defaultEvents);
      return defaultEvents;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultEvents;
  }
}

function saveEventsData(data: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing events.json:', err);
  }
}

// GET /api/events
eventsRouter.get('/', (_req, res) => {
  const data = getEventsData();
  res.json({ success: true, count: data.length, data });
});

// POST /api/events
eventsRouter.post('/', (req, res) => {
  const { title, titleTa, date, time, location, locationTa, shortDesc, shortDescTa, category, imageUrl, status } = req.body;
  if (!title || !date) {
    return res.status(400).json({ success: false, message: 'Title and Date are required' });
  }

  const items = getEventsData();
  const newEvent = {
    id: `EV-${Math.floor(100 + Math.random() * 900)}`,
    title,
    titleTa: titleTa || title,
    date,
    time: time || '09:00 AM - 05:00 PM',
    location: location || 'Sri Susheela Trust Hall',
    locationTa: locationTa || location || '',
    shortDesc: shortDesc || '',
    shortDescTa: shortDescTa || shortDesc || '',
    category: category || 'General',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    isUpcoming: status !== 'Completed',
    status: status || 'Upcoming',
    registeredCount: 0,
    attendees: 0,
    createdAt: new Date().toISOString(),
  };

  items.unshift(newEvent);
  saveEventsData(items);
  res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
});

// PUT /api/events/:id
eventsRouter.put('/:id', (req, res) => {
  const items = getEventsData();
  const index = items.findIndex((e) => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Event not found' });

  items[index] = {
    ...items[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveEventsData(items);
  res.json({ success: true, message: 'Event updated successfully', data: items[index] });
});

// DELETE /api/events/:id
eventsRouter.delete('/:id', (req, res) => {
  const items = getEventsData();
  const filtered = items.filter((e) => e.id !== req.params.id);
  saveEventsData(filtered);
  res.json({ success: true, message: 'Event deleted successfully' });
});
