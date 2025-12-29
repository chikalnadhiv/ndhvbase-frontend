'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/app/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function ContactForm({ 
  isOpen, 
  onClose, 
  initialMessage = '' 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialMessage?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await submitContactForm(formData);
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } else {
      setStatus('error');
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">Get in Touch</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 text-green-400">
                Message sent successfully! We'll get back to you soon.
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your full name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone Number
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="e.g., +62 812..." required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    defaultValue={initialMessage}
                    key={initialMessage}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-white font-semibold shadow-lg shadow-primary/25 bg-gradient-to-r from-[#5e6ad2] to-[#ec4899] hover:opacity-90 transition-opacity"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
                {status === 'error' && (
                  <p className="text-destructive text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
