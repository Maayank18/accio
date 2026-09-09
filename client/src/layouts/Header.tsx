import React, { useState } from 'react';
import { BrandLogo } from '../components/BrandLogo.js';
import { Button } from '../components/Button.js';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NavItem, NavSection } from '../types/index.js';

interface HeaderProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onOpenEarlyAccess: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Overview', href: '#overview', id: 'overview' },
  { label: 'Community', href: '#community', id: 'community' },
  { label: 'Demo', href: '#demo', id: 'demo' },
  { label: 'Reach Out', href: '#reach-out', id: 'reach-out' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenEarlyAccess,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbfcf9]/95 backdrop-blur-md border-b border-[#eef3e5] transition-all">
      {/* Reduced container width to eliminate empty desert space and bring layout into intimate harmony */}
      <div className="max-w-[1160px] mx-auto px-6 sm:px-8 py-4 sm:py-4.5 flex items-center justify-between">
        {/* Left: Prominent, Big Brand Logo */}
        <BrandLogo size="md" onNavigate={onSelectSection} />

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectSection(item.id);
                }}
                className={`relative text-[15px] font-medium transition-all duration-200 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] rounded ${
                  isActive
                    ? 'text-accio-navy font-semibold'
                    : 'text-slate-600 hover:text-accio-navy'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-[#2d6a4f] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Desktop CTA */}
        <div className="hidden md:block">
          <Button
            variant="primary"
            size="md"
            onClick={onOpenEarlyAccess}
            icon={<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
            className="!bg-[#163829] hover:!bg-[#0f281d] !border !border-[#23533c] !px-6 !py-2.5 !text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            Get Early Access
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-[#eef3e5] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e2ebd2] bg-[#fbfcf9]/95 backdrop-blur-md px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onSelectSection(item.id);
                }}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#eef3e5] text-[#163829] font-semibold'
                    : 'text-slate-700 hover:bg-[#eef3e5]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEarlyAccess();
              }}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center !bg-[#163829] hover:!bg-[#0f281d]"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
