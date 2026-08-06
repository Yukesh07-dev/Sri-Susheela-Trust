import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { newsApi, galleryApi } from '../services/api';
import { NewsArticle } from '../types';
import { Plus, Edit3, Trash2, RefreshCw, X, CheckCircle, Upload } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';

export const NewsPage: React.FC = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Form states
  const [title, setTitle] = useState<string>('');
  const [titleTa, setTitleTa] = useState<string>('');
  const [category, setCategory] = useState<string>('Updates');
  const [excerpt, setExcerpt] = useState<string>('');
  const [excerptTa, setExcerptTa] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [contentTa, setContentTa] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [author, setAuthor] = useState<string>('Editorial Team');

  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsApi.getNews();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setTitle('');
    setTitleTa('');
    setCategory('Updates');
    setExcerpt('');
    setExcerptTa('');
    setContent('');
    setContentTa('');
    setImageUrl('');
    setAuthor('Editorial Team');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article: NewsArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setTitleTa(article.titleTa || '');
    setCategory(article.category);
    setExcerpt(article.excerpt);
    setExcerptTa(article.excerptTa || '');
    setContent(article.content);
    setContentTa(article.contentTa || '');
    setImageUrl(article.imageUrl);
    setAuthor(article.author || 'Editorial Team');
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
    if (!title.trim() || !content.trim()) {
      setErrorMsg('Title and Content are required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      const payload = {
        title,
        titleTa,
        category,
        excerpt: excerpt || content.substring(0, 120),
        excerptTa: excerptTa || excerpt || '',
        content,
        contentTa,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
        author,
      };

      if (editingArticle) {
        await newsApi.updateNews(editingArticle.id, payload);
        setSuccessMsg('News article updated successfully!');
      } else {
        await newsApi.createNews(payload);
        setSuccessMsg('New Press Release / News Article published!');
      }

      setIsModalOpen(false);
      fetchNews();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg('Failed to save article.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, articleTitle: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to delete article "${articleTitle}"? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await newsApi.deleteNews(id);
        setSuccessMsg(`Deleted article "${articleTitle}".`);
        fetchNews();
        setTimeout(() => setSuccessMsg(''), 3000);
      },
    });
  };

  return (
    <AdminLayout title={t('news.title')}>
      {successMsg && (
        <div style={{ background: '#D1FAE5', border: '1px solid #10B981', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="data-card">
        <div className="data-card-header flex-wrap gap-3">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t('news.title')}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{t('news.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={fetchNews}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('refresh')}
            </button>
            <button className="btn-primary" onClick={handleOpenAddModal}>
              <Plus size={16} /> {t('news.addArticle')}
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
            <p>{t('news.loading')}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Headline</th>
                  <th>{t('category')}</th>
                  <th>{t('publishedDate')}</th>
                  <th>{t('author')}</th>
                  <th style={{ textAlign: 'right' }}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1F2937' }}>{item.title}</div>
                      {item.titleTa && <div style={{ fontSize: '0.8rem', color: '#7A1C1C' }}>{item.titleTa}</div>}
                    </td>
                    <td><span className="badge badge-info">{item.category}</span></td>
                    <td>{item.publishedDate}</td>
                    <td>{item.author || 'Editorial Team'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button onClick={() => handleOpenEditModal(item)} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('edit')}>
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDelete(item.id, item.title)} style={{ background: '#FEF2F2', border: 'none', color: '#DC2626', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('delete')}>
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

      {/* Modal for Add / Edit News */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#7A1C1C', fontWeight: 700 }}>{editingArticle ? t('news.editTitle') : t('news.publishTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMsg && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{errorMsg}</div>}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('news.headlineEn')}</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Headline..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('news.headlineTa')}</label>
                <input type="text" value={titleTa} onChange={(e) => setTitleTa(e.target.value)} placeholder="செய்தித் தலைப்பு..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('category')}</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', background: '#FFF' }}>
                    <option value="Recognition">Recognition & Awards</option>
                    <option value="Education">Education Updates</option>
                    <option value="Healthcare">Healthcare Service</option>
                    <option value="Annadhanam">Annadhanam Drive</option>
                    <option value="Updates">General Updates</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('news.authorDept')}</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Editorial Team" style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('news.shortExcerpt')}</label>
                <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief one-line summary..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('news.fullContent')}</label>
                <textarea rows={5} required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full news body content..." style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('news.coverImage')}</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL..." style={{ flex: 1, padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
                  <label style={{ background: '#F3F4F6', padding: '0.55rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Upload size={14} /> {uploading ? 'Uploading...' : t('programs.uploadPcFile')}
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 600, cursor: 'pointer' }}>{t('cancel')}</button>
                <button type="submit" disabled={submitting} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#7A1C1C', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  {submitting ? t('programs.saving') : editingArticle ? t('news.updateArticle') : t('news.publishNews')}
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
