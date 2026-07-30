import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Heart,
  ArrowRight,
  Sparkles,
  BookOpen,
  Stethoscope,
  Utensils,
  UserCheck,
  Users,
  HeartHandshake,
} from 'lucide-react';
import { ChakraMotif } from '../components/common/ChakraMotif';

interface HeroProps { }

export const Hero: React.FC<HeroProps> = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  // Optimized 36 GPU-accelerated Golden Sparks for 60fps buttery-smooth performance
  const goldenSparks = Array.from({ length: 36 }).map((_, i) => ({
    id: i,
    top: `${(i * 17 + 5) % 94 + 3}%`,
    left: `${(i * 23 + 4) % 94 + 3}%`,
    size: 12 + ((i * 7) % 24),
    duration: 2.2 + ((i * 3) % 3.0),
    delay: ((i * 0.35) % 2.5),
    opacity: 0.45 + ((i * 9) % 45) / 100,
    isSparkle: i % 2 === 0,
  }));

  // 7 Pillars of Sri Susheela Trust
  const trustPillars = [
    {
      icon: BookOpen,
      title: 'EDUCATION',
      titleTa: 'கல்வி',
      subtitle: 'Empowering Young Minds',
      subtitleTa: 'இளையோரை உயர்த்துதல்',
    },
    {
      icon: Stethoscope,
      title: 'HEALTHCARE',
      titleTa: 'மருத்துவம்',
      subtitle: 'Quality Care for All',
      subtitleTa: 'அனைவருக்கும் சிகிச்சை',
    },
    {
      icon: Utensils,
      title: 'FOOD DONATION',
      titleTa: 'உணவளித்தல்',
      subtitle: 'No One Should Sleep Hungry',
      subtitleTa: 'பசியில்லா சமுதாயம்',
    },
    {
      icon: UserCheck,
      title: 'WOMEN EMPOWERMENT',
      titleTa: 'மகளிர் மேம்பாடு',
      subtitle: 'Stronger Women, Stronger Society',
      subtitleTa: 'மகளிர் சக்தி, சமுதாய மேன்மை',
    },
    {
      icon: Users,
      title: 'COMMUNITY SERVICE',
      titleTa: 'சமுதாய சேவை',
      subtitle: 'Building Better Communities',
      subtitleTa: 'வளமான சமுதாய உருவாக்கம்',
    },
    {
      icon: HeartHandshake,
      title: 'ELDERLY CARE',
      titleTa: 'முதியோர் பராமரிப்பு',
      subtitle: 'Respect, Care and Dignity',
      subtitleTa: 'மரியாதை & அரவணைப்பு',
    },
    {
      icon: Heart,
      title: 'COMPASSION',
      titleTa: 'மனிதநேயம்',
      subtitle: 'Spreading Love and Kindness',
      subtitleTa: 'அன்பும் கருணையும்',
    },
  ];

  return (
    <section
      className="position-relative d-flex flex-column justify-content-between m-0"
      style={{
        background: 'linear-gradient(135deg, #FFF9C4 0%, #FEF08A 45%, #FDE047 100%)',
        minHeight: 'min(calc(100vh - 64px), 900px)',
        paddingTop: '1rem',
        paddingBottom: '0px',
        margin: 0,
        overflowX: 'clip' as any,
        overflowY: 'visible' as any,
      }}
    >
      {/* Subtle Royal Sacred Geometric Mandala Mesh Pattern Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px), radial-gradient(rgba(122, 28, 28, 0.08) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      {/* 36 GPU-Accelerated Golden Sparks (Smooth 60fps) */}
      {goldenSparks.map((spark) => (
        <div
          key={spark.id}
          className="position-absolute pointer-events-none golden-sparkle"
          style={{
            top: spark.top,
            left: spark.left,
            zIndex: 0,
            animationDuration: `${spark.duration}s`,
            animationDelay: `${spark.delay}s`,
            opacity: spark.opacity,
            willChange: 'transform, opacity',
          }}
        >
          {spark.isSparkle ? (
            <Sparkles size={spark.size} className="text-warning fill-warning" />
          ) : (
            <ChakraMotif size={spark.size} />
          )}
        </div>
      ))}

      {/* Radial Gold Ambient Glow Behind Founders */}
      <div
        className="position-absolute top-50 end-0 translate-middle-y rounded-circle pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.35) 0%, rgba(253, 224, 71, 0.18) 50%, transparent 75%)',
          filter: 'blur(75px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative my-auto py-2" style={{ zIndex: 1 }}>
        <div className="row align-items-stretch g-3 g-lg-4">
          {/* Left Column Shifted Cleanly Rightward */}
          <div className="col-12 col-lg-6 text-center text-lg-start ps-lg-4 ps-xl-5 d-flex flex-column justify-content-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
              className="ms-lg-3"
            >
              {/* Top Branding Emblem Header Shifted Upper with Tamil Spacing */}
              <div
                className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2.5"
                style={{ marginBottom: isTamil ? '1.2rem' : '0.6rem' }}
              >
                <img
                  src="/assets/images/logo.jpg"
                  alt="Sri Susheela Trust Logo"
                  className="rounded-circle shadow-md p-0.5 bg-white border border-warning"
                  style={{ width: '54px', height: '54px', boxShadow: '0 0 16px rgba(212, 175, 55, 0.45)' }}
                />
                <div className="text-start">
                  <h4
                    className={`fw-bold mb-0 tracking-wide ${isTamil ? 'font-tamil fs-5' : 'font-heading fs-5'}`}
                    style={{ color: '#7A1C1C', letterSpacing: '0.8px' }}
                  >
                    {isTamil ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : 'SRI SUSHEELA TRUST'}
                  </h4>
                  <div
                    className={`small fw-bold text-uppercase tracking-wider opacity-90 ${isTamil ? 'font-tamil' : ''}`}
                    style={{ color: '#8C6826', fontSize: '0.78rem', letterSpacing: '1px' }}
                  >
                    {isTamil ? '— மக்கள் நலக் குழு —' : '— PEOPLE WELFARE GROUP —'}
                  </div>
                  <div
                    className={`fw-bold text-uppercase ${isTamil ? 'font-tamil' : ''}`}
                    style={{ color: '#523E18', fontSize: '0.7rem', letterSpacing: '0.9px' }}
                  >
                    {isTamil ? 'மனிதநேயத்துடன் அன்புடன் சேவையாற்றுகிறோம்' : 'SERVING HUMANITY WITH COMPASSION'}
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <h1
                className="font-heading fw-extrabold leading-tight text-uppercase"
                style={{
                  fontSize: isTamil ? '2.8rem' : '4.3rem',
                  letterSpacing: '1.4px',
                  lineHeight: isTamil ? '1.22' : '1.08',
                  marginBottom: isTamil ? '1.2rem' : '0.6rem',
                }}
              >
                {isTamil ? (
                  <>
                    <span className="d-block" style={{ color: '#7A1C1C' }}>ஒன்றிணைந்து</span>
                    <span className="d-block" style={{ color: '#8C6826' }}>நாம் மிகப்பெரிய</span>
                    <span className="d-block" style={{ color: '#8C6826' }}>மாற்றத்தை உருவாக்குவோம்</span>
                  </>
                ) : (
                  <>
                    <span className="d-block" style={{ color: '#7A1C1C' }}>TOGETHER</span>
                    <span className="d-block" style={{ color: '#8C6826' }}>WE CAN MAKE</span>
                    <span className="d-block" style={{ color: '#8C6826' }}>A BIG DIFFERENCE</span>
                  </>
                )}
              </h1>

              {/* Flourish Golden Heart Line Divider */}
              <div className={`d-flex align-items-center justify-content-center justify-content-lg-start gap-2 opacity-85 ${isTamil ? 'my-3' : 'my-2.5'}`}>
                <div style={{ height: '1.5px', width: '75px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
                <Heart size={15} fill="#8C6826" color="#8C6826" />
                <div style={{ height: '1.5px', width: '75px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
              </div>

              {/* Description Paragraph */}
              <p className={`lead text-dark opacity-90 pe-lg-2 fs-6 leading-relaxed fw-normal ${isTamil ? 'mb-4 mt-2' : 'mb-3.5'}`}>
                {isTamil ? (
                  <>
                    நாங்கள் <strong style={{ color: '#7A1C1C' }}>கல்வி, மருத்துவம், சமுதாய சேவை, முதியோர் அரவணைப்பு மற்றும் மனிதநேயம்</strong> மூலம் எளியோரின் வாழ்வை உயர்த்த பாடுபடுகிறோம். நாளைய சிறந்த எதிர்காலத்தை உருவாக்க எங்களுடன் இணையுங்கள்.
                  </>
                ) : (
                  <>
                    We are committed to uplifting lives through{' '}
                    <strong style={{ color: '#7A1C1C' }}>
                      Education, Healthcare, Community Service, Elderly Care, Empowerment and Compassion.
                    </strong>{' '}
                    Join us in building a better tomorrow.
                  </>
                )}
              </p>

              {/* Action Buttons */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                <a
                  href="#about"
                  className="btn rounded-pill px-5 py-3 text-white fw-bold shadow-md d-inline-flex align-items-center gap-2.5 hover-scale transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1.5px solid #D4AF37',
                    letterSpacing: '0.8px',
                    fontSize: '0.95rem',
                    boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35)',
                  }}
                >
                  <span>{isTamil ? 'கண்டறியுங்கள்' : 'DISCOVER MORE'}</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Founders Image */}
          <div className="col-12 col-lg-6 text-center position-relative d-flex align-items-end justify-content-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="position-relative d-flex align-items-end justify-content-center w-100"
            >
              <img
                src="/assets/images/hero_founders_hd.png"
                alt="Founders of Sri Susheela Trust People Welfare Group"
                className="position-relative"
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  height: 'auto',
                  maxHeight: 'calc(100vh - 180px)',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 15px 40px rgba(18, 13, 8, 0.25))',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 98%)',
                  zIndex: 2,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 7 Pillars Showcase in Frosted Glass Container */}
      <div
        className="w-100 py-3 position-relative z-2 m-0 shadow-sm"
        style={{
          borderTop: '2px solid rgba(212, 175, 55, 0.45)',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          boxShadow: '0 -8px 30px rgba(122, 28, 28, 0.06)',
        }}
      >
        <div className="container-fluid px-2 px-lg-4">
          <div className="row g-0 align-items-center justify-content-center text-center">
            {trustPillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={index}
                  className="col-6 col-sm-4 col-md-3 col-lg px-2 py-2 position-relative"
                  style={{
                    borderRight: index !== trustPillars.length - 1 ? '1px solid rgba(212, 175, 55, 0.35)' : 'none',
                  }}
                >
                  {/* Circular Golden Ring Icon */}
                  <div
                    className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center transition-all hover-scale"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: 'linear-gradient(135deg, #FFFDF5 0%, #FEF08A 100%)',
                      border: '2px solid #D4AF37',
                      boxShadow: '0 6px 16px rgba(122, 28, 28, 0.15), 0 0 12px rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    <IconComp size={24} style={{ color: '#7A1C1C' }} />
                  </div>

                  {/* Title */}
                  <h6
                    className={`fw-bold mb-1 tracking-wider text-uppercase ${isTamil ? 'font-tamil fs-6' : 'fs-7'}`}
                    style={{ color: '#7A1C1C', letterSpacing: '0.8px' }}
                  >
                    {isTamil ? pillar.titleTa : pillar.title}
                  </h6>

                  {/* Subtitle */}
                  <span
                    className={`small d-block text-dark opacity-85 ${isTamil ? 'font-tamil' : ''}`}
                    style={{ fontSize: '0.72rem', lineHeight: '1.2' }}
                  >
                    {isTamil ? pillar.subtitleTa : pillar.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};