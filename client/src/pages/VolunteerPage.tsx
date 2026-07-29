import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartHandshake, Send, CheckCircle2, Users, Sparkles, Clock } from 'lucide-react';
import { VolunteerFormData } from '../types';
import { apiService } from '../services/api';

export const VolunteerPage: React.FC = () => {
  const { t } = useTranslation();
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
      {/* Banner */}
      <div className="bg-gradient-sst-dark text-white py-5 px-3 mb-5 text-center position-relative">
        <div className="container-fluid max-w-7xl">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">Community Service</span>
          <h1 className="display-4 font-heading fw-bold text-gradient-gold mb-3">Join Our Volunteer Family</h1>
          <p className="lead text-light opacity-90 max-w-2xl mx-auto fs-6">
            Lend your hands, heart, and expertise to create a hunger-free and educated society.
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
              <h3 className="fw-bold font-heading text-navy mb-4 d-flex align-items-center gap-2">
                <HeartHandshake className="text-danger" size={26} />
                Volunteer Application Form
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
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.fullName')}</label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="e.g. Priyadarshini V."
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.email')}</label>
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
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.phone')}</label>
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
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.city')}</label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="e.g. Chennai / Kanchipuram"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.preferredDomain')}</label>
                    <select
                      className="form-select form-select-lg rounded-3 fs-6"
                      value={formData.preferredDomain}
                      onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                    >
                      <option value="Annadhanam Distribution">Daily Annadhanam Meal Serving</option>
                      <option value="Education Mentoring">Vidya Jyothi Teaching & Mentoring</option>
                      <option value="Senior Care Assistance">Anbu Illam Senior Care & Activities</option>
                      <option value="Medical Camp Support">Mobile Health Camp Operations</option>
                      <option value="Digital & Media">Photography, Social Media & Content</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.availability')}</label>
                    <select
                      className="form-select form-select-lg rounded-3 fs-6"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <option value="Weekends (4-6 Hours)">Weekends (4-6 Hours)</option>
                      <option value="Weekdays (Morning)">Weekdays (Morning Shift)</option>
                      <option value="Events Only">Event-Based Calls Only</option>
                      <option value="Remote / Virtual">Remote / Virtual Mentoring</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold text-navy small">{t('volunteerPage.motivation')}</label>
                    <textarea
                      rows={4}
                      className="form-control form-control-lg rounded-3 fs-6"
                      required
                      placeholder="Tell us briefly why you want to serve with Sri Susheela Trust..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-sst-primary w-100 py-3 justify-content-center fs-6"
                    >
                      <Send size={18} />
                      {isSubmitting ? 'Submitting Application...' : t('volunteerPage.submitBtn')}
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
                <h5 className="fw-bold text-navy font-heading mb-2">Why Volunteer With Us?</h5>
                <ul className="list-unstyled small text-muted d-flex flex-column gap-2 mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" /> Direct hands-on social impact
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" /> Official Volunteer Service Certificate
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" /> Leadership & organizational experience
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" /> Warm, compassionate community network
                  </li>
                </ul>
              </div>

              <div className="card bg-gradient-sst-red text-white p-4 rounded-4 shadow-md">
                <Users size={32} className="text-warning mb-2" />
                <h5 className="fw-bold text-white font-heading mb-1">500+ Active Volunteers</h5>
                <p className="small text-light opacity-90 mb-0">
                  Our network of dedicated youth, retired professionals, and medical experts drive every successful campaign.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
