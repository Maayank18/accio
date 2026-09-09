import React, { useState } from 'react';
import { Modal } from './Modal.js';
import { Button } from './Button.js';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('');
  const [devicePreference, setDevicePreference] = useState('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await api.requestEarlyAccess({
      email,
      useCase,
      devicePreference,
    });

    setIsSubmitting(false);

    if (res.success) {
      onSuccessToast(res.message || 'You have been added to Early Access!');
      setEmail('');
      setUseCase('');
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Get Early Access to Accio"
      description="Join our pilot research group to test hands-free digital voice navigation."
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        {error && (
          <div role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="ea-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="ea-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5d0bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="ea-device" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Primary Operating System
          </label>
          <select
            id="ea-device"
            value={devicePreference}
            onChange={(e) => setDevicePreference(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5d0bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          >
            <option value="desktop">Windows PC / Laptop</option>
            <option value="mac">macOS</option>
            <option value="linux">Linux</option>
            <option value="mobile">Mobile / Tablet</option>
          </select>
        </div>

        <div>
          <label htmlFor="ea-usecase" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Accessibility Needs or Interest (Optional)
          </label>
          <textarea
            id="ea-usecase"
            rows={2}
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="e.g. low fine motor control, visual impairment, assistive research..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5d0bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent resize-none"
          />
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
            {isSubmitting ? 'Joining...' : 'Request Access'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
