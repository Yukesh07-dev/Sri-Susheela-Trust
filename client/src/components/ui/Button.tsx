import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline-red' | 'outline-gold' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'gold':
        return 'btn-sst-gold';
      case 'outline-red':
        return 'btn-sst-outline-red';
      case 'outline-gold':
        return 'btn-sst-outline-gold';
      case 'dark':
        return 'btn-dark rounded-pill shadow-sm';
      default:
        return 'btn-sst-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3 fs-7';
      case 'lg':
        return 'py-3 px-4 fs-6';
      default:
        return '';
    }
  };

  return (
    <button
      className={`btn ${getVariantClass()} ${getSizeClass()} ${fullWidth ? 'w-100' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
