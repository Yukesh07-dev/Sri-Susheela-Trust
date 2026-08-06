import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { galleryApi } from '../services/api';
import { GalleryItem } from '../types';
import { Plus, Edit3, Trash2, Image as ImageIcon, Upload, Link as LinkIcon, RefreshCw, X, CheckCircle, Crop } from 'lucide-react';
import { ImageCropperModal } from '../components/ImageCropperModal';
import { ConfirmModal } from '../components/ConfirmModal';

export const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Image Cropper States (manual crop for portrait photos only)
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [cropSourceUrl, setCropSourceUrl] = useState<string>('');
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  // Modal Form State
  const [title, setTitle] = useState<string>('');
  const [titleTa, setTitleTa] = useState<string>('');
  const [category, setCategory] = useState<string>('general');
  const [sourceType, setSourceType] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [mediaUrlInput, setMediaUrlInput] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const categories = [
    { key: 'all', label: t('gallery.allCategories') },
    { key: 'hero', label: t('gallery.heroBanner') },
    { key: 'annadhanam', label: 'Annadhanam' },
    { key: 'education', label: 'Education' },
    { key: 'healthcare', label: 'Healthcare' },
    { key: 'events', label: 'Events' },
    { key: 'community', label: 'Community' },
  ];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await galleryApi.getGalleryItems(selectedCategory);
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setTitleTa('');
    setCategory('general');
    setSourceType('file');
    setSelectedFile(null);
    setPreviewUrl('');
    setCropSourceUrl('');
    setIsCropped(false);
    setIsPortrait(false);
    setMediaUrlInput('');
    setDescription('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setTitleTa(item.titleTa || '');
    setCategory(item.category);
    setSourceType('url');
    setMediaUrlInput(item.mediaUrl);
    setPreviewUrl(item.mediaUrl);
    setCropSourceUrl(item.mediaUrl);
    setIsCropped(false);
    setIsPortrait(false);
    setDescription(item.description || '');
    setErrorMsg('');
    setIsModalOpen(true);

    // Detect if existing photo is portrait
    const img = new Image();
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
    img.src = item.mediaUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setCropSourceUrl(url);
      setIsCropped(false);

      // Detect if photo is portrait
      const img = new Image();
      img.onload = () => {
        setIsPortrait(img.height > img.width);
      };
      img.src = url;
    }
  };

  const handleCropComplete = (croppedFile: File, croppedPreviewUrl: string) => {
    setSelectedFile(croppedFile);
    setPreviewUrl(croppedPreviewUrl);
    setIsCropped(true);
    setIsCropperOpen(false);
    // Switch to file source so cropped image gets uploaded on save
    setSourceType('file');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Photo title is required');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      let finalMediaUrl = mediaUrlInput;

      if (sourceType === 'file' && selectedFile) {
        setUploading(true);
        finalMediaUrl = await galleryApi.uploadImage(selectedFile);
        setUploading(false);
      }

      if (!finalMediaUrl) {
        setErrorMsg('Please upload a file or enter an image URL');
        setSubmitting(false);
        return;
      }

      const payload = {
        title,
        titleTa,
        category,
        mediaUrl: finalMediaUrl,
        thumbnailUrl: finalMediaUrl,
        description,
      };

      if (editingItem) {
        await galleryApi.updateGalleryItem(editingItem.id, payload);
        setSuccessMsg('Photo updated successfully!');
      } else {
        await galleryApi.createGalleryItem(payload);
        setSuccessMsg('New photo published to gallery successfully!');
      }

      setIsModalOpen(false);
      fetchGallery();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save gallery item');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const handleDelete = (id: string, itemTitle: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to delete "${itemTitle}"? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await galleryApi.deleteGalleryItem(id);
        setSuccessMsg(`Deleted "${itemTitle}"`);
        fetchGallery();
        setTimeout(() => setSuccessMsg(''), 3000);
      },
    });
  };

  return (
    <AdminLayout title={t('gallery.title')}>
      {successMsg && (
        <div style={{ background: '#D1FAE5', border: '1px solid #10B981', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="data-card mb-4">
        <div className="data-card-header flex-wrap gap-3">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t('gallery.title')}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{t('gallery.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={fetchGallery}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('refresh')}
            </button>
            <button className="btn-primary" onClick={handleOpenAddModal}>
              <Plus size={16} /> {t('gallery.uploadPhoto')}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === cat.key ? '#7A1C1C' : '#E5E7EB',
                background: selectedCategory === cat.key ? '#7A1C1C' : '#FFF',
                color: selectedCategory === cat.key ? '#FFF' : '#374151',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
            <p>{t('gallery.loading')}</p>
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
            <ImageIcon size={48} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
            <p>No photos found in this category. Click <strong>"{t('gallery.uploadPhoto')}"</strong> to add images.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem', padding: '1.25rem' }}>
            {items.map((item) => (
              <div key={item.id} style={{ borderRadius: '12px', border: '1px solid #E5E7EB', background: '#FFF', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '160px', position: 'relative', background: '#F3F4F6' }}>
                  <img src={item.mediaUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(122, 28, 28, 0.85)', color: '#FFF', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '10px', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 700, color: '#1F2937' }}>{item.title}</h4>
                    {item.titleTa && <div style={{ fontSize: '0.8rem', color: '#7A1C1C', fontWeight: 600 }}>{item.titleTa}</div>}
                  </div>
                  <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '0.75rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                    <button onClick={() => handleOpenEditModal(item)} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('edit')}>
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.title)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('delete')}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && !isCropperOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#7A1C1C', fontWeight: 700 }}>{editingItem ? t('gallery.editPhoto') : t('gallery.uploadPhotoTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMsg && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{errorMsg}</div>}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('gallery.photoTitleEn')}</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annadhanam Food Drive" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('gallery.photoTitleTa')}</label>
                <input type="text" value={titleTa} onChange={(e) => setTitleTa(e.target.value)} placeholder="எ.கா: அன்னதான உணவு விநியோகம்" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('category')}</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', background: '#FFF' }}>
                  <option value="hero">Hero Main Banner</option>
                  <option value="annadhanam">Annadhanam</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="events">Events</option>
                  <option value="community">Community</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('gallery.source')}</label>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                    <input type="radio" name="sourceType" checked={sourceType === 'file'} onChange={() => setSourceType('file')} />
                    <Upload size={14} /> {t('gallery.uploadPc')}
                  </label>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                    <input type="radio" name="sourceType" checked={sourceType === 'url'} onChange={() => setSourceType('url')} />
                    <LinkIcon size={14} /> {t('gallery.enterUrl')}
                  </label>
                </div>

                {sourceType === 'file' ? (
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                ) : (
                  <input type="text" value={mediaUrlInput} onChange={(e) => { setMediaUrlInput(e.target.value); setPreviewUrl(e.target.value); }} placeholder="https://..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                )}
              </div>

              {previewUrl && (
                <div style={{ marginBottom: '1.25rem', textAlign: 'center', background: '#F8FAFC', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      Image Preview
                      {isPortrait && !isCropped && (
                        <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>
                          ⚠ Portrait
                        </span>
                      )}
                      {isCropped && (
                        <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>
                          ✓ Cropped
                        </span>
                      )}
                    </div>
                    {isPortrait && (
                      <button
                        type="button"
                        onClick={() => {
                          setCropSourceUrl(previewUrl);
                          setIsCropperOpen(true);
                        }}
                        style={{
                          background: '#FEF3C7',
                          color: '#92400E',
                          border: '1px solid #F59E0B',
                          borderRadius: '6px',
                          padding: '0.3rem 0.65rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Crop size={14} /> Crop Photo
                      </button>
                    )}
                  </div>
                  <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1', display: 'inline-block', maxWidth: '100%' }}>
                    <img src={previewUrl} alt="Preview" style={{ maxHeight: '160px', width: 'auto', display: 'block', margin: '0 auto' }} />
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('gallery.description')}</label>
                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 600, cursor: 'pointer' }}>{t('cancel')}</button>
                <button type="submit" disabled={submitting || uploading} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#7A1C1C', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {uploading ? 'Uploading...' : submitting ? t('programs.saving') : t('gallery.savePhoto')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Image Cropper Modal — manual, for portrait photos */}
      {isCropperOpen && cropSourceUrl && (
        <ImageCropperModal
          imageUrl={cropSourceUrl}
          onCropComplete={handleCropComplete}
          onClose={() => setIsCropperOpen(false)}
          targetAspectRatio={16 / 9}
        />
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

