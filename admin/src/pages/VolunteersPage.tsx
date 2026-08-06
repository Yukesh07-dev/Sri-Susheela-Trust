import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { ConfirmModal } from '../components/ConfirmModal';
import { volunteersApi } from '../services/api';
import { Volunteer } from '../types';
import { Trash2, RefreshCw, CheckCircle, Eye, X } from 'lucide-react';

export const VolunteersPage: React.FC = () => {
  const { t } = useTranslation();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [selectedVol, setSelectedVol] = useState<Volunteer | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const data = await volunteersApi.getVolunteers();
      setVolunteers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Active' | 'Pending' | 'Inactive') => {
    await volunteersApi.updateVolunteerStatus(id, newStatus);
    setSuccessMsg('Volunteer status updated!');
    fetchVolunteers();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id: string, volName: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to remove volunteer "${volName}"? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await volunteersApi.deleteVolunteer(id);
        setSuccessMsg(`Removed volunteer "${volName}".`);
        fetchVolunteers();
        setTimeout(() => setSuccessMsg(''), 3000);
      },
    });
  };

  return (
    <AdminLayout title={t('volunteers.title')}>
      {successMsg && (
        <div style={{ background: '#064E3B', border: '1px solid #10B981', color: '#A7F3D0', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="data-card">
        <div className="data-card-header flex-wrap gap-3">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#F8FAFC' }}>{t('volunteers.title')}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8' }}>{t('volunteers.subtitle')}</p>
          </div>
          <button className="btn-secondary" onClick={fetchVolunteers}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('refresh')}
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
            <p>{t('volunteers.loading')}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>{t('volunteers.volCode')}</th>
                  <th>{t('volunteers.fullName')}</th>
                  <th>{t('volunteers.roleInterest')}</th>
                  <th>{t('volunteers.contactInfo')}</th>
                  <th>{t('volunteers.appliedDate')}</th>
                  <th>{t('status')}</th>
                  <th style={{ textAlign: 'right' }}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((vol: any) => {
                  const displayName = vol.name || vol.fullName || 'Registered Volunteer';
                  return (
                    <tr key={vol.id}>
                      <td style={{ fontWeight: 600, color: '#38BDF8' }}>{vol.id}</td>
                      <td style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '0.95rem' }}>{displayName}</td>
                      <td><span className="badge badge-info">{vol.role || vol.preferredDomain || 'General'}</span></td>
                      <td>
                        <div style={{ color: '#F8FAFC', fontWeight: 500 }}>{vol.email}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{vol.phone}</div>
                      </td>
                      <td style={{ color: '#E2E8F0' }}>{vol.joinedDate}</td>
                      <td>
                        <select
                          value={vol.status}
                          onChange={(e) => handleStatusChange(vol.id, e.target.value as any)}
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '6px',
                            border: '1px solid #334155',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            background: vol.status === 'Active' ? '#064E3B' : vol.status === 'Pending' ? '#78350F' : '#1E293B',
                            color: vol.status === 'Active' ? '#A7F3D0' : vol.status === 'Pending' ? '#FDE68A' : '#CBD5E1',
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                          <button onClick={() => setSelectedVol(vol)} style={{ background: '#1E3A8A', border: 'none', color: '#38BDF8', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title="View Details">
                            <Eye size={14} />
                          </button>
                          <button onClick={() => handleDelete(vol.id, displayName)} style={{ background: '#7F1D1D', border: 'none', color: '#FECDD3', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }} title={t('delete')}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Volunteer Details View Modal */}
      {selectedVol && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '1.5rem', color: '#F8FAFC' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#38BDF8', fontWeight: 800 }}>Volunteer Profile ({selectedVol.id})</h3>
              <button onClick={() => setSelectedVol(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC' }}>{(selectedVol as any).name || (selectedVol as any).fullName || 'N/A'}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
                  <div style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>{selectedVol.email}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone / WhatsApp</label>
                  <div style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>{selectedVol.phone}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Domain</label>
                  <div style={{ fontSize: '0.9rem', color: '#38BDF8', fontWeight: 600 }}>{selectedVol.role}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Application Date</label>
                  <div style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>{selectedVol.joinedDate}</div>
                </div>
              </div>

              {selectedVol.message && (
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Motivation / Notes</label>
                  <div style={{ fontSize: '0.85rem', color: '#CBD5E1', background: '#0F172A', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', fontStyle: 'italic' }}>
                    "{selectedVol.message}"
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button onClick={() => setSelectedVol(null)} style={{ background: '#3B82F6', color: '#FFF', padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Close</button>
            </div>
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
