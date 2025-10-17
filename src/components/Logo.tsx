import React from 'react';
import logoImage from 'figma:asset/3eb9814a90428838756b1d98ffdd42a77b614f6d.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <img 
      src={logoImage} 
      alt="TravesíaMexa" 
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  );
}