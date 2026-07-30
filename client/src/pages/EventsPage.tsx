import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_EVENTS } from '../constants';
import { EventItem } from '../types';
import { Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registered, setRegistered] = useState(false);

  const upcomingEvents = MOCK_EVENTS.filter((e) => e.isUpcoming);
  const pastEvents = MOCK_EVENTS.filter((e) => !e.isUpcoming);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      setSelectedEvent(null);
    }, 2000);
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
            {isTamil ? 'நிகழ்வுகள் & முகாம்கள்' : 'Community Gatherings'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'வரவிருக்கும் நிகழ்வுகள் & சிறப்பு முகாம்கள்' : 'Events & Field Operations'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'எங்கள் கள நிகழ்வுகளில் பங்கேற்று சமுதாயத் தொண்டில் இணையுங்கள்.'
              : 'Join our field drives, medical camps, and food distribution programs.'}
          </p>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        {/* Upcoming Events */}
        <div className="mb-5">
          <h3 className="fw-bold font-heading text-navy mb-4 d-flex align-items-center gap-2">
            <span className="rounded-circle bg-danger p-2 text-white d-inline-flex">
              <Calendar size={18} />
            </span>
            Upcoming Events
          </h3>

          <div className="row g-4">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="col-12 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card card-luxury overflow-hidden p-0 h-100 d-flex flex-column"
                >
                  <div className="position-relative" style={{ height: '220px' }}>
                    <img src={evt.imageUrl} alt={evt.title} className="w-100 h-100 object-fit-cover" />
                    <span className="position-absolute top-0 start-0 m-3 badge bg-danger text-white">
                      {evt.category}
                    </span>
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <h5 className="fw-bold font-heading text-navy mb-3">
                      {isTamil ? evt.titleTa : evt.title}
                    </h5>

                    <div className="d-flex flex-column gap-2 small text-muted mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <Calendar size={16} className="text-danger" />
                        <strong>Date:</strong> {evt.date}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Clock size={16} className="text-warning" />
                        <strong>Time:</strong> {evt.time}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <MapPin size={16} className="text-info" />
                        <strong>Location:</strong> {isTamil ? evt.locationTa : evt.location}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Users size={16} className="text-success" />
                        <strong>Registered Attendees:</strong> {evt.registeredCount} People
                      </div>
                    </div>

                    <p className="small text-muted mb-4 flex-grow-1">
                      {isTamil ? evt.shortDescTa : evt.shortDesc}
                    </p>

                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="btn btn-sst-primary w-100 justify-content-center mt-auto"
                    >
                      Register / RSVP Now
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h3 className="fw-bold font-heading text-navy mb-4">Past Milestone Drives</h3>
          <div className="row g-4">
            {pastEvents.map((evt) => (
              <div key={evt.id} className="col-12 col-md-6 col-lg-4">
                <div className="card card-luxury p-3 opacity-90">
                  <img src={evt.imageUrl} alt={evt.title} className="w-100 rounded-3 mb-3 object-fit-cover" style={{ height: '160px' }} />
                  <span className="badge bg-secondary mb-2">{evt.date}</span>
                  <h6 className="fw-bold text-navy mb-1">{isTamil ? evt.titleTa : evt.title}</h6>
                  <p className="small text-muted mb-0">{isTamil ? evt.shortDescTa : evt.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)' }}
        >
          <div className="bg-white rounded-4 p-4 max-w-lg w-100 shadow-lg position-relative">
            <button onClick={() => setSelectedEvent(null)} className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-3">
              ✕
            </button>
            <h5 className="fw-bold text-navy font-heading mb-1">RSVP for Event</h5>
            <p className="small text-muted mb-3">{selectedEvent.title}</p>

            {registered ? (
              <div className="alert alert-success text-center py-4">
                <CheckCircle2 size={36} className="mx-auto mb-2 text-success" />
                <h6 className="fw-bold">Registration Confirmed!</h6>
                <span className="small">We look forward to seeing you at {selectedEvent.location}.</span>
              </div>
            ) : (
              <form onSubmit={handleRSVP}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input type="text" className="form-control rounded-3" required placeholder="Your Name" />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Phone Number</label>
                  <input type="tel" className="form-control rounded-3" required placeholder="+91 98400 00000" />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email Address</label>
                  <input type="email" className="form-control rounded-3" required placeholder="you@example.com" />
                </div>
                <button type="submit" className="btn btn-sst-primary w-100 py-2.5 justify-content-center">
                  Confirm RSVP Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
