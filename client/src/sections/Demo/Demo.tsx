import React from 'react';
import { DraggableCanvas } from './DraggableCanvas.js';
import { Sparkles, MousePointer, ShieldCheck, Zap } from 'lucide-react';

export const Demo: React.FC = () => {
  return (
    <section id="demo" className="py-12 sm:py-18 min-h-[calc(100vh-140px)] flex flex-col justify-center bg-[#fbfcf9] relative overflow-hidden">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accio-sage/30 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef3e5] border border-[#d8e3c3] text-xs font-semibold text-[#2d6a4f] uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Virtual Workspace</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accio-navy tracking-tight leading-tight">
            Meet your ambient desktop companion.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Drag the glowing Accio Orb anywhere across the canvas to fit your motor comfort.
            Click the orb to open or close the assistant, talk to <strong>Aura</strong>, chat naturally, or test local accessibility features.
          </p>
        </div>

        {/* The Interactive Draggable Canvas Workspace */}
        <DraggableCanvas />

        {/* Accessibility Features Footer Banner */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-[#f7f9f3]/90 border border-[#dfe6d7] shadow-2xs flex items-start gap-3 hover:border-[#b9ce9e] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-[#eef3e5] text-[#2d6a4f] flex items-center justify-center shrink-0 mt-0.5">
              <MousePointer className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-accio-navy">Ergonomic Placement</div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                Place the orb anywhere on your screen. Never struggle with rigid desktop corners.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7f9f3]/90 border border-[#dfe6d7] shadow-2xs flex items-start gap-3 hover:border-[#b9ce9e] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-[#e2ebd2] text-[#2d6a4f] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-accio-navy">Deterministic Actions</div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                Converts conversational voice commands into immediate, multi-step desktop workflows.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7f9f3]/90 border border-[#dfe6d7] shadow-2xs flex items-start gap-3 hover:border-[#b9ce9e] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-[#eef3e5] text-[#2d6a4f] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-accio-navy">Private by Design</div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                Runs on-device with local intent parsing. Zero private voice audio stored in the cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
