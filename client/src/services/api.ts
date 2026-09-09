import { ContactFormData, CommunityFormData, EarlyAccessFormData, ApiResponse } from '../types/index.js';

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  try {
    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: json.message || 'An error occurred. Please try again.',
        error: json.error || `HTTP error ${res.status}`,
      };
    }
    return json;
  } catch {
    return {
      success: false,
      message: 'Network response was not valid JSON.',
      error: `Status: ${res.status}`,
    };
  }
}

export const api = {
  async submitContact(data: ContactFormData): Promise<ApiResponse<{ id: string }>> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<{ id: string }>(res);
    } catch (err: any) {
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network.',
        error: err?.message,
      };
    }
  },

  async joinCommunity(data: CommunityFormData): Promise<ApiResponse<{ id: string; email: string }>> {
    try {
      const res = await fetch(`${API_BASE}/community/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<{ id: string; email: string }>(res);
    } catch (err: any) {
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network.',
        error: err?.message,
      };
    }
  },

  async requestEarlyAccess(data: EarlyAccessFormData): Promise<ApiResponse<{ id: string; email: string }>> {
    try {
      const res = await fetch(`${API_BASE}/early-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<{ id: string; email: string }>(res);
    } catch (err: any) {
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network.',
        error: err?.message,
      };
    }
  },

  async checkHealth(): Promise<{ status: string; database?: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) {
        return await res.json();
      }
      return { status: 'offline' };
    } catch {
      return { status: 'offline' };
    }
  },
};
