import React from 'react';
import { Button } from '../../components/Button.js';
import { ArrowRight, HeartHandshake, Sparkles, BookOpen } from 'lucide-react';

interface CommunityProps {
  onOpenCommunity: () => void;
}

export const Community: React.FC<CommunityProps> = ({ onOpenCommunity }) => {
  const groups = [
    {
      title: 'Users & Families',
      description:
        'Share your daily routines and directly shape how voice navigation feels and responds in real life.',
      icon: <HeartHandshake className="w-5 h-5 text-[#2d6a4f]" />,
    },
    {
      title: 'Researchers & Clinicians',
      description:
        'Collaborate on assistive interaction studies, motor latency reduction, and cognitive accessibility frameworks.',
      icon: <BookOpen className="w-5 h-5 text-[#2d6a4f]" />,
    },
    {
      title: 'Engineers & Designers',
      description:
        'Help build open accessibility connectors, voice heuristics, and system automation drivers.',
      icon: <Sparkles className="w-5 h-5 text-[#2d6a4f]" />,
    },
  ];

  return (
    <section id="community" className="py-16 sm:py-24 min-h-[calc(100vh-200px)] flex flex-col justify-center bg-[#fbfcf9] relative overflow-hidden">
      {/* Soft sage background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accio-sage/40 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16">
          <p className="text-sm font-semibold tracking-wider text-[#2d6a4f] uppercase">
            Community & Research
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accio-navy tracking-tight">
            Building with the community, not just for it.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Accio is shaped through close partnership with individuals with low motor
            control, occupational therapists, accessibility researchers, and advocates.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#f7f9f3]/80 border border-[#dfe6d7] hover:border-[#b9ce9e] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#eef3e5] flex items-center justify-center mb-5">
                {group.icon}
              </div>
              <h3 className="text-lg font-semibold text-accio-navy mb-2">
                {group.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {group.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenCommunity}
            icon={<ArrowRight className="w-4 h-4" />}
            className="!bg-[#163829] hover:!bg-[#0f281d] !border !border-[#23533c] !px-8 !py-3.5 !text-base shadow-sm"
          >
            Join the Community
          </Button>
        </div>
      </div>
    </section>
  );
};
