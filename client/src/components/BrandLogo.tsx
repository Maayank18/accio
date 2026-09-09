import React from 'react';
import navbarLogo from '../assets/navbar.png';
import { NavSection } from '../types/index.js';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
  onNavigate?: (section: NavSection) => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  onNavigate,
}) => {
  const dimensions = {
    sm: {
      img: 'w-9 h-9 sm:w-10 sm:h-10',
      text: 'text-2xl sm:text-[26px] font-bold tracking-tight',
      gap: 'gap-2.5',
    },
    md: {
      img: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]',
      text: 'text-3xl sm:text-[35px] lg:text-[39px] font-bold tracking-tight',
      gap: 'gap-3 sm:gap-3.5',
    },
    lg: {
      img: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-[76px] lg:h-[76px]',
      text: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
      gap: 'gap-4 sm:gap-5',
    },
  };

  const { img, text, gap } = dimensions[size];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home');
    }
  };

  return (
    <a
      href="#home"
      onClick={handleClick}
      className={`inline-flex items-center ${gap} group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] rounded-2xl p-1 -m-1 transition-all duration-200 ${className}`}
      aria-label="accio home"
    >
      {/* High-resolution circular glowing microphone emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={navbarLogo}
          alt="accio emblem"
          className={`${img} object-contain select-none drop-shadow-[0_2px_14px_rgba(216,227,195,0.65)] transition-transform duration-300 group-hover:scale-105`}
        />
      </div>

      {/* Brand-authentic geometric rounded accio wordmark with comforting forest-to-sage gradient */}
      {showWordmark && (
        <span
          className={`font-brand select-none leading-none bg-gradient-to-r from-[#11261d] via-[#152e22] via-[58%] to-[#4b6d5b] bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110 ${text}`}
        >
          accio
        </span>
      )}
    </a>
  );
};
