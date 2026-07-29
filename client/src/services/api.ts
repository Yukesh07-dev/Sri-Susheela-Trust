/// <reference types="vite/client" />
import axios from 'axios';
import { MOCK_PROGRAMS, MOCK_EVENTS, MOCK_GALLERY, MOCK_NEWS, MOCK_TESTIMONIALS, MOCK_IMPACT_STATS, MOCK_TIMELINE } from '../constants';
import { ProgramItem, EventItem, GalleryItem, NewsArticle, TestimonialItem, ImpactStat, TimelineItem, VolunteerFormData, ContactFormData } from '../types';

// Future API Base URL (configured for environment variable)
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const apiService = {
  // Programs
  getPrograms: async (): Promise<ProgramItem[]> => {
    try {
      // In production, will attempt: const res = await apiClient.get('/programs'); return res.data;
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_PROGRAMS), 300));
    } catch {
      return MOCK_PROGRAMS;
    }
  },

  getProgramById: async (id: string): Promise<ProgramItem | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PROGRAMS.find((p) => p.id === id));
      }, 200);
    });
  },

  // Events
  getEvents: async (): Promise<EventItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_EVENTS), 300));
  },

  // Gallery
  getGalleryItems: async (category?: string): Promise<GalleryItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category && category !== 'all') {
          resolve(MOCK_GALLERY.filter((item) => item.category === category));
        } else {
          resolve(MOCK_GALLERY);
        }
      }, 300);
    });
  },

  // News
  getNews: async (): Promise<NewsArticle[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_NEWS), 300));
  },

  // Testimonials
  getTestimonials: async (): Promise<TestimonialItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_TESTIMONIALS), 300));
  },

  // Impact Stats
  getImpactStats: async (): Promise<ImpactStat[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_IMPACT_STATS), 200));
  },

  // Timeline
  getTimeline: async (): Promise<TimelineItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_TIMELINE), 200));
  },

  // Submit Volunteer Application
  submitVolunteerForm: async (data: VolunteerFormData): Promise<{ success: boolean; message: string }> => {
    try {
      console.log('Submitting Volunteer Application to backend endpoint...', data);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Thank you for registering as a volunteer! Our team will contact you within 24-48 hours.',
          });
        }, 800);
      });
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit application. Please check your internet connection and try again.',
      };
    }
  },

  // Submit Contact Form
  submitContactForm: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    try {
      console.log('Submitting Contact Inquiry to backend endpoint...', data);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Your message has been received! We appreciate your interest in Sri Susheela Trust.',
          });
        }, 800);
      });
    } catch (error) {
      return {
        success: false,
        message: 'Message delivery failed. Please reach out to us directly via phone or email.',
      };
    }
  },
};
