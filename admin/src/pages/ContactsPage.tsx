import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { contactsApi } from '../services/api';
import { ContactInquiry } from '../types';
import { Trash2, RefreshCw, CheckCircle, Eye, X, MessageSquare, Mail, Phone, Plus, Search, Filter, MessageCircle, Edit3 } from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // New Contact Form State
  const [newForm, setNewForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    status: 'Pending' as 'Pending' | 'Read' | 'Replied' | 'Archived',
    adminNotes: '',
  });

  // Edit Contact Form State
  const [editForm, setEditForm] = useState<ContactInquiry | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactsApi.getContacts();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Pending' | 'Read' | 'Replied' | 'Archived') => {
    await contactsApi.updateContact(id, { status: newStatus });
    setSuccessMsg(`Status updated to ${newStatus}`);
    fetchContacts();
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      await contactsApi.deleteContact(id);
      setSuccessMsg(`Deleted inquiry from "${name}".`);
      if (selectedContact?.id === id) setSelectedContact(null);
      fetchContacts();
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.phone) {
      alert('Name and Phone are required!');
      return;
    }
    await contactsApi.createContact(newForm);
    setSuccessMsg('New contact inquiry created successfully!');
    setIsAddModalOpen(false);
    setNewForm({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
      status: 'Pending',
      adminNotes: '',
    });
    fetchContacts();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;
    await contactsApi.updateContact(editForm.id, editForm);
    setSuccessMsg('Contact inquiry details updated successfully!');
    setIsEditModalOpen(false);
    setEditForm(null);
    fetchContacts();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stat counts
  const pendingCount = contacts.filter((c) => c.status === 'Pending').length;
  const repliedCount = contacts.filter((c) => c.status === 'Replied').length;
  const readCount = contacts.filter((c) => c.status === 'Read').length;

  return (
    <AdminLayout title="Contact Form Submissions">
      {successMsg && (
        <div style={{ background: '#064E3B', border: '1px solid #10B981', color: '#A7F3D0', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="stat-card" style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Total Inquiries</span>
          <h2 style={{ margin: '0.25rem 0 0 0', color: '#38BDF8', fontSize: '1.8rem' }}>{contacts.length}</h2>
        </div>
        <div className="stat-card" style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Pending Action</span>
          <h2 style={{ margin: '0.25rem 0 0 0', color: '#F59E0B', fontSize: '1.8rem' }}>{pendingCount}</h2>
        </div>
        <div className="stat-card" style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Replied Inquiries</span>
          <h2 style={{ margin: '0.25rem 0 0 0', color: '#10B981', fontSize: '1.8rem' }}>{repliedCount}</h2>
        </div>
        <div className="stat-card" style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Reviewed / Read</span>
          <h2 style={{ margin: '0.25rem 0 0 0', color: '#A855F7', fontSize: '1.8rem' }}>{readCount}</h2>
        </div>
      </div>

      <div className="data-card">
        {/* Card Header & Controls */}
        <div className="data-card-header flex-wrap gap-3" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#F8FAFC' }}>Contact Messages & Inquiries</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8' }}>Manage messages submitted from the public website contact form.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setIsAddModalOpen(true)} style={{ background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}>
              <Plus size={16} /> Add Entry
            </button>
            <button className="btn-secondary" onClick={fetchContacts}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        {/* Search & Status Filter Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem 0.6rem 2.4rem',
                background: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.88rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: '#94A3B8' }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                background: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.88rem',
              }}
            >
              <option value="All">All Statuses ({contacts.length})</option>
              <option value="Pending">Pending ({pendingCount})</option>
              <option value="Read">Read ({readCount})</option>
              <option value="Replied">Replied ({repliedCount})</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
            <p>Loading contact messages...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
            <p>No contact inquiries found matching your filters.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sender Name</th>
                  <th>Subject</th>
                  <th>Contact Info</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, color: '#38BDF8', fontSize: '0.85rem' }}>{c.id}</td>
                    <td style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '0.95rem' }}>{c.name}</td>
                    <td>
                      <span className="badge badge-info" style={{ background: '#1E293B', border: '1px solid #334155', color: '#E2E8F0' }}>
                        {c.subject}
                      </span>
                    </td>
                    <td>
                      <div style={{ color: '#F8FAFC', fontWeight: 500, fontSize: '0.88rem' }}>{c.email}</div>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{c.phone}</div>
                    </td>
                    <td style={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value as any)}
                        style={{
                          background:
                            c.status === 'Pending' ? '#451A03' : c.status === 'Replied' ? '#064E3B' : c.status === 'Read' ? '#1E1B4B' : '#1E293B',
                          color:
                            c.status === 'Pending' ? '#FDBA74' : c.status === 'Replied' ? '#6EE7B7' : c.status === 'Read' ? '#C084FC' : '#94A3B8',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.3rem 0.6rem',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          title="View Details"
                          className="btn-icon"
                          onClick={() => setSelectedContact(c)}
                          style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8' }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Edit Entry"
                          className="btn-icon"
                          onClick={() => {
                            setEditForm({ ...c });
                            setIsEditModalOpen(true);
                          }}
                          style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#C084FC' }}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          title="Delete Entry"
                          className="btn-icon"
                          onClick={() => handleDelete(c.id, c.name)}
                          style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}
                        >
                          <Trash2 size={16} />
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

      {/* View Contact Modal */}
      {selectedContact && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, color: '#F8FAFC' }}>Inquiry Details: {selectedContact.id}</h3>
              <button className="btn-icon" onClick={() => setSelectedContact(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ background: '#0F172A', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #1E293B' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Subject</span>
                  <span className="badge badge-info">{selectedContact.subject}</span>
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#38BDF8' }}>{selectedContact.name}</h4>
                <div style={{ display: 'flex', gap: '1.5rem', color: '#CBD5E1', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Mail size={14} color="#94A3B8" /> {selectedContact.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={14} color="#94A3B8" /> {selectedContact.phone}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 600 }}>Message Content</label>
                <div style={{ background: '#0F172A', padding: '1rem', borderRadius: '8px', color: '#F8FAFC', lineHeight: '1.6', marginTop: '0.3rem', border: '1px solid #1E293B' }}>
                  {selectedContact.message || '(No message content provided)'}
                </div>
              </div>

              {selectedContact.adminNotes && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', color: '#F59E0B', fontWeight: 600 }}>Admin Notes</label>
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '8px', color: '#FCD34D', fontSize: '0.88rem', marginTop: '0.3rem' }}>
                    {selectedContact.adminNotes}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <a
                  href={`https://wa.me/${selectedContact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedContact.name}, thank you for reaching out to Sri Susheela Trust regarding "${selectedContact.subject}".`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ background: '#166534', borderColor: '#22C55E', color: '#FFFFFF', flex: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <MessageCircle size={18} /> Reply via WhatsApp
                </a>

                {selectedContact.email && selectedContact.email !== 'N/A' && (
                  <a
                    href={`mailto:${selectedContact.email}?subject=${encodeURIComponent(`Re: ${selectedContact.subject} - Sri Susheela Trust`)}`}
                    className="btn-secondary"
                    style={{ flex: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Mail size={18} /> Reply via Email
                  </a>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedContact(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Contact Entry Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, color: '#F8FAFC' }}>Add Manual Contact Entry</h3>
              <button className="btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateContact}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newForm.name}
                    onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email"
                      value={newForm.email}
                      onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                      placeholder="ramesh@gmail.com"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={newForm.phone}
                      onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Subject / Inquiry Type</label>
                  <select
                    value={newForm.subject}
                    onChange={(e) => setNewForm({ ...newForm, subject: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Annadhanam Donation">Annadhanam Support</option>
                    <option value="Vidya Jyothi Education">Education Support</option>
                    <option value="Volunteer Partnership">Volunteer Partnership</option>
                    <option value="Corporate CSR">Corporate CSR Support</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Message</label>
                  <textarea
                    rows={3}
                    value={newForm.message}
                    onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                    placeholder="Enter message details..."
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Admin Internal Notes</label>
                  <input
                    type="text"
                    value={newForm.adminNotes}
                    onChange={(e) => setNewForm({ ...newForm, adminNotes: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                    placeholder="e.g. Received over phone call"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Contact Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Contact Entry Modal */}
      {isEditModalOpen && editForm && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, color: '#F8FAFC' }}>Edit Inquiry: {editForm.id}</h3>
              <button className="btn-icon" onClick={() => setIsEditModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateContact}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Phone</label>
                    <input
                      type="text"
                      required
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Admin Notes</label>
                  <textarea
                    rows={3}
                    value={editForm.adminNotes || ''}
                    onChange={(e) => setEditForm({ ...editForm, adminNotes: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '6px', color: '#F8FAFC', marginTop: '0.25rem' }}
                    placeholder="Add notes about follow up..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
