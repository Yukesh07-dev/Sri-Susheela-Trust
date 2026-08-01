import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../layouts/AdminLayout';
import { settingsApi } from '../services/api';
import { TrustInfo } from '../types';
import { Save, CheckCircle, AlertCircle, Building, PhoneCall, MapPin, Share2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [formData, setFormData] = useState<TrustInfo>({
    name: 'Sri Susheela Trust',
    nameTa: 'ஸ்ரீ சுசீலா அறக்கட்டளை',
    founder: 'Iyappan R',
    founderTa: 'ஐயப்பன் R',
    tagline: 'Nurturing Hope, Empowering Communities, Serving Humanity',
    taglineTa: 'நம்பிக்கையை வளர்ப்போம், சமுதாயத்தை உயர்த்துவோம், மனிதநேயத்துடன் சேவையாற்றுவோம்',
    regNumber: 'REG-TN/2021/80G/12A/04928',
    establishedYear: '2021',
    email: 'srisusilaarakattalai0088@gmail.com',
    phonePrimary: '+91 97105 37506',
    phoneSecondary: '+91 97105 37506',
    address: {
      street: '158 Thiruvika Street',
      streetTa: '158 திரு வி.க. தெரு',
      area: 'Uthandi',
      areaTa: 'உத்தண்டி',
      city: 'Chennai',
      cityTa: 'சென்னை',
      state: 'Tamil Nadu',
      stateTa: 'தமிழ்நாடு',
      pincode: '60119',
      country: 'India',
    },
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      whatsapp: 'https://wa.me/919710537506',
    },
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsApi.getSettings();
      if (data) setFormData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    try {
      await settingsApi.updateSettings(formData);
      setSuccessMsg(t('settings.saveSuccess'));
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(t('settings.saveError'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={t('settings.title')}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        {successMsg && (
          <div style={{ background: '#064E3B', border: '1px solid #10B981', color: '#A7F3D0', padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
            <CheckCircle size={20} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{ background: '#7F1D1D', border: '1px solid #FCA5A5', color: '#FECDD3', padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
            <p>{t('programs.loading')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Header Title Card */}
            <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)', border: '1.5px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '1.5rem 2rem', marginBottom: '1.5rem', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '-0.3px' }}>{t('settings.title')}</h2>
                <p style={{ margin: '0.25rem 0 0 0', color: '#E2E8F0', opacity: 0.9, fontSize: '0.875rem' }}>{t('settings.subtitle')}</p>
              </div>
              <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFFFFF', fontWeight: 800, padding: '0.75rem 1.6rem', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)' }}>
                <Save size={18} color="#FFFFFF" /> {saving ? t('programs.saving') : t('saveChanges')}
              </button>
            </div>

            {/* Section 1: General Trust Info */}
            <div className="data-card" style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid #0284C7', padding: '0.45rem', borderRadius: '10px', display: 'flex' }}>
                  <Building size={20} color="#38BDF8" />
                </div>
                <h3 style={{ margin: 0, color: '#38BDF8', fontSize: '1.2rem', fontWeight: 800 }}>{t('settings.generalDetails')}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.trustNameEn')}</label>
                  <input type="text" required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.trustNameTa')}</label>
                  <input type="text" value={formData.nameTa || ''} onChange={(e) => handleChange('nameTa', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.founderEn')}</label>
                  <input type="text" value={formData.founder || ''} onChange={(e) => handleChange('founder', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.founderTa')}</label>
                  <input type="text" value={formData.founderTa || ''} onChange={(e) => handleChange('founderTa', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.taglineEn')}</label>
                  <input type="text" value={formData.tagline || ''} onChange={(e) => handleChange('tagline', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.taglineTa')}</label>
                  <input type="text" value={formData.taglineTa || ''} onChange={(e) => handleChange('taglineTa', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.regNum')}</label>
                  <input type="text" value={formData.regNumber || ''} onChange={(e) => handleChange('regNumber', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.estYear')}</label>
                  <input type="text" value={formData.establishedYear || ''} onChange={(e) => handleChange('establishedYear', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Section 2: Contact Info */}
            <div className="data-card" style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid #0284C7', padding: '0.45rem', borderRadius: '10px', display: 'flex' }}>
                  <PhoneCall size={20} color="#38BDF8" />
                </div>
                <h3 style={{ margin: 0, color: '#38BDF8', fontSize: '1.2rem', fontWeight: 800 }}>{t('settings.contactDetails')}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.email')}</label>
                  <input type="email" required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.primaryPhone')}</label>
                  <input type="text" required value={formData.phonePrimary} onChange={(e) => handleChange('phonePrimary', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.secondaryPhone')}</label>
                  <input type="text" value={formData.phoneSecondary || ''} onChange={(e) => handleChange('phoneSecondary', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Section 3: Physical Address */}
            <div className="data-card" style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid #0284C7', padding: '0.45rem', borderRadius: '10px', display: 'flex' }}>
                  <MapPin size={20} color="#38BDF8" />
                </div>
                <h3 style={{ margin: 0, color: '#38BDF8', fontSize: '1.2rem', fontWeight: 800 }}>{t('settings.addressDetails')}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.streetEn')}</label>
                  <input type="text" value={formData.address.street} onChange={(e) => handleAddressChange('street', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.streetTa')}</label>
                  <input type="text" value={formData.address.streetTa || ''} onChange={(e) => handleAddressChange('streetTa', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.areaEn')}</label>
                  <input type="text" value={formData.address.area} onChange={(e) => handleAddressChange('area', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.areaTa')}</label>
                  <input type="text" value={formData.address.areaTa || ''} onChange={(e) => handleAddressChange('areaTa', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.cityEn')}</label>
                  <input type="text" value={formData.address.city} onChange={(e) => handleAddressChange('city', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.stateEn')}</label>
                  <input type="text" value={formData.address.state} onChange={(e) => handleAddressChange('state', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.pincode')}</label>
                  <input type="text" value={formData.address.pincode} onChange={(e) => handleAddressChange('pincode', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.country')}</label>
                  <input type="text" value={formData.address.country} onChange={(e) => handleAddressChange('country', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Section 4: Social Media Links */}
            <div className="data-card" style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid #0284C7', padding: '0.45rem', borderRadius: '10px', display: 'flex' }}>
                  <Share2 size={20} color="#38BDF8" />
                </div>
                <h3 style={{ margin: 0, color: '#38BDF8', fontSize: '1.2rem', fontWeight: 800 }}>{t('settings.socialDetails')}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.facebook')}</label>
                  <input type="text" value={formData.socials.facebook || ''} onChange={(e) => handleSocialChange('facebook', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.instagram')}</label>
                  <input type="text" value={formData.socials.instagram || ''} onChange={(e) => handleSocialChange('instagram', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.twitter')}</label>
                  <input type="text" value={formData.socials.twitter || ''} onChange={(e) => handleSocialChange('twitter', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.youtube')}</label>
                  <input type="text" value={formData.socials.youtube || ''} onChange={(e) => handleSocialChange('youtube', e.target.value)} />
                </div>
                <div>
                  <label style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', display: 'block' }}>{t('settings.whatsapp')}</label>
                  <input type="text" value={formData.socials.whatsapp || ''} onChange={(e) => handleSocialChange('whatsapp', e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
              <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFFFFF', padding: '0.85rem 2.4rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)' }}>
                <Save size={20} color="#FFFFFF" /> {saving ? t('programs.saving') : t('saveChanges')}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
