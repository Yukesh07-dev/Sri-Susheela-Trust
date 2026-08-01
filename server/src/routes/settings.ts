import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const settingsRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/settings.json');

const defaultSettings = {
  name: 'Sri Susheela Trust',
  nameTa: 'ஸ்ரீ சுசீலா அறக்கட்டளை',
  founder: 'Iyappan R',
  founderTa: 'ஐயப்பன் R',
  tagline: 'Nurturing Hope, Empowering Communities, Serving Humanity',
  taglineTa: 'நம்பிக்கையை வளர்ப்போம், சமுதாயத்தை உயர்த்துவோம், மனிதநேயத்துடன் சேவையாற்றுவோம்',
  regNumber: 'REG-TN/2021/80G/12A/04928',
  establishedYear: '2021',
  email: 'srisusilaarakattalai0088@gmail.com',
  phonePrimary: '+91 97105 37506',
  phoneSecondary: '+91 97105 37506',
  address: {
    street: '158 Thiruvika Street',
    streetTa: '158 திரு வி.க. தெரு',
    area: 'Uthandi',
    areaTa: 'உத்தண்டி',
    city: 'Chennai',
    cityTa: 'சென்னை',
    state: 'Tamil Nadu',
    stateTa: 'தமிழ்நாடு',
    pincode: '60119',
    country: 'India',
  },
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/919710537506',
  },
};

function getSettingsData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveSettingsData(defaultSettings);
      return defaultSettings;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return defaultSettings;
  }
}

function saveSettingsData(data: any) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing settings.json:', err);
  }
}

// GET /api/settings
settingsRouter.get('/', (_req, res) => {
  const data = getSettingsData();
  res.json({ success: true, data });
});

// PUT /api/settings
settingsRouter.put('/', (req, res) => {
  const current = getSettingsData();
  const updated = {
    ...current,
    ...req.body,
    address: {
      ...current.address,
      ...(req.body.address || {}),
    },
    socials: {
      ...current.socials,
      ...(req.body.socials || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  saveSettingsData(updated);
  res.json({ success: true, message: 'Settings updated successfully', data: updated });
});
