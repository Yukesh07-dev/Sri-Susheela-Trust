import React from 'react';

interface ChakraMotifProps {
  size?: number;
  className?: string;
  color?: string;
}

export const ChakraMotif: React.FC<ChakraMotifProps> = ({
  size = 200,
  className = '',
  color = '#D4AF37',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`chakra-spin-slow ${className}`}
    >
      <defs>
        <linearGradient id="goldChakraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>
      </defs>

      {/* Outer Concentric Rings */}
      <circle cx="100" cy="100" r="95" stroke="url(#goldChakraGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      <circle cx="100" cy="100" r="88" stroke="url(#goldChakraGrad)" strokeWidth="2" opacity="0.8" />
      <circle cx="100" cy="100" r="78" stroke="url(#goldChakraGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

      {/* 24 Radiating Sacred Spokes / Petals */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <line x1="100" y1="22" x2="100" y2="40" stroke="url(#goldChakraGrad)" strokeWidth="1.5" />
            <circle cx="100" cy="18" r="2.5" fill="url(#goldChakraGrad)" />
            <path d="M100 38 C96 55 96 68 100 80 C104 68 104 55 100 38 Z" fill="url(#goldChakraGrad)" opacity="0.25" stroke="url(#goldChakraGrad)" strokeWidth="0.8" />
          </g>
        );
      })}

      {/* Inner Petal Mandala Ring */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <circle cx="100" cy="45" r="4" fill="url(#goldChakraGrad)" opacity="0.8" />
            <path d="M100 50 C93 65 93 75 100 85 C107 75 107 65 100 50 Z" fill="url(#goldChakraGrad)" opacity="0.4" />
          </g>
        );
      })}

      {/* Inner Ring & Center Emblem */}
      <circle cx="100" cy="100" r="42" stroke="url(#goldChakraGrad)" strokeWidth="2" opacity="0.9" />
      <circle cx="100" cy="100" r="30" fill="url(#goldChakraGrad)" opacity="0.15" stroke="url(#goldChakraGrad)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="16" stroke="url(#goldChakraGrad)" strokeWidth="2" />
      <circle cx="100" cy="100" r="8" fill="url(#goldChakraGrad)" />
    </svg>
  );
};
