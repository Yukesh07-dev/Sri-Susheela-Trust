import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return <div className={`card ${hoverEffect ? 'card-luxury' : 'border-0 rounded-4 shadow-sm bg-white'} ${className}`}>{children}</div>;
};
