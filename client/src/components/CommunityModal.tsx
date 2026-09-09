import React, { useState } from 'react';
import { Modal } from './Modal.js';
import { Button } from './Button.js';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'User' | 'Caregiver' | 'Researcher' | 'Developer' | 'Advocate' | 'Other'>('Advocate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await api.joinCommunity({
      name,
      email,
      role,
      interests: [],
    });

    setIsSubmitting(false);

    if (res.success) {
      onSuccessToast(res.message || 'Welcome to the Accio community!');
      setName('');
      setEmail('');
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Join the Accio Community"
      description="Connect with accessibility advocates, researchers, and users building an inclusive digital tomorrow."
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        {error && (
          <div role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="comm-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="comm-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5d0bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="comm-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="comm-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5d0bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="comm-role" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            I am joining as:
          </label>
          <select
            id="comm-role"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5d0bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          >
            <option value="Advocate">Accessibility Advocate</option>
            <option value="User">Individual with Motor/Visual Limitation</option>
            <option value="Caregiver">Caregiver or Family Member</option>
            <option value="Researcher">Researcher / Clinician / OT</option>
            <option value="Developer">Software Engineer / Designer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-[#eef3e5]"
          >
            Cancel
          </button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="!bg-[#163829] hover:!bg-[#0f281d] !border !border-[#23533c]"
          >
            {isSubmitting ? 'Joining...' : 'Join Community'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
