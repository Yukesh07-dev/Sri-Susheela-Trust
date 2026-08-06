import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { testimonialsApi, galleryApi } from '../services/api';
import { ConfirmModal } from '../components/ConfirmModal';
import { TestimonialItem } from '../types';
import { Plus, Edit3, Trash2, RefreshCw, X, CheckCircle, Upload } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form states
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [roleTa, setRoleTa] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [quoteTa, setQuoteTa] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [location, setLocation] = useState<string>('Chennai');

  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await testimonialsApi.getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setName('');
    setRole('');
    setRoleTa('');
    setQuote('');
    setQuoteTa('');
    setAvatarUrl('');
    setLocation('Chennai');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setRoleTa(item.roleTa || '');
    setQuote(item.quote);
    setQuoteTa(item.quoteTa || '');
    setAvatarUrl(item.avatarUrl);
    setLocation(item.location || 'Chennai');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        const uploadedUrl = await galleryApi.uploadImage(file);
        setAvatarUrl(uploadedUrl);
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      setErrorMsg('Name and Quote are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      const payload = {
        name,
        role: role || 'Beneficiary',
        roleTa,
        quote,
        quoteTa: quoteTa || quote,
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        location,
        rating: 5,
      };

      if (editingItem) {
        await testimonialsApi.updateTestimonial(editingItem.id, payload);
        setSuccessMsg('Testimonial updated successfully!');
      } else {
        await testimonialsApi.createTestimonial(payload);
        setSuccessMsg('New Testimonial added to website!');
      }

      setIsModalOpen(false);
      fetchTestimonials();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg('Failed to save testimonial.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, personName: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to delete testimonial from "${personName}"? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await testimonialsApi.deleteTestimonial(id);
        setSuccessMsg(`Deleted testimonial from "${personName}".`);
        fetchTestimonials();
        setTimeout(() => setSuccessMsg(''), 3000);
      },
    });
  };

  return (
    <AdminLayout title={t('testimonials.title')}>
      {successMsg && (
        <div style={{ background: '#D1FAE5', border: '1px solid #10B981', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="data-card">
        <div className="data-card-header flex-wrap gap-3">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t('testimonials.title')}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{t('testimonials.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={fetchTestimonials}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('refresh')}
            </button>
            <button className="btn-primary" onClick={handleOpenAddModal}>
              <Plus size={16} /> {t('testimonials.addTestimonial')}
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
            <p>{t('testimonials.loading')}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', padding: '1.25rem' }}>
            {testimonials.map((item) => (
              <div key={item.id} style={{ borderRadius: '12px', border: '1px solid #E5E7EB', background: '#FFF', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <img src={item.avatarUrl} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D4AF37' }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1F2937' }}>{item.name}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#7A1C1C', fontWeight: 600 }}>{item.role}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4B5563', fontStyle: 'italic', lineHeight: 1.4, margin: '0 0 1rem 0' }}>
                    "{item.quote}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{item.location || 'Tamil Nadu'}</span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button onClick={() => handleOpenEditModal(item)} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('edit')}>
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.name)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('delete')}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#7A1C1C', fontWeight: 700 }}>{editingItem ? t('testimonials.editTitle') : t('testimonials.addTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMsg && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{errorMsg}</div>}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.personName')}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. R. Lakshmi Ammal" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.roleDesignation')}</label>
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Care Resident" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.locationCity')}</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Chennai" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.roleTa')}</label>
                <input type="text" value={roleTa} onChange={(e) => setRoleTa(e.target.value)} placeholder="எ.கா: அன்பு இல்லப் பயனாளி" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.quoteEn')}</label>
                <textarea rows={3} required value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Quote content..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.quoteTa')}</label>
                <textarea rows={3} value={quoteTa} onChange={(e) => setQuoteTa(e.target.value)} placeholder="தமிழ் கருத்து..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('testimonials.avatarImage')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Avatar URL..." style={{ flex: 1, padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                  <label style={{ background: '#F3F4F6', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Upload size={14} /> {uploading ? 'Uploading...' : t('programs.uploadPcFile')}
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 600, cursor: 'pointer' }}>{t('cancel')}</button>
                <button type="submit" disabled={submitting} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#7A1C1C', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {submitting ? t('programs.saving') : editingItem ? t('testimonials.updateTestimonial') : t('testimonials.saveTestimonial')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </AdminLayout>
  );
};
