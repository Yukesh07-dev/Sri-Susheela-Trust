import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartHandshake, Send, CheckCircle2, Users, Sparkles, Clock } from 'lucide-react';
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
    <div className="py-4">
      {/* High-Contrast Luxury Dark Gold Header Banner */}
      <div
        className="py-5 px-3 mb-5 text-center position-relative shadow-md"
        style={{
          background: 'linear-gradient(135deg, #1A0F0A 0%, #3D1212 50%, #200D0D 100%)',
          borderBottom: '3px solid #D4AF37',
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

      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="row g-4 g-lg-5">
          {/* Form Column */}
          <div className="col-12 col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card card-luxury p-4 p-md-5"
            >
              <h3 className={`fw-bold font-heading text-navy mb-4 d-flex align-items-center gap-2 ${isTamil ? 'font-tamil' : ''}`}>
                <HeartHandshake className="text-danger" size={26} />
                {isTamil ? 'தன்னார்வலர் விண்ணப்பப் படிவம்' : 'Volunteer Application Form'}
              </h3>

              {feedback && (
                <div className={`alert ${feedback.success ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
                  <CheckCircle2 size={20} />
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'முழுப் பெயர்' : t('volunteerPage.fullName')}
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      required
                      placeholder={isTamil ? 'எ.கா. பிரியதர்ஷினி V.' : 'e.g. Priyadarshini V.'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'மின்னஞ்சல் முகவரி' : t('volunteerPage.email')}
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'தொலைபேசி எண்' : t('volunteerPage.phone')}
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="+91 98401 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'நகரம் / மாவட்டம்' : t('volunteerPage.city')}
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      required
                      placeholder={isTamil ? 'எ.கா. சென்னை / காஞ்சிபுரம்' : 'e.g. Chennai / Kanchipuram'}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'விருப்பமான சேவைத் துறை' : t('volunteerPage.preferredDomain')}
                    </label>
                    <select
                      className={`form-select form-select-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
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
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'சேவை செய்யக்கூடிய நேரம்' : t('volunteerPage.availability')}
                    </label>
                    <select
                      className={`form-select form-select-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
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
                    <label className={`form-label fw-bold text-navy small ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'தொண்டாற்ற விரும்புவதற்கான காரணம்' : t('volunteerPage.motivation')}
                    </label>
                    <textarea
                      rows={4}
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
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

                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-sst-primary w-100 py-3 justify-content-center fs-6 ${isTamil ? 'font-tamil' : ''}`}
                    >
                      <Send size={18} />
                      {isSubmitting
                        ? (isTamil ? 'விண்ணப்பம் சமர்ப்பிக்கப்படுகிறது...' : 'Submitting Application...')
                        : (isTamil ? 'விண்ணப்பத்தைச் சமர்ப்பிக்கவும்' : t('volunteerPage.submitBtn'))}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Info Sidebar Column */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div className="card glass-panel p-4 rounded-4">
                <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-3 mb-3 d-inline-flex">
                  <Sparkles size={28} />
                </div>
                <h5 className={`fw-bold text-navy font-heading mb-2 ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? 'ஏன் எங்களுடன் தொண்டாற்ற வேண்டும்?' : 'Why Volunteer With Us?'}
                </h5>
                <ul className="list-unstyled small text-muted d-flex flex-column gap-2 mb-0">
                  <li className={`d-flex align-items-center gap-2 ${isTamil ? 'font-tamil' : ''}`}>
                    <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                    <span>{isTamil ? 'நேரடி சமுதாய சேவை மற்றும் சமூக மாற்றம்' : 'Direct hands-on social impact'}</span>
                  </li>
                  <li className={`d-flex align-items-center gap-2 ${isTamil ? 'font-tamil' : ''}`}>
                    <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                    <span>{isTamil ? 'அதிகாரப்பூர்வ தன்னார்வலர் சான்றிதழ்' : 'Official Volunteer Service Certificate'}</span>
                  </li>
                  <li className={`d-flex align-items-center gap-2 ${isTamil ? 'font-tamil' : ''}`}>
                    <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                    <span>{isTamil ? 'தலைமைத்துவம் & நிறுவன அனுபவம்' : 'Leadership & organizational experience'}</span>
                  </li>
                  <li className={`d-flex align-items-center gap-2 ${isTamil ? 'font-tamil' : ''}`}>
                    <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                    <span>{isTamil ? 'அன்பான மற்றும் கருணையுள்ள சமுதாய வலையமைப்பு' : 'Warm, compassionate community network'}</span>
                  </li>
                </ul>
              </div>

              {/* High-Contrast 500+ Active Volunteers Card */}
              <div
                className="card p-4 rounded-4 shadow-md text-white"
                style={{
                  background: 'linear-gradient(135deg, #1A0F0A 0%, #3D1212 50%, #200D0D 100%)',
                  border: '2px solid #D4AF37',
                }}
              >
                <Users size={32} style={{ color: '#FCD34D' }} className="mb-2" />
                <h5 className={`fw-bold mb-1 ${isTamil ? 'font-tamil' : 'font-heading'}`} style={{ color: '#FCD34D' }}>
                  {isTamil ? '500+ சுறுசுறுப்பான தன்னார்வலர்கள்' : '500+ Active Volunteers'}
                </h5>
                <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E2E8F0', lineHeight: '1.5' }}>
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
