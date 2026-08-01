import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { getDashboardStats } from '../services/api';
import { DashboardStats } from '../types';
import { BookOpen, Calendar, Users, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>({
    activePrograms: 5,
    activeEvents: 3,
    registeredVolunteers: 148,
    mediaGalleryItems: 6,
  });

  useEffect(() => {
    getDashboardStats().then((data) => setStats(data));
  }, []);

  return (
    <AdminLayout title={t('dashboard.title')}>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#B45309' }}>
            <BookOpen size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('dashboard.welfarePrograms')}</span>
            <h2 className="stat-value">{stats.activePrograms}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('dashboard.activeEvents')}</span>
            <h2 className="stat-value">{stats.activeEvents}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#D1FAE5', color: '#047857' }}>
            <Users size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('dashboard.registeredVolunteers')}</span>
            <h2 className="stat-value">{stats.registeredVolunteers}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
            <ImageIcon size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-title">{t('dashboard.webMediaPhotos')}</span>
            <h2 className="stat-value">{stats.mediaGalleryItems}</h2>
          </div>
        </div>
      </div>

      <div className="data-card mb-4">
        <div className="data-card-header">
          <h3>{t('dashboard.quickControls')}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', padding: '1.25rem' }}>
          <Link to="/programs" style={{ textDecoration: 'none', background: '#FAF5F5', border: '1.5px solid #FCA5A5', padding: '1.25rem', borderRadius: '12px', color: '#7A1C1C', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
            <div>
              <div style={{ fontSize: '1.05rem' }}>{t('dashboard.managePrograms')}</div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 400 }}>{t('dashboard.manageProgramsSub')}</div>
            </div>
            <ArrowRight size={20} />
          </Link>

          <Link to="/events" style={{ textDecoration: 'none', background: '#EFF6FF', border: '1.5px solid #93C5FD', padding: '1.25rem', borderRadius: '12px', color: '#1E40AF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
            <div>
              <div style={{ fontSize: '1.05rem' }}>{t('dashboard.manageEvents')}</div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 400 }}>{t('dashboard.manageEventsSub')}</div>
            </div>
            <ArrowRight size={20} />
          </Link>

          <Link to="/gallery" style={{ textDecoration: 'none', background: '#FEF3C7', border: '1.5px solid #FDE68A', padding: '1.25rem', borderRadius: '12px', color: '#92400E', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
            <div>
              <div style={{ fontSize: '1.05rem' }}>{t('dashboard.galleryAndImages')}</div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 400 }}>{t('dashboard.gallerySub')}</div>
            </div>
            <ArrowRight size={20} />
          </Link>

          <Link to="/news" style={{ textDecoration: 'none', background: '#F3F4F6', border: '1.5px solid #E5E7EB', padding: '1.25rem', borderRadius: '12px', color: '#1F2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
            <div>
              <div style={{ fontSize: '1.05rem' }}>{t('dashboard.newsAndMedia')}</div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 400 }}>{t('dashboard.newsSub')}</div>
            </div>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};
