import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { eventsApi, galleryApi } from '../services/api';
import { EventItem } from '../types';
import { Plus, Edit3, Trash2, RefreshCw, X, CheckCircle, Upload } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [titleTa, setTitleTa] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationTa, setLocationTa] = useState<string>('');
  const [shortDesc, setShortDesc] = useState<string>('');
  const [shortDescTa, setShortDescTa] = useState<string>('');
  const [category, setCategory] = useState<string>('Healthcare');
  const [status, setStatus] = useState<'Upcoming' | 'Completed' | 'Draft'>('Upcoming');
  const [imageUrl, setImageUrl] = useState<string>('');

  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventsApi.getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setTitle('');
    setTitleTa('');
    setDate('');
    setTime('09:00 AM - 04:00 PM');
    setLocation('');
    setLocationTa('');
    setShortDesc('');
    setShortDescTa('');
    setCategory('Healthcare');
    setStatus('Upcoming');
    setImageUrl('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (evt: EventItem) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setTitleTa(evt.titleTa || '');
    setDate(evt.date);
    setTime(evt.time || '09:00 AM - 04:00 PM');
    setLocation(evt.location);
    setLocationTa(evt.locationTa || '');
    setShortDesc(evt.shortDesc || '');
    setShortDescTa(evt.shortDescTa || '');
    setCategory(evt.category || 'Healthcare');
    setStatus(evt.status || 'Upcoming');
    setImageUrl(evt.imageUrl || '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        const uploadedUrl = await galleryApi.uploadImage(file);
        setImageUrl(uploadedUrl);
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !location.trim()) {
      setErrorMsg('Title, Date, and Location are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      const payload = {
        title,
        titleTa,
        date,
        time,
        location,
        locationTa,
        shortDesc,
        shortDescTa,
        category,
        status,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      };

      if (editingEvent) {
        await eventsApi.updateEvent(editingEvent.id, payload);
        setSuccessMsg('Event updated successfully!');
      } else {
        await eventsApi.createEvent(payload);
        setSuccessMsg('New Event created and published!');
      }

      setIsModalOpen(false);
      fetchEvents();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg('Failed to save event.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, eventTitle: string) => {
    if (window.confirm(`Are you sure you want to delete event "${eventTitle}"?`)) {
      await eventsApi.deleteEvent(id);
      setSuccessMsg(`Deleted event "${eventTitle}".`);
      fetchEvents();
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <AdminLayout title={t('events.title')}>
      {successMsg && (
        <div style={{ background: '#D1FAE5', border: '1px solid #10B981', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="data-card">
        <div className="data-card-header flex-wrap gap-3">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t('events.title')}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{t('events.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={fetchEvents}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('refresh')}
            </button>
            <button className="btn-primary" onClick={handleOpenAddModal}>
              <Plus size={16} /> {t('events.createNew')}
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
            <p>{t('events.loading')}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>{t('code')}</th>
                  <th>Title</th>
                  <th>Date & Time</th>
                  <th>{t('location')}</th>
                  <th>{t('category')}</th>
                  <th>{t('status')}</th>
                  <th style={{ textAlign: 'right' }}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => (
                  <tr key={evt.id}>
                    <td style={{ fontWeight: 600 }}>{evt.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1F2937' }}>{evt.title}</div>
                      {evt.titleTa && <div style={{ fontSize: '0.8rem', color: '#7A1C1C' }}>{evt.titleTa}</div>}
                    </td>
                    <td>
                      <div>{evt.date}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{evt.time}</div>
                    </td>
                    <td>{evt.location}</td>
                    <td><span className="badge badge-info">{evt.category || 'General'}</span></td>
                    <td>
                      <span className={`badge ${evt.status === 'Upcoming' ? 'badge-success' : evt.status === 'Completed' ? 'badge-secondary' : 'badge-warning'}`}>
                        {evt.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button onClick={() => handleOpenEditModal(evt)} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('edit')}>
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDelete(evt.id, evt.title)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('delete')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Event Add / Edit */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#7A1C1C', fontWeight: 700 }}>{editingEvent ? t('events.editTitle') : t('events.createTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMsg && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{errorMsg}</div>}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.eventTitleEn')}</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Free Eye Checkup Camp" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.eventTitleTa')}</label>
                <input type="text" value={titleTa} onChange={(e) => setTitleTa(e.target.value)} placeholder="எ.கா: இலவச கண் பரிசோதனை முகாம்" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.date')}</label>
                  <input type="text" required value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. August 20, 2026" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.time')}</label>
                  <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 09:00 AM - 04:00 PM" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.location')}</label>
                  <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Venue & City" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('status')}</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', background: '#FFF' }}>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.shortDesc')}</label>
                <textarea rows={3} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Brief summary of event..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('events.posterImage')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Poster Image URL..." style={{ flex: 1, padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                  <label style={{ background: '#F3F4F6', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Upload size={14} /> {uploading ? 'Uploading...' : t('programs.uploadPcFile')}
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 600, cursor: 'pointer' }}>{t('cancel')}</button>
                <button type="submit" disabled={submitting} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#7A1C1C', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {submitting ? t('programs.saving') : editingEvent ? t('events.updateEvent') : t('events.createEvent')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
