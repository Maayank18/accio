export type NavSection = 'home' | 'overview' | 'community' | 'demo' | 'reach-out';

export interface NavItem {
  label: string;
  href: string;
  id: NavSection;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  category: 'general' | 'research' | 'collaboration' | 'accessibility_feedback' | 'partnerships';
}

export interface CommunityFormData {
  name: string;
  email: string;
  role: 'User' | 'Caregiver' | 'Researcher' | 'Developer' | 'Advocate' | 'Other';
  interests: string[];
}

export interface EarlyAccessFormData {
  email: string;
  useCase?: string;
  devicePreference?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface DemoCommand {
  id: string;
  command: string;
  userSpeech: string;
  intent: string;
  actionSummary: string;
  systemResponse: string;
  category: 'productivity' | 'learning' | 'healthcare' | 'browsing';
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'completed' | 'error';
