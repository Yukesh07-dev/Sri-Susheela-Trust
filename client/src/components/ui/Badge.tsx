import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'red' | 'navy' | 'light';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'red':
        return 'badge-red';
      case 'navy':
        return 'bg-dark text-warning border border-warning';
      case 'light':
        return 'bg-light text-dark border';
      default:
        return 'badge-gold';
    }
  };

  return <span className={`badge ${getVariantClass()} ${className}`}>{children}</span>;
};
