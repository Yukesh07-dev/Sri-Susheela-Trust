import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactSection } from '../sections/Contact';

export const ContactPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

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
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {isTamil ? 'தொடர்பு மையம்' : 'Communication Portal'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'ஸ்ரீ சுசீலா அறக்கட்டளையைத் தொடர்பு கொள்க' : 'Contact Sri Susheela Trust'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'உங்கள் நேரில் வருகைகள், விசாரணைகள், கூட்டாண்மை மற்றும் சேவை விருப்பங்களை நாங்கள் வரவேற்கிறோம்.'
              : 'We welcome your visits, inquiries, partnerships, and food distribution requests.'}
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};
