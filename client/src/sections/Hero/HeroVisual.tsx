import React from 'react';
import accioLogo from '../../assets/accio_logo.png';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-[580px] mx-auto">
      {/* Radiant ambient sage backdrop glow */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-accio-sage/50 blur-[70px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Primary Brand Asset & Live Animated Neural Overlay */}
      <div className="relative w-full max-w-[560px] aspect-[1024/540] flex items-center justify-center">
        {/* Base Logo Graphic */}
        <img
          src={accioLogo}
          alt="Accio logo featuring circular microphone emblem with signal waves flowing into the wordmark"
          className="w-full h-full object-contain select-none transition-transform duration-500 hover:scale-[1.01]"
        />

        {/* Live Vector Animation Overlay (exact 1024x540 pixel coordinate match) */}
        <svg
          viewBox="0 0 1024 540"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible select-none"
          aria-hidden="true"
        >
          <defs>
            {/* Luminous emerald wave ripple gradient */}
            <linearGradient id="rippleEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40916c" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#52b788" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#d8e3c3" stopOpacity="0.1" />
            </linearGradient>

            {/* Traveling energy pulse gradient along wires */}
            <linearGradient id="wireEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0" />
              <stop offset="25%" stopColor="#52b788" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#74c69d" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#c5d5ad" stopOpacity="0" />
            </linearGradient>

            {/* Cyan/Aqua energy for top and bottom wire branches */}
            <linearGradient id="wireCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e4d38" stopOpacity="0" />
              <stop offset="35%" stopColor="#40916c" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#52b788" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c5d5ad" stopOpacity="0" />
            </linearGradient>

            {/* Soft breathing halo behind microphone orb */}
            <radialGradient id="acousticHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.3" />
              <stop offset="65%" stopColor="#52b788" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#d8e3c3" stopOpacity="0" />
            </radialGradient>

            {/* Subtle glow filter for energy particles */}
            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. ACOUSTIC HALO & CONCENTRIC RADIATING SOUNDWAVES (Orb Center: 310, 272) */}
          <circle cx="310" cy="272" r="150" fill="url(#acousticHalo)" />

          {/* Animated concentric soundwaves rippling outward from the orb */}
          <circle
            cx="310"
            cy="272"
            r="145"
            fill="none"
            stroke="url(#rippleEmerald)"
            className="anim-wave-1"
          />
          <circle
            cx="310"
            cy="272"
            r="145"
            fill="none"
            stroke="url(#rippleEmerald)"
            className="anim-wave-2"
          />
          <circle
            cx="310"
            cy="272"
            r="145"
            fill="none"
            stroke="url(#rippleEmerald)"
            className="anim-wave-3"
          />

          {/* 2. LOOMING NEURAL WIRE ENERGY PULSES (Streaming along curves into 'accio') */}
          {/* Wire 1: High Upper Arc */}
          <path
            id="wireHighTop"
            d="M 440 215 C 475 210, 520 155, 600 130 C 670 110, 750 115, 835 130"
            fill="none"
            stroke="url(#wireCyanGrad)"
            strokeWidth="1.8"
            className="anim-wire-energy-slow"
            filter="url(#softGlow)"
          />
          <circle r="2.8" fill="#52b788" filter="url(#softGlow)">
            <animateMotion
              path="M 440 215 C 475 210, 520 155, 600 130 C 670 110, 750 115, 835 130"
              dur="3.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Wire 2: Mid Upper Arc */}
          <path
            id="wireMidTop"
            d="M 445 232 C 480 228, 530 180, 620 160 C 690 145, 770 150, 815 160"
            fill="none"
            stroke="url(#wireEnergyGrad)"
            strokeWidth="1.9"
            className="anim-wire-energy"
            filter="url(#softGlow)"
          />
          <circle r="2.6" fill="#74c69d" filter="url(#softGlow)">
            <animateMotion
              path="M 445 232 C 480 228, 530 180, 620 160 C 690 145, 770 150, 815 160"
              dur="2.7s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Wire 3: Low Upper Arc */}
          <path
            id="wireLowTop"
            d="M 450 250 C 485 245, 540 205, 630 190 C 700 180, 765 190, 795 200"
            fill="none"
            stroke="url(#wireEnergyGrad)"
            strokeWidth="1.8"
            className="anim-wire-energy-fast"
            filter="url(#softGlow)"
          />
          <circle r="2.4" fill="#52b788" filter="url(#softGlow)">
            <animateMotion
              path="M 450 250 C 485 245, 540 205, 630 190 C 700 180, 765 190, 795 200"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Wire 4: Center Conduit */}
          <path
            d="M 455 272 C 485 272, 515 270, 535 270"
            fill="none"
            stroke="url(#wireEnergyGrad)"
            strokeWidth="2.2"
            className="anim-wire-energy"
            filter="url(#softGlow)"
          />

          {/* Wire 5: High Lower Arc */}
          <path
            id="wireHighBottom"
            d="M 450 295 C 485 300, 540 338, 630 355 C 700 365, 765 355, 795 345"
            fill="none"
            stroke="url(#wireEnergyGrad)"
            strokeWidth="1.8"
            className="anim-wire-energy-fast"
            filter="url(#softGlow)"
          />
          <circle r="2.4" fill="#52b788" filter="url(#softGlow)">
            <animateMotion
              path="M 450 295 C 485 300, 540 338, 630 355 C 700 365, 765 355, 795 345"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Wire 6: Mid Lower Arc */}
          <path
            id="wireMidBottom"
            d="M 445 312 C 480 318, 530 365, 620 385 C 690 400, 770 395, 815 385"
            fill="none"
            stroke="url(#wireEnergyGrad)"
            strokeWidth="1.9"
            className="anim-wire-energy"
            filter="url(#softGlow)"
          />
          <circle r="2.6" fill="#74c69d" filter="url(#softGlow)">
            <animateMotion
              path="M 445 312 C 480 318, 530 365, 620 385 C 690 400, 770 395, 815 385"
              dur="2.9s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Wire 7: Low Lower Arc */}
          <path
            id="wireLowBottom"
            d="M 440 330 C 475 335, 520 390, 600 415 C 670 435, 750 430, 835 415"
            fill="none"
            stroke="url(#wireCyanGrad)"
            strokeWidth="1.8"
            className="anim-wire-energy-slow"
            filter="url(#softGlow)"
          />
          <circle r="2.8" fill="#52b788" filter="url(#softGlow)">
            <animateMotion
              path="M 440 330 C 475 335, 520 390, 600 415 C 670 435, 750 430, 835 415"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Glowing Terminal Connection Nodes at Wire Tips */}
          <circle cx="835" cy="130" r="3" fill="#52b788" filter="url(#softGlow)" className="anim-sparkle" style={{ animationDelay: '0.4s' }} />
          <circle cx="815" cy="160" r="2.8" fill="#74c69d" filter="url(#softGlow)" className="anim-sparkle" style={{ animationDelay: '1.2s' }} />
          <circle cx="795" cy="200" r="2.5" fill="#52b788" filter="url(#softGlow)" className="anim-sparkle" style={{ animationDelay: '0.8s' }} />
          <circle cx="795" cy="345" r="2.5" fill="#52b788" filter="url(#softGlow)" className="anim-sparkle" style={{ animationDelay: '1.6s' }} />
          <circle cx="815" cy="385" r="2.8" fill="#74c69d" filter="url(#softGlow)" className="anim-sparkle" style={{ animationDelay: '0.2s' }} />
          <circle cx="835" cy="415" r="3" fill="#52b788" filter="url(#softGlow)" className="anim-sparkle" style={{ animationDelay: '1.4s' }} />

          {/* 3. STUDIO RECORDING RUBY BEACON (Active Microphone Status) */}
          {/* Outer ruby audio diffusion glow */}
          <circle
            cx="310"
            cy="214"
            r="8"
            fill="#ef4444"
            opacity="0.3"
            className="anim-ruby-blink"
          />
          {/* Crisp studio recording jewel light */}
          <circle
            cx="310"
            cy="214"
            r="3.5"
            fill="#ef4444"
            stroke="#fecaca"
            strokeWidth="0.9"
            className="anim-ruby-blink"
          />
          {/* Specular high-light reflection on ruby bead */}
          <circle cx="309" cy="213" r="1.1" fill="#ffffff" opacity="0.95" />

          {/* 4. AMBIENT LIVING SPARKLES (4-Point Diamond Shimmer Stars) */}
          {/* Sparkle 1: Upper-left orb */}
          <g transform="translate(205, 155)" className="anim-sparkle" style={{ animationDelay: '0s' }}>
            <path
              d="M 0 -8 Q 0 0 8 0 Q 0 0 0 8 Q 0 0 -8 0 Q 0 0 0 -8 Z"
              fill="#40916c"
              opacity="0.9"
            />
          </g>

          {/* Sparkle 2: Upper-right orb */}
          <g transform="translate(420, 145)" className="anim-sparkle" style={{ animationDelay: '0.8s' }}>
            <path
              d="M 0 -7 Q 0 0 7 0 Q 0 0 0 7 Q 0 0 -7 0 Q 0 0 0 -7 Z"
              fill="#52b788"
              opacity="0.85"
            />
          </g>

          {/* Sparkle 3: Wire convergence gate */}
          <g transform="translate(490, 240)" className="anim-sparkle" style={{ animationDelay: '1.5s' }}>
            <path
              d="M 0 -6 Q 0 0 6 0 Q 0 0 0 6 Q 0 0 -6 0 Q 0 0 0 -6 Z"
              fill="#2d6a4f"
              opacity="0.95"
            />
          </g>

          {/* Sparkle 4: Ruby / Rose sparkle accent near the 'i' dot */}
          <g transform="translate(815, 205)" className="anim-sparkle" style={{ animationDelay: '2.2s' }}>
            <path
              d="M 0 -7 Q 0 0 7 0 Q 0 0 0 7 Q 0 0 -7 0 Q 0 0 0 -7 Z"
              fill="#f43f5e"
              opacity="0.9"
            />
          </g>

          {/* Sparkle 5: Lower-left orb */}
          <g transform="translate(220, 395)" className="anim-sparkle" style={{ animationDelay: '1.1s' }}>
            <path
              d="M 0 -6 Q 0 0 6 0 Q 0 0 0 6 Q 0 0 -6 0 Q 0 0 0 -6 Z"
              fill="#74c69d"
              opacity="0.85"
            />
          </g>

          {/* Sparkle 6: Upper crest of wire arc */}
          <g transform="translate(640, 125)" className="anim-sparkle" style={{ animationDelay: '1.9s' }}>
            <path
              d="M 0 -7 Q 0 0 7 0 Q 0 0 0 7 Q 0 0 -7 0 Q 0 0 0 -7 Z"
              fill="#52b788"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {/* Live System Status Pill */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f4f7ee]/90 border border-[#d8e3c3] shadow-xs text-[11px] font-mono text-[#163829] -mt-1 sm:-mt-2 mb-4 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="font-semibold tracking-wide">LIVE NEURAL AUDIO</span>
        <span className="text-slate-300">|</span>
        <span className="text-[#2d6a4f] flex items-center gap-0.5">
          <span className="w-0.5 h-2.5 bg-[#2d6a4f] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
          <span className="w-0.5 h-4 bg-[#2d6a4f] rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
          <span className="w-0.5 h-1.5 bg-[#2d6a4f] rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
          <span className="w-0.5 h-3 bg-[#2d6a4f] rounded-full animate-[pulse_1s_ease-in-out_0.1s_infinite]" />
        </span>
        <span className="text-slate-500 font-normal">Listening</span>
      </div>

      {/* Editorial handwritten script below the emblem */}
      <div className="w-full flex justify-start pl-8 sm:pl-12 -mt-1 sm:-mt-2 mb-6 sm:mb-8">
        <p className="font-editorial text-[28px] sm:text-[32px] leading-tight text-[#386650] italic font-medium">
          More than a tool,
          <br />
          <span className="pl-6">a companion.</span>
        </p>
      </div>

      {/* Quote section below the visual */}
      <div className="w-full max-w-[420px] text-center px-4">
        <blockquote className="text-[15px] sm:text-[16px] text-slate-700 leading-relaxed font-normal">
          <span className="text-xl font-serif text-[#2d6a4f] mr-1 select-none">“</span>
          Just as Braille opened the world of books,
          <br className="hidden sm:inline" />
          accio opens the digital world.
          <span className="text-xl font-serif text-[#2d6a4f] ml-1 select-none">”</span>
        </blockquote>
        <div className="w-10 h-[1.5px] bg-[#c5d5ad] mx-auto mt-4" aria-hidden="true" />
      </div>
    </div>
  );
};
