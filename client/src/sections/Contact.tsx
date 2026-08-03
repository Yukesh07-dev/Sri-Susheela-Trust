import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, Heart } from 'lucide-react';
import { TRUST_INFO } from '../constants';
import { apiService } from '../services/api';

export const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await apiService.submitContactForm(formData, isTamil);
    setIsSubmitting(false);
    setFeedback(res);
    if (res.success) {
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }
  };

  return (
    <section id="contact" className="section-padding bg-sst-cream position-relative overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-50 start-50 translate-middle rounded-circle pointer-events-none"
        style={{
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(65px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
            {t('contactSection.badge')}
          </span>
          <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
            {t('contactSection.title')}
          </h2>

          {/* Flourish Golden Heart Line */}
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3 opacity-85">
            <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <Heart size={14} fill="#8C6826" color="#8C6826" />
            </motion.div>
            <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
          </div>

          <p className={`lead fs-6 mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18' }}>
            {t('contactSection.subtitle')}
          </p>
        </div>

        <div className="row g-4 g-lg-5">
          {/* Left Column: Form */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card border-0 rounded-4 p-4 p-md-5"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(212, 175, 55, 0.48)',
                boxShadow: '0 14px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
              }}
            >
              {feedback && (
                <div className={`alert ${feedback.success ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4 rounded-3 shadow-sm`}>
                  <CheckCircle2 size={20} />
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {t('contactSection.formName')}
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{
                        background: '#FFFDF5',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)',
                        color: '#523E18',
                      }}
                      required
                      placeholder={t('contactSection.placeholderName')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {t('contactSection.formEmail')}
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3 fs-6"
                      style={{
                        background: '#FFFDF5',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)',
                        color: '#523E18',
                      }}
                      required
                      placeholder={t('contactSection.placeholderEmail')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {t('contactSection.formPhone')}
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3 fs-6"
                      style={{
                        background: '#FFFDF5',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)',
                        color: '#523E18',
                      }}
                      required
                      placeholder={t('contactSection.placeholderPhone')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {t('contactSection.formSubject')}
                    </label>
                    <select
                      className={`form-select form-select-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{
                        background: '#FFFDF5',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)',
                        color: '#523E18',
                      }}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="General Inquiry">{isTamil ? 'பொதுவான விசாரணை (General Inquiry)' : 'General Inquiry'}</option>
                      <option value="Annadhanam Donation">{isTamil ? 'அன்னதான உதவி (Annadhanam)' : 'Annadhanam Support'}</option>
                      <option value="Vidya Jyothi Education">{isTamil ? 'கல்வி உதவிநிதி (Education Support)' : 'Education Support'}</option>
                      <option value="Volunteer Partnership">{isTamil ? 'தன்னார்வலர் / சேவகர் (Volunteer)' : 'Volunteer Partnership'}</option>
                      <option value="Corporate CSR">{isTamil ? 'நிறுவன சிஎஸ்ஆர் (Corporate CSR)' : 'Corporate CSR Support'}</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className={`form-label fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                      {t('contactSection.formMessage')}
                    </label>
                    <textarea
                      rows={4}
                      className={`form-control form-control-lg rounded-3 fs-6 ${isTamil ? 'font-tamil' : ''}`}
                      style={{
                        background: '#FFFDF5',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)',
                        color: '#523E18',
                      }}
                      required
                      placeholder={t('contactSection.placeholderMessage')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn w-100 py-3 px-4 rounded-pill fw-bold text-white fs-6 d-inline-flex align-items-center justify-content-center gap-2.5 transition-all hover-scale ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        border: '1.5px solid #D4AF37',
                        boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35), 0 0 15px rgba(255, 215, 0, 0.35)',
                        letterSpacing: isTamil ? '0.3px' : '0.5px',
                      }}
                    >
                      <Send size={18} color="#FFD700" />
                      <span>
                        {isSubmitting ? (isTamil ? 'அனுப்பப்படுகிறது...' : 'Sending...') : t('contactSection.btnSend')}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Contact Info Cards + Google Maps */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="d-flex flex-column gap-4 h-100"
            >
              {/* Contact Info Box */}
              <div
                className="card border-0 rounded-4 p-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.48)',
                  boxShadow: '0 14px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                }}
              >
                <h5 className={`fw-bold mb-3.5 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                  {t('contactSection.addressTitle')}
                </h5>

                {/* Location */}
                <div className="d-flex align-items-start gap-3 mb-3.5">
                  <div
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    <MapPin size={20} color="#FFD700" />
                  </div>
                  <span className={`small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.55' }}>
                    {isTamil
                      ? `${TRUST_INFO.address.streetTa}, ${TRUST_INFO.address.areaTa}, ${TRUST_INFO.address.cityTa} - ${TRUST_INFO.address.pincode}, ${TRUST_INFO.address.stateTa}`
                      : `${TRUST_INFO.address.street}, ${TRUST_INFO.address.area}, ${TRUST_INFO.address.city} - ${TRUST_INFO.address.pincode}, ${TRUST_INFO.address.state}`}
                  </span>
                </div>

                {/* Phone */}
                <div className="d-flex align-items-center gap-3 mb-3.5">
                  <div
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    <Phone size={20} color="#FFD700" />
                  </div>
                  <a href={`tel:${TRUST_INFO.phonePrimary}`} className="fw-bold small text-decoration-none" style={{ color: '#7A1C1C' }}>
                    {TRUST_INFO.phonePrimary} / {TRUST_INFO.phoneSecondary}
                  </a>
                </div>

                {/* Email */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    <Mail size={20} color="#FFD700" />
                  </div>
                  <a href={`mailto:${TRUST_INFO.email}`} className="fw-bold small text-decoration-none text-break" style={{ color: '#7A1C1C' }}>
                    {TRUST_INFO.email}
                  </a>
                </div>

                {/* WhatsApp Direct Button */}
                <a
                  href={TRUST_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn rounded-pill w-100 py-3 text-white d-inline-flex align-items-center justify-content-center gap-2.5 fw-bold shadow-md hover-scale transition-all ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
                    border: '1.5px solid #4ADE80',
                    boxShadow: '0 6px 20px rgba(22, 101, 52, 0.35)',
                    fontSize: '0.92rem',
                  }}
                >
                  <MessageSquare size={19} color="#FFFFFF" />
                  <span>{isTamil ? 'வாட்ஸ்அப்பில் தொடர்புகொள்ள' : 'Chat on WhatsApp Directly'}</span>
                </a>
              </div>

              {/* Google Maps Container */}
              <div
                className="card border-0 rounded-4 overflow-hidden flex-grow-1 shadow-sm"
                style={{
                  minHeight: '240px',
                  border: '1.5px solid rgba(212, 175, 55, 0.48)',
                  boxShadow: '0 12px 30px rgba(122, 28, 28, 0.1)',
                }}
              >
                <iframe
                  title="Sri Susheela Trust Location"
                  src="https://maps.google.com/maps?q=158%20Thiruvika%20Street%20Uthandi%20Chennai%2060119&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '240px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
