import axios from 'axios';
import { DashboardStats, EventItem, Volunteer, GalleryItem, ProgramItem, NewsArticle, TestimonialItem, TrustInfo, ContactInquiry } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Helper for LocalStorage fallback
function getLocalItem<T>(key: string, defaultValue: T[]): T[] {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`LocalStorage write error for ${key}`);
  }
}

// Settings API
export const settingsApi = {
  getSettings: async (): Promise<TrustInfo> => {
    try {
      const res = await api.get('/settings');
      if (res.data?.data) return res.data.data;
    } catch { }
    try {
      const saved = localStorage.getItem('SST_LOCAL_SETTINGS');
      if (saved) return JSON.parse(saved);
    } catch { }
    return {
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
  },
  updateSettings: async (data: Partial<TrustInfo>): Promise<TrustInfo> => {
    try {
      const res = await api.put('/settings', data);
      if (res.data?.data) {
        localStorage.setItem('SST_LOCAL_SETTINGS', JSON.stringify(res.data.data));
        return res.data.data;
      }
    } catch { }
    const current = await settingsApi.getSettings();
    const updated = { ...current, ...data };
    localStorage.setItem('SST_LOCAL_SETTINGS', JSON.stringify(updated));
    return updated;
  },
};

// Programs API
export const programsApi = {
  getPrograms: async (): Promise<ProgramItem[]> => {
    try {
      const res = await api.get('/programs');
      if (res.data?.data) return res.data.data;
    } catch { }
    return getLocalItem<ProgramItem>('SST_LOCAL_PROGRAMS', []);
  },
  createProgram: async (data: Partial<ProgramItem>): Promise<ProgramItem> => {
    try {
      const res = await api.post('/programs', data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const newItem = { id: `prog-${Date.now()}`, ...data } as ProgramItem;
    const local = getLocalItem<ProgramItem>('SST_LOCAL_PROGRAMS', []);
    local.unshift(newItem);
    setLocalItem('SST_LOCAL_PROGRAMS', local);
    return newItem;
  },
  updateProgram: async (id: string, data: Partial<ProgramItem>): Promise<ProgramItem> => {
    try {
      const res = await api.put(`/programs/${id}`, data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<ProgramItem>('SST_LOCAL_PROGRAMS', []);
    const idx = local.findIndex((p) => p.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...data };
      setLocalItem('SST_LOCAL_PROGRAMS', local);
    }
    return { id, ...data } as ProgramItem;
  },
  deleteProgram: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/programs/${id}`);
    } catch { }
    const local = getLocalItem<ProgramItem>('SST_LOCAL_PROGRAMS', []);
    setLocalItem('SST_LOCAL_PROGRAMS', local.filter((p) => p.id !== id));
    return true;
  },
};

// Events API
export const eventsApi = {
  getEvents: async (): Promise<EventItem[]> => {
    try {
      const res = await api.get('/events');
      if (res.data?.data) return res.data.data;
    } catch { }
    return getLocalItem<EventItem>('SST_LOCAL_EVENTS', []);
  },
  createEvent: async (data: Partial<EventItem>): Promise<EventItem> => {
    try {
      const res = await api.post('/events', data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const newItem = { id: `EV-${Math.floor(100 + Math.random() * 900)}`, ...data } as EventItem;
    const local = getLocalItem<EventItem>('SST_LOCAL_EVENTS', []);
    local.unshift(newItem);
    setLocalItem('SST_LOCAL_EVENTS', local);
    return newItem;
  },
  updateEvent: async (id: string, data: Partial<EventItem>): Promise<EventItem> => {
    try {
      const res = await api.put(`/events/${id}`, data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<EventItem>('SST_LOCAL_EVENTS', []);
    const idx = local.findIndex((e) => e.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...data };
      setLocalItem('SST_LOCAL_EVENTS', local);
    }
    return { id, ...data } as EventItem;
  },
  deleteEvent: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/events/${id}`);
    } catch { }
    const local = getLocalItem<EventItem>('SST_LOCAL_EVENTS', []);
    setLocalItem('SST_LOCAL_EVENTS', local.filter((e) => e.id !== id));
    return true;
  },
};

// News API
export const newsApi = {
  getNews: async (): Promise<NewsArticle[]> => {
    try {
      const res = await api.get('/news');
      if (res.data?.data) return res.data.data;
    } catch { }
    return getLocalItem<NewsArticle>('SST_LOCAL_NEWS', []);
  },
  createNews: async (data: Partial<NewsArticle>): Promise<NewsArticle> => {
    try {
      const res = await api.post('/news', data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const newItem = { id: `news-${Date.now()}`, ...data } as NewsArticle;
    const local = getLocalItem<NewsArticle>('SST_LOCAL_NEWS', []);
    local.unshift(newItem);
    setLocalItem('SST_LOCAL_NEWS', local);
    return newItem;
  },
  updateNews: async (id: string, data: Partial<NewsArticle>): Promise<NewsArticle> => {
    try {
      const res = await api.put(`/news/${id}`, data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<NewsArticle>('SST_LOCAL_NEWS', []);
    const idx = local.findIndex((n) => n.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...data };
      setLocalItem('SST_LOCAL_NEWS', local);
    }
    return { id, ...data } as NewsArticle;
  },
  deleteNews: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/news/${id}`);
    } catch { }
    const local = getLocalItem<NewsArticle>('SST_LOCAL_NEWS', []);
    setLocalItem('SST_LOCAL_NEWS', local.filter((n) => n.id !== id));
    return true;
  },
};

// Testimonials API
export const testimonialsApi = {
  getTestimonials: async (): Promise<TestimonialItem[]> => {
    try {
      const res = await api.get('/testimonials');
      if (res.data?.data) return res.data.data;
    } catch { }
    return getLocalItem<TestimonialItem>('SST_LOCAL_TESTIMONIALS', []);
  },
  createTestimonial: async (data: Partial<TestimonialItem>): Promise<TestimonialItem> => {
    try {
      const res = await api.post('/testimonials', data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const newItem = { id: `t-${Date.now()}`, ...data } as TestimonialItem;
    const local = getLocalItem<TestimonialItem>('SST_LOCAL_TESTIMONIALS', []);
    local.unshift(newItem);
    setLocalItem('SST_LOCAL_TESTIMONIALS', local);
    return newItem;
  },
  updateTestimonial: async (id: string, data: Partial<TestimonialItem>): Promise<TestimonialItem> => {
    try {
      const res = await api.put(`/testimonials/${id}`, data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<TestimonialItem>('SST_LOCAL_TESTIMONIALS', []);
    const idx = local.findIndex((t) => t.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...data };
      setLocalItem('SST_LOCAL_TESTIMONIALS', local);
    }
    return { id, ...data } as TestimonialItem;
  },
  deleteTestimonial: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/testimonials/${id}`);
    } catch { }
    const local = getLocalItem<TestimonialItem>('SST_LOCAL_TESTIMONIALS', []);
    setLocalItem('SST_LOCAL_TESTIMONIALS', local.filter((t) => t.id !== id));
    return true;
  },
};

// Volunteers API
export const volunteersApi = {
  getVolunteers: async (): Promise<Volunteer[]> => {
    try {
      const res = await api.get('/volunteers');
      if (res.data?.data) return res.data.data;
    } catch { }
    return getLocalItem<Volunteer>('SST_LOCAL_VOLUNTEERS', []);
  },
  updateVolunteerStatus: async (id: string, status: 'Active' | 'Pending' | 'Inactive'): Promise<boolean> => {
    try {
      await api.put(`/volunteers/${id}`, { status });
    } catch { }
    const local = getLocalItem<Volunteer>('SST_LOCAL_VOLUNTEERS', []);
    const idx = local.findIndex((v) => v.id === id);
    if (idx !== -1) {
      local[idx].status = status;
      setLocalItem('SST_LOCAL_VOLUNTEERS', local);
    }
    return true;
  },
  deleteVolunteer: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/volunteers/${id}`);
    } catch { }
    const local = getLocalItem<Volunteer>('SST_LOCAL_VOLUNTEERS', []);
    setLocalItem('SST_LOCAL_VOLUNTEERS', local.filter((v) => v.id !== id));
    return true;
  },
};

// Gallery API Services
export const galleryApi = {
  getGalleryItems: async (category?: string): Promise<GalleryItem[]> => {
    let result: GalleryItem[] = [];
    try {
      const res = await api.get('/gallery', { params: { category } });
      if (res.data?.data) result = res.data.data;
    } catch { }
    const local = getLocalItem<GalleryItem>('SST_LOCAL_GALLERY', []);
    if (local.length > 0) {
      const existingIds = new Set(result.map((i) => i.id));
      const newLocals = local.filter((i) => !existingIds.has(i.id));
      result = [...newLocals, ...result];
    }
    if (category && category !== 'all') {
      result = result.filter((item) => item.category === category);
    }
    return result;
  },

  uploadImage: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) return res.data.url;
    } catch { }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  createGalleryItem: async (data: Partial<GalleryItem>): Promise<GalleryItem> => {
    try {
      const res = await api.post('/gallery', data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: data.title || 'Untitled',
      titleTa: data.titleTa || data.title || '',
      category: data.category || 'general',
      type: 'image',
      mediaUrl: data.mediaUrl || '',
      thumbnailUrl: data.thumbnailUrl || data.mediaUrl || '',
      description: data.description || '',
      createdAt: new Date().toISOString(),
    };
    const local = getLocalItem<GalleryItem>('SST_LOCAL_GALLERY', []);
    local.unshift(newItem);
    setLocalItem('SST_LOCAL_GALLERY', local);
    return newItem;
  },

  updateGalleryItem: async (id: string, data: Partial<GalleryItem>): Promise<GalleryItem> => {
    try {
      const res = await api.put(`/gallery/${id}`, data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<GalleryItem>('SST_LOCAL_GALLERY', []);
    const idx = local.findIndex((i) => i.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...data };
      setLocalItem('SST_LOCAL_GALLERY', local);
      return local[idx];
    }
    return { id, ...data } as GalleryItem;
  },

  deleteGalleryItem: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/gallery/${id}`);
    } catch { }
    const local = getLocalItem<GalleryItem>('SST_LOCAL_GALLERY', []);
    setLocalItem('SST_LOCAL_GALLERY', local.filter((i) => i.id !== id));
    return true;
  },
};

// Contact Inquiries API
export const contactsApi = {
  getContacts: async (): Promise<ContactInquiry[]> => {
    try {
      const res = await api.get('/contact');
      if (res.data?.data) return res.data.data;
    } catch { }
    return getLocalItem<ContactInquiry>('SST_LOCAL_CONTACTS', []);
  },

  createContact: async (data: Partial<ContactInquiry>): Promise<ContactInquiry> => {
    const newContact: ContactInquiry = {
      id: `CNT-${Date.now()}`,
      name: data.name || '',
      email: data.email || 'N/A',
      phone: data.phone || '',
      subject: data.subject || 'General Inquiry',
      message: data.message || '',
      status: data.status || 'Pending',
      adminNotes: data.adminNotes || '',
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await api.post('/contact', data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<ContactInquiry>('SST_LOCAL_CONTACTS', []);
    local.unshift(newContact);
    setLocalItem('SST_LOCAL_CONTACTS', local);
    return newContact;
  },

  updateContact: async (id: string, data: Partial<ContactInquiry>): Promise<ContactInquiry> => {
    try {
      const res = await api.put(`/contact/${id}`, data);
      if (res.data?.data) return res.data.data;
    } catch { }
    const local = getLocalItem<ContactInquiry>('SST_LOCAL_CONTACTS', []);
    const idx = local.findIndex((i) => i.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...data, updatedAt: new Date().toISOString() };
      setLocalItem('SST_LOCAL_CONTACTS', local);
      return local[idx];
    }
    return { id, ...data } as ContactInquiry;
  },

  deleteContact: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/contact/${id}`);
    } catch { }
    const local = getLocalItem<ContactInquiry>('SST_LOCAL_CONTACTS', []);
    setLocalItem('SST_LOCAL_CONTACTS', local.filter((i) => i.id !== id));
    return true;
  },
};

// Dashboard Stats Helper
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [progs, evts, vols, gals, cnts] = await Promise.all([
    programsApi.getPrograms(),
    eventsApi.getEvents(),
    volunteersApi.getVolunteers(),
    galleryApi.getGalleryItems(),
    contactsApi.getContacts(),
  ]);
  return {
    activePrograms: progs.length,
    activeEvents: evts.length,
    registeredVolunteers: vols.length,
    mediaGalleryItems: gals.length,
    contactInquiries: cnts.length,
  };
};
