import React, { useState, useRef, useEffect } from 'react';
import { AccioOrb } from './AccioOrb.js';
import { AssistantModal } from './AssistantModal/AssistantModal.js';
import { RotateCcw, ShieldCheck, Sparkles, Monitor } from 'lucide-react';

export const DraggableCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Position in pixels of the unified assistant container (top-left)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);

  // Drag physics tracking
  const dragStartRef = useRef<{ startX: number; startY: number; unitStartX: number; unitStartY: number }>({
    startX: 0,
    startY: 0,
    unitStartX: 0,
    unitStartY: 0,
  });
  const hasMovedRef = useRef(false);

  // Dimensions of compact side-by-side assembly
  const MODAL_WIDTH = 340;
  const MODAL_HEIGHT = 290;
  const ORB_SIZE = 56;
  const GAP = 12;

  // Clamping helper
  const clampPosition = (newX: number, newY: number, isOpen: boolean) => {
    if (!canvasRef.current) return { x: newX, y: newY };
    const rect = canvasRef.current.getBoundingClientRect();
    const isMobile = rect.width < 460;

    const width = isOpen ? (isMobile ? MODAL_WIDTH : MODAL_WIDTH + GAP + ORB_SIZE) : ORB_SIZE;
    const height = isOpen ? (isMobile ? MODAL_HEIGHT + GAP + ORB_SIZE : MODAL_HEIGHT) : ORB_SIZE;

    const maxX = Math.max(12, rect.width - width - 12);
    const maxY = Math.max(12, rect.height - height - 12);

    return {
      x: Math.min(Math.max(newX, 12), maxX),
      y: Math.min(Math.max(newY, 12), maxY),
    };
  };

  // Initialize position at a comfortable spot on the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const initialX = rect.width > 700 ? rect.width - (MODAL_WIDTH + GAP + ORB_SIZE) - 30 : Math.max(16, (rect.width - MODAL_WIDTH) / 2);
      const initialY = 70;
      setPos({ x: initialX, y: initialY });
      setIsInitialized(true);
    }
  }, []);

  // Adjust bounds if resized
  useEffect(() => {
    const handleResize = () => {
      setPos((prev) => clampPosition(prev.x, prev.y, isAssistantOpen));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAssistantOpen]);

  // Pointer down (triggered by the Orb OR by the Chatbox Header!)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      unitStartX: pos.x,
      unitStartY: pos.y,
    };
  };

  // Pointer move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasMovedRef.current = true;
    }

    const newRawX = dragStartRef.current.unitStartX + deltaX;
    const newRawY = dragStartRef.current.unitStartY + deltaY;

    setPos(clampPosition(newRawX, newRawY, isAssistantOpen));
  };

  // Pointer up
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Click on the Orb: toggle open/close
  const handleOrbClick = () => {
    if (!hasMovedRef.current) {
      setIsAssistantOpen((prev) => {
        const nextState = !prev;
        setPos((current) => clampPosition(current.x, current.y, nextState));
        return nextState;
      });
    }
  };

  // Reset Position to top-right
  const handleResetPosition = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const initialX = rect.width > 700 ? rect.width - (MODAL_WIDTH + GAP + ORB_SIZE) - 30 : Math.max(16, (rect.width - MODAL_WIDTH) / 2);
      const initialY = 70;
      setPos({ x: initialX, y: initialY });
      setIsAssistantOpen(true);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Canvas Header Control Strip */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2 rounded-2xl bg-[#fbfcf9] border border-[#dfe6d7] shadow-2xs text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-accio-navy">
            <Monitor className="w-3.5 h-3.5 text-[#2d6a4f]" />
            <span>Virtual Canvas Workspace</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-slate-500 font-mono text-[11px]">
            {isAssistantOpen ? 'Assistant Docked Beside Orb' : 'Orb Minimized'} · X: {Math.round(pos.x)}px, Y: {Math.round(pos.y)}px
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>24ms Realtime Driver</span>
          </div>

          <button
            onClick={handleResetPosition}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f4f7ee] hover:bg-[#e8efe0] text-slate-700 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-[#2d6a4f]" />
            <span>Reset Position</span>
          </button>
        </div>
      </div>

      {/* Main Blank Canvas Surface */}
      <div
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full min-h-[520px] sm:min-h-[580px] rounded-3xl bg-[#fbfcf9] border border-[#c5d5ad] overflow-hidden shadow-inner select-none"
        style={{
          backgroundImage: 'radial-gradient(#2d6a4f 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Subtle Canvas Guidelines */}
        <div className="absolute top-4 left-4 pointer-events-none opacity-40 flex items-center gap-1.5 text-xs font-mono text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-[#2d6a4f]" />
          <span>Accio Workspace · Drag orb or header</span>
        </div>

        <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <ShieldCheck className="w-3 h-3 text-[#2d6a4f]" />
          <span>Local System Driver · Privacy Guaranteed</span>
        </div>

        {/* Unified Side-by-Side Draggable Entity: Chatbox + Anchored Side Orb */}
        {isInitialized && (
          <div
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
            }}
            className="absolute z-30 select-none flex flex-col sm:flex-row items-center gap-3 pointer-events-auto transition-shadow duration-150"
          >
            {/* The Sleek, Compact Chatbox Modal */}
            {isAssistantOpen && (
              <div className="w-[320px] sm:w-[340px] shadow-xl rounded-2xl animate-in fade-in slide-in-from-right-3 duration-200">
                <AssistantModal
                  isOpen={isAssistantOpen}
                  onClose={() => setIsAssistantOpen(false)}
                  onDragStart={handlePointerDown}
                  defaultTab="aura"
                />
              </div>
            )}

            {/* The Classic Jewel Orb Docked Directly Beside the Chatbox */}
            <div className="shrink-0 flex items-center justify-center">
              <AccioOrb
                isDragging={isDragging}
                isOpen={isAssistantOpen}
                onPointerDown={handlePointerDown}
                onClick={handleOrbClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
