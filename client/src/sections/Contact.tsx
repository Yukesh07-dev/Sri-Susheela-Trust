import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { TRUST_INFO } from '../constants';
import { apiService } from '../services/api';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
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
    const res = await apiService.submitContactForm(formData);
    setIsSubmitting(false);
    setFeedback(res);
    if (res.success) {
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }
  };

  return (
    <section id="contact" className="section-padding bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('contactSection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">
            {t('contactSection.title')}
          </h2>
          <p className="text-muted lead fs-6">{t('contactSection.subtitle')}</p>
        </div>

        <div className="row g-4 g-lg-5">
          {/* Left Column: Form */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card card-luxury p-4 p-md-5"
            >
              {feedback && (
                <div className={`alert ${feedback.success ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
                  <CheckCircle2 size={20} />
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('contactSection.formName')}</label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('contactSection.formEmail')}</label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('contactSection.formPhone')}</label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="+91 98401 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('contactSection.formSubject')}</label>
                    <select
                      className="form-select form-select-lg rounded-3 fs-6"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Annadhanam Donation">Annadhanam Donation</option>
                      <option value="Vidya Jyothi Education">Vidya Jyothi Education</option>
                      <option value="Volunteer Partnership">Volunteer Partnership</option>
                      <option value="Corporate CSR">Corporate CSR Support</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold text-navy small">{t('contactSection.formMessage')}</label>
                    <textarea
                      rows={4}
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-sst-primary w-100 py-3 justify-content-center fs-6"
                    >
                      <Send size={18} />
                      {isSubmitting ? 'Sending...' : t('contactSection.btnSend')}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Contact Cards + Google Maps Container */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column gap-4 h-100">
              <div className="card card-luxury p-4">
                <h5 className="fw-bold text-navy font-heading mb-3">{t('contactSection.addressTitle')}</h5>
                <div className="d-flex align-items-start gap-3 mb-3">
                  <MapPin size={22} className="text-danger flex-shrink-0 mt-1" />
                  <span className="text-muted small">
                    {TRUST_INFO.address.street}, {TRUST_INFO.address.area}, {TRUST_INFO.address.city} - {TRUST_INFO.address.pincode}, {TRUST_INFO.address.state}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <Phone size={20} className="text-warning flex-shrink-0" />
                  <a href={`tel:${TRUST_INFO.phonePrimary}`} className="text-navy fw-semibold small text-decoration-none">
                    {TRUST_INFO.phonePrimary} / {TRUST_INFO.phoneSecondary}
                  </a>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <Mail size={20} className="text-info flex-shrink-0" />
                  <a href={`mailto:${TRUST_INFO.email}`} className="text-navy fw-semibold small text-decoration-none">
                    {TRUST_INFO.email}
                  </a>
                </div>

                <a
                  href={TRUST_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success rounded-pill w-100 py-2.5 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <MessageSquare size={18} />
                  Chat on WhatsApp Directly
                </a>
              </div>

              {/* Google Maps Container */}
              <div className="card card-luxury overflow-hidden flex-grow-1" style={{ minHeight: '220px' }}>
                <iframe
                  title="Sri Susheela Trust Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8228388484196!2d80.2289!3d13.0425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzMzLjAiTiA4MMKwMTMnNDQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '220px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
