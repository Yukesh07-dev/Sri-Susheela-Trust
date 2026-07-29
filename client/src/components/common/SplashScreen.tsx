import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish?: () => void;
  minDisplayTime?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, minDisplayTime = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent background scrolling & layout shifts during splash screen display
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onFinish) {
        onFinish();
      }
    }, minDisplayTime);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [minDisplayTime, onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white"
          style={{
            zIndex: 999999, // Highest priority z-index
            backgroundColor: '#120D08', // 100% Solid Opaque Dark Background (Zero Bleed Through)
          }}
        >
          {/* Subtle Golden Radial Halo */}
          <div
            className="position-absolute rounded-circle pointer-events-none"
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(245, 158, 11, 0.1) 50%, rgba(0,0,0,0) 75%)',
              filter: 'blur(50px)',
            }}
          />

          <div className="position-relative text-center px-4 z-2">
            {/* Animated Official Logo Container */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: [0.75, 1.05, 1], opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="mb-4 d-inline-block position-relative"
            >
              <img
                src="/assets/images/logo.jpg"
                alt="Sri Susheela Trust Official Emblem"
                className="rounded-circle shadow-lg p-1 bg-white"
                style={{
                  width: '120px',
                  height: '120px',
                  border: '3.5px solid #FFD700',
                  boxShadow: '0 0 35px rgba(212, 175, 55, 0.45)',
                }}
              />
            </motion.div>

            {/* Title & Subtitle */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="fw-extrabold display-6 mb-1 text-gradient-gold font-heading"
              style={{ letterSpacing: '1.5px' }}
            >
              SRI SUSHEELA TRUST
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-light opacity-85 small text-uppercase mb-4.5"
              style={{ letterSpacing: '2.5px' }}
            >
              People Welfare Group • Nurturing Hope
            </motion.p>

            {/* Smooth Fast Loading Bar */}
            <div className="mx-auto" style={{ width: '200px', height: '4px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #FFD700, #F59E0B, #B91C1C)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
