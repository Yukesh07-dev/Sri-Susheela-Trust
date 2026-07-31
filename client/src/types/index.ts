export type Language = 'en' | 'ta';

export interface ProgramItem {
  id: string;
  title: string;
  titleTa: string;
  shortDesc: string;
  shortDescTa: string;
  description: string;
  descriptionTa: string;
  category: 'annadhanam' | 'education' | 'healthcare' | 'elderly' | 'empowerment';
  iconName: string;
  imageUrl: string;
  beneficiariesCount: string;
  beneficiariesCountTa?: string;
  features: string[];
  featuresTa: string[];
}

export interface EventItem {
  id: string;
  title: string;
  titleTa: string;
  date: string;
  time: string;
  location: string;
  locationTa: string;
  shortDesc: string;
  shortDescTa: string;
  category: string;
  imageUrl: string;
  isUpcoming: boolean;
  registeredCount: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleTa: string;
  category: 'annadhanam' | 'education' | 'healthcare' | 'events' | 'community';
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleTa: string;
  publishedDate: string;
  category: string;
  excerpt: string;
  excerptTa: string;
  content: string;
  contentTa: string;
  imageUrl: string;
  readTime: string;
  author: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  roleTa: string;
  quote: string;
  quoteTa: string;
  avatarUrl: string;
  rating: number;
  location: string;
}

export interface ImpactStat {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  labelTa: string;
  description: string;
  descriptionTa: string;
  iconName: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  badge?: string;
}

export interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  ageGroup: string;
  occupation: string;
  preferredDomain: string;
  availability: string;
  motivation: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
