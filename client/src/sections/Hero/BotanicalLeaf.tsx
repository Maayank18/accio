import React from 'react';

export const BotanicalLeaf: React.FC = () => {
  return (
    <div
      className="absolute top-0 right-0 h-full w-[160px] sm:w-[240px] lg:w-[320px] pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Soft botanical leaf branches with delicate editorial depth of field */}
      <svg
        viewBox="0 0 320 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[-20px] right-[-30px] w-full h-[900px] opacity-75 blur-[1.5px]"
      >
        <defs>
          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#40916C" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#74C69D" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B4332" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#52B788" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Upper palm frond cluster */}
        <path
          d="M340 60 C260 90 190 140 140 220 C180 200 240 170 340 130 Z"
          fill="url(#leafGrad1)"
        />
        <path
          d="M340 110 C240 150 160 220 120 310 C170 270 230 220 340 180 Z"
          fill="url(#leafGrad2)"
        />
        <path
          d="M340 180 C270 210 200 260 160 350 C210 320 270 270 340 240 Z"
          fill="url(#leafGrad1)"
        />
        <path
          d="M340 250 C280 280 220 340 180 430 C230 380 290 330 340 310 Z"
          fill="url(#leafGrad2)"
        />

        {/* Lower foliage cluster */}
        <path
          d="M340 500 C270 520 210 570 170 650 C220 620 280 580 340 560 Z"
          fill="url(#leafGrad1)"
        />
        <path
          d="M340 570 C250 600 180 660 140 760 C190 710 260 660 340 630 Z"
          fill="url(#leafGrad2)"
        />
        <path
          d="M340 650 C280 680 220 740 190 820 C240 780 290 730 340 710 Z"
          fill="url(#leafGrad1)"
        />
      </svg>
    </div>
  );
};
