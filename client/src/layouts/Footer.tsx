import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Phone, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRUST_INFO } from '../constants';
import { ChakraMotif } from '../components/common/ChakraMotif';

interface FooterProps {
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonate }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-gold-dark text-white pt-5 pb-4 border-top border-warning border-opacity-30 position-relative overflow-hidden">
      {/* Background Sacred Spinning Chakra */}
      <div className="position-absolute bottom-0 end-0 translate-middle-y pointer-events-none opacity-15" style={{ zIndex: 0 }}>
        <ChakraMotif size={500} />
      </div>

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-25">
          {/* Trust Overview Column */}
          <div className="col-12 col-lg-4 text-center text-lg-start">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-3">
              <img
                src="/assets/images/logo.jpg"
                alt="Sri Susheela Trust Logo"
                className="rounded-circle shadow bg-white p-0.5"
                style={{ width: '52px', height: '52px', border: '2px solid #FFD700' }}
              />
              <div>
                <h4 className="fw-bold mb-0 text-gradient-gold font-heading">{TRUST_INFO.name}</h4>
                <span className="small text-light opacity-80 text-uppercase tracking-wider d-block" style={{ fontSize: '0.68rem' }}>
                  PEOPLE WELFARE GROUP
                </span>
              </div>
            </div>

            <p className="text-light opacity-80 small mb-4">{t('footer.description')}</p>

            <div className="card glass-card-dark p-3 rounded-3 mb-3 text-start border-warning">
              <div className="d-flex align-items-center gap-2 text-warning mb-1">
                <ShieldCheck size={18} />
                <strong className="small">80G & 12A Certified NGO</strong>
              </div>
              <span className="small text-light opacity-75">{t('footer.regNotice')}</span>
            </div>

            <button onClick={onOpenDonate} className="btn btn-sst-gold py-2 px-4 rounded-pill">
              <Heart size={16} fill="#120D08" />
              {t('nav.donate')}
            </button>
          </div>

          {/* Quick Navigation Links Column */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-warning font-heading mb-3 text-uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0 opacity-85">
              <li>
                <Link to="/" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.programs')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.impact')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.volunteer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Media & Resources Column */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-warning font-heading mb-3 text-uppercase tracking-wider">
              {t('footer.programs')}
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0 opacity-85">
              <li>
                <Link to="/programs" className="text-light text-decoration-none hover-text-warning">
                  Daily Annadhanam
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-light text-decoration-none hover-text-warning">
                  Vidya Jyothi Education
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-light text-decoration-none hover-text-warning">
                  Anbu Illam Senior Care
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-light text-decoration-none hover-text-warning">
                  Mobile Health Clinics
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-light text-decoration-none hover-text-warning">
                  {t('nav.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="col-12 col-lg-4">
            <h6 className="fw-bold text-warning font-heading mb-3 text-uppercase tracking-wider">
              {t('contactSection.badge')}
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-3 mb-4 opacity-85">
              <li className="d-flex align-items-start gap-2.5">
                <MapPin size={18} className="text-warning flex-shrink-0 mt-1" />
                <span>
                  {TRUST_INFO.address.street}, {TRUST_INFO.address.area}, {TRUST_INFO.address.city} - {TRUST_INFO.address.pincode}, {TRUST_INFO.address.state}
                </span>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <Phone size={18} className="text-warning flex-shrink-0" />
                <a href={`tel:${TRUST_INFO.phonePrimary}`} className="text-light text-decoration-none">
                  {TRUST_INFO.phonePrimary} / {TRUST_INFO.phoneSecondary}
                </a>
              </li>
              <li className="d-flex align-items-center gap-2.5">
                <Mail size={18} className="text-warning flex-shrink-0" />
                <a href={`mailto:${TRUST_INFO.email}`} className="text-light text-decoration-none">
                  {TRUST_INFO.email}
                </a>
              </li>
            </ul>

            {/* Newsletter form */}
            <div>
              <span className="small text-light opacity-75 d-block mb-2">Subscribe to quarterly newsletter:</span>
              <div className="input-group">
                <input type="email" className="form-control form-control-sm rounded-start-pill bg-dark text-white border-warning" placeholder="Your email address" />
                <button className="btn btn-warning btn-sm rounded-end-pill px-3 fw-bold" type="button">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 d-flex flex-column flex-md-row align-items-center justify-content-between small text-light opacity-75 text-center text-md-start">
          <p className="mb-2 mb-md-0">
            © {new Date().getFullYear()} {TRUST_INFO.name} People Welfare Group. {t('footer.rights')}
          </p>
          <div className="d-flex align-items-center gap-3">
            <Link to="/contact" className="text-light text-decoration-none hover-text-warning">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/contact" className="text-light text-decoration-none hover-text-warning">
              Terms & Conditions
            </Link>
            <span>•</span>
            <span className="text-warning">{t('footer.developedFor')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
