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

interface HeroProps {
  onOpenDonate?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDonate }) => {
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
      className="position-relative overflow-hidden d-flex flex-column justify-content-between m-0"
      style={{
        background: 'linear-gradient(135deg, #FFFDF0 0%, #FEF9C3 45%, #FEF08A 100%)',
        minHeight: 'calc(100vh - 60px)',
        paddingTop: '40px',
        paddingBottom: '0px',
        margin: 0,
      }}
    >
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
          width: '850px',
          height: '850px',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.35) 0%, rgba(253, 224, 71, 0.18) 50%, rgba(255, 255, 255, 0) 75%)',
          filter: 'blur(90px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative my-auto py-3" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Column */}
          <div className="col-12 col-lg-5 text-center text-lg-start ps-lg-5 ps-xl-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
            >
              {/* Top Branding Emblem Header */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
                <img
                  src="/assets/images/logo.jpg"
                  alt="Sri Susheela Trust Logo"
                  className="rounded-circle shadow-md p-1 bg-white border border-warning"
                  style={{ width: '68px', height: '68px' }}
                />
                <div className="text-start">
                  <h4
                    className="fw-bold mb-0 font-heading tracking-wide"
                    style={{ color: '#7A1C1C', letterSpacing: '1px' }}
                  >
                    SRI SUSHEELA TRUST
                  </h4>
                  <div
                    className="small fw-semibold text-uppercase tracking-wider opacity-90"
                    style={{ color: '#8C6826', fontSize: '0.72rem', letterSpacing: '1.2px' }}
                  >
                    — PEOPLE WELFARE GROUP —
                  </div>
                  <div
                    className="fw-bold text-uppercase"
                    style={{ color: '#523E18', fontSize: '0.68rem', letterSpacing: '1px' }}
                  >
                    SERVING HUMANITY WITH COMPASSION
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <h1
                className="font-heading fw-extrabold mb-3 leading-tight text-uppercase"
                style={{ fontSize: isTamil ? '2.4rem' : '3.1rem', letterSpacing: '1.5px', lineHeight: '1.1' }}
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
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 my-3.5 opacity-80">
                <div style={{ height: '1.5px', width: '70px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
                <Heart size={14} fill="#8C6826" color="#8C6826" />
                <div style={{ height: '1.5px', width: '70px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
              </div>

              {/* Description Paragraph */}
              <p className="lead text-dark opacity-90 mb-4 pe-lg-3 fs-6 leading-relaxed fw-normal">
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
                  className="btn rounded-pill px-4.5 py-3 text-white fw-bold shadow-lg d-inline-flex align-items-center gap-2 hover-scale transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1.5px solid #D4AF37',
                    letterSpacing: '1px',
                    fontSize: '0.92rem',
                  }}
                >
                  <span>{isTamil ? 'கண்டறியுங்கள்' : 'DISCOVER MORE'}</span>
                  <ArrowRight size={18} />
                </a>

                <button
                  onClick={onOpenDonate}
                  className="btn btn-sst-gold py-3 px-4 rounded-pill fs-6 fw-bold shadow-md"
                >
                  <Heart size={18} fill="#120D08" />
                  {t('hero.ctaDonate')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Unconstrained 100% Full Scale Founders Image */}
          <div className="col-12 col-lg-7 text-center text-lg-end position-relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="position-relative d-inline-block w-100"
            >
              <div className="position-relative text-center text-lg-end">
                <img
                  src="/assets/images/founders.png"
                  alt="Founders of Sri Susheela Trust People Welfare Group"
                  className="position-relative"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '680px',
                    maxWidth: 'none',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 25px 45px rgba(184, 134, 11, 0.45)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.65))',
                    zIndex: 2,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 7 Pillars Showcase Integrated DIRECTLY INSIDE Hero Section at Bottom (No White Gap Below) */}
      <div
        className="w-100 py-3 position-relative z-2 m-0"
        style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.4)',
          background: 'rgba(254, 240, 138, 0.25)',
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
                    className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center shadow-sm transition-all hover-scale"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: 'rgba(255, 253, 245, 0.85)',
                      border: '2px solid #D4AF37',
                      boxShadow: '0 4px 12px rgba(122, 28, 28, 0.12)',
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