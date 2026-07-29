import { Router } from 'express';

export const eventsRouter = Router();

const mockEvents = [
  { id: 'EV-201', title: 'Free Health Checkup Camp', date: '2026-08-10', location: 'Community Center, City', attendees: 250, status: 'Upcoming' },
  { id: 'EV-202', title: 'Tree Plantation Drive', date: '2026-08-15', location: 'Green Park Trust Land', attendees: 120, status: 'Upcoming' },
  { id: 'EV-203', title: 'Educational Kit Distribution', date: '2026-07-10', location: 'Government High School', attendees: 500, status: 'Completed' },
];

eventsRouter.get('/', (_req, res) => {
  res.json({ success: true, count: mockEvents.length, data: mockEvents });
});

eventsRouter.post('/', (req, res) => {
  const newEvent = {
    id: `EV-${Math.floor(100 + Math.random() * 900)}`,
    ...req.body,
    status: 'Upcoming'
  };
  mockEvents.push(newEvent);
  res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
});
