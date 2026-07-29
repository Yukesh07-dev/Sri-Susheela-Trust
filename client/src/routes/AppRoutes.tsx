import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ProgramsPage } from '../pages/ProgramsPage';
import { ImpactPage } from '../pages/ImpactPage';
import { EventsPage } from '../pages/EventsPage';
import { GalleryPage } from '../pages/GalleryPage';
import { NewsPage } from '../pages/NewsPage';
import { ContactPage } from '../pages/ContactPage';
import { VolunteerPage } from '../pages/VolunteerPage';
import { LanguagePage } from '../pages/LanguagePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="volunteer" element={<VolunteerPage />} />
        <Route path="language" element={<LanguagePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
