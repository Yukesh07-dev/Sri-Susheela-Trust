import { Router } from 'express';

export const newsRouter = Router();

const mockNews = [
  { id: 'N-01', title: 'Sri Susheela Trust Distributes 500+ School Kits to Rural Students', date: '2026-07-20', author: 'Admin', category: 'Education' },
  { id: 'N-02', title: 'Annual Free Health & Eye Checkup Camp Announced', date: '2026-07-15', author: 'Admin', category: 'Healthcare' },
];

newsRouter.get('/', (_req, res) => {
  res.json({ success: true, count: mockNews.length, data: mockNews });
});
