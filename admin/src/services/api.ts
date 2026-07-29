import axios from 'axios';
import { DashboardStats, Donation, Event, Volunteer } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock initial data fallbacks in case backend server is offline during development
export const mockDashboardStats: DashboardStats = {
  totalDonations: 452800,
  activeEvents: 12,
  registeredVolunteers: 148,
  beneficiariesHelped: 3200,
};

export const mockDonations: Donation[] = [
  { id: 'DON-101', donorName: 'Ramesh Kumar', amount: 5000, date: '2026-07-28', category: 'Education Support', status: 'Completed' },
  { id: 'DON-102', donorName: 'Priya Sharma', amount: 10000, date: '2026-07-27', category: 'Healthcare Camp', status: 'Completed' },
  { id: 'DON-103', donorName: 'Anand Patel', amount: 2500, date: '2026-07-25', category: 'Food Distribution', status: 'Pending' },
  { id: 'DON-104', donorName: 'Sunita Reddy', amount: 15000, date: '2026-07-22', category: 'Orphanage Welfare', status: 'Completed' },
];

export const mockEvents: Event[] = [
  { id: 'EV-201', title: 'Free Health Checkup Camp', date: '2026-08-10', location: 'Community Center, City', attendees: 250, status: 'Upcoming' },
  { id: 'EV-202', title: 'Tree Plantation Drive', date: '2026-08-15', location: 'Green Park Trust Land', attendees: 120, status: 'Upcoming' },
  { id: 'EV-203', title: 'Educational Kit Distribution', date: '2026-07-10', location: 'Government High School', attendees: 500, status: 'Completed' },
];

export const mockVolunteers: Volunteer[] = [
  { id: 'VOL-301', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '+91 98765 43210', role: 'Event Coordinator', joinedDate: '2026-01-15', status: 'Active' },
  { id: 'VOL-302', name: 'Neha Verma', email: 'neha@example.com', phone: '+91 98765 12345', role: 'Medical Volunteer', joinedDate: '2026-03-20', status: 'Active' },
  { id: 'VOL-303', name: 'Suresh Rao', email: 'suresh@example.com', phone: '+91 98765 99887', role: 'Field Worker', joinedDate: '2026-06-01', status: 'Pending' },
];
