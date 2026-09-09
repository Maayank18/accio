import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '../../components/Button.js';
import { HeroVisual } from './HeroVisual.js';
import { BotanicalLeaf } from './BotanicalLeaf.js';
import { BottomWave } from './BottomWave.js';
import { NavSection } from '../../types/index.js';

interface HeroProps {
  onOpenCommunity: () => void;
  onNavigate?: (section: NavSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCommunity, onNavigate }) => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-6 sm:pt-10 lg:pt-12 pb-0 overflow-hidden bg-[#fbfcf9]"
    >
      {/* Subtle atmospheric ambient lighting */}
      <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] rounded-full bg-[#d8e3c3]/30 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#eef3e5]/60 blur-[100px] pointer-events-none -z-10" />

      {/* Far Right: Editorial Botanical foliage */}
      <BotanicalLeaf />

      {/* Far Right: Vertical/Editorial atmospheric text */}
      <div
        className="hidden xl:block absolute right-12 bottom-36 text-right z-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        <p className="text-[13px] leading-relaxed text-slate-400 font-normal tracking-wide">
          Accessibility
          <br />
          today.
          <br />
          Opportunity
          <br />
          tomorrow.
        </p>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 flex-grow flex items-center py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* LEFT COLUMN: Editorial & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium tracking-wide">
              <span>A more accessible tomorrow</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]/50" aria-hidden="true" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-[#0F2744] tracking-tight leading-[1.08]">
              Your voice.
              <br />
              A more <span className="text-[#2d6a4f] font-bold">independent</span> you.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              accio is an always-present, voice-powered assistant designed for people
              with low motor control or visual impairments. It listens, understands,
              and gets things done — so you can navigate the digital world with confidence.
            </p>

            {/* Call to Actions Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate ? onNavigate('demo') : undefined}
                icon={<ArrowRight className="w-4 h-4" />}
                className="!bg-[#163829] hover:!bg-[#0f281d] !border !border-[#23533c] !px-7 !py-3 !text-[15px] font-medium tracking-wide shadow-sm hover:shadow-md transition-all"
              >
                Try the Demo
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenCommunity}
                className="!px-7 !py-3 !text-[15px] font-medium text-[#163829] border-[#c5d5ad] hover:border-[#2d6a4f] bg-[#f4f7ee]/90 hover:bg-[#e8efe0] shadow-sm transition-colors"
              >
                Join the Community
              </Button>
            </div>

            {/* Inclusion Badge */}
            <div className="pt-2 flex items-center gap-3 text-slate-500 text-sm">
              <div className="flex items-center text-[#2d6a4f]">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-slate-400" aria-hidden="true">—</span>
              <span className="font-normal text-slate-600">
                Towards a more inclusive digital world
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Emblem, Waves, Wordmark, Script & Quote */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Layered Organic Pale-Blue Bottom Wave */}
      <BottomWave />
    </section>
  );
};
