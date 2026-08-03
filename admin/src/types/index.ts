export interface ProgramItem {
  id: string;
  title: string;
  titleTa?: string;
  shortDesc: string;
  shortDescTa?: string;
  description: string;
  descriptionTa?: string;
  category: string;
  iconName?: string;
  imageUrl: string;
  beneficiariesCount: string;
  beneficiariesCountTa?: string;
  features?: string[];
  createdAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleTa?: string;
  date: string;
  time?: string;
  location: string;
  locationTa?: string;
  shortDesc?: string;
  shortDescTa?: string;
  category?: string;
  imageUrl?: string;
  isUpcoming?: boolean;
  registeredCount?: number;
  attendees?: number;
  status: 'Upcoming' | 'Completed' | 'Draft';
  createdAt?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message?: string;
  joinedDate: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface NewsArticle {
  id: string;
  title: string;
  titleTa?: string;
  publishedDate: string;
  category: string;
  excerpt: string;
  excerptTa?: string;
  content: string;
  contentTa?: string;
  imageUrl: string;
  readTime?: string;
  author?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  roleTa?: string;
  quote: string;
  quoteTa?: string;
  avatarUrl: string;
  rating?: number;
  location?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleTa?: string;
  category: string;
  type?: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: string;
}

export interface TrustInfo {
  name: string;
  nameTa?: string;
  founder?: string;
  founderTa?: string;
  tagline?: string;
  taglineTa?: string;
  regNumber?: string;
  establishedYear?: string;
  email: string;
  phonePrimary: string;
  phoneSecondary?: string;
  address: {
    street: string;
    streetTa?: string;
    area: string;
    areaTa?: string;
    city: string;
    cityTa?: string;
    state: string;
    stateTa?: string;
    pincode: string;
    country: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

export interface DashboardStats {
  activePrograms: number;
  activeEvents: number;
  registeredVolunteers: number;
  mediaGalleryItems: number;
  contactInquiries?: number;
}

export interface ContactInquiry {
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
