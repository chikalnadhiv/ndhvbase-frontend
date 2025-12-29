'use client';

import React, { createContext, useContext, useState } from 'react';
import { ContactForm } from '@/components/ContactForm';

interface ContactContextType {
  openContact: (message?: string) => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const openContact = (message?: string) => {
    if (message) setInitialMessage(message);
    setIsOpen(true);
  };
  
  const closeContact = () => {
    setIsOpen(false);
    setInitialMessage('');
  };

  return (
    <ContactContext.Provider value={{ openContact, closeContact }}>
      {children}
      <ContactForm isOpen={isOpen} onClose={closeContact} initialMessage={initialMessage} />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
}
