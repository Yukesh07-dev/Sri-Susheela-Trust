import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const newsRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/news.json');

const defaultNews = [
  {
    id: 'news-1',
    title: 'Sri Susheela Trust Recognized with State Excellence Award for Annadhanam Services',
    titleTa: 'ஸ்ரீ சுசீலா அறக்கட்டளைக்கு மாநில சிறந்த சமூக சேவை விருது',
    publishedDate: 'June 20, 2026',
    category: 'Recognition',
    excerpt: 'The Honorable State Minister commended Sri Susheela Trust for serving over 500,000 meals to needy communities.',
    excerptTa: '5 லட்சம் பேருக்கு மேல் அன்னதானம் வழங்கிய ஸ்ரீ சுசீலா அறக்கட்டளைக்கு அமைச்சரின் பாராட்டு விருது.',
    content: 'Sri Susheela Trust has been bestowed with the State Social Excellence Award 2026 in recognition of its unremitting dedication to eradicating hunger through its Daily Annadhanam Initiative.',
    contentTa: 'பசி இல்லாத சமுதாயத்தை உருவாக்க பாடுபடும் ஸ்ரீ சுசீலா அறக்கட்டளைக்கு 2026 ஆம் ஆண்டிற்கான சிறந்த விருதை அரசு வழங்கியுள்ளது.',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read',
    author: 'Editorial Team',
  },
  {
    id: 'news-2',
    title: 'New Digital Learning Center Opened in Rural Kanchipuram School',
    titleTa: 'காஞ்சிபுரம் கிராமப்புற பள்ளியில் புதிய டிஜிட்டல் கற்றல் மையம்',
    publishedDate: 'May 12, 2026',
    category: 'Education',
    excerpt: 'Equipped with 25 high-speed computer systems, smart boards, and internet connectivity for 600 rural students.',
    excerptTa: '600 மாணவர்களுக்காக 25 கணினிகள் மற்றும் ஸ்மார்ட் போர்டுகளுடன் கூடிய புதிய மையம்.',
    content: 'Continuing our promise of democratizing education, Sri Susheela Trust inaugurated its 12th Vidya Jyothi Digital Learning Center at Government School Kanchipuram.',
    contentTa: 'கிராமப்புற மாணவர்களுக்கும் கணினி அறிவியல் கல்வியை இலவசமாக கொண்டு சேர்க்கும் முயற்சி தொடர்ந்து நடைபெறுகிறது.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    author: 'Vidya Jyothi Team',
  },
];

function getNewsData(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveNewsData(defaultNews);
      return defaultNews;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultNews;
  }
}

function saveNewsData(data: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing news.json:', err);
  }
}

// GET /api/news
newsRouter.get('/', (_req, res) => {
  const data = getNewsData();
  res.json({ success: true, count: data.length, data });
});

// POST /api/news
newsRouter.post('/', (req, res) => {
  const { title, titleTa, category, excerpt, excerptTa, content, contentTa, imageUrl, author, readTime } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and Content are required' });
  }

  const items = getNewsData();
  const newArticle = {
    id: `news-${Date.now()}`,
    title,
    titleTa: titleTa || title,
    publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    category: category || 'Updates',
    excerpt: excerpt || content.substring(0, 120),
    excerptTa: excerptTa || excerpt || '',
    content,
    contentTa: contentTa || content,
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    readTime: readTime || '3 min read',
    author: author || 'Sri Susheela Trust Team',
    createdAt: new Date().toISOString(),
  };

  items.unshift(newArticle);
  saveNewsData(items);
  res.status(201).json({ success: true, message: 'News article published successfully', data: newArticle });
});

// PUT /api/news/:id
newsRouter.put('/:id', (req, res) => {
  const items = getNewsData();
  const index = items.findIndex((n) => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'News article not found' });

  items[index] = {
    ...items[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveNewsData(items);
  res.json({ success: true, message: 'News article updated successfully', data: items[index] });
});

// DELETE /api/news/:id
newsRouter.delete('/:id', (req, res) => {
  const items = getNewsData();
  const filtered = items.filter((n) => n.id !== req.params.id);
  saveNewsData(filtered);
  res.json({ success: true, message: 'News article deleted successfully' });
});
