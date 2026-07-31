import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartHandshake, Send, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { VolunteerFormData } from '../types';
import { apiService } from '../services/api';

export const VolunteerPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    ageGroup: '18-25',
    occupation: '',
    preferredDomain: 'Annadhanam Distribution',
    availability: 'Weekends (4-6 Hours)',
    motivation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await apiService.submitVolunteerForm(formData);
    setIsSubmitting(false);
    setFeedback(res);
    if (res.success) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        ageGroup: '18-25',
        occupation: '',
        preferredDomain: 'Annadhanam Distribution',
        availability: 'Weekends (4-6 Hours)',
        motivation: '',
      });
    }
  };

  return (
    <div className="py-4 bg-sst-cream position-relative overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x rounded-circle pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 0,
        }}
      />

      {/* High-Contrast Luxury Dark Gold Header Banner */}
      <div
        className="py-5 px-3 mb-5 text-center position-relative shadow-md"
        style={{
          background: 'linear-gradient(135deg, #1A0F0A 0%, #3D1212 50%, #200D0D 100%)',
          borderBottom: '3px solid #D4AF37',
          zIndex: 1,
        }}
      >
        <div className="container-fluid max-w-7xl">
          <span className={`badge badge-gold mb-2 text-uppercase tracking-wider ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil ? 'தன்னார்வலர் சமுதாயம்' : 'Community Service'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'எங்கள் தன்னார்வலர் குடும்பத்தில் இணையுங்கள்' : 'Join Our Volunteer Family'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'பசியில்லா மற்றும் கல்வியறிவு பெற்ற சமுதாயத்தை உருவாக்க உங்கள் கரங்களையும் சேவையையும் வழங்குங்கள்.'
              : 'Lend your hands, heart, and expertise to create a hunger-free and educated society.'}
          </p>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4 g-lg-5">
          {/* Form Column */}
          <div className="col-12 col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card border-0 rounded-4 p-4 p-md-5 transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(212, 175, 55, 0.48)',
                boxShadow: '0 16px 40px rgba(122, 28, 28, 0.08), 0 0 25px rgba(255, 215, 0, 0.2)',
              }}
            >
              <div className="d-flex align-items-center mb-4">
                <div
                  className="rounded-circle p-2.5 d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: '46px',
                    height: '46px',
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1px solid #D4AF37',
                    marginRight: '0.85rem',
                  }}
                >
                  <HeartHandshake size={24} color="#FFD700" />
                </div>
                <h3 className={`fw-bold mb-0 ${isTamil ? 'font-tamil fs-4' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                  {isTamil ? 'தன்னார்வலர் விண்ணப்பப் படிவம்' : 'Volunteer Application Form'}
                </h3>
              </div>

              {feedback && (
                <div className={`alert ${feedback.success ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4 rounded-3 shadow-sm`}>
                  <CheckCircle2 size={20} style={{ marginRight: '0.5rem' }} />
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3.5">
                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'முழுப் பெயர்' : t('volunteerPage.fullName')}
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      required
                      placeholder={isTamil ? 'எ.கா. பிரியதர்ஷினி V.' : 'e.g. Priyadarshini V.'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'மின்னஞ்சல் முகவரி' : t('volunteerPage.email')}
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3 fs-6"
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'தொலைபேசி எண்' : t('volunteerPage.phone')}
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3 fs-6"
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      required
                      placeholder="+91 98401 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'நகரம் / மாவட்டம்' : t('volunteerPage.city')}
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      required
                      placeholder={isTamil ? 'எ.கா. சென்னை / காஞ்சிபுரம்' : 'e.g. Chennai / Kanchipuram'}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'விருப்பமான சேவைத் துறை' : t('volunteerPage.preferredDomain')}
                    </label>
                    <select
                      className={`form-select form-select-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      value={formData.preferredDomain}
                      onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                    >
                      <option value="Annadhanam Distribution">{isTamil ? 'தினசரி அன்னதான உணவளித்தல்' : 'Daily Annadhanam Meal Serving'}</option>
                      <option value="Education Mentoring">{isTamil ? 'வித்யா ஜோதி கல்வி & வழிகாட்டல்' : 'Vidya Jyothi Teaching & Mentoring'}</option>
                      <option value="Senior Care Assistance">{isTamil ? 'அன்பு இல்லம் முதியோர் பராமரிப்பு' : 'Anbu Illam Senior Care & Activities'}</option>
                      <option value="Medical Camp Support">{isTamil ? 'இலவச மருத்துவ முகாம் சேவைகள்' : 'Mobile Health Camp Operations'}</option>
                      <option value="Digital & Media">{isTamil ? 'புகைப்படம், சமூக ஊடகம் & செய்தி' : 'Photography, Social Media & Content'}</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'சேவை செய்யக்கூடிய நேரம்' : t('volunteerPage.availability')}
                    </label>
                    <select
                      className={`form-select form-select-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <option value="Weekends (4-6 Hours)">{isTamil ? 'வார இறுதி நாட்கள் (4-6 மணிநேரம்)' : 'Weekends (4-6 Hours)'}</option>
                      <option value="Weekdays (Morning)">{isTamil ? 'வார நாட்கள் (காலை நேரம்)' : 'Weekdays (Morning Shift)'}</option>
                      <option value="Events Only">{isTamil ? 'நிகழ்வுகள் போது மட்டும்' : 'Event-Based Calls Only'}</option>
                      <option value="Remote / Virtual">{isTamil ? 'ஆன்லைன் / தொலைதூர வழிகாட்டல்' : 'Remote / Virtual Mentoring'}</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? 'தொண்டாற்ற விரும்புவதற்கான காரணம்' : t('volunteerPage.motivation')}
                    </label>
                    <textarea
                      rows={4}
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                      required
                      placeholder={
                        isTamil
                          ? 'ஸ்ரீ சுசீலா அறக்கட்டளையில் நீங்கள் ஏன் தொண்டாற்ற விரும்புகிறீர்கள் என்று சுருக்கமாகக் கூறுங்கள்...'
                          : 'Tell us briefly why you want to serve with Sri Susheela Trust...'
                      }
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    />
                  </div>

                  <div className="col-12 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn rounded-pill w-100 py-3 text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2.5 shadow-md transition-all hover-scale ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        border: '1.5px solid #D4AF37',
                        fontSize: '1rem',
                        boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35), 0 0 15px rgba(255, 215, 0, 0.35)',
                      }}
                    >
                      <Send size={18} color="#FFD700" style={{ marginRight: '0.5rem' }} />
                      <span>
                        {isSubmitting
                          ? (isTamil ? 'விண்ணப்பம் சமர்ப்பிக்கப்படுகிறது...' : 'Submitting Application...')
                          : (isTamil ? 'விண்ணப்பத்தைச் சமர்ப்பிக்கவும்' : t('volunteerPage.submitBtn'))}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Info Sidebar Column */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div
                className="card border-0 rounded-4 p-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.48)',
                  boxShadow: '0 14px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                }}
              >
                <div
                  className="rounded-circle p-3 mb-3 d-inline-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1px solid #D4AF37',
                  }}
                >
                  <Sparkles size={24} color="#FFD700" />
                </div>
                <h5 className={`fw-bold mb-3 ${isTamil ? 'font-tamil fs-5' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                  {isTamil ? 'ஏன் எங்களுடன் தொண்டாற்ற வேண்டும்?' : 'Why Volunteer With Us?'}
                </h5>
                <ul className="list-unstyled small d-flex flex-column gap-3 mb-0" style={{ color: '#523E18' }}>
                  <li className="d-flex align-items-center">
                    <div className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', marginRight: '0.75rem' }}>
                      <CheckCircle2 size={14} color="#FFD700" />
                    </div>
                    <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'நேரடி சமுதாய சேவை மற்றும் சமூக மாற்றம்' : 'Direct hands-on social impact'}</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', marginRight: '0.75rem' }}>
                      <CheckCircle2 size={14} color="#FFD700" />
                    </div>
                    <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'அதிகாரப்பூர்வ தன்னார்வலர் சான்றிதழ்' : 'Official Volunteer Service Certificate'}</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', marginRight: '0.75rem' }}>
                      <CheckCircle2 size={14} color="#FFD700" />
                    </div>
                    <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'தலைமைத்துவம் & நிறுவன அனுபவம்' : 'Leadership & organizational experience'}</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', marginRight: '0.75rem' }}>
                      <CheckCircle2 size={14} color="#FFD700" />
                    </div>
                    <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'அன்பான மற்றும் கருணையுள்ள சமுதாய வலையமைப்பு' : 'Warm, compassionate community network'}</span>
                  </li>
                </ul>
              </div>

              {/* High-Contrast Royal Dark Maroon Card */}
              <div
                className="card border-0 p-4 rounded-4 shadow-lg position-relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                  border: '1.5px solid #D4AF37',
                  boxShadow: '0 16px 40px rgba(122, 28, 28, 0.35), 0 0 25px rgba(255, 215, 0, 0.3)',
                }}
              >
                <Users size={32} style={{ color: '#FFD700' }} className="mb-2" />
                <h5
                  className={`fw-extrabold mb-2 font-heading ${isTamil ? 'font-tamil' : ''}`}
                  style={{
                    color: '#FFD700',
                    textShadow: '0 0 12px rgba(255, 215, 0, 0.5)',
                  }}
                >
                  {isTamil ? '500+ சுறுசுறுப்பான தன்னார்வலர்கள்' : '500+ Active Volunteers'}
                </h5>
                <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#FFFFFF', opacity: '0.92', lineHeight: '1.6' }}>
                  {isTamil
                    ? 'எங்கள் அர்ப்பணிப்புள்ள இளைஞர்கள், ஓய்வுபெற்ற நிபுணர்கள் மற்றும் மருத்துவ நிபுணர்களின் சமுதாய வலையமைப்பு.'
                    : 'Our network of dedicated youth, retired professionals, and medical experts drive every successful campaign.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
