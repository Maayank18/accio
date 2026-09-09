import React, { useState } from 'react';
import { Zap, Volume2, CheckCircle2, Play, Activity } from 'lucide-react';

interface FeaturesViewProps {
  speakText: (text: string) => void;
}

export const FeaturesView: React.FC<FeaturesViewProps> = ({ speakText }) => {
  const [tremorSensitivity, setTremorSensitivity] = useState<'low' | 'balanced' | 'high'>('balanced');
  const [voicePacing, setVoicePacing] = useState<'calm' | 'standard' | 'brisk'>('calm');
  const [automationRunning, setAutomationRunning] = useState(false);
  const [automationStep, setAutomationStep] = useState<number>(0);

  const handleTestVoice = (pacing: 'calm' | 'standard' | 'brisk') => {
    setVoicePacing(pacing);
    const speed = pacing === 'calm' ? 'calm' : pacing === 'standard' ? 'natural' : 'brisk';
    speakText(`Pacing set to ${speed}.`);
  };

  const handleRunAutomationTest = () => {
    if (automationRunning) return;
    setAutomationRunning(true);
    setAutomationStep(1);

    setTimeout(() => {
      setAutomationStep(2);
      setTimeout(() => {
        setAutomationStep(3);
        speakText('Downloaded to desktop. Zero clicks.');
        setTimeout(() => {
          setAutomationRunning(false);
        }, 1000);
      }, 700);
    }, 600);
  };

  return (
    <div className="p-2.5 space-y-2 text-left select-none max-h-[210px] overflow-y-auto no-scrollbar">
      {/* Feature 1: Motor Tremor Smoothing Filter */}
      <div className="p-2 rounded-lg bg-[#f7f9f3] border border-[#dfe6d7] space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-bold text-accio-navy">
            <Activity className="w-3 h-3 text-[#2d6a4f]" />
            <span>Tremor Smoothing Guard</span>
          </div>
          <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-white text-emerald-800 border border-[#dfe6d7]">
            {tremorSensitivity === 'low' ? '±15px' : tremorSensitivity === 'balanced' ? '±38px' : '±65px'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {(['low', 'balanced', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setTremorSensitivity(level)}
              className={`py-0.5 px-1 rounded text-[10px] font-semibold capitalize transition-all text-center border ${
                tremorSensitivity === level
                  ? 'bg-[#163829] text-white border-[#163829]'
                  : 'bg-white text-slate-600 border-[#dfe6d7] hover:border-[#b9ce9e]'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Feature 2: Voice Pacing Selector */}
      <div className="p-2 rounded-lg bg-[#f7f9f3] border border-[#dfe6d7] space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-bold text-accio-navy">
            <Volume2 className="w-3 h-3 text-[#2d6a4f]" />
            <span>Speech Feedback Pacing</span>
          </div>
          <span className="text-[9px] font-mono text-slate-500">
            {voicePacing === 'calm' ? '0.85x' : voicePacing === 'standard' ? '1.0x' : '1.2x'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {(['calm', 'standard', 'brisk'] as const).map((pacing) => (
            <button
              key={pacing}
              onClick={() => handleTestVoice(pacing)}
              className={`py-0.5 px-1 rounded text-[10px] font-semibold capitalize transition-all text-center border ${
                voicePacing === pacing
                  ? 'bg-[#163829] text-white border-[#163829]'
                  : 'bg-white text-slate-600 border-[#dfe6d7] hover:border-[#b9ce9e]'
              }`}
            >
              {pacing}
            </button>
          ))}
        </div>
      </div>

      {/* Feature 3: Live OS Automation Test */}
      <div className="p-2 rounded-lg bg-white border border-[#c5d5ad] space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-bold text-accio-navy">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Live OS Driver Test</span>
          </div>

          <button
            onClick={handleRunAutomationTest}
            disabled={automationRunning}
            className="px-2 py-0.5 rounded bg-[#2d6a4f] hover:bg-[#1b4332] disabled:opacity-50 text-white text-[9px] font-semibold flex items-center gap-1 transition-all"
          >
            <Play className="w-2 h-2 fill-white" />
            <span>{automationRunning ? 'Testing...' : 'Run Test'}</span>
          </button>
        </div>

        {automationRunning && (
          <div className="space-y-0.5 pt-0.5 border-t border-[#dfe6d7] text-[9px]">
            <div className={`flex items-center gap-1 ${automationStep >= 1 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>1: Connected via OS API</span>
            </div>
            <div className={`flex items-center gap-1 ${automationStep >= 2 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>2: Extracted PDF hands-free</span>
            </div>
            <div className={`flex items-center gap-1 ${automationStep >= 3 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>3: Saved to ~/Desktop (42 clicks bypassed)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
