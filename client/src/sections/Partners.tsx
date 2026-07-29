import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, Shield, Heart, Award } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const { t } = useTranslation();

  const partners = [
    { name: 'Apex CSR Foundation', icon: Building2 },
    { name: 'Tamil Nadu Health Mission', icon: Shield },
    { name: 'Heritage Care Group', icon: Heart },
    { name: 'Global Relief Network', icon: Award },
  ];

  return (
    <section className="py-5 bg-sst-cream border-top border-bottom">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center mb-4">
          <span className="badge badge-gold text-uppercase tracking-wider">{t('partnersSection.badge')}</span>
          <h4 className="fw-bold font-heading text-navy mt-1 mb-0">{t('partnersSection.title')}</h4>
        </div>

        <div className="row g-3 align-items-center justify-content-center">
          {partners.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div key={idx} className="col-6 col-md-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card border-0 glass-panel p-3 text-center d-flex flex-column align-items-center justify-content-center"
                >
                  <IconComp size={32} className="text-danger mb-2" />
                  <span className="fw-semibold text-navy small">{p.name}</span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
