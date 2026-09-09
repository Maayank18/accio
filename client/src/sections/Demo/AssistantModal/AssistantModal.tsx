import React, { useState } from 'react';
import { Radio, MessageSquare, Sliders, X, ShieldCheck, GripHorizontal } from 'lucide-react';
import { AuraVoiceView } from './AuraVoiceView.js';
import { ChatView } from './ChatView.js';
import { FeaturesView } from './FeaturesView.js';
import accioEmblem from '../../../assets/accio_emblem.png';

export type AssistantTab = 'aura' | 'chat' | 'features';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDragStart?: (e: React.PointerEvent<HTMLDivElement>) => void;
  defaultTab?: AssistantTab;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({
  isOpen,
  onClose,
  onDragStart,
  defaultTab = 'aura',
}) => {
  const [activeTab, setActiveTab] = useState<AssistantTab>(defaultTab);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Global speech helper for conversational & system voice feedback
  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl border border-[#dfe6d7] shadow-xl overflow-hidden transition-all duration-300 select-none">
      {/* Draggable Assistant Modal Header */}
      <div
        onPointerDown={onDragStart}
        className="px-3.5 py-2.5 bg-[#f7f9f3] border-b border-[#dfe6d7] flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <GripHorizontal className="w-4 h-4 text-slate-400" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#11261d] to-[#2d6a4f] p-1 shadow-2xs">
            <img src={accioEmblem} alt="Accio" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs font-bold text-accio-navy tracking-tight leading-none">Accio Assistant</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-800 font-medium mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ambient Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-[#dfe6d7]">
            <ShieldCheck className="w-2.5 h-2.5 text-[#2d6a4f]" />
            <span>Local</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 border border-[#dfe6d7] text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="px-3 py-1.5 bg-[#fbfcf9] border-b border-[#dfe6d7] flex items-center gap-1.5">
        <button
          onClick={() => setActiveTab('aura')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            activeTab === 'aura'
              ? 'bg-[#163829] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-[#eef3e5] hover:text-accio-navy'
          }`}
        >
          <Radio className={`w-3 h-3 ${activeTab === 'aura' ? 'animate-pulse text-emerald-300' : ''}`} />
          <span>Aura</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            activeTab === 'chat'
              ? 'bg-[#163829] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-[#eef3e5] hover:text-accio-navy'
          }`}
        >
          <MessageSquare className="w-3 h-3" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('features')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            activeTab === 'features'
              ? 'bg-[#163829] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-[#eef3e5] hover:text-accio-navy'
          }`}
        >
          <Sliders className="w-3 h-3" />
          <span>Features</span>
        </button>
      </div>

      {/* Tab Body */}
      <div>
        {activeTab === 'aura' && (
          <AuraVoiceView
            speechEnabled={speechEnabled}
            onToggleSpeech={() => setSpeechEnabled(!speechEnabled)}
            speakText={speakText}
          />
        )}
        {activeTab === 'chat' && <ChatView speakText={speakText} />}
        {activeTab === 'features' && <FeaturesView speakText={speakText} />}
      </div>
    </div>
  );
};
