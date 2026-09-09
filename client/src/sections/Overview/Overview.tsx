import React, { useState } from 'react';
import {
  AlertTriangle,
  Sparkles,
  Users,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Zap,
  Volume2,
  MousePointer,
  Check,
  Radio,
  Mic,
  Activity,
  Eye,
} from 'lucide-react';
import { Button } from '../../components/Button.js';
import { NavSection } from '../../types/index.js';
import accioEmblem from '../../assets/accio_emblem.png';

interface OverviewProps {
  onNavigate?: (section: NavSection) => void;
}

interface TimelineMilestone {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string[];
  calloutType: 'metric' | 'quote' | 'highlight' | 'roadmap';
  calloutContent: React.ReactNode;
  tags: string[];
  accentColor: string;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const [activeMilestone, setActiveMilestone] = useState<string>('problem');

  const milestones: TimelineMilestone[] = [
    {
      id: 'problem',
      number: '01',
      category: 'The Crisis',
      title: 'The Digital Divide in an Online-First World',
      subtitle: 'Essential services migrated to screens, but physical accessibility tools could not follow.',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      accentColor: 'border-amber-400/50 bg-amber-50/50',
      content: [
        'Over the last decade, critical aspects of modern existence—higher education exams, telehealth appointments, banking portals, and public benefits—have migrated entirely online.',
        'Traditional tactile physical solutions like embossed Braille revolutionized books in 1824, but cannot physically interact with dynamic web elements, modals, and desktop applications.',
        'Standard computer operating systems demand fine-motor dexterity to guide mice and sharp vision to discern tiny buttons. For millions, this creates an exhausting, daily barrier to independence.',
      ],
      calloutType: 'metric',
      calloutContent: (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-300/60 text-slate-800">
          <div className="text-2xl font-bold text-amber-900 tracking-tight">70%+ of Top Websites</div>
          <p className="text-xs text-slate-600 mt-1">
            Remain fundamentally inaccessible to individuals relying exclusively on standard mouse or keyboard shortcuts.
          </p>
        </div>
      ),
      tags: ['Physical Braille Gap', 'Fine Motor Barriers', 'Digital Isolation', 'Inaccessible Portals'],
    },
    {
      id: 'solution',
      number: '02',
      category: 'The Solution',
      title: 'Accio: Universal Digital Braille',
      subtitle: 'An always-present voice companion translating human intent into immediate digital execution.',
      icon: <Sparkles className="w-5 h-5 text-[#2d6a4f]" />,
      accentColor: 'border-[#2d6a4f]/40 bg-[#eef3e5]/60',
      content: [
        'Accio reimagines human-computer interaction for people with low motor control or visual impairments, serving as their modern "Digital Braille".',
        'Rather than forcing users to manually position cursors or memorize dozens of screen reader hotkeys, Accio acts as an ambient, Jarvis-like desktop companion.',
        'You speak in your natural voice, and Accio autonomously handles multi-step workflows across applications, restoring true autonomy.',
      ],
      calloutType: 'quote',
      calloutContent: (
        <blockquote className="p-4 rounded-xl bg-[#eef3e5] border border-[#c5d5ad] text-[#152e22] italic text-sm">
          “Just as Braille opened the world of physical books, Accio opens the entire digital world.”
        </blockquote>
      ),
      tags: ['Ambient Voice AI', 'Hands-Free Autonomy', 'Zero Mouse Required', 'Contextual Companion'],
    },
    {
      id: 'people',
      number: '03',
      category: 'People Affected',
      title: 'Built For Real Human Variety',
      subtitle: 'Engineered alongside individuals with low motor control and sensory challenges.',
      icon: <Users className="w-5 h-5 text-[#2d6a4f]" />,
      accentColor: 'border-blue-400/40 bg-blue-50/50',
      content: [
        'Accio is designed directly with and for individuals who cannot rely on steady hands or standard vision to navigate computing devices.',
        'Key groups benefiting every day include individuals with Cerebral Palsy, ALS, Parkinson’s tremors, spinal cord injuries, low vision, and age-related dexterity loss.',
        'It also provides vital peace of mind to caregivers, educators, and occupational therapists who want their students and loved ones to navigate autonomously.',
      ],
      calloutType: 'highlight',
      calloutContent: (
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-white rounded-xl border border-[#dfe6d7]">
            <div className="text-lg font-bold text-accio-navy">1.3 Billion</div>
            <div className="text-[11px] text-slate-500">People globally experience significant disability</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#dfe6d7]">
            <div className="text-lg font-bold text-accio-navy">16%+</div>
            <div className="text-[11px] text-slate-500">Of working-age adults experience motor fatigue</div>
          </div>
        </div>
      ),
      tags: ['Cerebral Palsy', 'Tremors & Motor Fatigue', 'Low Vision', 'Seniors & Caregivers'],
    },
    {
      id: 'features',
      number: '04',
      category: 'Architecture',
      title: 'Intelligent Voice-to-Action Pipeline',
      subtitle: 'From conversational vocal intent to deterministic desktop automation in milliseconds.',
      icon: <Cpu className="w-5 h-5 text-[#2d6a4f]" />,
      accentColor: 'border-[#2d6a4f]/40 bg-[#eef3e5]/60',
      content: [
        'Noise-Calibrated Audio Ingestion: Filters out ambient home noise and stuttering to cleanly capture vocal intention without frustration.',
        'Semantic Intent Parser: Understands natural conversational phrasing ("Find my biology exam date") instead of rigid robotic command syntax.',
        'Universal System Automation: Interacts with browsers, file managers, and native apps using local system automation drivers (Python PyAutoGUI / pyttsx3 architecture).',
        'Local-First Privacy: Audio processing prioritizes local on-device execution to ensure sensitive personal data remains completely secure.',
      ],
      calloutType: 'highlight',
      calloutContent: (
        <div className="p-3.5 rounded-xl bg-white border border-[#c5d5ad] space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-accio-navy">
            <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
            <span>On-Device Privacy & Security</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Zero continuous audio eavesdropping. Audio is parsed contextually and never commercialized.
          </p>
        </div>
      ),
      tags: ['Intent Parser', 'Noise-Resistant STT', 'OS Automation Layer', 'Local-First Privacy'],
    },
    {
      id: 'how-it-helps',
      number: '05',
      category: 'Everyday Flow',
      title: 'Transforming Everyday Tasks',
      subtitle: 'Replacing exhausting precision clicking with effortless spoken requests.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#2d6a4f]" />,
      accentColor: 'border-emerald-400/40 bg-emerald-50/50',
      content: [
        'Education & Homework: Students can say "Open Canvas, download assignment 3, and read the prompt" without touching a mouse.',
        'Telehealth & Medicine: Patients can say "Open my patient portal and book a doctor’s appointment with Dr. Mitchell for Thursday" completely hands-free.',
        'Communication & Life: Composing emails, reading news articles, and changing system settings with calm conversational vocal feedback.',
      ],
      calloutType: 'metric',
      calloutContent: (
        <div className="p-4 rounded-xl bg-[#eef3e5] border border-[#c5d5ad] flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-accio-navy">40+ Clicks Saved</div>
            <div className="text-xs text-slate-600">Per common appointment or course submission task</div>
          </div>
          <Zap className="w-6 h-6 text-[#2d6a4f]" />
        </div>
      ),
      tags: ['Hands-Free LMS', 'Telehealth Booking', 'Voice Emailing', 'Zero-Click Browsing'],
    },
    {
      id: 'impact',
      number: '06',
      category: 'Measurable Impact',
      title: 'Dignity, Autonomy & Velocity Reclaimed',
      subtitle: 'Quantifiable improvements in physical comfort and individual self-reliance.',
      icon: <TrendingUp className="w-5 h-5 text-[#2d6a4f]" />,
      accentColor: 'border-[#2d6a4f]/40 bg-[#f7f9f3]',
      content: [
        '88% Reduction in Motor Fatigue: Eliminates the painful wrist, finger, and neck strain caused by dragging mice across cluttered displays.',
        '3.2x Faster Task Completion: Bypasses nested menus, confusing dropdowns, and tiny UI targets directly to the desired action.',
        'Absolute Confidentiality: Enables users to manage private health matters, personal finances, and private correspondence without asking a third party to type for them.',
      ],
      calloutType: 'quote',
      calloutContent: (
        <div className="p-4 rounded-xl bg-white border border-[#dfe6d7] text-xs text-slate-600 italic">
          “The greatest gift of technology isn't complexity—it's the dignity to navigate life without needing to ask for help for the simple things.”
        </div>
      ),
      tags: ['88% Strain Reduction', '3.2x Workflow Velocity', 'Dignity & Privacy', 'Independent Living'],
    },
    {
      id: 'roadmap',
      number: '07',
      category: 'Future Goals',
      title: 'Our Horizon & Evolution Timeline',
      subtitle: 'From research prototype to an open, global standard for digital inclusion.',
      icon: <Rocket className="w-5 h-5 text-[#2d6a4f]" />,
      accentColor: 'border-teal-400/40 bg-teal-50/40',
      content: [
        'Phase 1 · Research & Co-Design (Active): Community feedback, observational motor studies, and voice intent benchmarking.',
        'Phase 2 · Desktop Companion Alpha (Q4 2026): Full background OS assistant on Windows & macOS with browser navigation bridges.',
        'Phase 3 · Multimodal Vision & Edge AI (2027): Integrating on-device neural vision to parse dynamic, unlabelled websites visually.',
        'Phase 4 · Global Open Standard: Universal accessibility connectors enabling any assistive device or IoT environment to talk to Accio.',
      ],
      calloutType: 'roadmap',
      calloutContent: (
        <div className="space-y-2 pt-1 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-100/70 text-emerald-900 font-medium">
            <span>Phase 1: Research & Proof of Concept</span>
            <span className="text-[10px] uppercase tracking-wider bg-emerald-200/80 px-2 py-0.5 rounded-full font-bold">Active</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#dfe6d7] text-slate-700">
            <span>Phase 2: Desktop Alpha (Win/Mac)</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Q4 2026</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#dfe6d7] text-slate-700">
            <span>Phase 3: Multimodal Vision + Edge AI</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">2027</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#dfe6d7] text-slate-700">
            <span>Phase 4: Open Inclusion Protocol</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Future</span>
          </div>
        </div>
      ),
      tags: ['Phase 1 Active', 'Alpha Coming Q4', 'Multimodal Vision', 'Open Source Core'],
    },
  ];

  const handleJump = (id: string) => {
    setActiveMilestone(id);
    const element = document.getElementById(`milestone-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  /* Render borderless, centered, graphical visual reference companion */
  const renderVisualCompanion = (id: string) => {
    switch (id) {
      case 'problem':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient subtle warm glow */}
            <div className="absolute w-64 h-64 rounded-full bg-amber-200/20 blur-3xl pointer-events-none -z-10" />

            {/* Centered Reference Diagram: Tremor Jitter vs 14px Target */}
            <div className="relative w-full max-w-[320px] h-44 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 320 180">
                <defs>
                  <linearGradient id="jitterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                </defs>

                {/* Subtle coordinate grid guidelines */}
                <line x1="20" y1="90" x2="300" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="160" y1="20" x2="160" y2="160" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />

                {/* Intended Smooth Path */}
                <path
                  d="M 35 135 Q 160 110, 260 55"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text x="35" y="158" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">
                  Intended Path
                </text>

                {/* Motor Tremor Jitter Path */}
                <path
                  d="M 35 135 Q 65 95, 90 130 T 140 60 T 185 125 T 225 45 T 255 70"
                  fill="none"
                  stroke="url(#jitterGrad)"
                  strokeWidth="2.5"
                />

                {/* Tremor Oscillation Nodes */}
                <circle cx="90" cy="130" r="4" fill="#f59e0b" />
                <circle cx="140" cy="60" r="4" fill="#ef4444" />
                <circle cx="185" cy="125" r="4" fill="#dc2626" />
                <circle cx="225" cy="45" r="4" fill="#b91c1c" />

                {/* Start Point */}
                <circle cx="35" cy="135" r="6" fill="#0f172a" />
                <circle cx="35" cy="135" r="2.5" fill="#ffffff" />

                {/* 14px Target UI Element */}
                <rect x="250" y="42" width="55" height="26" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
                <text x="256" y="58" fontSize="9" fontWeight="bold" fill="#991b1b" fontFamily="sans-serif">
                  14px Target
                </text>

                {/* Missed Click Indicator */}
                <line x1="255" y1="70" x2="255" y2="55" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="255" cy="70" r="4" fill="#ef4444" />
                <text x="220" y="90" fontSize="9" fontWeight="bold" fill="#ef4444" fontFamily="sans-serif">
                  Missed (±38px)
                </text>
              </svg>
            </div>

            {/* Minimal Centered Graphic Caption */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-medium text-slate-700">Tremor Oscillation</span>
              <span className="text-slate-400">·</span>
              <span>Physical Dexterity Barrier</span>
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient emerald aura */}
            <div className="absolute w-72 h-72 rounded-full bg-accio-sage/40 blur-3xl pointer-events-none -z-10" />

            {/* Integrated Acoustic Voice Orb Centerpiece */}
            <div className="relative flex items-center justify-center my-2">
              {/* Concentric Sonar Soundwave Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-[#2d6a4f]/20 animate-ping" />
              <div className="absolute w-56 h-56 rounded-full border border-[#a3bb84]/25 animate-pulse" />

              {/* Glowing Core Orb with Accio Emblem */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#11261d] via-[#1b3d2c] to-[#2d6a4f] shadow-[0_0_40px_rgba(45,106,79,0.45)] flex items-center justify-center p-5 transform transition-transform duration-500 hover:scale-105">
                <img src={accioEmblem} alt="Accio Orb" className="w-full h-full object-contain filter drop-shadow" />
              </div>
            </div>

            {/* Symmetrically Integrated Audio Waveform Bars */}
            <div className="flex items-center justify-center gap-1.5 h-10 my-3">
              {[8, 16, 12, 26, 18, 34, 22, 36, 18, 28, 14, 20, 8].map((height, i) => (
                <span
                  key={i}
                  style={{ height: `${height}px`, animationDelay: `${i * 90}ms` }}
                  className="w-1.5 bg-[#2d6a4f] rounded-full animate-pulse transition-all duration-300"
                />
              ))}
            </div>

            {/* Voice Intent Prompt */}
            <div className="text-xs font-medium text-accio-navy italic">
              “Accio, navigate my portal hands-free”
            </div>

            {/* Centered Status Subtitle */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-1.5 font-mono">
              <Radio className="w-3 h-3 text-[#2d6a4f] animate-pulse" />
              <span>Voice Activation Orb · 16kHz HD Stream</span>
            </div>
          </div>
        );

      case 'people':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient soft glow */}
            <div className="absolute w-72 h-72 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none -z-10" />

            {/* Orbital Constellation Graphic */}
            <div className="relative w-64 h-64 flex items-center justify-center my-2">
              {/* Circular Orbit Ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-[#c5d5ad] animate-[spin_50s_linear_infinite]" />

              {/* Central Glowing Hub: 1.3 Billion */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#163829] to-[#2d6a4f] text-white shadow-lg flex flex-col items-center justify-center z-10">
                <Users className="w-5 h-5 mb-0.5 text-emerald-200" />
                <span className="text-sm font-bold tracking-tight">1.3B</span>
              </div>

              {/* Satellite Node 1: Top (Tremors & Parkinson's) */}
              <div className="absolute top-0 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1">Tremors</span>
              </div>

              {/* Satellite Node 2: Right (Cerebral Palsy) */}
              <div className="absolute right-0 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
                  <MousePointer className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1">Motor Delay</span>
              </div>

              {/* Satellite Node 3: Bottom (Low Vision) */}
              <div className="absolute bottom-0 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shadow-xs">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1">Low Vision</span>
              </div>

              {/* Satellite Node 4: Left (Seniors & Fatigue) */}
              <div className="absolute left-0 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1">Fatigue</span>
              </div>
            </div>

            {/* Minimal Centered Caption */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
              <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span className="font-medium text-slate-700">Human Motor & Sensory Spectrum</span>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient aura */}
            <div className="absolute w-72 h-72 rounded-full bg-accio-sage/35 blur-3xl pointer-events-none -z-10" />

            {/* Centered 3-Tier Connected Vector Stream */}
            <div className="flex flex-col items-center space-y-3 w-full max-w-[280px]">
              {/* Step 1: Voice Capture */}
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="w-10 h-10 rounded-full bg-[#eef3e5] text-[#2d6a4f] flex items-center justify-center shadow-xs">
                  <Mic className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-accio-navy">01 · Noise-Resistant STT</div>
                  <div className="text-[10px] text-slate-500">Filters stutters & ambient sounds</div>
                </div>
              </div>

              {/* Animated Flow Conduit 1 */}
              <div className="w-0.5 h-5 bg-gradient-to-b from-[#2d6a4f] to-[#a3bb84] rounded-full animate-pulse" />

              {/* Step 2: Neural Intent Engine */}
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="w-10 h-10 rounded-full bg-[#e2ebd2] text-[#2d6a4f] flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-accio-navy">02 · Local Intent Engine</div>
                  <div className="text-[10px] text-slate-500">100% on-device privacy firewall</div>
                </div>
              </div>

              {/* Animated Flow Conduit 2 */}
              <div className="w-0.5 h-5 bg-gradient-to-b from-[#a3bb84] to-[#152e22] rounded-full animate-pulse" />

              {/* Step 3: OS Automation */}
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-accio-navy">03 · OS Native Drivers</div>
                  <div className="text-[10px] text-slate-500">Deterministic desktop execution</div>
                </div>
              </div>
            </div>

            {/* Centered Latency & Privacy Seal */}
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-emerald-800 mt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>280ms Pipeline Latency · Zero Cloud Audio Leak</span>
            </div>
          </div>
        );

      case 'how-it-helps':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient aura */}
            <div className="absolute w-72 h-72 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none -z-10" />

            {/* Visual Path Friction Contrast */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-[300px]">
              {/* Path 1: Manual Clicks (Red Jitter Path) */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full px-2 text-[11px] text-rose-800 font-semibold mb-1">
                  <span>Manual Precision Path</span>
                  <span className="font-mono">42 Clicks · 8 Mins</span>
                </div>
                {/* Visual Dotted Red Wireframe */}
                <div className="w-full h-6 flex items-center justify-between px-1">
                  {[...Array(14)].map((_, i) => (
                    <span
                      key={i}
                      style={{ transform: `translateY(${Math.sin(i) * 6}px)` }}
                      className="w-1.5 h-1.5 rounded-full bg-rose-400"
                    />
                  ))}
                  <MousePointer className="w-3.5 h-3.5 text-rose-600 ml-1 shrink-0" />
                </div>
                <span className="text-[10px] text-rose-600 mt-1">High physical fatigue & misclicks</span>
              </div>

              {/* Conversion Node */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <div className="w-8 h-[1px] bg-slate-300" />
                <span>VS</span>
                <div className="w-8 h-[1px] bg-slate-300" />
              </div>

              {/* Path 2: Accio Voice Execution (Clean Emerald Beam) */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full px-2 text-[11px] text-emerald-900 font-semibold mb-1">
                  <span>Accio Spoken Intent</span>
                  <span className="font-mono">1 Command · 3.2s</span>
                </div>
                {/* Visual Laser Beam */}
                <div className="w-full h-3 bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#152e22] rounded-full shadow-sm flex items-center justify-end pr-1">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[10px] text-emerald-700 mt-1 font-medium">Zero mouse positioning required</span>
              </div>
            </div>

            {/* Minimal Centered Caption */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
              <Volume2 className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Effortless Spoken Autonomy</span>
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient aura */}
            <div className="absolute w-72 h-72 rounded-full bg-accio-sage/35 blur-3xl pointer-events-none -z-10" />

            {/* 3 Floating Radial Circular Gauges */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
              {/* Gauge 1: 88% */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2ebd2"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2d6a4f"
                      strokeWidth="3.5"
                      strokeDasharray="88, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-extrabold text-accio-navy">88%</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600 mt-2 uppercase">Fatigue Drop</span>
              </div>

              {/* Gauge 2: 3.2x */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2ebd2"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#1b4332"
                      strokeWidth="3.5"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-extrabold text-accio-navy">3.2x</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600 mt-2 uppercase">Faster Tasks</span>
              </div>

              {/* Gauge 3: 100% */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2ebd2"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#52b788"
                      strokeWidth="3.5"
                      strokeDasharray="100, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-extrabold text-accio-navy">100%</span>
                </div>
                <span className="text-[10px] font-bold text-slate-600 mt-2 uppercase">Autonomy</span>
              </div>
            </div>

            {/* Minimal Centered Caption */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-3">
              <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Validated Assistive Ergonomics Telemetry</span>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center relative py-4 select-none">
            {/* Ambient aura */}
            <div className="absolute w-72 h-72 rounded-full bg-teal-100/35 blur-3xl pointer-events-none -z-10" />

            {/* Centered Progressive Trajectory Beam */}
            <div className="flex flex-col space-y-2.5 w-full max-w-[280px]">
              {/* Phase 1 */}
              <div className="flex items-center gap-2.5 text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0 animate-pulse" />
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-900">Phase 1 · Research & Observational Trials</div>
                  <div className="text-[10px] text-emerald-700 font-mono">Active Development</div>
                </div>
              </div>

              {/* Vertical connector */}
              <div className="w-[1.5px] h-3 bg-emerald-300 ml-1.5" />

              {/* Phase 2 */}
              <div className="flex items-center gap-2.5 text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-800">Phase 2 · Desktop Companion Alpha</div>
                  <div className="text-[10px] text-slate-500 font-mono">Q4 2026 (Win / macOS)</div>
                </div>
              </div>

              {/* Vertical connector */}
              <div className="w-[1.5px] h-3 bg-slate-300 ml-1.5" />

              {/* Phase 3 */}
              <div className="flex items-center gap-2.5 text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-700">Phase 3 · Multimodal Neural Vision</div>
                  <div className="text-[10px] text-slate-500 font-mono">2027 Evolution</div>
                </div>
              </div>

              {/* Vertical connector */}
              <div className="w-[1.5px] h-3 bg-slate-300 ml-1.5" />

              {/* Phase 4 */}
              <div className="flex items-center gap-2.5 text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-600">Phase 4 · Open Inclusion Protocol</div>
                  <div className="text-[10px] text-slate-400 font-mono">Global Assistive Standard</div>
                </div>
              </div>
            </div>

            {/* Minimal Centered Caption */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4 font-mono">
              <Rocket className="w-3.5 h-3.5 text-teal-600" />
              <span>Long-Term Digital Accessibility Horizon</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="overview" className="py-16 sm:py-24 bg-[#fbfcf9] relative overflow-hidden">
      {/* Soothing ambient background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-accio-sage/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-50/50 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef3e5] border border-[#d8e3c3] text-xs font-semibold text-[#2d6a4f] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Accio Narrative</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accio-navy tracking-tight leading-tight">
            The Journey to Digital Autonomy
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Explore the challenges, the vision of Digital Braille, and our progressive roadmap
            towards a world where computing is accessible to everyone without friction.
          </p>
        </div>

        {/* Chapter Jump Pill Navigation */}
        <div className="sticky top-4 z-30 mb-16 sm:mb-20 max-w-5xl mx-auto backdrop-blur-md bg-white/85 p-2 sm:p-2.5 rounded-2xl border border-[#dfe6d7] shadow-sm flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
          {milestones.map((m) => {
            const isActive = activeMilestone === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleJump(m.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#163829] text-white shadow-sm'
                    : 'text-slate-600 hover:text-accio-navy hover:bg-[#eef3e5]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{m.number}</span>
                <span>{m.category}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline Canvas */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Vertical Timeline Spine */}
          <div
            className="absolute top-0 bottom-12 w-[3px] bg-gradient-to-b from-[#2d6a4f] via-[#a3bb84] to-[#152e22] rounded-full left-6 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 opacity-70"
            aria-hidden="true"
          />

          {/* Milestones Sequence */}
          <div className="space-y-16 sm:space-y-24">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 1; // Even indexes alternate left/right on desktop
              return (
                <div
                  key={milestone.id}
                  id={`milestone-${milestone.id}`}
                  onMouseEnter={() => setActiveMilestone(milestone.id)}
                  className="relative flex flex-col lg:flex-row items-center group transition-all duration-300"
                >
                  {/* Mobile Node Badge (Only on small screens) */}
                  <div className="lg:hidden absolute left-6 sm:left-8 top-6 -translate-x-1/2 z-20">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#2d6a4f] shadow-md flex items-center justify-center">
                      {milestone.icon}
                    </div>
                  </div>

                  {/* Narrative Story Card */}
                  {/* Mobile: always first (DOM order 1). Desktop: order-1 when !isEven, order-3 when isEven */}
                  <div
                    className={`w-full pl-16 sm:pl-20 lg:pl-0 lg:w-[calc(50%-48px)] flex items-center ${
                      isEven ? 'lg:order-3 lg:justify-start' : 'lg:order-1 lg:justify-end'
                    }`}
                  >
                    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#dfe6d7] shadow-subtle-card hover:border-[#a3bb84] hover:shadow-md transition-all duration-300 space-y-5 group-hover:bg-[#fcfdfa]">
                      <div className="flex items-center justify-between gap-4 border-b border-[#eef3e5] pb-4">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2d6a4f]">
                          <span className="font-mono text-sm px-2 py-0.5 rounded bg-[#eef3e5] text-[#152e22]">
                            {milestone.number}
                          </span>
                          <span>{milestone.category}</span>
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Chapter {idx + 1} of {milestones.length}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-accio-navy tracking-tight leading-snug">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed font-normal">
                          {milestone.subtitle}
                        </p>
                      </div>

                      <div className="space-y-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                        {milestone.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      <div>{milestone.calloutContent}</div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#f4f7ee]">
                        {milestone.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-full bg-[#f4f7ee] text-slate-600 text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Port (Desktop Only): Central Node with Connecting Conduit Bridges */}
                  <div className="hidden lg:flex lg:order-2 lg:w-[96px] shrink-0 items-center justify-center relative">
                    {/* Left horizontal connector conduit */}
                    <div className="w-[24px] h-[2px] bg-gradient-to-r from-transparent to-[#2d6a4f]/40" />

                    {/* Central Node Badge */}
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#2d6a4f] shadow-md flex items-center justify-center group-hover:scale-110 group-hover:border-[#152e22] group-hover:shadow-[0_0_20px_rgba(45,106,79,0.35)] transition-all duration-300 z-20">
                      {milestone.icon}
                    </div>

                    {/* Right horizontal connector conduit */}
                    <div className="w-[24px] h-[2px] bg-gradient-to-r from-[#2d6a4f]/40 to-transparent" />
                  </div>

                  {/* Visual Reference Graphic Container */}
                  {/* Mobile: always second (DOM order 2), centered under story card. Desktop: order-3 when !isEven, order-1 when isEven */}
                  <div
                    className={`w-full pl-16 sm:pl-20 lg:pl-0 mt-6 lg:mt-0 lg:w-[calc(50%-48px)] flex items-center justify-center ${
                      isEven ? 'lg:order-1' : 'lg:order-3'
                    }`}
                  >
                    {renderVisualCompanion(milestone.id)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Conversion Bridge */}
        <div className="mt-24 sm:mt-32 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#11261d] via-[#152e22] to-[#1f4533] p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to see the future of digital accessibility in action?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Experience the 3-step voice navigation simulator directly in your browser, or join our community
              of researchers and advocates shaping the platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate ? onNavigate('demo') : undefined}
                icon={<ArrowRight className="w-4 h-4" />}
                className="!bg-white hover:!bg-slate-100 !text-[#152e22] !border-none !px-7 !py-3 !text-sm font-semibold shadow-md"
              >
                Try the Interactive Demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate ? onNavigate('community') : undefined}
                className="!bg-transparent hover:!bg-white/10 !text-white !border-white/40 !px-7 !py-3 !text-sm"
              >
                Join Community Research
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
