import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { programsApi, galleryApi } from '../services/api';
import { ProgramItem } from '../types';
import { Plus, Edit3, Trash2, RefreshCw, X, CheckCircle, Upload } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';

export const ProgramsPage: React.FC = () => {
  const { t } = useTranslation();
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Form fields
  const [title, setTitle] = useState<string>('');
  const [titleTa, setTitleTa] = useState<string>('');
  const [category, setCategory] = useState<string>('annadhanam');
  const [shortDesc, setShortDesc] = useState<string>('');
  const [shortDescTa, setShortDescTa] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [beneficiariesCount, setBeneficiariesCount] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [featuresText, setFeaturesText] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await programsApi.getPrograms();
      setPrograms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProgram(null);
    setTitle('');
    setTitleTa('');
    setCategory('annadhanam');
    setShortDesc('');
    setShortDescTa('');
    setDescription('');
    setBeneficiariesCount('');
    setImageUrl('');
    setFeaturesText('');
    setSelectedFile(null);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prog: ProgramItem) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setTitleTa(prog.titleTa || '');
    setCategory(prog.category);
    setShortDesc(prog.shortDesc || '');
    setShortDescTa(prog.shortDescTa || '');
    setDescription(prog.description);
    setBeneficiariesCount(prog.beneficiariesCount || '');
    setImageUrl(prog.imageUrl);
    setFeaturesText(prog.features ? prog.features.join('\n') : '');
    setSelectedFile(null);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
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
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Title and Description are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      const features = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        title,
        titleTa,
        category,
        shortDesc,
        shortDescTa,
        description,
        beneficiariesCount,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
        features,
      };

      if (editingProgram) {
        await programsApi.updateProgram(editingProgram.id, payload);
        setSuccessMsg('Program updated successfully!');
      } else {
        await programsApi.createProgram(payload);
        setSuccessMsg('New Program created and published to website!');
      }

      setIsModalOpen(false);
      fetchPrograms();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg('Failed to save program.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, programTitle: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to delete program "${programTitle}"? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await programsApi.deleteProgram(id);
        setSuccessMsg(`Deleted "${programTitle}".`);
        fetchPrograms();
        setTimeout(() => setSuccessMsg(''), 3000);
      },
    });
  };

  return (
    <AdminLayout title={t('programs.title')}>
      {successMsg && (
        <div style={{ background: '#D1FAE5', border: '1px solid #10B981', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="data-card">
        <div className="data-card-header flex-wrap gap-3">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t('programs.title')}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{t('programs.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={fetchPrograms}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('refresh')}
            </button>
            <button className="btn-primary" onClick={handleOpenAddModal}>
              <Plus size={16} /> {t('programs.addNew')}
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
            <p>{t('programs.loading')}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', padding: '1.25rem' }}>
            {programs.map((prog) => (
              <div key={prog.id} style={{ borderRadius: '12px', border: '1px solid #E5E7EB', background: '#FFF', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '160px', position: 'relative', background: '#F3F4F6' }}>
                  <img src={prog.imageUrl} alt={prog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(122, 28, 28, 0.9)', color: '#FFF', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', textTransform: 'uppercase' }}>
                    {prog.category}
                  </span>
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937' }}>{prog.title}</h4>
                    {prog.titleTa && <div style={{ fontSize: '0.85rem', color: '#7A1C1C', fontWeight: 600, marginBottom: '0.5rem' }}>{prog.titleTa}</div>}
                    <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>{prog.shortDesc || prog.description.substring(0, 110) + '...'}</p>
                    {prog.beneficiariesCount && (
                      <div style={{ fontSize: '0.8rem', background: '#FEF3C7', color: '#92400E', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 600, display: 'inline-block', marginBottom: '0.75rem' }}>
                        {prog.beneficiariesCount}
                      </div>
                    )}
                  </div>
                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEditModal(prog)} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '0.4rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Edit3 size={14} /> {t('edit')}
                    </button>
                    <button onClick={() => handleDelete(prog.id, prog.title)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '0.4rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Trash2 size={14} /> {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Program Add / Edit */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#7A1C1C', fontWeight: 700 }}>{editingProgram ? t('programs.editTitle') : t('programs.addTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMsg && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{errorMsg}</div>}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.titleEn')}</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Daily Annadhanam Initiative" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.titleTa')}</label>
                  <input type="text" value={titleTa} onChange={(e) => setTitleTa(e.target.value)} placeholder="எ.கா: தினசரி அன்னதானத் திட்டம்" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.categoryLabel')}</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', background: '#FFF' }}>
                    <option value="annadhanam">Annadhanam / Food Service</option>
                    <option value="education">Education & Scholarships</option>
                    <option value="elderly">Senior Citizen Care</option>
                    <option value="healthcare">Healthcare & Medical Camps</option>
                    <option value="empowerment">Women Livelihood</option>
                    <option value="community">Community Development</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.beneficiariesTag')}</label>
                  <input type="text" value={beneficiariesCount} onChange={(e) => setBeneficiariesCount(e.target.value)} placeholder="e.g. 500,000+ Meals Served" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.shortSummary')}</label>
                <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Brief summary of program..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.fullDesc')}</label>
                <textarea rows={4} required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed description of the program..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.coverPhoto')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL (https://...)" style={{ flex: 1, padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                  <label style={{ background: '#F3F4F6', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Upload size={14} /> {uploading ? 'Uploading...' : t('programs.uploadPcFile')}
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('programs.keyFeatures')}</label>
                <textarea rows={3} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Hygienic Mobile Kitchens&#10;Zero Food Waste Protocol&#10;Hospital Meal Distribution" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 600, cursor: 'pointer' }}>{t('cancel')}</button>
                <button type="submit" disabled={submitting} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#7A1C1C', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {submitting ? t('programs.saving') : editingProgram ? t('programs.updateProgram') : t('programs.publishProgram')}
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
