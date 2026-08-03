import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_TESTIMONIALS } from '../constants';
import { apiService } from '../services/api';
import { TestimonialItem } from '../types';
import { Star, Quote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(MOCK_TESTIMONIALS);

  useEffect(() => {
    let isMounted = true;
    const fetchTestimonials = () => {
      apiService.getTestimonials().then((data) => {
        if (isMounted && data) setTestimonials(data);
      });
    };

    fetchTestimonials();

    const handleFocus = () => fetchTestimonials();
    window.addEventListener('focus', handleFocus);
    const timer = setInterval(fetchTestimonials, 3000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-sst-cream position-relative overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-50 start-0 translate-middle-y rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(65px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
            {t('testimonialsSection.badge')}
          </span>
          <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
            {t('testimonialsSection.title')}
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
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="row g-4">
          {testimonials.map((item, idx) => (
            <div key={item.id} className="col-12 col-md-4">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -7, scale: 1.02 }}
                className="card border-0 rounded-4 p-4 h-100 d-flex flex-column transition-all position-relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.48)',
                  boxShadow: '0 14px 35px rgba(122, 28, 28, 0.1), 0 0 20px rgba(255, 215, 0, 0.22)',
                }}
              >
                {/* Rating Stars & Quote Icon */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex gap-1">
                    {[...Array(item.rating)].map((_, sidx) => (
                      <Star key={sidx} size={16} fill="#FFD700" color="#D4AF37" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))' }} />
                    ))}
                  </div>
                  <Quote size={28} style={{ color: '#7A1C1C', opacity: 0.3 }} />
                </div>

                {/* Quote Text */}
                <p className={`small mb-4 flex-grow-1 fst-italic ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.65' }}>
                  "{isTamil ? item.quoteTa : item.quote}"
                </p>

                {/* Author Info */}
                <div className="d-flex align-items-center gap-3 border-top border-warning border-opacity-30 pt-3 mt-auto">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="rounded-circle object-fit-cover shadow-sm"
                    style={{
                      width: '48px',
                      height: '48px',
                      border: '2px solid #D4AF37',
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)',
                    }}
                  />
                  <div>
                    <h6 className={`fw-bold mb-0 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                      {item.name}
                    </h6>
                    <span className={`small fw-bold d-block ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#8C6826', fontSize: '0.78rem' }}>
                      {isTamil ? item.roleTa : item.role}
                    </span>
                    <span className="small opacity-75" style={{ color: '#523E18', fontSize: '0.72rem' }}>
                      {item.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
