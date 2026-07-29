import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { DonationsPage } from './pages/DonationsPage';
import { EventsPage } from './pages/EventsPage';
import { VolunteersPage } from './pages/VolunteersPage';
import { NewsPage } from './pages/NewsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
