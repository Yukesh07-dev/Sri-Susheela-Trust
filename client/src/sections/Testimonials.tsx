import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  return (
    <section className="section-padding bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('testimonialsSection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">
            {t('testimonialsSection.title')}
          </h2>
          <p className="text-muted lead fs-6">{t('testimonialsSection.subtitle')}</p>
        </div>

        <div className="row g-4">
          {MOCK_TESTIMONIALS.map((item, idx) => (
            <div key={item.id} className="col-12 col-md-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card card-luxury h-100 p-4 d-flex flex-column"
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex text-warning gap-1">
                    {[...Array(item.rating)].map((_, sidx) => (
                      <Star key={sidx} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <Quote size={28} className="text-danger opacity-25" />
                </div>

                <p className="small text-muted mb-4 flex-grow-1 fst-italic">
                  "{isTamil ? item.quoteTa : item.quote}"
                </p>

                <div className="d-flex align-items-center gap-3 border-top pt-3 mt-auto">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="rounded-circle object-fit-cover shadow-sm"
                    style={{ width: '48px', height: '48px' }}
                  />
                  <div>
                    <h6 className="fw-bold text-navy mb-0 font-heading fs-6">{item.name}</h6>
                    <span className="small text-danger fw-medium d-block" style={{ fontSize: '0.78rem' }}>
                      {isTamil ? item.roleTa : item.role}
                    </span>
                    <span className="small text-muted" style={{ fontSize: '0.7rem' }}>
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
