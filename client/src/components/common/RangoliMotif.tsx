import React from 'react';

interface RangoliMotifProps {
  size?: number;
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const RangoliMotif: React.FC<RangoliMotifProps> = ({
  size = 120,
  className = '',
  position = 'top-left',
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'rotate(90deg)';
      case 'bottom-right':
        return 'rotate(180deg)';
      case 'bottom-left':
        return 'rotate(270deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="goldRangoliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>
      </defs>

      {/* Decorative Outer Kolam Arcs */}
      <path d="M0 20 Q30 20 30 0" stroke="url(#goldRangoliGrad)" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M0 40 Q50 40 50 0" stroke="url(#goldRangoliGrad)" strokeWidth="1.5" fill="none" opacity="0.75" />
      <path d="M0 60 Q70 60 70 0" stroke="url(#goldRangoliGrad)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.65" />
      <path d="M0 80 Q90 90 90 0" stroke="url(#goldRangoliGrad)" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Rangoli Lotus Petals */}
      <path d="M15 15 C25 5 35 5 25 25 C5 35 5 25 15 15 Z" fill="url(#goldRangoliGrad)" opacity="0.3" stroke="url(#goldRangoliGrad)" strokeWidth="1" />
      <path d="M30 30 C45 15 60 15 45 45 C15 60 15 45 30 30 Z" fill="url(#goldRangoliGrad)" opacity="0.2" stroke="url(#goldRangoliGrad)" strokeWidth="1" />

      {/* Dots (Pulli Kolam Points) */}
      <circle cx="15" cy="15" r="3" fill="url(#goldRangoliGrad)" />
      <circle cx="30" cy="15" r="2.5" fill="url(#goldRangoliGrad)" />
      <circle cx="15" cy="30" r="2.5" fill="url(#goldRangoliGrad)" />
      <circle cx="30" cy="30" r="4" fill="url(#goldRangoliGrad)" />
      <circle cx="45" cy="15" r="2" fill="url(#goldRangoliGrad)" />
      <circle cx="15" cy="45" r="2" fill="url(#goldRangoliGrad)" />
      <circle cx="45" cy="45" r="3" fill="url(#goldRangoliGrad)" />
    </svg>
  );
};
