import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRUST_INFO } from '../constants';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-padding bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Column Founders & Activities Collage */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="position-relative"
            >
              <div className="card card-luxury border-0 overflow-hidden shadow-lg p-2 bg-sst-cream">
                <img
                  src="/assets/images/founders.png"
                  alt="Sri Susheela Trust Founders"
                  className="w-100 rounded-4 object-fit-cover"
                  style={{ maxHeight: '380px', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>

              {/* Floating Trust Emblem Badge */}
              <div
                className="position-absolute bottom-0 start-0 translate-middle-y ms-3 p-3 bg-gradient-sst-teal text-white rounded-3 shadow-lg d-none d-sm-flex align-items-center gap-3 border border-warning"
                style={{ maxWidth: '250px', zIndex: 3 }}
              >
                <img src="/assets/images/logo.jpg" alt="Emblem" className="rounded-circle bg-white p-0.5" style={{ width: '48px', height: '48px' }} />
                <div>
                  <h6 className="fw-bold mb-0 text-white font-heading">Est. {TRUST_INFO.establishedYear}</h6>
                  <span className="small text-light opacity-80">People Welfare Group</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column Content */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
                {t('aboutSection.badge')}
              </span>
              <h2 className="display-6 font-heading fw-bold text-navy mb-3">
                {t('aboutSection.title')}
              </h2>

              <p className="lead text-sst-teal fw-semibold fs-6 mb-3">
                {t('aboutSection.subtitle')}
              </p>

              <p className="text-muted mb-3">{t('aboutSection.p1')}</p>
              <p className="text-muted mb-4">{t('aboutSection.p2')}</p>

              {/* Founder Quote Card */}
              <div className="card border-0 bg-sst-cream border-start border-4 border-warning rounded-3 p-3 mb-4">
                <p className="fst-italic text-navy mb-1 small fw-medium">{t('aboutSection.founderQuote')}</p>
                <div className="d-flex align-items-center gap-2">
                  <HeartHandshake size={16} className="text-sst-teal" />
                  <span className="small fw-bold text-muted">— Managing Trustees, Sri Susheela Trust</span>
                </div>
              </div>

              {/* Read More Button */}
              <Link to="/about" className="btn btn-sst-outline-teal py-2.5 px-4 rounded-pill">
                {t('aboutSection.readMore')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
