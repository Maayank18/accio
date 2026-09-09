import React from 'react';
import { BrandLogo } from '../components/BrandLogo.js';
import { NavSection } from '../types/index.js';

interface FooterProps {
  onSelectSection?: (section: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSection }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, section: NavSection) => {
    if (onSelectSection) {
      e.preventDefault();
      onSelectSection(section);
    }
  };

  return (
    <footer className="border-t border-[#dfe6d7] bg-[#fbfcf9] py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <BrandLogo size="sm" onNavigate={onSelectSection} />
          <span className="hidden sm:inline text-slate-300">|</span>
          <p className="text-xs text-slate-500 font-normal">
            “Just as Braille opened the world of books, accio opens the digital world.”
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500">
          <a
            href="#home"
            onClick={(e) => handleNav(e, 'home')}
            className="hover:text-[#2d6a4f] transition-colors"
          >
            Home
          </a>
          <a
            href="#overview"
            onClick={(e) => handleNav(e, 'overview')}
            className="hover:text-[#2d6a4f] transition-colors"
          >
            Overview
          </a>
          <a
            href="#community"
            onClick={(e) => handleNav(e, 'community')}
            className="hover:text-[#2d6a4f] transition-colors"
          >
            Community
          </a>
          <a
            href="#demo"
            onClick={(e) => handleNav(e, 'demo')}
            className="hover:text-[#2d6a4f] transition-colors"
          >
            Demo
          </a>
          <a
            href="#reach-out"
            onClick={(e) => handleNav(e, 'reach-out')}
            className="hover:text-[#2d6a4f] transition-colors"
          >
            Reach Out
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8 pt-6 border-t border-[#eef3e5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Accio. Empowering independent digital access.</p>
        <p>Engineered for WCAG 2.2 AAA accessibility compliance.</p>
      </div>
    </footer>
  );
};
