'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useContact } from '@/components/contact-provider';

// Solid Moon Icon
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
      clipRule="evenodd"
    />
  </svg>
);

// Solid Sun Icon
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { openContact } = useContact();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide font-anton">
            <Image
              src="/assets/ndhvlogo.jpeg"
              alt="ndhvbase logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            Ndhvbase
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
              ) : (
                <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
              )}
            </button>

            <Button variant="secondary" size="sm" onClick={openContact}>
              Contact Us
            </Button>
          </div>

          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background border-l border-border z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold font-anton">
              <Image
                src="/assets/ndhvlogo.jpeg"
                alt="ndhvbase logo"
                width={28}
                height={28}
                className="rounded-md"
              />
              Ndhvbase
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2 p-6">
            <Link
              href="#services"
              className="text-foreground font-medium hover:bg-accent px-4 py-3 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#pricing"
              className="text-foreground font-medium hover:bg-accent px-4 py-3 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            <Button
              variant="default"
              className="w-full mt-4"
              onClick={() => {
                openContact();
                setIsMobileMenuOpen(false);
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Theme Toggle for Mobile */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed bottom-6 right-6 z-50 md:hidden h-12 w-12 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
          theme === 'light'
            ? 'bg-black text-white shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6),0_0_50px_rgba(255,255,255,0.4)]'
            : 'bg-white text-gray-900 shadow-lg border border-gray-200 hover:bg-gray-50'
        }`}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <MoonIcon className="h-6 w-6" />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
