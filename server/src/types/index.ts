export interface IContactSubmission {
  name: string;
  email: string;
  message: string;
  category?: string;
  createdAt: Date;
}

export interface ICommunityMember {
  name: string;
  email: string;
  role: 'User' | 'Caregiver' | 'Researcher' | 'Developer' | 'Advocate' | 'Other';
  interests?: string[];
  createdAt: Date;
}

export interface IEarlyAccess {
  email: string;
  useCase?: string;
  devicePreference?: string;
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
