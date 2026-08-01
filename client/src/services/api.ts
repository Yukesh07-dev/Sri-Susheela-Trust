/// <reference types="vite/client" />
import axios from 'axios';
import { MOCK_PROGRAMS, MOCK_EVENTS, MOCK_GALLERY, MOCK_NEWS, MOCK_TESTIMONIALS, MOCK_IMPACT_STATS, MOCK_TIMELINE } from '../constants';
import { ProgramItem, EventItem, GalleryItem, NewsArticle, TestimonialItem, ImpactStat, TimelineItem, VolunteerFormData, ContactFormData } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

function mergeLocalData<T extends { id: string }>(key: string, items: T[]): T[] {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const localItems: T[] = JSON.parse(saved);
      if (localItems.length > 0) {
        const existingIds = new Set(items.map((i) => i.id));
        const newLocals = localItems.filter((i) => !existingIds.has(i.id));
        return [...newLocals, ...items];
      }
    }
  } catch { }
  return items;
}

export const apiService = {
  // Settings / Trust Info
  getSettings: async (): Promise<any> => {
    try {
      const res = await apiClient.get('/settings');
      if (res.data?.data) return res.data.data;
    } catch { }
    try {
      const saved = localStorage.getItem('SST_LOCAL_SETTINGS');
      if (saved) return JSON.parse(saved);
    } catch { }
    return null;
  },

  // Programs
  getPrograms: async (): Promise<ProgramItem[]> => {
    let items: ProgramItem[] = [];
    try {
      const res = await apiClient.get('/programs');
      if (res.data?.data) items = res.data.data;
      else items = MOCK_PROGRAMS;
    } catch {
      items = MOCK_PROGRAMS;
    }
    return mergeLocalData('SST_LOCAL_PROGRAMS', items);
  },

  getProgramById: async (id: string): Promise<ProgramItem | undefined> => {
    const programs = await apiService.getPrograms();
    return programs.find((p) => p.id === id);
  },

  // Events
  getEvents: async (): Promise<EventItem[]> => {
    let items: EventItem[] = [];
    try {
      const res = await apiClient.get('/events');
      if (res.data?.data) items = res.data.data;
      else items = MOCK_EVENTS;
    } catch {
      items = MOCK_EVENTS;
    }
    return mergeLocalData('SST_LOCAL_EVENTS', items);
  },

  // Gallery
  getGalleryItems: async (category?: string): Promise<GalleryItem[]> => {
    let items: GalleryItem[] = [];
    try {
      const res = await apiClient.get('/gallery', { params: { category } });
      if (res.data?.data) items = res.data.data;
      else items = MOCK_GALLERY;
    } catch {
      items = MOCK_GALLERY;
    }
    items = mergeLocalData('SST_LOCAL_GALLERY', items);
    if (category && category !== 'all') {
      items = items.filter((item) => item.category === category);
    }
    return items;
  },

  // News
  getNews: async (): Promise<NewsArticle[]> => {
    let items: NewsArticle[] = [];
    try {
      const res = await apiClient.get('/news');
      if (res.data?.data) items = res.data.data;
      else items = MOCK_NEWS;
    } catch {
      items = MOCK_NEWS;
    }
    return mergeLocalData('SST_LOCAL_NEWS', items);
  },

  // Testimonials
  getTestimonials: async (): Promise<TestimonialItem[]> => {
    let items: TestimonialItem[] = [];
    try {
      const res = await apiClient.get('/testimonials');
      if (res.data?.data) items = res.data.data;
      else items = MOCK_TESTIMONIALS;
    } catch {
      items = MOCK_TESTIMONIALS;
    }
    return mergeLocalData('SST_LOCAL_TESTIMONIALS', items);
  },

  // Impact Stats
  getImpactStats: async (): Promise<ImpactStat[]> => {
    return MOCK_IMPACT_STATS;
  },

  // Timeline
  getTimeline: async (): Promise<TimelineItem[]> => {
    return MOCK_TIMELINE;
  },

  // Submit Volunteer Application
  submitVolunteerForm: async (data: VolunteerFormData): Promise<{ success: boolean; message: string }> => {
    try {
      await apiClient.post('/volunteers', data);
    } catch {
      // Save locally
      try {
        const saved = localStorage.getItem('SST_LOCAL_VOLUNTEERS');
        const list = saved ? JSON.parse(saved) : [];
        list.unshift({ id: `VOL-${Date.now()}`, ...data, status: 'Pending', joinedDate: new Date().toISOString().split('T')[0] });
        localStorage.setItem('SST_LOCAL_VOLUNTEERS', JSON.stringify(list));
      } catch {}
    }
    return {
      success: true,
      message: 'Thank you for registering as a volunteer! Our team will contact you within 24-48 hours.',
    };
  },

  // Submit Contact Form
  submitContactForm: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    return {
      success: true,
      message: 'Your message has been received! We appreciate your interest in Sri Susheela Trust.',
    };
  },
};
