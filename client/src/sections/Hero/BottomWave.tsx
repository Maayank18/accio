import React from 'react';

export const BottomWave: React.FC = () => {
  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[100px] sm:h-[130px] lg:h-[170px] preserve-3d"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef3e5" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#d8e3c3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f7f9f3" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dfe9d3" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#eef3e5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbfcf9" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Back softer wave */}
        <path
          d="M0 70 C320 20, 600 130, 960 60 C1200 10, 1360 80, 1440 65 L1440 180 L0 180 Z"
          fill="url(#waveGradient2)"
        />

        {/* Foreground fluid organic wave */}
        <path
          d="M0 110 C280 60, 580 150, 920 90 C1220 40, 1380 120, 1440 100 L1440 180 L0 180 Z"
          fill="url(#waveGradient1)"
        />
      </svg>
    </div>
  );
};
