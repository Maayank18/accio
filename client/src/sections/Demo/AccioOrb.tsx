import React from 'react';

interface AccioOrbProps {
  isDragging: boolean;
  isOpen: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

export const AccioOrb: React.FC<AccioOrbProps> = ({
  isDragging,
  isOpen,
  onPointerDown,
  onClick,
}) => {
  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={`relative select-none touch-none transition-transform duration-200 group ${
        isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
      }`}
      aria-label="Accio Ambient Voice Orb. Drag to reposition, click to toggle assistant."
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Ambient Breathing Sonar Halo */}
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute w-16 h-16 sm:w-18 sm:h-18 rounded-full transition-all duration-500 pointer-events-none ${
            isOpen
              ? 'border border-emerald-400/40 scale-105 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
              : 'border border-[#2d6a4f]/25 animate-ping'
          }`}
        />
        <div className="absolute w-20 h-20 rounded-full border border-[#a3bb84]/20 animate-pulse pointer-events-none" />

        {/* Core Classic Jewel Orb */}
        <div
          className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_6px_22px_rgba(16,70,44,0.45)] border ${
            isOpen
              ? 'border-emerald-300 ring-2 ring-emerald-400/50 shadow-[0_0_25px_rgba(45,106,79,0.5)]'
              : 'border-[#40916c]/70 hover:border-emerald-300 hover:ring-2 hover:ring-emerald-400/30'
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 25%, #2d6a4f 0%, #153e2a 55%, #081a10 100%)',
          }}
        >
          {/* Specular Glass Highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-50"
            style={{
              background: 'radial-gradient(circle at 35% 20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
            }}
          />

          {/* Pure Precision Vector Microphone & Sonar Core */}
          <svg
            className="w-6 h-6 text-emerald-100 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <defs>
              <linearGradient id="orbMicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Left Acoustic Wave */}
            <path
              d="M 6 16 A 10 10 0 0 1 9 9"
              stroke="#6ee7b7"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Right Acoustic Wave */}
            <path
              d="M 26 16 A 10 10 0 0 0 23 9"
              stroke="#6ee7b7"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Microphone Capsule */}
            <rect
              x="12"
              y="6"
              width="8"
              height="12"
              rx="4"
              fill="url(#orbMicGradient)"
            />
            {/* Base Arc */}
            <path
              d="M 9 14 A 7 7 0 0 0 23 14"
              stroke="#a7f3d0"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* Vertical Stem */}
            <line
              x1="16"
              y1="21"
              x2="16"
              y2="25"
              stroke="#a7f3d0"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* Bottom Stand */}
            <line
              x1="12"
              y1="25"
              x2="20"
              y2="25"
              stroke="#a7f3d0"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>

          {/* Active Jewel Micro-Dot */}
          <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#081a10] shadow-xs animate-pulse" />
        </div>
      </div>
    </div>
  );
};
