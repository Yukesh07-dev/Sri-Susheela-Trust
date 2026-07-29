import React from 'react';
import { ContactSection } from '../sections/Contact';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-4">
      {/* Banner */}
      <div className="bg-gradient-sst-red text-white py-5 px-3 mb-5 text-center position-relative">
        <div className="container-fluid max-w-7xl">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">Communication Portal</span>
          <h1 className="display-4 font-heading fw-bold text-white mb-3">Contact Sri Susheela Trust</h1>
          <p className="lead text-light opacity-90 max-w-2xl mx-auto fs-6">
            We welcome your visits, inquiries, partnerships, and food distribution requests.
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};
