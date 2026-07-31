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
      nameTa: 'ஐயப்பன் ஆர்',
      role: 'Founder & Managing Trustee',
      roleTa: 'நிறுவனர் & நிர்வாக அறங்காவலர்',
      bio: 'Visionary founder dedicated to community welfare, education, healthcare, and senior care since 2021.',
      bioTa: '2021 முதல் சமூக நலன், கல்வி, மருத்துவம் மற்றும் முதியோர் சேவையில் அர்ப்பணிப்புடன் செயல்படும் நிறுவனர்.',
      image: '/assets/images/founders.png',
    },
    {
      name: 'R. K. Ramanathan, IAS (Retd)',
      nameTa: 'ஆர். கே. ராமநாதன், ஐஏஎஸ் (ஓய்வு)',
      role: 'Trustee & Legal Advisor',
      roleTa: 'அறங்காவலர் & சட்ட ஆலோசகர்',
      bio: 'Former civil servant providing ethical governance and strategic policy direction to the trust.',
      bioTa: 'அறக்கட்டளைக்கு நேர்மையான நிர்வாகம் மற்றும் மூலோபாய ஆலோசனைகளை வழங்கும் முன்னாள் மூத்த அரசு அதிகாரி.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Dr. V. Meenakshi, MD',
      nameTa: 'டாக்டர் வி. மீனாட்சி, எம்.டி',
      role: 'Director of Healthcare Operations',
      roleTa: 'மருத்துவச் சேவை இயக்குனர்',
      bio: 'Renowned physician supervising mobile health clinics and free eye surgery camps.',
      bioTa: 'நடமாடும் மருத்துவ வாகனங்கள் மற்றும் இலவச கண் அறுவை சிகிச்சை முகாம்களை மேற்பார்வையிடும் பிரபல மருத்துவர்.',
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
      <section className="section-padding bg-sst-cream position-relative overflow-hidden">
        {/* Background Soft Glow Orbs */}
        <div
          className="position-absolute top-50 start-50 translate-middle rounded-circle pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
            filter: 'blur(65px)',
            zIndex: 0,
          }}
        />

        <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
              {isTamil ? 'தலைமைப் பொறுப்பு' : 'Leadership'}
            </span>
            <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
              {isTamil ? 'அறங்காவலர் குழு' : 'Board of Trustees'}
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
              {isTamil ? 'அனுபவமிக்க, இரக்கமுள்ள மற்றும் வெளிப்படையான தலைமைத்துவம்.' : 'Guided by experienced, compassionate, and transparent leadership.'}
            </p>
          </div>

          <div className="row g-4">
            {boardMembers.map((member, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ y: -7, scale: 1.02 }}
                  className="card border-0 rounded-4 p-4 text-center h-100 d-flex flex-column align-items-center transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(212, 175, 55, 0.48)',
                    boxShadow: '0 14px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={isTamil ? member.nameTa : member.name}
                    className="rounded-circle object-fit-cover mx-auto mb-3 shadow-md"
                    style={{
                      width: '110px',
                      height: '110px',
                      border: '3px solid #D4AF37',
                      boxShadow: '0 6px 18px rgba(212, 175, 55, 0.4)',
                    }}
                  />
                  <h5 className={`fw-bold mb-1 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? member.nameTa : member.name}
                  </h5>
                  <span
                    className={`badge rounded-pill px-3 py-1.5 fw-bold mb-3 shadow-sm ${isTamil ? 'font-tamil' : ''}`}
                    style={{
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      color: '#FFD700',
                      border: '1px solid #D4AF37',
                      fontSize: '0.78rem',
                    }}
                  >
                    {isTamil ? member.roleTa : member.role}
                  </span>
                  <p className={`small mb-0 mt-auto ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.6' }}>
                    {isTamil ? member.bioTa : member.bio}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Financial Transparency Section */}
      <section className="section-padding bg-sst-cream position-relative overflow-hidden">
        <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
          <div
            className="card border-0 rounded-4 p-4 p-md-5"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.95) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(212, 175, 55, 0.5)',
              boxShadow: '0 16px 40px rgba(122, 28, 28, 0.08), 0 0 25px rgba(255, 215, 0, 0.22)',
            }}
          >
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-12 col-lg-6">
                <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
                  {isTamil ? 'நிர்வாகம்' : 'Governance'}
                </span>
                <h3 className={`fw-bold mb-3 ${isTamil ? 'font-tamil fs-4' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                  {isTamil ? '100% சட்டப்பூர்வ & நிதி வெளிப்படைத்தன்மை' : '100% Legal & Financial Transparency'}
                </h3>
                <p className={`mb-4 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.65' }}>
                  {isTamil
                    ? 'ஸ்ரீ சுசீலா அறக்கட்டளை வருடாந்திர தணிக்கை வழிகாட்டுதல்களின் கீழ் செயல்படுகிறது. பெறப்பட்ட ஒவ்வொரு ரூபாயும் பொது ஆய்வுக்கு உட்பட்டது மற்றும் நேரடியாக நலத்திட்டங்களுக்குப் பயன்படுத்தப்படுகிறது.'
                    : 'Sri Susheela Trust operates under strict statutory audit guidelines with annual filings available for public review. Every rupee received is accounted for and spent directly on beneficiary programs.'}
                </p>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle p-1.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', color: '#FFD700', marginRight: '0.75rem' }}>
                        <ShieldCheck size={16} />
                      </div>
                      <span className={`fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                        {isTamil ? 'பிரிவு 80G சான்றளிக்கப்பட்டது' : 'Section 80G Certified'}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle p-1.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', color: '#FFD700', marginRight: '0.75rem' }}>
                        <ShieldCheck size={16} />
                      </div>
                      <span className={`fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                        {isTamil ? 'பிரிவு 12A பதிவு செய்யப்பட்டது' : 'Section 12A Registered'}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle p-1.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', color: '#FFD700', marginRight: '0.75rem' }}>
                        <FileText size={16} />
                      </div>
                      <span className={`fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                        {isTamil ? 'வருடாந்திர தணிக்கை அறிக்கை' : 'Annual Chartered Audit'}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle p-1.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ background: '#7A1C1C', color: '#FFD700', marginRight: '0.75rem' }}>
                        <Users size={16} />
                      </div>
                      <span className={`fw-bold small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                        {isTamil ? 'உணவு நிதியில் நிர்வாக கழிவு இல்லை' : 'Zero Admin Cut on Meals'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Credentials Card - Royal High Contrast Maroon Card */}
              <div className="col-12 col-lg-6">
                <div
                  className="card border-0 p-4 p-md-4.5 rounded-4 shadow-lg position-relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 16px 40px rgba(122, 28, 28, 0.35), 0 0 25px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <h5
                    className={`fw-extrabold mb-3 font-heading ${isTamil ? 'font-tamil' : ''}`}
                    style={{
                      color: '#FFD700',
                      textShadow: '0 0 12px rgba(255, 215, 0, 0.5)',
                      fontSize: '1.15rem',
                    }}
                  >
                    {isTamil ? 'அறக்கட்டளை பதிவு சான்றுகள்' : 'Trust Registration Credentials'}
                  </h5>
                  <ul className="list-unstyled small mb-0 d-flex flex-column gap-2.5" style={{ color: '#FFFFFF' }}>
                    <li className="d-flex justify-content-between align-items-center border-bottom border-warning border-opacity-25 pb-2">
                      <span className="opacity-90">{isTamil ? 'பதிவு எண்:' : 'Registration No:'}</span>
                      <strong style={{ color: '#FFD700' }}>{TRUST_INFO.regNumber}</strong>
                    </li>
                    <li className="d-flex justify-content-between align-items-center border-bottom border-warning border-opacity-25 pb-2">
                      <span className="opacity-90">NITI Aayog Darpan ID:</span>
                      <strong style={{ color: '#FFD700' }}>TN/2018/0192847</strong>
                    </li>
                    <li className="d-flex justify-content-between align-items-center border-bottom border-warning border-opacity-25 pb-2">
                      <span className="opacity-90">{isTamil ? 'பான் எண்:' : 'PAN Number:'}</span>
                      <strong style={{ color: '#FFD700' }}>AAATS8492K</strong>
                    </li>
                    <li className="d-flex justify-content-between align-items-center border-bottom border-warning border-opacity-25 pb-2">
                      <span className="opacity-90">{isTamil ? 'முக்கிய வங்கி:' : 'Primary Bank:'}</span>
                      <strong style={{ color: '#FFD700' }}>State Bank of India</strong>
                    </li>
                    <li className="d-flex justify-content-between align-items-center pt-1">
                      <span className="opacity-90">FCRA Status:</span>
                      <strong className={`badge bg-warning text-dark font-mono ${isTamil ? 'font-tamil' : ''}`} style={{ border: '1px solid #D4AF37' }}>
                        {isTamil ? 'அங்கீகரிக்கப்பட்டது / பரிசீலனையில்' : 'Approved / In Process'}
                      </strong>
                    </li>
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
