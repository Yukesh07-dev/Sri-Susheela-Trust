import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Phone, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRUST_INFO } from '../constants';
import { ChakraMotif } from '../components/common/ChakraMotif';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  return (
    <footer
      className="text-white pt-5 pb-4 position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #262626 0%, #171717 100%)',
        borderTop: '3.5px solid #D4AF37',
      }}
    >
      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative">
        <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-20">
          {/* Trust Overview Column */}
          <div className="col-12 col-lg-4 text-center text-lg-start">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-3">
              <img
                src="/assets/images/logo.jpg"
                alt="Sri Susheela Trust Logo"
                className="rounded-circle shadow p-0.5 bg-white"
                style={{ width: '52px', height: '52px', border: '2px solid #FFD700' }}
              />
              <div>
                <h4 className={`fw-bold mb-0 ${isTamil ? 'font-tamil fs-5' : 'font-heading'}`} style={{ color: '#FCD34D' }}>
                  {isTamil ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : TRUST_INFO.name}
                </h4>
                <span className={`small opacity-90 text-uppercase d-block mt-0.5 ${isTamil ? 'font-tamil' : 'tracking-wider'}`} style={{ fontSize: '0.72rem', color: '#D1D5DB' }}>
                  {isTamil ? 'மக்கள் நலக் குழு' : 'PEOPLE WELFARE GROUP'}
                </span>
              </div>
            </div>

            <p className={`small mb-4 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB', lineHeight: '1.6' }}>
              {t('footer.description')}
            </p>

            <div
              className="p-3 rounded-3 mb-3 text-start"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(252, 211, 77, 0.3)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                <ShieldCheck size={18} style={{ color: '#FCD34D' }} />
                <strong className="small" style={{ color: '#FCD34D' }}>80G & 12A Certified NGO</strong>
              </div>
              <span className={`small d-block ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB', fontSize: '0.8rem' }}>
                {t('footer.regNotice')}
              </span>
            </div>
          </div>

          {/* Quick Navigation Links Column */}
          <div className="col-6 col-lg-2">
            <h6
              className={`fw-bold mb-3 text-uppercase tracking-wider ${isTamil ? 'font-tamil' : 'font-heading'}`}
              style={{
                color: '#FCD34D',
                borderBottom: '2px solid rgba(252, 211, 77, 0.35)',
                paddingBottom: '0.35rem',
                display: 'inline-block',
              }}
            >
              {t('footer.quickLinks')}
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.programs')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.impact')}
                </Link>
              </li>
              <li>
                <Link to="/events" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.volunteer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="col-6 col-lg-2">
            <h6
              className={`fw-bold mb-3 text-uppercase tracking-wider ${isTamil ? 'font-tamil' : 'font-heading'}`}
              style={{
                color: '#FCD34D',
                borderBottom: '2px solid rgba(252, 211, 77, 0.35)',
                paddingBottom: '0.35rem',
                display: 'inline-block',
              }}
            >
              {t('footer.programs')}
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/programs" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {isTamil ? 'தினசரி அன்னதானம்' : 'Daily Annadhanam'}
                </Link>
              </li>
              <li>
                <Link to="/programs" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {isTamil ? 'வித்யா ஜோதி கல்வி' : 'Vidya Jyothi Education'}
                </Link>
              </li>
              <li>
                <Link to="/programs" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {isTamil ? 'அன்பு இல்லம் முதியோர் நலன்' : 'Anbu Illam Senior Care'}
                </Link>
              </li>
              <li>
                <Link to="/programs" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {isTamil ? 'இலவச மருத்துவ முகாம்கள்' : 'Mobile Health Clinics'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/news" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                  {t('nav.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="col-12 col-lg-4">
            <h6
              className={`fw-bold mb-3 text-uppercase tracking-wider ${isTamil ? 'font-tamil' : 'font-heading'}`}
              style={{
                color: '#FCD34D',
                borderBottom: '2px solid rgba(252, 211, 77, 0.35)',
                paddingBottom: '0.35rem',
                display: 'inline-block',
              }}
            >
              {t('contactSection.badge')}
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-3 mb-4">
              <li className="d-flex align-items-start gap-2.5">
                <MapPin size={18} style={{ color: '#FCD34D' }} className="flex-shrink-0 mt-1" />
                <span style={{ color: '#E5E7EB' }} className={isTamil ? 'font-tamil' : ''}>
                  {isTamil
                    ? `${TRUST_INFO.address.streetTa}, ${TRUST_INFO.address.areaTa}, ${TRUST_INFO.address.cityTa} - ${TRUST_INFO.address.pincode}, ${TRUST_INFO.address.stateTa}`
                    : `${TRUST_INFO.address.street}, ${TRUST_INFO.address.area}, ${TRUST_INFO.address.city} - ${TRUST_INFO.address.pincode}, ${TRUST_INFO.address.state}`}
                </span>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <Phone size={18} style={{ color: '#FCD34D' }} className="flex-shrink-0" />
                <a href={`tel:${TRUST_INFO.phonePrimary}`} className="text-decoration-none hover-text-warning" style={{ color: '#E5E7EB' }}>
                  {TRUST_INFO.phonePrimary} / {TRUST_INFO.phoneSecondary}
                </a>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <Mail size={18} style={{ color: '#FCD34D' }} className="flex-shrink-0" />
                <a href={`mailto:${TRUST_INFO.email}`} className="text-decoration-none hover-text-warning text-break" style={{ color: '#E5E7EB' }}>
                  {TRUST_INFO.email}
                </a>
              </li>
            </ul>

            {/* Newsletter form */}
            <div>
              <span className={`small d-block mb-2 fw-semibold ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#E5E7EB' }}>
                {isTamil ? 'செய்திமடலைச் சந்தா பெற:' : 'Subscribe to quarterly newsletter:'}
              </span>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control form-control-sm rounded-start-pill text-white input-dark-placeholder"
                  placeholder={isTamil ? 'உங்கள் மின்னஞ்சல் முகவரி' : 'Enter your email address...'}
                  style={{
                    background: '#333333',
                    border: '1.5px solid #555555',
                    color: '#FFFFFF',
                    paddingLeft: '1rem',
                  }}
                />
                <button className="btn btn-warning btn-sm text-dark rounded-end-pill px-3 fw-bold" type="button">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 d-flex flex-column flex-md-row align-items-center justify-content-between small text-center text-md-start" style={{ color: '#9CA3AF' }}>
          <p className={`mb-2 mb-md-0 ${isTamil ? 'font-tamil' : ''}`}>
            © {new Date().getFullYear()} {isTamil ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : TRUST_INFO.name} {isTamil ? 'மக்கள் நலக் குழு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : `People Welfare Group. ${t('footer.rights')}`}
          </p>
          <div className="d-flex align-items-center gap-3">
            <Link to="/contact" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#9CA3AF' }}>
              {isTamil ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link to="/contact" className={`text-decoration-none hover-text-warning ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#9CA3AF' }}>
              {isTamil ? 'விதிமுறைகள் & நிபந்தனைகள்' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
