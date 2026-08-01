import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_EVENTS } from '../constants';
import { apiService } from '../services/api';
import { EventItem } from '../types';
import { Calendar, Clock, MapPin, Users, CheckCircle2, Heart } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    apiService.getEvents().then((data) => {
      if (isMounted && data) setEvents(data);
    });
    return () => { isMounted = false; };
  }, []);

  const upcomingEvents = events.filter((e) => e.isUpcoming || e.status === 'Upcoming');
  const pastEvents = events.filter((e) => !e.isUpcoming && e.status !== 'Upcoming');

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      setSelectedEvent(null);
    }, 2000);
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

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Upcoming Events */}
        <div className="mb-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div
              className="rounded-circle p-2.5 d-flex align-items-center justify-content-center shadow-sm"
              style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                border: '1px solid #D4AF37',
                marginRight: '0.5rem',
              }}
            >
              <Calendar size={20} color="#FFD700" />
            </div>
            <h3 className={`fw-bold mb-0 ${isTamil ? 'font-tamil fs-4' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
              {isTamil ? 'வரவிருக்கும் சிறப்பு நிகழ்வுகள்' : 'Upcoming Events & Drives'}
            </h3>
          </div>

          <div className="row g-4">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="col-12 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="card border-0 rounded-4 overflow-hidden p-0 h-100 d-flex flex-column transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(212, 175, 55, 0.48)',
                    boxShadow: '0 16px 40px rgba(122, 28, 28, 0.08), 0 0 25px rgba(255, 215, 0, 0.2)',
                  }}
                >
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img src={evt.imageUrl} alt={evt.title} className="w-100 h-100 object-fit-cover transition-all duration-500 hover-scale" />
                    <span
                      className={`position-absolute top-0 start-0 m-3 badge rounded-pill px-3 py-1.5 fw-bold shadow-md ${isTamil ? 'font-tamil' : ''}`}
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        color: '#FFD700',
                        border: '1px solid #D4AF37',
                      }}
                    >
                      {evt.category}
                    </span>
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <h5 className={`fw-bold mb-3 ${isTamil ? 'font-tamil fs-5' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? evt.titleTa : evt.title}
                    </h5>

                    <div className="d-flex flex-column gap-2.5 small mb-3" style={{ color: '#523E18' }}>
                      <div className="d-flex align-items-center">
                        <Calendar size={16} color="#7A1C1C" style={{ marginRight: '0.75rem' }} />
                        <span><strong>{isTamil ? 'தேதி:' : 'Date:'}</strong> {evt.date}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Clock size={16} color="#8C6826" style={{ marginRight: '0.75rem' }} />
                        <span><strong>{isTamil ? 'நேரம்:' : 'Time:'}</strong> {evt.time}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <MapPin size={16} color="#7A1C1C" style={{ marginRight: '0.75rem' }} />
                        <span><strong>{isTamil ? 'இடம்:' : 'Location:'}</strong> {isTamil ? evt.locationTa : evt.location}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Users size={16} color="#15803D" style={{ marginRight: '0.75rem' }} />
                        <span><strong>{isTamil ? 'பதிவு செய்தவர்கள்:' : 'Registered Attendees:'}</strong> {evt.registeredCount} {isTamil ? 'நபர்கள்' : 'People'}</span>
                      </div>
                    </div>

                    <p className={`small mb-4 flex-grow-1 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.6' }}>
                      {isTamil ? evt.shortDescTa : evt.shortDesc}
                    </p>

                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className={`btn rounded-pill w-100 py-3 text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2.5 shadow-md hover-scale transition-all mt-auto ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        border: '1.5px solid #D4AF37',
                        fontSize: '0.92rem',
                        boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35), 0 0 15px rgba(255, 215, 0, 0.35)',
                      }}
                    >
                      <span>{isTamil ? 'இப்போதே பதிவு செய்ய' : 'Register / RSVP Now'}</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-5">
          <h3 className={`fw-bold mb-4 ${isTamil ? 'font-tamil fs-4' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
            {isTamil ? 'கடந்த கால சாதனை நிகழ்வுகள்' : 'Past Milestone Drives'}
          </h3>
          <div className="row g-4">
            {pastEvents.map((evt) => (
              <div key={evt.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card border-0 rounded-4 p-3 transition-all h-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 249, 231, 0.9) 100%)',
                    border: '1.5px solid rgba(212, 175, 55, 0.4)',
                    boxShadow: '0 10px 25px rgba(122, 28, 28, 0.06)',
                  }}
                >
                  <img src={evt.imageUrl} alt={evt.title} className="w-100 rounded-3 mb-3 object-fit-cover" style={{ height: '160px' }} />
                  <span className="badge rounded-pill px-3 py-1 bg-secondary text-white mb-2 font-mono align-self-start">{evt.date}</span>
                  <h6 className={`fw-bold mb-1.5 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? evt.titleTa : evt.title}
                  </h6>
                  <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18' }}>
                    {isTamil ? evt.shortDescTa : evt.shortDesc}
                  </p>
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
          style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.78)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="rounded-4 p-4 p-md-5 max-w-lg w-100 shadow-lg position-relative border-0"
            style={{
              background: 'linear-gradient(135deg, #FFFDF5 0%, #FEF9E7 100%)',
              border: '2px solid #D4AF37',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3)',
            }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm border"
            >
              ✕
            </button>

            <h5 className={`fw-bold mb-1 ${isTamil ? 'font-tamil fs-5' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
              {isTamil ? 'நிகழ்வு முன்பதிவு (RSVP)' : 'RSVP for Event'}
            </h5>
            <p className={`small mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#8C6826' }}>
              {isTamil ? selectedEvent.titleTa : selectedEvent.title}
            </p>

            {registered ? (
              <div className="alert alert-success text-center py-4 rounded-3 border-0 shadow-sm" style={{ background: '#F0FDF4', color: '#15803D' }}>
                <CheckCircle2 size={36} className="mx-auto mb-2 text-success" />
                <h6 className="fw-bold mb-1">{isTamil ? 'முன்பதிவு உறுதி செய்யப்பட்டது!' : 'Registration Confirmed!'}</h6>
                <span className="small">{isTamil ? 'நிகழ்வில் உங்களைச் சந்திக்க ஆவலுடன் காத்திருக்கிறோம்.' : `We look forward to seeing you.`}</span>
              </div>
            ) : (
              <form onSubmit={handleRSVP}>
                <div className="mb-3">
                  <label className={`form-label small fw-bold ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? 'முழுப் பெயர்' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    className={`form-control rounded-3 ${isTamil ? 'font-tamil' : ''}`}
                    style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                    required
                    placeholder={isTamil ? 'உங்கள் பெயர்' : 'Your Name'}
                  />
                </div>
                <div className="mb-3">
                  <label className={`form-label small fw-bold ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? 'தொலைபேசி எண்' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded-3"
                    style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                    required
                    placeholder="+91 98400 00000"
                  />
                </div>
                <div className="mb-3">
                  <label className={`form-label small fw-bold ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    style={{ background: '#FFFDF5', border: '1.5px solid rgba(212, 175, 55, 0.45)', color: '#523E18' }}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className={`btn rounded-pill w-100 py-3 text-white fw-bold shadow-md transition-all hover-scale ${isTamil ? 'font-tamil' : ''}`}
                  style={{
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 6px 20px rgba(122, 28, 28, 0.35)',
                  }}
                >
                  {isTamil ? 'முன்பதிவை உறுதிசெய்' : 'Confirm RSVP Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
