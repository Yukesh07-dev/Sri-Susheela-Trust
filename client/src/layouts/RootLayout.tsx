import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SplashScreen } from '../components/common/SplashScreen';
import { LanguageModal } from '../components/common/LanguageModal';
import { ScrollToTop } from '../components/common/ScrollToTop';

export const RootLayout: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showLangModal, setShowLangModal] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Show language card modal on reload / initial visit
    setShowLangModal(true);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-sst-cream text-navy position-relative">
      {/* Splash Screen on initial load */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Main Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Common Floating Actions */}
      <ScrollToTop />

      {/* Post-Splash Language Selection Modal Card */}
      <LanguageModal isOpen={showLangModal} onClose={() => setShowLangModal(false)} />
    </div>
  );
};
