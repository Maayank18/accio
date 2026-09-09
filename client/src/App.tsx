import React, { useState, useEffect } from 'react';
import { SkipLink } from './components/SkipLink.js';
import { Header } from './layouts/Header.js';
import { Hero } from './sections/Hero/Hero.js';
import { Overview } from './sections/Overview/Overview.js';
import { Community } from './sections/Community/Community.js';
import { Demo } from './sections/Demo/Demo.js';
import { ReachOut } from './sections/ReachOut/ReachOut.js';
import { Footer } from './layouts/Footer.js';
import { EarlyAccessModal } from './components/EarlyAccessModal.js';
import { CommunityModal } from './components/CommunityModal.js';
import { Toast } from './components/Toast.js';
import { NavSection } from './types/index.js';

const VALID_SECTIONS: NavSection[] = ['home', 'overview', 'community', 'demo', 'reach-out'];

const getSectionFromHash = (): NavSection => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (VALID_SECTIONS.includes(hash as NavSection)) {
    return hash as NavSection;
  }
  return 'home';
};

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(getSectionFromHash());
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const section = getSectionFromHash();
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectSection = (section: NavSection) => {
    setActiveSection(section);
    window.location.hash = `#${section}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbfcf9] text-slate-800 flex flex-col selection:bg-accio-sage selection:text-accio-navy">
      {/* WCAG Skip to Main Content */}
      <SkipLink />

      {/* Header */}
      <Header
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
      />

      {/* Main Content: Rendered by Tab */}
      <main id="main-content" className="flex-grow animate-in fade-in duration-300">
        {activeSection === 'home' && (
          <Hero
            onOpenCommunity={() => setIsCommunityOpen(true)}
            onNavigate={handleSelectSection}
          />
        )}
        {activeSection === 'overview' && (
          <Overview onNavigate={handleSelectSection} />
        )}
        {activeSection === 'community' && (
          <Community onOpenCommunity={() => setIsCommunityOpen(true)} />
        )}
        {activeSection === 'demo' && <Demo />}
        {activeSection === 'reach-out' && (
          <ReachOut onSuccessToast={(msg) => setToastMessage(msg)} />
        )}
      </main>

      {/* Footer immediately following active tab */}
      <Footer onSelectSection={handleSelectSection} />

      {/* Modals & Dialogs */}
      <EarlyAccessModal
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        onSuccessToast={(msg) => setToastMessage(msg)}
      />

      <CommunityModal
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
        onSuccessToast={(msg) => setToastMessage(msg)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};
