import { Router } from 'express';

export const donationsRouter = Router();

const mockDonations = [
  { id: 'DON-101', donorName: 'Ramesh Kumar', amount: 5000, date: '2026-07-28', category: 'Education Support', status: 'Completed' },
  { id: 'DON-102', donorName: 'Priya Sharma', amount: 10000, date: '2026-07-27', category: 'Healthcare Camp', status: 'Completed' },
  { id: 'DON-103', donorName: 'Anand Patel', amount: 2500, date: '2026-07-25', category: 'Food Distribution', status: 'Pending' },
  { id: 'DON-104', donorName: 'Sunita Reddy', amount: 15000, date: '2026-07-22', category: 'Orphanage Welfare', status: 'Completed' },
];

donationsRouter.get('/', (_req, res) => {
  res.json({ success: true, count: mockDonations.length, data: mockDonations });
});

donationsRouter.post('/', (req, res) => {
  const newDonation = {
    id: `DON-${Math.floor(100 + Math.random() * 900)}`,
    ...req.body,
    date: new Date().toISOString().split('T')[0],
    status: 'Completed'
  };
  mockDonations.unshift(newDonation);
  res.status(201).json({ success: true, message: 'Donation recorded successfully', data: newDonation });
});
