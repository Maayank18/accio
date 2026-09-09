import React, { useState } from 'react';
import { Button } from '../../components/Button.js';
import {
  ArrowRight,
  Mail,
  Check,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  Building2,
  Clock,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { ContactFormData } from '../../types/index.js';

interface ReachOutProps {
  onSuccessToast: (msg: string) => void;
}

const INQUIRY_CATEGORIES = [
  { id: 'general', label: 'General Inquiry', icon: MessageSquare },
  { id: 'research', label: 'Research & Trials', icon: HeartHandshake },
  { id: 'accessibility_feedback', label: 'Accessibility Feedback', icon: Sparkles },
  { id: 'partnerships', label: 'Clinical Partnerships', icon: Building2 },
];

export const ReachOut: React.FC<ReachOutProps> = ({ onSuccessToast }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    category: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Please enter your name (minimum 2 characters).';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const res = await api.submitContact(formData);
    setIsSubmitting(false);

    if (res.success) {
      setIsSent(true);
      onSuccessToast('Your message has been received. Thank you for connecting with Accio!');
      setFormData({ name: '', email: '', message: '', category: 'general' });
      setErrors({});
    } else {
      setErrors({ form: res.message });
    }
  };

  return (
    <section id="reach-out" className="py-16 sm:py-24 min-h-[calc(100vh-140px)] flex flex-col justify-center bg-[#fbfcf9] relative overflow-hidden select-none">
      {/* Ambient Botanical Aura */}
      <div className="absolute top-1/4 left-[-10%] w-[700px] h-[700px] rounded-full bg-accio-sage/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-100/40 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Mission, Channels & Credibility */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef3e5] border border-[#d8e3c3] text-xs font-semibold text-[#2d6a4f] uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Collaboration Line</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accio-navy tracking-tight leading-tight">
                Let’s build true digital independence together.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Whether you are an accessibility researcher, an occupational therapist,
                a clinic partner, or someone living with low motor control — your voice directly
                shapes the evolution of Accio.
              </p>
            </div>

            {/* Direct Channel Contact Cards */}
            <div className="space-y-2.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-[#dfe6d7] shadow-2xs flex items-center gap-3.5 hover:border-[#2d6a4f] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#eef3e5] text-[#2d6a4f] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Research Inquiries</div>
                  <div className="text-xs sm:text-sm font-semibold text-accio-navy truncate">research@accio.accessibility</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#dfe6d7] shadow-2xs flex items-center gap-3.5 hover:border-[#2d6a4f] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#e2ebd2] text-[#2d6a4f] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Clinical Partnerships</div>
                  <div className="text-xs sm:text-sm font-semibold text-accio-navy truncate">partners@accio.accessibility</div>
                </div>
              </div>
            </div>

            {/* Credibility Badges */}
            <div className="pt-3 border-t border-[#dfe6d7] flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2d6a4f]" />
                <span>Response within 24 business hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                <span>Confidential & Private</span>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible High-End Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-md border border-[#dfe6d7] shadow-xl space-y-5 text-left"
            >
              {/* Form Heading Strip */}
              <div className="border-b border-[#eef3e5] pb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-accio-navy tracking-tight">
                  Send us a message
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  Fill in your details below and our research team will connect promptly.
                </p>
              </div>

              {isSent && (
                <div
                  role="status"
                  className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <div>
                    <div className="font-bold">Thank you for reaching out!</div>
                    <p className="text-emerald-700 text-xs mt-0.5">
                      Your message has been dispatched to our research coordinators. We will reply via email shortly.
                    </p>
                  </div>
                </div>
              )}

              {errors.form && (
                <div
                  role="alert"
                  className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs"
                >
                  {errors.form}
                </div>
              )}

              {/* Topic Selector Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Topic of Collaboration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INQUIRY_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, category: cat.id as any })}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#163829] text-white border-[#163829] shadow-xs'
                            : 'bg-[#fbfcf9] text-slate-600 border-[#dfe6d7] hover:border-[#2d6a4f]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-[#2d6a4f]'}`} />
                        <span className="text-[11px] leading-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    placeholder="e.g. Dr. Jordan Lee"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dfe6d7] bg-[#fbfcf9] text-slate-800 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    placeholder="name@institution.edu"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dfe6d7] bg-[#fbfcf9] text-slate-800 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  placeholder="Share details about your clinical context, research interests, or accessibility feedback..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dfe6d7] bg-[#fbfcf9] text-slate-800 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="!bg-[#163829] hover:!bg-[#0f281d] !border !border-[#23533c] !px-8 !py-3 text-sm font-semibold shadow-md w-full sm:w-auto justify-center"
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
