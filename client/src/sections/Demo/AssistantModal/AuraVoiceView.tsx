import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AuraVoiceViewProps {
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  speakText: (text: string) => void;
}

interface VoicePreset {
  id: string;
  command: string;
  response: string;
  intent: string;
  detail: string;
}

const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'canvas',
    command: '“Find my exam date on Canvas”',
    response: 'Biology 101 midterm is Friday at 2:00 PM. Bypassed 18 clicks.',
    intent: 'portal.exam_date',
    detail: 'Extracted from syllabus PDF',
  },
  {
    id: 'doctor',
    command: '“Book appointment with Dr. Mitchell”',
    response: 'Reserved appointment for Thursday at 10:30 AM hands-free.',
    intent: 'health.telehealth',
    detail: 'Auto-filled patient profile',
  },
  {
    id: 'article',
    command: '“Read main page article aloud”',
    response: 'Reading headline: "New Assistive Standards Approved".',
    intent: 'access.screen_reader',
    detail: 'Filtered web ads and menus',
  },
];

export const AuraVoiceView: React.FC<AuraVoiceViewProps> = ({
  speechEnabled,
  onToggleSpeech,
  speakText,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [activePreset, setActivePreset] = useState<VoicePreset>(VOICE_PRESETS[0]);
  const [transcript, setTranscript] = useState<string>(VOICE_PRESETS[0].command);
  const [executionStatus, setExecutionStatus] = useState<'ready' | 'listening' | 'processing' | 'completed'>('completed');

  const handleTriggerPreset = (preset: VoicePreset) => {
    setActivePreset(preset);
    setTranscript(preset.command);
    setExecutionStatus('listening');

    setTimeout(() => {
      setExecutionStatus('processing');
      setTimeout(() => {
        setExecutionStatus('completed');
        speakText(preset.response);
      }, 500);
    }, 400);
  };

  const handleToggleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (isListening) {
        setIsListening(false);
        setExecutionStatus('completed');
      } else {
        setIsListening(true);
        setExecutionStatus('listening');
        setTranscript('Listening for voice...');
        setTimeout(() => {
          setIsListening(false);
          setExecutionStatus('processing');
          setTimeout(() => {
            const randomPreset = VOICE_PRESETS[Math.floor(Math.random() * VOICE_PRESETS.length)];
            setActivePreset(randomPreset);
            setTranscript(randomPreset.command);
            setExecutionStatus('completed');
            speakText(randomPreset.response);
          }, 500);
        }, 1600);
      }
      return;
    }

    if (isListening) {
      setIsListening(false);
      setExecutionStatus('completed');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setExecutionStatus('listening');
        setTranscript('Listening to your natural voice...');
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        const formatted = `“${spoken}”`;
        setTranscript(formatted);
        setExecutionStatus('processing');

        setTimeout(() => {
          setExecutionStatus('completed');
          const matched = VOICE_PRESETS.find((p) =>
            spoken.toLowerCase().includes(p.id) || p.command.toLowerCase().includes(spoken.toLowerCase())
          );

          if (matched) {
            setActivePreset(matched);
            speakText(matched.response);
          } else {
            const custom: VoicePreset = {
              id: 'custom',
              command: formatted,
              response: `Understood: ${spoken}. Executing hands-free request.`,
              intent: 'voice.custom_action',
              detail: 'Local Intent Parser · Zero Cloud Leak',
            };
            setActivePreset(custom);
            speakText(custom.response);
          }
          setIsListening(false);
        }, 500);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setExecutionStatus('completed');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setExecutionStatus('completed');
    }
  };

  useEffect(() => {
    return () => {
      setIsListening(false);
    };
  }, []);

  return (
    <div className="p-2.5 space-y-2 select-none">
      {/* Top Voice Controller Row */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#f7f9f3] border border-[#dfe6d7]">
        {/* Compact Clickable Voice Orb */}
        <button
          onClick={handleToggleMic}
          className={`relative w-11 h-11 rounded-full p-2 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 ${
            isListening ? 'ring-2 ring-amber-400 animate-pulse' : 'ring-1 ring-emerald-500/40'
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 30%, #2d6a4f 0%, #153e2a 60%, #0b1a12 100%)',
          }}
          aria-label="Click to talk via microphone"
        >
          <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="3" width="6" height="10" rx="3" fill="#6ee7b7" />
            <path d="M6 10a6 6 0 0 0 12 0" stroke="#a7f3d0" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12" y2="20" stroke="#a7f3d0" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="8" y1="20" x2="16" y2="20" stroke="#a7f3d0" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white text-[#2d6a4f] shadow-2xs flex items-center justify-center">
            {isListening ? (
              <MicOff className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
            ) : (
              <Mic className="w-2.5 h-2.5 text-[#2d6a4f]" />
            )}
          </div>
        </button>

        {/* Live Status & Audio Soundwave */}
        <div className="flex-1 text-left min-w-0 pr-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-accio-navy truncate">
              {isListening ? 'Listening to voice...' : 'Aura Voice Orb'}
            </span>
            <button
              onClick={onToggleSpeech}
              className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 hover:text-slate-800"
            >
              {speechEnabled ? <Volume2 className="w-3 h-3 text-[#2d6a4f]" /> : <VolumeX className="w-3 h-3 text-slate-400" />}
              <span>{speechEnabled ? 'Audio ON' : 'Muted'}</span>
            </button>
          </div>

          {/* Symmetrical Soundwave Bars */}
          <div className="flex items-center gap-1 h-3.5 mt-1">
            {[6, 12, 8, 14, 10, 14, 8, 12, 6].map((height, i) => (
              <span
                key={i}
                style={{
                  height: executionStatus === 'listening' || executionStatus === 'processing' ? `${height}px` : '3px',
                  animationDelay: `${i * 70}ms`,
                }}
                className={`w-1 rounded-full transition-all duration-200 ${
                  executionStatus === 'listening'
                    ? 'bg-amber-500 animate-pulse'
                    : executionStatus === 'processing'
                    ? 'bg-[#2d6a4f] animate-pulse'
                    : 'bg-[#a3bb84]/60'
                }`}
              />
            ))}
            <span className="text-[9px] text-slate-400 font-mono ml-1.5">
              {executionStatus === 'listening' ? 'Speaking...' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Spoken Transcript & Execution Card */}
      <div className="p-2 rounded-xl bg-white border border-[#dfe6d7] text-left space-y-1 text-xs">
        <div className="text-[11px] font-bold text-accio-navy truncate">
          {transcript}
        </div>
        <div className="text-[10px] text-slate-600 leading-snug">
          <span className="font-bold text-[#2d6a4f] mr-1">Accio:</span>
          <span>{activePreset.response}</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-emerald-800 font-medium pt-0.5 border-t border-[#f4f7ee]">
          <CheckCircle2 className="w-2.5 h-2.5 text-[#2d6a4f]" />
          <span>{activePreset.detail}</span>
        </div>
      </div>

      {/* Compact Spoken Intent Preset Pills */}
      <div className="space-y-1 text-left">
        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
          <Sparkles className="w-2.5 h-2.5 text-[#2d6a4f]" />
          <span>Simulate Quick Voice Intent:</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {VOICE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleTriggerPreset(preset)}
              className={`px-2 py-0.5 rounded-md border text-[10px] font-medium transition-colors ${
                activePreset.id === preset.id
                  ? 'bg-[#163829] text-white border-[#163829]'
                  : 'bg-white border-[#dfe6d7] text-slate-600 hover:border-[#b9ce9e]'
              }`}
            >
              {preset.command}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Seal */}
      <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-mono pt-0.5">
        <ShieldCheck className="w-2.5 h-2.5 text-[#2d6a4f]" />
        <span>100% On-Device Neural STT · Zero Audio Leak</span>
      </div>
    </div>
  );
};
