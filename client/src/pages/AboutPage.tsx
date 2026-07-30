import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Award, CheckCircle2, Users, FileText } from 'lucide-react';
import { TRUST_INFO } from '../constants';
import { AboutSection } from '../sections/About';
import { MissionSection } from '../sections/Mission';

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  const boardMembers = [
    {
      name: 'Iyappan R',
      role: 'Founder & Managing Trustee',
      bio: 'Visionary founder dedicated to community welfare, education, healthcare, and senior care since 2021.',
      image: '/assets/images/founders.png',
    },
    {
      name: 'R. K. Ramanathan, IAS (Retd)',
      role: 'Trustee & Legal Advisor',
      bio: 'Former civil servant providing ethical governance and strategic policy direction to the trust.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Dr. V. Meenakshi, MD',
      role: 'Director of Healthcare Operations',
      bio: 'Renowned physician supervising mobile health clinics and free eye surgery camps.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    },
  ];

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
            {isTamil ? 'அறக்கட்டளை பற்றி' : 'About Sri Susheela Trust'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'எங்கள் வரலாறு & லட்சியம்' : 'Our Legacy & Mission'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'அன்னதானம், இலவசக் கல்வி, முதியோர் நலன் மற்றும் மருத்துவச் சேவைகளில் அர்ப்பணிக்கப்பட்ட பதிவுபெற்ற தொண்டு நிறுவனம்.'
              : 'Registered Non-Profit NGO dedicated to Annadhanam, Free Quality Education, Old Age Support, and Healthcare.'}
          </p>
        </div>
      </div>

      <AboutSection />
      <MissionSection />

      {/* Leadership Board */}
      <section className="section-padding bg-white">
        <div className="container-fluid px-3 px-lg-5 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span className="badge badge-gold mb-2 text-uppercase tracking-wider">Leadership</span>
            <h2 className="display-6 font-heading fw-bold text-navy mb-2">Board of Trustees</h2>
            <p className="text-muted lead fs-6">Guided by experienced, compassionate, and transparent leadership.</p>
          </div>

          <div className="row g-4">
            {boardMembers.map((member, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card card-luxury h-100 p-4 text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle object-fit-cover mx-auto mb-3 shadow"
                    style={{ width: '110px', height: '110px', border: '3px solid #D4AF37' }}
                  />
                  <h5 className="fw-bold text-navy font-heading mb-1">{member.name}</h5>
                  <span className="badge badge-red mb-3 d-inline-block">{member.role}</span>
                  <p className="small text-muted mb-0">{member.bio}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Financial Transparency Section */}
      <section className="section-padding bg-sst-cream">
        <div className="container-fluid px-3 px-lg-5 max-w-7xl">
          <div className="card glass-panel rounded-4 p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-6">
                <span className="badge badge-gold mb-2 text-uppercase tracking-wider">Governance</span>
                <h3 className="fw-bold text-navy font-heading mb-3">100% Legal & Financial Transparency</h3>
                <p className="text-muted mb-4">
                  Sri Susheela Trust operates under strict statutory audit guidelines with annual filings available for public review. Every rupee received is accounted for and spent directly on beneficiary programs.
                </p>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <ShieldCheck className="text-danger" size={20} />
                      <span className="fw-semibold small text-navy">Section 80G Certified</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <ShieldCheck className="text-danger" size={20} />
                      <span className="fw-semibold small text-navy">Section 12A Registered</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <FileText className="text-warning" size={20} />
                      <span className="fw-semibold small text-navy">Annual Chartered Audit</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <Users className="text-warning" size={20} />
                      <span className="fw-semibold small text-navy">Zero Admin Cut on Meals</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card bg-gradient-sst-dark text-white p-4 rounded-4 shadow-lg border border-warning">
                  <h5 className="fw-bold text-warning font-heading mb-3">Trust Registration Credentials</h5>
                  <ul className="list-unstyled small mb-0 d-flex flex-column gap-2 opacity-90">
                    <li><strong>Registration No:</strong> {TRUST_INFO.regNumber}</li>
                    <li><strong>NITI Aayog Darpan ID:</strong> TN/2018/0192847</li>
                    <li><strong>PAN Number:</strong> AAATS8492K</li>
                    <li><strong>Primary Bank:</strong> State Bank of India</li>
                    <li><strong>FCRA Status:</strong> Application in process</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
