import { Router } from 'express';

export const volunteersRouter = Router();

const mockVolunteers = [
  { id: 'VOL-301', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '+91 98765 43210', role: 'Event Coordinator', joinedDate: '2026-01-15', status: 'Active' },
  { id: 'VOL-302', name: 'Neha Verma', email: 'neha@example.com', phone: '+91 98765 12345', role: 'Medical Volunteer', joinedDate: '2026-03-20', status: 'Active' },
  { id: 'VOL-303', name: 'Suresh Rao', email: 'suresh@example.com', phone: '+91 98765 99887', role: 'Field Worker', joinedDate: '2026-06-01', status: 'Pending' },
];

volunteersRouter.get('/', (_req, res) => {
  res.json({ success: true, count: mockVolunteers.length, data: mockVolunteers });
});

volunteersRouter.post('/', (req, res) => {
  const newVolunteer = {
    id: `VOL-${Math.floor(100 + Math.random() * 900)}`,
    ...req.body,
    joinedDate: new Date().toISOString().split('T')[0],
    status: 'Pending'
  };
  mockVolunteers.push(newVolunteer);
  res.status(201).json({ success: true, message: 'Volunteer registration submitted successfully', data: newVolunteer });
});
